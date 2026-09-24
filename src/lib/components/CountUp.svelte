<script lang="ts">
	import { cubicOut } from 'svelte/easing';

	let {
		value,
		duration = 1400,
		class: cls = ''
	}: { value: number; duration?: number; class?: string } = $props();

	let display = $state(0);
	let node = $state<HTMLElement | null>(null);
	let done = false;

	function run() {
		if (done) return;
		done = true;
		if (
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			display = value;
			return;
		}
		const start = performance.now();
		const from = 0;
		function tick(now: number) {
			const t = Math.min(1, (now - start) / duration);
			display = Math.round(from + (value - from) * cubicOut(t));
			if (t < 1) requestAnimationFrame(tick);
		}
		requestAnimationFrame(tick);
	}

	$effect(() => {
		if (!node) return;
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) run();
			},
			{ threshold: 0.4 }
		);
		io.observe(node);
		return () => io.disconnect();
	});
</script>

<span bind:this={node} class={cls}>{display.toLocaleString()}</span>
