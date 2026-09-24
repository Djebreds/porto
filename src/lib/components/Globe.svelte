<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import createGlobe from 'cobe';

	let canvas = $state<HTMLCanvasElement | null>(null);
	let rafId: number | null = null;
	let globe: { destroy: () => void; update: (s: { phi: number }) => void } | null = null;
	let io: IntersectionObserver | null = null;
	let phi = 0;

	// Cap pixel density and sample count — the globe is decorative, so full retina
	// resolution and 16k map samples are wasted work. Roughly halves per-frame cost.
	const SIZE = 600;
	const dpr = browser ? Math.min(window.devicePixelRatio || 1, 1.5) : 1;

	function ensureGlobe() {
		if (globe || !canvas) return;
		globe = createGlobe(canvas, {
			devicePixelRatio: dpr,
			width: SIZE * dpr,
			height: SIZE * dpr,
			phi: 0,
			theta: 0,
			dark: 1,
			diffuse: 1.2,
			mapSamples: 11000,
			mapBrightness: 6,
			baseColor: [0.082, 0.153, 0.247],
			markerColor: [0.1, 0.8, 1],
			glowColor: [0.082, 0.153, 0.247],
			markers: []
		});
	}

	function animate() {
		if (!globe) return;
		phi += 0.005;
		globe.update({ phi });
		rafId = requestAnimationFrame(animate);
	}

	function play() {
		ensureGlobe();
		if (rafId === null) rafId = requestAnimationFrame(animate);
	}

	function pause() {
		if (rafId !== null) {
			cancelAnimationFrame(rafId);
			rafId = null;
		}
	}

	onMount(() => {
		if (!canvas) return;
		// Only build + animate the globe while it's actually on screen.
		io = new IntersectionObserver(
			([entry]) => (entry.isIntersecting ? play() : pause()),
			{ threshold: 0.05 }
		);
		io.observe(canvas);
	});

	onDestroy(() => {
		if (browser) pause();
		io?.disconnect();
		globe?.destroy();
	});
</script>

<canvas
	bind:this={canvas}
	style="width:{SIZE}px;height:{SIZE}px;flex-shrink:0;"
	width={SIZE * dpr}
	height={SIZE * dpr}
	aria-hidden="true"
></canvas>
