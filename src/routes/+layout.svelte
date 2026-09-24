<script lang="ts">
	import '../app.css';
	import { onNavigate } from '$app/navigation';
	import type { OnNavigate } from '@sveltejs/kit';
	import { page } from '$app/state';
	import Navigation from '$lib/components/Navigation.svelte';
	import ChatWidget from '$lib/components/ChatWidget.svelte';
	import AuroraBackground from '$lib/components/AuroraBackground.svelte';
	import { site } from '$lib/site';

	let { children } = $props();

	function blogSectionRouteId(id: string | null | undefined): boolean {
		return id === '/blog' || id === '/blog/[slug]';
	}

	function shouldUseBlogViewTransition(navigation: OnNavigate): boolean {
		if (!navigation.to) return false;
		const toId = navigation.to.route.id;
		const fromId = navigation.from?.route.id;
		if (!blogSectionRouteId(toId)) return false;
		if (fromId == null || !blogSectionRouteId(fromId)) return false;
		if (!navigation.from) return false;
		if (navigation.from.url.pathname === navigation.to.url.pathname) return false;
		return true;
	}

	onNavigate((navigation) => {
		if (!shouldUseBlogViewTransition(navigation)) return;

		const run = document.startViewTransition;
		if (typeof run !== 'function') return;

		return new Promise<void>((resolve) => {
			run.call(document, async () => {
				// Resolve immediately: Kit waits for this promise before finishing navigation.
				// Awaiting `navigation.complete` first would deadlock (`complete` needs navigation to proceed).
				resolve();
				await navigation.complete;
			});
		});
	});

	const title = $derived(page.data?.metaTitle ?? `${site.title} — ${site.tagline}`);
	const description = $derived(page.data?.metaDescription ?? site.description);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<link rel="canonical" href={`${site.url}${page.url.pathname}`} />
</svelte:head>

<!-- pb-28 reserves space for the always-visible bottom chat bar.
     Decorative mesh/grid sits behind fixed nav + fixed chat (backdrop-filter composites reliably there). -->
<div class="relative min-h-dvh pb-28">
	<AuroraBackground />

	<Navigation />
	{@render children()}
	<ChatWidget />
</div>
