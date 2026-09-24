<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import createGlobe, { type Globe } from 'cobe';
	import { places } from '$lib/data/profile';

	let { class: cls = '' }: { class?: string } = $props();

	let wrap = $state<HTMLDivElement | null>(null);
	let canvas = $state<HTMLCanvasElement | null>(null);
	let dragging = $state(false);

	let globe: Globe | null = null;
	let rafId: number | null = null;
	let io: IntersectionObserver | null = null;
	let ro: ResizeObserver | null = null;

	// The canvas follows its container, so the globe scales with the card instead of
	// being a fixed 600px square that overflows on phones.
	let size = 0;
	// Start facing Southeast Asia, then drift eastward.
	const home = places.find((p) => p.current) ?? places[0];
	let phi = Math.PI - ((home.location[1] * Math.PI) / 180 - Math.PI / 2);
	let theta = 0.25;
	let dragStartX: number | null = null;
	let dragPhi = 0;
	let reduced = false;

	// Cap pixel density and sample count: the globe is decorative.
	const dpr = () => Math.min(window.devicePixelRatio || 1, 1.5);

	const markers = places.map((p) => ({
		location: p.location,
		size: p.current ? 0.09 : 0.05
	}));

	const arcs = places
		.filter((p) => p !== home)
		.map((p) => ({ from: home.location, to: p.location }));

	function measure() {
		if (!wrap) return;
		size = Math.round(wrap.getBoundingClientRect().width);
		globe?.update({ width: size * dpr(), height: size * dpr() });
		if (reduced) globe?.update({ phi: phi + dragPhi, theta });
	}

	function ensureGlobe() {
		if (globe || !canvas || size === 0) return;
		globe = createGlobe(canvas, {
			devicePixelRatio: dpr(),
			width: size * dpr(),
			height: size * dpr(),
			phi,
			theta,
			dark: 1,
			diffuse: 1.2,
			mapSamples: 11000,
			mapBrightness: 6,
			baseColor: [0.082, 0.153, 0.247],
			markerColor: [0.52, 0.8, 1],
			glowColor: [0.082, 0.153, 0.247],
			arcColor: [0.16, 0.62, 1],
			arcWidth: 0.6,
			arcHeight: 0.3,
			markers,
			arcs
		});
	}

	function animate() {
		if (!globe) return;
		if (dragStartX === null && !reduced) phi += 0.004;
		globe.update({ phi: phi + dragPhi, theta });
		rafId = requestAnimationFrame(animate);
	}

	function play() {
		ensureGlobe();
		if (rafId === null && globe) rafId = requestAnimationFrame(animate);
	}

	function pause() {
		if (rafId !== null) {
			cancelAnimationFrame(rafId);
			rafId = null;
		}
	}

	function onpointerdown(e: PointerEvent) {
		dragStartX = e.clientX - dragPhi * 200;
		dragging = true;
		canvas?.setPointerCapture(e.pointerId);
	}

	function onpointermove(e: PointerEvent) {
		if (dragStartX === null) return;
		dragPhi = (e.clientX - dragStartX) / 200;
		if (reduced) globe?.update({ phi: phi + dragPhi, theta });
	}

	function onpointerup() {
		dragStartX = null;
		dragging = false;
	}

	onMount(() => {
		if (!wrap || !canvas) return;
		reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		measure();

		ro = new ResizeObserver(measure);
		ro.observe(wrap);

		// Only build and animate the globe while it is on screen.
		io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? play() : pause()), {
			threshold: 0.05
		});
		io.observe(canvas);
	});

	onDestroy(() => {
		pause();
		io?.disconnect();
		ro?.disconnect();
		globe?.destroy();
	});
</script>

<div bind:this={wrap} class="relative aspect-square w-full {cls}">
	<canvas
		bind:this={canvas}
		class="h-full w-full touch-pan-y {dragging ? 'cursor-grabbing' : 'cursor-grab'}"
		aria-hidden="true"
		{onpointerdown}
		{onpointermove}
		{onpointerup}
		onpointercancel={onpointerup}
	></canvas>
</div>
