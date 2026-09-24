<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { appLink } from '$lib/app-link';
	import type { BlogSummary } from '$lib/blog/types';
	import { blogPostViewTransitionName } from '$lib/blog/view-transition';

	let { data } = $props();

	const posts = $derived(data.posts);

	const byYear = $derived(
		posts.reduce<Record<string, BlogSummary[]>>((acc, p) => {
			const y = new Date(p.date).getFullYear().toString();
			if (!acc[y]) acc[y] = [];
			acc[y].push(p);
			return acc;
		}, {})
	);

	const years = $derived(Object.keys(byYear).sort((a, b) => +b - +a));

	function formatDate(d: string) {
		const dt = new Date(d);
		const month = dt.toLocaleString('en', { month: 'short' }).toUpperCase();
		const day = String(dt.getDate()).padStart(2, '0');
		return { month, day };
	}
</script>

<section
	class="relative mx-auto w-full max-w-[728px] px-8 pt-24 pb-28 max-sm:px-4 sm:pt-28 sm:pb-12"
>
	<div in:fade={{ duration: 250 }}>
		<p class="eyebrow">Blogs /</p>
		<h1 class="mt-3 font-heading text-4xl font-extrabold uppercase md:text-5xl">Blogs</h1>
		<p class="mt-4 max-w-2xl text-neutral-400">
			Long-form notes with GitHub-hosted discussions via
			<a href="https://giscus.app" class="text-secondary-200 hover:text-white">giscus</a>.
		</p>
	</div>

	<div class="mt-12 space-y-16">
		{#each years as year (year)}
			<div in:fly={{ y: 10, duration: 350, easing: cubicOut, opacity: 1 }}>
				<div class="text-sm font-semibold text-neutral-500">{year}</div>
				<ul class="mt-6 space-y-10 border-l border-white/10 pl-6">
					{#each byYear[year] ?? [] as post (post.slug)}
						{@const d = formatDate(post.date)}
						<li class="relative">
							<span
								class="absolute top-6 -left-[29px] h-2 w-2 rounded-full bg-secondary-400 ring-8 ring-neutral-950"
							></span>
							<a
								href={appLink(`/blog/${post.slug}`)}
								class="group flex flex-wrap gap-6 md:flex-nowrap"
							>
								<div
									class="surface-card flex h-28 w-24 shrink-0 flex-col items-center justify-center rounded-2xl text-center transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:border-[var(--border-strong)]"
								>
									<div class="text-xs font-semibold text-neutral-400">{d.month}</div>
									<div class="text-3xl font-bold text-white">{d.day}</div>
								</div>
								<div class="min-w-0 flex-1">
									<h2
										class="font-heading text-2xl font-extrabold uppercase text-white transition group-hover:text-secondary-100 md:text-3xl"
										style={`view-transition-name: ${blogPostViewTransitionName(post.slug)}`}
									>
										{post.title}
									</h2>
									<p class="mt-3 text-neutral-400">{post.description}</p>
								</div>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>
