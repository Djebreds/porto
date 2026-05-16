import http from 'http';

const OLLAMA_HOST  = '127.0.0.1';
const OLLAMA_PORT  = 11434;
const PROXY_PORT   = 11435;
const API_KEY      = process.env.AI_PROXY_API_KEY ?? '';

// ── Limits ────────────────────────────────────────────────────────────────────
const MAX_BODY_BYTES     = 32_768;  // 32 KB max request body
const MAX_MSG_LENGTH     = 1_000;   // chars per user message
const MAX_HISTORY_TURNS  = 10;      // max messages in history

// ── Concurrency gate ──────────────────────────────────────────────────────────
// Ollama is configured with NUM_PARALLEL=2, MAX_QUEUE=4.
// We mirror that here so we reject early rather than letting Node pile up.
const MAX_CONCURRENT = 2;   // active streams to Ollama
const MAX_QUEUED     = 4;   // requests waiting for a slot
let activeRequests   = 0;
let queuedRequests   = 0;

function acquireSlot() {
  if (activeRequests < MAX_CONCURRENT) {
    activeRequests++;
    return 'active';
  }
  if (queuedRequests < MAX_QUEUED) {
    queuedRequests++;
    return 'queued';
  }
  return 'rejected';
}

function releaseSlot() {
  if (activeRequests > 0) activeRequests--;
}

// ── Rate limiter (per IP) ─────────────────────────────────────────────────────
const WINDOW_MS    = 60_000;  // 1 minute window
const MAX_REQUESTS = 30;      // max requests per IP per window (slightly higher than app layer)
const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQUESTS) return false;
  entry.count++;
  return true;
}

// Clean stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}, 300_000);

// ── Injection patterns ────────────────────────────────────────────────────────
const INJECTION_PATTERNS = [
  'ignore previous',
  'ignore all previous',
  'disregard previous',
  'forget previous',
  'forget your instructions',
  'new instructions',
  'you are now',
  'pretend you are',
  'pretend to be',
  'act as if',
  'jailbreak',
  'dan mode',
  'developer mode',
  'system prompt',
  'print your prompt',
  'reveal your prompt',
  'show your instructions',
  'override instructions',
  'bypass',
  'sudo ',
  'rm -rf',
  'exec(',
  'eval(',
  '<script',
  'javascript:',
  'prompt injection',
  'base64_decode',
  '&#',
];

const OFF_TOPIC_PATTERNS = [
  /\b(hack|exploit|vulnerability|malware|ransomware|phishing)\b/i,
  /\b(bomb|weapon|drug|illegal)\b/i,
  /\b(write me a (script|program|code) (to|that) (steal|scrape|attack|spam))\b/i,
  /\b(how (to|do i) (crack|bypass|break into))\b/i,
];

function isSuspicious(text) {
  const lower = text.toLowerCase();
  // Try to decode obfuscated input
  let decoded = lower;
  try { decoded = decodeURIComponent(lower); } catch {}
  if (INJECTION_PATTERNS.some(p => decoded.includes(p))) return true;
  if (OFF_TOPIC_PATTERNS.some(r => r.test(text))) return true;
  return false;
}

// ── Body parser ───────────────────────────────────────────────────────────────
function extractUserMessages(bodyStr) {
  try {
    const parsed = JSON.parse(bodyStr);
    if (!Array.isArray(parsed.messages)) return { messages: [], error: null };
    const userMsgs = parsed.messages
      .filter(m => m.role === 'user' && typeof m.content === 'string')
      .map(m => m.content);
    return { messages: userMsgs, error: null };
  } catch (e) {
    return { messages: [], error: 'invalid JSON' };
  }
}

// Trim history in the body to prevent context stuffing attacks
function trimHistory(bodyStr) {
  try {
    const parsed = JSON.parse(bodyStr);
    if (!Array.isArray(parsed.messages)) return bodyStr;
    parsed.messages = parsed.messages.slice(-MAX_HISTORY_TURNS);
    // Always pin keep_alive so the model stays loaded between requests
    parsed.keep_alive = '30m';
    return JSON.stringify(parsed);
  } catch {
    return bodyStr;
  }
}

// ── Response helpers ──────────────────────────────────────────────────────────
function sendBlocked(res, reason) {
  console.warn('[proxy] blocked:', reason);
  const body = JSON.stringify({
    model: 'proxy',
    message: {
      role: 'assistant',
      content: "I'm here to answer questions about Refi's portfolio. How can I help?",
    },
    done: true,
  });
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(body);
}

function sendError(res, status, message) {
  res.writeHead(status, { 'Content-Type': 'text/plain' });
  res.end(message);
}

// ── Ollama forwarder ──────────────────────────────────────────────────────────
function forwardToOllama(req, res, rawBody) {
  const bodyBuf = rawBody ? Buffer.from(rawBody, 'utf8') : null;
  const options = {
    hostname: OLLAMA_HOST,
    port: OLLAMA_PORT,
    path: req.url,
    method: req.method,
    headers: {
      ...req.headers,
      host: `${OLLAMA_HOST}:${OLLAMA_PORT}`,
      ...(bodyBuf ? { 'content-length': bodyBuf.length } : {}),
    },
  };

  const proxy = http.request(options, (ollamaRes) => {
    res.writeHead(ollamaRes.statusCode, ollamaRes.headers);
    ollamaRes.pipe(res);
  });

  proxy.on('error', (err) => {
    console.error('[proxy] upstream error:', err.message);
    if (!res.headersSent) sendError(res, 502, 'Bad gateway');
    else res.end();
  });

  if (bodyBuf) proxy.write(bodyBuf);
  proxy.end();
}

// ── Allowed routes ────────────────────────────────────────────────────────────
const ALLOWED_PATHS = ['/api/chat', '/api/tags', '/api/version'];

// ── Server ────────────────────────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  const ip = req.socket.remoteAddress ?? 'unknown';

  // ── Rate limit ──────────────────────────────────────────────────────────────
  if (!checkRateLimit(ip)) {
    console.warn('[proxy] rate limited:', ip);
    sendError(res, 429, 'Too many requests');
    return;
  }

  // ── API key auth ────────────────────────────────────────────────────────────
  const key = req.headers['x-api-key'] ?? '';
  if (API_KEY && key !== API_KEY) {
    sendError(res, 401, 'Unauthorized');
    return;
  }

  // ── Route allowlist ─────────────────────────────────────────────────────────
  if (!ALLOWED_PATHS.includes(req.url)) {
    sendError(res, 404, 'Not found');
    return;
  }

  // ── POST: collect, inspect, forward ────────────────────────────────────────
  if (req.method === 'POST') {
    const chunks = [];
    let totalBytes = 0;

    req.on('data', chunk => {
      totalBytes += chunk.length;
      if (totalBytes > MAX_BODY_BYTES) {
        req.destroy();
        sendError(res, 413, 'Request too large');
        return;
      }
      chunks.push(chunk);
    });

    req.on('end', () => {
      const rawBody = Buffer.concat(chunks).toString('utf8');

      // Parse and inspect user messages
      const { messages, error: parseError } = extractUserMessages(rawBody);
      if (parseError) {
        sendError(res, 400, 'Invalid request body');
        return;
      }

      for (const msg of messages) {
        // Per-message length cap
        if (msg.length > MAX_MSG_LENGTH) {
          sendBlocked(res, `message too long: ${msg.length} chars`);
          return;
        }
        // Injection / abuse check
        if (isSuspicious(msg)) {
          sendBlocked(res, `suspicious: "${msg.slice(0, 80)}"`);
          return;
        }
      }

      // Trim history before forwarding
      const safeBody = trimHistory(rawBody);

      // ── Concurrency gate (only for /api/chat) ────────────────────────────
      if (req.url === '/api/chat') {
        const slot = acquireSlot();
        if (slot === 'rejected') {
          console.warn('[proxy] concurrency limit reached, rejecting');
          sendError(res, 503, 'Server busy, please try again shortly');
          return;
        }
        if (slot === 'queued') queuedRequests--;  // moving from queue to active
        // Release slot when response ends
        res.on('finish', releaseSlot);
        res.on('close', releaseSlot);
      }

      forwardToOllama(req, res, safeBody);
    });

    req.on('error', (err) => {
      console.error('[proxy] request error:', err.message);
    });

    return;
  }

  // ── GET passthrough (tags, version) ────────────────────────────────────────
  forwardToOllama(req, res, null);
});

server.listen(PROXY_PORT, '127.0.0.1', () => {
  console.log(`[ai-proxy] 127.0.0.1:${PROXY_PORT} → ollama:${OLLAMA_PORT}`);
  console.log(`[ai-proxy] limits: ${MAX_REQUESTS} req/min, ${MAX_BODY_BYTES}B body, ${MAX_MSG_LENGTH} chars/msg`);
});
