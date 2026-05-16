<script lang="ts">
	import { browser } from '$app/environment';
	import { Spring, prefersReducedMotion } from 'svelte/motion';

	let canvas = $state.raw<HTMLCanvasElement | null>(null);
	let wrap = $state.raw<HTMLDivElement | null>(null);

	const freqSpring = new Spring(2, { stiffness: 0.15, damping: 0.82 });
	const ampSpring = new Spring(24, { stiffness: 0.12, damping: 0.88 });

	function paint(timeMs: number) {
		const c = canvas;
		const parent = wrap;
		if (!c || !parent) return;
		const ctx = c.getContext('2d');
		if (!ctx) return;

		const dpr = browser ? window.devicePixelRatio || 1 : 1;
		const { width } = parent.getBoundingClientRect();
		const cssH = 160;
		const wCss = Math.max(1, width);
		c.width = Math.max(1, Math.floor(wCss * dpr));
		c.height = Math.max(1, Math.floor(cssH * dpr));
		c.style.width = `${wCss}px`;
		c.style.height = `${cssH}px`;

		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		ctx.fillStyle = '#0a0a0c';
		ctx.fillRect(0, 0, wCss, cssH);

		const reduce = prefersReducedMotion.current;
		const freq = reduce ? 2 : freqSpring.current;
		const amp = reduce ? 22 : ampSpring.current;

		ctx.strokeStyle = 'rgba(122, 184, 255, 0.9)';
		ctx.lineWidth = 2;
		ctx.beginPath();
		const phase = reduce ? 0 : timeMs * 0.002;
		for (let x = 0; x <= wCss; x += 2) {
			const y = cssH / 2 + Math.sin(x * 0.02 * freq + phase) * amp;
			if (x === 0) ctx.moveTo(x, y);
			else ctx.lineTo(x, y);
		}
		ctx.stroke();
	}

	function onMove(e: MouseEvent) {
		if (!browser || prefersReducedMotion.current) return;
		const parent = wrap;
		if (!parent) return;
		const r = parent.getBoundingClientRect();
		const nx = (e.clientX - r.left) / Math.max(1, r.width);
		void freqSpring.set(1.2 + nx * 3);
		void ampSpring.set(14 + nx * 38);
	}

	function onLeave() {
		void freqSpring.set(2);
		void ampSpring.set(24);
	}

	$effect(() => {
		if (!browser || !canvas || !wrap) return;

		let frame = 0;
		function tick(t: number) {
			paint(t);
			frame = requestAnimationFrame(tick);
		}
		frame = requestAnimationFrame(tick);

		return () => cancelAnimationFrame(frame);
	});
</script>

<div
	bind:this={wrap}
	class="not-prose my-8 overflow-hidden rounded-xl border border-white/10 bg-neutral-950/90 shadow-inner shadow-black/30"
	role="presentation"
	onmousemove={onMove}
	onmouseleave={onLeave}
>
	<canvas bind:this={canvas} class="block w-full" aria-hidden="true"></canvas>
	<p class="px-4 pb-3 text-xs text-neutral-500">
		Move the pointer — frequency and amplitude track springs from
		<code class="text-secondary-100">svelte/motion</code> (kube-style embedded graphic).
	</p>
</div>
