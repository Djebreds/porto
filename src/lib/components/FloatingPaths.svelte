<script lang="ts">
	let { position = 1 }: { position?: number } = $props();

	let el = $state<HTMLElement | null>(null);
	let running = $state(true);

	$effect(() => {
		if (!el) return;
		// Pause the stroke animations while the section is scrolled out of view.
		const io = new IntersectionObserver(([e]) => (running = e.isIntersecting), { threshold: 0 });
		io.observe(el);
		return () => io.disconnect();
	});

	// Reduced from 36 to 18 paths — half the GPU work, still looks full
	const paths = Array.from({ length: 18 }, (_, i) => {
		const offset = i * 10 * position;
		const ySpread = i * 12;
		return {
			id: i,
			d: `M${-200 - offset} ${-50 + ySpread} C${-100 - offset} ${200 + ySpread} ${300 - offset} ${450 + ySpread} ${500 - offset} ${650 + ySpread} S${700 - offset} ${750 + ySpread} ${800 - offset} ${820 + ySpread}`,
			width: 0.5 + i * 0.06,
			opacity: 0.04 + i * 0.015,
			duration: 25 + i,
		};
	});
</script>

<div
	bind:this={el}
	class="pointer-events-none absolute inset-0 z-0 h-full"
	class:paused={!running}
	aria-hidden="true"
>
	<svg class="h-full w-full" style="display:block;" viewBox="0 0 696 800" fill="none" preserveAspectRatio="none">
		{#each paths as path (path.id)}
			<path
				d={path.d}
				stroke="rgb(133 204 255)"
				stroke-width={path.width}
				stroke-opacity={path.opacity}
				fill="none"
				stroke-linecap="round"
				class="path-anim"
				style="--dur:{path.duration}s;"
			/>
		{/each}
	</svg>
</div>

<style>
	.path-anim {
		stroke-dasharray: 1600;
		stroke-dashoffset: 1600;
		animation: draw var(--dur, 25s) linear infinite;
		will-change: stroke-dashoffset;
	}

	.paused .path-anim {
		animation-play-state: paused;
	}

	@keyframes draw {
		to { stroke-dashoffset: -1600; }
	}

	@media (prefers-reduced-motion: reduce) {
		.path-anim {
			animation: none;
			stroke-dashoffset: 0;
			stroke-dasharray: none;
		}
	}
</style>
