import type { PageServerLoad } from './$types';
import { site } from '$lib/site';

export const load: PageServerLoad = async () => ({
	metaTitle: `${site.title} — ${site.tagline}`,
	metaDescription: site.description.replace(/\s+/g, ' ').trim()
});
