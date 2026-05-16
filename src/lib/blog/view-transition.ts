/**
 * Stable identifier for View Transitions matching list row title → blog post `<h1>`.
 * Slugs are file names; sanitize so the name is a valid custom identifier.
 */
export function blogPostViewTransitionName(slug: string): string {
	return `blog-post-${slug.replace(/[^\w-]/g, '-')}`;
}
