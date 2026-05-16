import type { ChatPageContext } from './chat-page-context';

export type ChatReply =
	| { kind: 'text'; text: string }
	| { kind: 'links'; text: string; links: { label: string; href: string }[] };

const lower = (s: string) => s.toLowerCase();

/** Very small mock “AI” router — pass `ctx` for page-aware answers; swap for a real model later. */
export function mockAssistantReply(input: string, ctx: ChatPageContext): ChatReply {
	const q = lower(input.trim());

	if (!q) {
		return {
			kind: 'text',
			text: `You’re on “${ctx.label}”. Ask about this page, Refi’s stack, work, blog, or contact.`
		};
	}

	if (/(what page|which page|where am i|current page|this page|what am i reading)/.test(q)) {
		return {
			kind: 'text',
			text: `You’re on “${ctx.label}” (${ctx.pathname}). ${ctx.summary}`
		};
	}

	if (/(what is this page about|what's this page about|what is this article about|what is this blog about)/.test(q)) {
		return {
			kind: 'text',
			text:
			ctx.kind === 'blog-post' && ctx.blog
				? `${ctx.label}: ${ctx.blog.description}`
					: ctx.summary
		};
	}

	if (
		ctx.kind === 'blog-post' &&
		/(this article|this post|this blog|summarize|summary|what does this say|about this article|about this post|about this blog)/.test(
			q
		)
	) {
		const desc = ctx.blog?.description ?? ctx.summary;
		return {
			kind: 'text',
			text: `${ctx.label} — ${desc} (For deeper Q&A per paragraph, wire an LLM with the full post body.)`
		};
	}

	if (
		ctx.kind === 'blog-index' &&
		/(which blogs|what posts|list blogs|on this page)/.test(q)
	) {
		return {
			kind: 'text',
			text: 'This is the Blogs index: yearly lists of posts with dates and links. Open any row to read the full piece and leave comments via giscus.'
		};
	}

	if (ctx.kind === 'home' && /(this section|above the fold|on the home page)/.test(q)) {
		return {
			kind: 'text',
			text: `You’re on the portfolio home — intro, about, connect links, and access to blogs. ${ctx.summary}`
		};
	}

	if (
		(/(who|intro|bio)\b/.test(q) ||
			/\babout (refi|him)\b/.test(q) ||
			/\btell me about (refi|him|you)\b/.test(q)) &&
		!/(blog|article|post)\b/.test(q)
	) {
		return {
			kind: 'text',
			text: 'Refi Ahmad Fauzan is a backend-leaning full‑stack engineer focused on Ruby on Rails, NestJS, and pragmatic delivery. He ships APIs, background jobs, and integrations with an eye for maintainability.'
		};
	}

	if (/(stack|tech|skill|tool)/.test(q)) {
		return {
			kind: 'text',
			text: 'Common tools: Ruby on Rails, NestJS, TypeScript, PostgreSQL, Redis, Sidekiq/BullMQ, Docker, and cloud deploys (AWS / DO). He’s comfortable on the frontend with React, Next.js, and SvelteKit.'
		};
	}

	if (/(work|job|experience|company|project)/.test(q)) {
		return {
			kind: 'text',
			text: 'Recent work includes school management microservices (NestJS), halal certification platforms (Rails), and multi-product studio delivery (Rails/Next/Nest). Blogs on this site expand on architecture and delivery when he publishes notes.'
		};
	}

	if (/(blog|article|write)/.test(q)) {
		return {
			kind: 'links',
			text: 'He writes on this site’s blog (GitHub-discussion comments via giscus) and has published on Medium and dev.to before.',
			links: [
				{ label: 'Blog', href: '/blog' },
				{ label: 'Medium', href: 'https://medium.com/@refi-fauzan' },
				{ label: 'dev.to', href: 'https://dev.to/refifauzan' }
			]
		};
	}

	if (/(hire|freelance|rate|price|service|consult)/.test(q)) {
		return {
			kind: 'links',
			text: 'He’s open to consultation, fixed-scope projects, and monthly retainers. Email or LinkedIn is the fastest way to align on scope and availability.',
			links: [
				{ label: 'LinkedIn', href: 'https://linkedin.com/in/refifauzan' },
				{ label: 'Email', href: 'mailto:refi.ahmad.fauzan@gmail.com' }
			]
		};
	}

	if (/(contact|email|linkedin|github|cv|resume)/.test(q)) {
		return {
			kind: 'links',
			text: 'Reach out via email or LinkedIn. GitHub has code samples; a CV is linked from the contact section when available.',
			links: [
				{ label: 'GitHub', href: 'https://github.com/djebreds' },
				{ label: 'LinkedIn', href: 'https://linkedin.com/in/refifauzan' },
				{ label: 'Email', href: 'mailto:refi.ahmad.fauzan@gmail.com' }
			]
		};
	}

	if (/(location|timezone|remote)/.test(q)) {
		return {
			kind: 'text',
			text: 'Based in Indonesia; happy to work remotely with teams worldwide. He optimizes for clear written updates and a predictable weekly cadence.'
		};
	}

	return {
		kind: 'text',
		text: `I’m a demo assistant (you’re on “${ctx.label}”). Try: “What page am I on?”, “What’s your tech stack?”, “Summarize this blog” on a post, or “How do I contact you?”`
	};
}
