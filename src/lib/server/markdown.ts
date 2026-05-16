import { Marked } from 'marked';
import type { Tokens } from 'marked';
import { createHighlighter, type BundledLanguage } from 'shiki';

/** Languages commonly used in blogs & snippets */
const bundledLangs = [
	'bash',
	'css',
	'docker',
	'graphql',
	'html',
	'javascript',
	'json',
	'jsx',
	'markdown',
	'shell',
	'ruby',
	'sql',
	'svelte',
	'tsx',
	'typescript',
	'yaml'
] satisfies BundledLanguage[];

let highlighterPromise: Promise<Awaited<ReturnType<typeof createHighlighter>>> | null = null;

async function getHighlighter() {
	if (!highlighterPromise) {
		highlighterPromise = createHighlighter({
			themes: ['github-dark'],
			langs: [...bundledLangs]
		});
	}
	return highlighterPromise;
}

/**
 * Marked v18 still stringifies async `renderer.code` as `[object Promise]` even with `parse(…, { async: true })`.
 * Shiki’s `codeToHtml` is synchronous once a highlighter exists — preload, then parse with a **sync** `code` renderer.
 */
function buildMarkdownInstance(hl: Awaited<ReturnType<typeof createHighlighter>>): Marked {
	return new Marked().use({
		renderer: {
			code(token: Tokens.Code) {
				const lang = token.lang?.trim().toLowerCase();
				if (lang === 'mermaid') {
					const safe = escapeHtml(token.text);
					return `<div class="markdown-mermaid not-prose my-8 overflow-x-auto rounded-xl border border-white/10 bg-neutral-950/90 p-4 shadow-inner shadow-black/30"><pre class="mermaid">${safe}</pre></div>`;
				}
				try {
					const loaded = hl.getLoadedLanguages();
					const normalized = lang && loaded.includes(lang as BundledLanguage) ? lang : 'typescript';
					const highlighted = hl.codeToHtml(token.text, {
						lang: normalized as BundledLanguage,
						theme: 'github-dark'
					});
					return `<div class="markdown-code not-prose my-6 overflow-x-auto rounded-xl border border-white/10 bg-black/40">${highlighted}</div>`;
				} catch {
					const safe = escapeHtml(token.text);
					const cls = lang ? `language-${escapeHtml(lang)}` : '';
					return `<pre class="my-6 overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4"><code class="${cls}">${safe}</code></pre>`;
				}
			}
		}
	} as never);
}

let cachedMarkdown: Marked | null = null;

function escapeHtml(text: string): string {
	return text
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#039;');
}

/** Render markdown body (without frontmatter) to HTML suitable for `{@html}`. */
export async function markdownToHtml(source: string): Promise<string> {
	const hl = await getHighlighter();
	cachedMarkdown ??= buildMarkdownInstance(hl);
	return cachedMarkdown.parse(source) as string;
}
