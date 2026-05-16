<script lang="ts">
	import { browser } from '$app/environment';
	import Giscus from '@giscus/svelte';
	import { env } from '$env/dynamic/public';
	import { tick } from 'svelte';
	import type { Component } from 'svelte';
	import { appLink } from '$lib/app-link';
	import { hydrateMermaidIn } from '$lib/blog/mermaid-hydrate';
	import { blogPostViewTransitionName } from '$lib/blog/view-transition';

	const svxPosts = import.meta.glob<{ default: Component }>(
		'../../../content/blog/*/article.svx',
		{ eager: true }
	);

	function svxPathForSlug(slug: string): string | undefined {
		return Object.keys(svxPosts).find((path) => {
			const m = path.match(/blog\/([^/]+)\/article\.svx$/);
			return m?.[1] === slug;
		});
	}

	let { data } = $props();

	let proseEl = $state.raw<HTMLDivElement | null>(null);

	const Post = $derived.by(() => {
		if (data.format !== 'svx') return null;
		const path = svxPathForSlug(data.slug);
		if (!path) return null;
		return svxPosts[path].default;
	});

	const dateLabel = $derived(
		new Date(data.meta.date).toLocaleDateString('en', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	);

	$effect(() => {
		if (!browser) return;
		const slug = data.slug;
		void data.html;
		void data.format;
		void Post;
		void tick().then(() => {
			if (data.slug !== slug) return;
			const el = proseEl;
			if (!el) return;
			void hydrateMermaidIn(el);
		});
	});
</script>

<svelte:head>
	<title>{data.metaTitle}</title>
	<meta name="description" content={data.metaDescription} />
</svelte:head>

<article
	class="relative mx-auto w-full max-w-[728px] px-8 pt-24 pb-32 max-sm:px-4 sm:pt-28 sm:pb-16"
>
	<nav class="text-sm text-neutral-500">
		<a href={appLink('/blog')} class="hover:text-secondary-200">Blogs</a>
		<span class="mx-2">/</span>
		<span class="text-neutral-400">{dateLabel}</span>
	</nav>

	<h1
		class="mt-6 font-heading text-4xl leading-tight font-extrabold uppercase text-balance md:text-5xl"
		style={`view-transition-name: ${blogPostViewTransitionName(data.slug)}`}
	>
		{data.meta.title}
	</h1>
	<p class="mt-4 text-lg text-neutral-400">{data.meta.description}</p>

	{#key data.slug}
		<div class="blog-prose mt-10" bind:this={proseEl}>
		{#if data.format === 'svx' && Post}
			<Post />
			{:else}
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html data.html}
			{/if}
		</div>
	{/key}

	<div class="my-14 border-t border-white/10"></div>

	<div class="not-prose">
		<h2 class="font-heading text-xl font-extrabold uppercase text-white">Comments</h2>
		<p class="mt-2 text-sm text-neutral-400">
			Discussion is mirrored to GitHub — sign in with your GitHub account to comment.
		</p>

		{#if !env.PUBLIC_GISCUS_REPO_ID || !env.PUBLIC_GISCUS_CATEGORY_ID}
			<div
				class="mt-6 rounded-2xl border border-amber-500/30 bg-amber-950/40 p-4 text-sm text-amber-100"
			>
				<strong class="font-semibold">Configure giscus.</strong>
				Create a discussion category on your repo, install the
				<a href="https://github.com/apps/giscus" class="underline">giscus GitHub App</a>, then set
				<code class="rounded bg-black/40 px-1 py-0.5">PUBLIC_GISCUS_REPO_ID</code>,
				<code class="rounded bg-black/40 px-1 py-0.5">PUBLIC_GISCUS_CATEGORY_ID</code>, and optional
				<code class="rounded bg-black/40 px-1 py-0.5">PUBLIC_GISCUS_REPO</code> in your environment
				( see <code class="rounded bg-black/40 px-1 py-0.5">.env.example</code>).
			</div>
		{:else if browser}
			<div class="mt-6">
				<Giscus
					id="giscus"
					host="https://giscus.app"
					repo={(env.PUBLIC_GISCUS_REPO ?? 'djebreds/personal') as `${string}/${string}`}
					repoId={env.PUBLIC_GISCUS_REPO_ID}
					category={env.PUBLIC_GISCUS_CATEGORY ?? 'Announcements'}
					categoryId={env.PUBLIC_GISCUS_CATEGORY_ID}
					mapping="pathname"
					term=""
					strict="0"
					reactionsEnabled="1"
					emitMetadata="0"
					inputPosition="bottom"
					theme="preferred_color_scheme"
					lang="en"
					loading="lazy"
				/>
			</div>
		{/if}
	</div>
</article>
