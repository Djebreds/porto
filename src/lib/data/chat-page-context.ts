import { site } from '$lib/site';

/** Snapshot of "where the user is" for the chat assistant. */
export type ChatPageKind = 'home' | 'blog-index' | 'blog-post' | 'other';

export type ChatPageContext = {
	pathname: string;
	routeId: string | null;
	kind: ChatPageKind;
	/** Short UI label, e.g. "Portfolio home", "Blogs", blog title */
	label: string;
	/** Plain-text hint about this page for routing / future prompts */
	summary: string;
	/** Set on blog post pages */
	blog?: {
		slug: string;
		description: string;
		/** Full markdown body — populated when available, used for summarise/translate/Q&A */
		body?: string;
	};
};

type PageLike = {
	url: URL;
	route: { id: string | null };
	data: App.PageData & Record<string, unknown>;
};

function isBlogPageData(d: Record<string, unknown>): d is {
	slug: string;
	meta: { title: string; description: string; date: string };
	blogBody?: string;
} {
	return (
		typeof d.slug === 'string' &&
		d.meta != null &&
		typeof d.meta === 'object' &&
		'title' in d.meta &&
		'description' in d.meta &&
		typeof (d.meta as { title: unknown }).title === 'string'
	);
}

export function buildChatPageContext(page: PageLike): ChatPageContext {
	const pathname = page.url.pathname;
	const routeId = page.route.id;

	if (pathname === '/' || pathname === '') {
		const desc =
			typeof page.data.metaDescription === 'string' && page.data.metaDescription
				? page.data.metaDescription
				: site.description.replace(/\s+/g, ' ').trim();
		return {
			pathname: '/',
			routeId,
			kind: 'home',
			label: 'Portfolio home',
			summary: `Portfolio landing: ${site.title}. ${desc}`
		};
	}

	if (pathname === '/blog') {
		return {
			pathname,
			routeId,
			kind: 'blog-index',
			label: 'Blogs',
			summary: 'Blog index listing blogs by Refi Ahmad Fauzan with descriptions and links to posts.'
		};
	}

	if (pathname.startsWith('/blog/') && isBlogPageData(page.data)) {
		const { meta, slug } = page.data;
		const body = typeof page.data.blogBody === 'string' ? page.data.blogBody : undefined;
		return {
			pathname,
			routeId,
			kind: 'blog-post',
			label: meta.title,
			summary: `Blog post "${meta.title}" (slug: ${slug}). ${meta.description}`,
			blog: { slug, description: meta.description, body }
		};
	}

	return {
		pathname,
		routeId,
		kind: 'other',
		label: pathname,
		summary: `Site page ${pathname}.`
	};
}
