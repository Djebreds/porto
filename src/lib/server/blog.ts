import matter from 'gray-matter';
import type { BlogFrontmatter, BlogSummary } from '$lib/blog/types';

export type PostFormat = 'svx' | 'md';

/** Raw sources for frontmatter (listing + meta); avoids compiling every post on the index route. */
const svxRawModules = import.meta.glob<string>('../../content/blog/*/article.svx', {
	eager: true,
	query: '?raw',
	import: 'default'
});

const mdRawModules = import.meta.glob<string>('../../content/blog/*/article.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

function slugFromFolderPostPath(path: string): string | null {
	const m = path.match(/blog\/([^/]+)\/article\.(?:svx|md)$/);
	return m?.[1] ?? null;
}

export function getPostFormat(slug: string): PostFormat | null {
	const hasSvx = Object.keys(svxRawModules).some((p) => slugFromFolderPostPath(p) === slug);
	if (hasSvx) return 'svx';
	const hasMd = Object.keys(mdRawModules).some((p) => slugFromFolderPostPath(p) === slug);
	if (hasMd) return 'md';
	return null;
}

export function getPostSlugs(): string[] {
	const slugs = new Set<string>();
	for (const path of Object.keys(svxRawModules)) {
		const s = slugFromFolderPostPath(path);
		if (s) slugs.add(s);
	}
	for (const path of Object.keys(mdRawModules)) {
		const s = slugFromFolderPostPath(path);
		if (s) slugs.add(s);
	}
	return [...slugs];
}

function parseSource(raw: string): { meta: BlogFrontmatter; body: string } {
	const { data, content } = matter(raw);
	return {
		meta: {
			title: String(data.title ?? ''),
			description: String(data.description ?? ''),
			date: String(data.date ?? new Date().toISOString())
		},
		body: content.trim()
	};
}

/** All posts with frontmatter, newest first (server-only — uses gray-matter / Node APIs) */
export function listPosts(): BlogSummary[] {
	const items: BlogSummary[] = [];
	for (const slug of getPostSlugs()) {
		const format = getPostFormat(slug);
		if (!format) continue;
		const raw =
			format === 'svx'
				? Object.entries(svxRawModules).find(([p]) => slugFromFolderPostPath(p) === slug)?.[1]
				: Object.entries(mdRawModules).find(([p]) => slugFromFolderPostPath(p) === slug)?.[1];
		if (!raw) continue;
		const { meta } = parseSource(raw);
		items.push({
			slug,
			title: meta.title || slug,
			description: meta.description,
			date: meta.date
		});
	}
	return items.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPostMeta(slug: string): BlogFrontmatter | null {
	const format = getPostFormat(slug);
	if (!format) return null;
	const raw =
		format === 'svx'
			? Object.entries(svxRawModules).find(([p]) => slugFromFolderPostPath(p) === slug)?.[1]
			: Object.entries(mdRawModules).find(([p]) => slugFromFolderPostPath(p) === slug)?.[1];
	if (!raw) return null;
	const { meta } = parseSource(raw);
	return { ...meta, title: meta.title || slug };
}

/** Markdown-only posts: body after frontmatter (for Shiki / Marked pipeline). */
export function getPostMarkdownBody(
	slug: string
): { meta: BlogFrontmatter; source: string } | null {
	if (getPostFormat(slug) !== 'md') return null;
	const entry = Object.entries(mdRawModules).find(([p]) => slugFromFolderPostPath(p) === slug);
	if (!entry) return null;
	const [, raw] = entry;
	const { meta, body } = parseSource(raw);
	return {
		meta: { ...meta, title: meta.title || slug },
		source: body
	};
}

/**
 * Raw markdown body for any post format (svx or md), stripped of frontmatter.
 * Used to feed blog content into the AI chat context.
 */
export function getPostRawBody(slug: string): string | null {
	const format = getPostFormat(slug);
	if (!format) return null;
	const raw =
		format === 'svx'
			? Object.entries(svxRawModules).find(([p]) => slugFromFolderPostPath(p) === slug)?.[1]
			: Object.entries(mdRawModules).find(([p]) => slugFromFolderPostPath(p) === slug)?.[1];
	if (!raw) return null;
	const { body } = parseSource(raw);
	// Strip mdsvex import statements and component tags for cleaner LLM input
	return body
		.replace(/^import\s+.*?from\s+['"].*?['"]\s*;?\s*$/gm, '')
		.replace(/<[A-Z][a-zA-Z]*[^>]*\/>/g, '[interactive component]')
		.replace(/<[A-Z][a-zA-Z]*[^>]*>[\s\S]*?<\/[A-Z][a-zA-Z]*>/g, '[interactive component]')
		.trim();
}
