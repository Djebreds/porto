import { error } from '@sveltejs/kit';
import { getPostFormat, getPostMarkdownBody, getPostMeta, getPostRawBody } from '$lib/server/blog';
import { markdownToHtml } from '$lib/server/markdown';
import { site } from '$lib/site';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const format = getPostFormat(params.slug);
	if (!format) throw error(404, 'Blog not found');

	const meta = getPostMeta(params.slug);
	if (!meta) throw error(404, 'Blog not found');

	// Raw markdown body for the AI chat context (strip HTML tags for cleaner LLM input)
	const rawBody = getPostRawBody(params.slug);
	// Truncate to ~6000 chars to stay within reasonable context window
	const blogBody = rawBody ? rawBody.slice(0, 6000) : undefined;

	const base = {
		metaTitle: `${meta.title} — ${site.title}`,
		metaDescription: meta.description,
		slug: params.slug,
		meta,
		format,
		blogBody
	} as const;

	if (format === 'md') {
		const post = getPostMarkdownBody(params.slug);
		if (!post) throw error(404, 'Blog not found');
		const html = await markdownToHtml(post.source);
		return { ...base, html };
	}

	return { ...base, html: '' };
};
