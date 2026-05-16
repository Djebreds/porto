export type BlogFrontmatter = {
	title: string;
	description: string;
	date: string; // ISO
};

export type BlogSummary = BlogFrontmatter & { slug: string };
