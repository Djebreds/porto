import { listPosts } from '$lib/server/blog';
import { site } from '$lib/site';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({
	posts: listPosts(),
	metaTitle: `Blogs — ${site.title}`,
	metaDescription:
		'Blogs by Refi Ahmad Fauzan — backend engineering, web platform notes, and pragmatic delivery.'
});
