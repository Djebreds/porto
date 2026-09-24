<script lang="ts">
	import { tick } from 'svelte';
	import { page } from '$app/state';
	import { appLink } from '$lib/app-link';

	const links = [
		{ title: 'Home', href: appLink('/#home') },
		{ title: 'About', href: appLink('/#about') },
		{ title: 'Skills', href: appLink('/#skills') },
		{ title: 'Projects', href: appLink('/#projects') },
		{ title: 'Certs', href: appLink('/#certifications') },
		{ title: 'Blogs', href: appLink('/blog') },
		{ title: 'Contact', href: appLink('/#contact') }
	] as const;

	let listEl = $state<HTMLElement | null>(null);
	let indicator = $state({ left: 0, width: 0 });

	const activeIndex = $derived.by(() => {
		void page.url.pathname;
		void page.url.hash;
		return activeLinkIndex();
	});

	function activeLinkIndex(): number {
		const p = page.url.pathname;
		if (p === '/blog' || p.startsWith('/blog/')) return links.findIndex((l) => l.title === 'Blogs');
		const h = page.url.hash;
		const i = h ? links.findIndex((l) => l.href.endsWith(`/${h}`)) : -1;
		return i === -1 ? 0 : i;
	}

	function measure() {
		if (!listEl) return;
		const anchors = [...listEl.querySelectorAll<HTMLAnchorElement>('a')];
		const idx = activeLinkIndex();
		const a = anchors[idx] ?? anchors[0];
		if (!a) {
			indicator = { left: 0, width: 0 };
			return;
		}
		const listRect = listEl.getBoundingClientRect();
		const aRect = a.getBoundingClientRect();
		indicator = {
			left: aRect.left - listRect.left + listEl.scrollLeft,
			width: aRect.width
		};
	}

	$effect(() => {
		void page.url.pathname;
		void page.url.hash;
		void tick().then(measure);
	});

	$effect(() => {
		if (typeof window === 'undefined' || !listEl) return;
		window.addEventListener('resize', measure);
		const ro = new ResizeObserver(measure);
		ro.observe(listEl);
		queueMicrotask(() => void tick().then(measure));
		return () => {
			window.removeEventListener('resize', measure);
			ro.disconnect();
		};
	});
</script>

<header class="pointer-events-none fixed inset-x-0 top-6 z-40 mx-auto flex w-full justify-center">
	<div class="pointer-events-auto mx-auto max-w-full px-2 sm:px-6">
		<div
			class="glass-frost flex h-12 items-center justify-center gap-2 rounded-full bg-primary-100/10 px-1 py-1 shadow-lg shadow-black/[0.04] sm:gap-3 sm:px-3"
		>
			<nav
				class="relative flex max-w-[calc(100vw-1.5rem)] justify-center overflow-x-auto"
				bind:this={listEl}
			>
				{#if indicator.width > 0}
					<div
						class="pointer-events-none absolute inset-y-0 left-0 rounded-full bg-primary-500/50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
						style:left="{indicator.left}px"
						style:width="{indicator.width}px"
						aria-hidden="true"
					></div>
				{/if}
				<ul
					class="relative flex flex-nowrap items-center text-[0.75rem] font-medium sm:gap-1 sm:text-sm md:gap-4 lg:gap-6"
				>
					{#each links as link, i (link.href)}
						<li class="shrink-0">
							<a
								href={link.href}
								aria-current={i === activeIndex ? 'page' : undefined}
								class="inline-flex rounded-full px-[0.3rem] py-2 font-normal whitespace-nowrap transition-colors min-[400px]:px-2 sm:px-2.5 {i ===
								activeIndex
									? 'text-white'
									: 'text-neutral-300 hover:text-white'}"
							>
								{link.title}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>
	</div>
</header>
