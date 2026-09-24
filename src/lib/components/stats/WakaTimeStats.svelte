<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import type { WakaTimeData } from '$lib/server/stats';
	import { format, parseISO } from 'date-fns';

	let { wakaTime }: { wakaTime: WakaTimeData } = $props();

	const hours = Math.round(wakaTime.data.total_seconds / 3600);
	const since = (() => {
		try {
			return format(parseISO(wakaTime.data.range.start), 'MMMM d, yyyy');
		} catch {
			return '—';
		}
	})();

	// Animated counter
	let displayValue = $state(Math.max(0, hours - 40));
	let counterEl = $state<HTMLSpanElement | null>(null);

	// Meteors
	type MeteorStyle = { left: string; delay: string; duration: string };
	let meteors = $state<MeteorStyle[]>([]);

	onMount(() => {
		meteors = Array.from({ length: 20 }, () => ({
			left: `${Math.floor(Math.random() * 1200) - 400}px`,
			delay: `${(Math.random() * 0.6 + 0.2).toFixed(2)}s`,
			duration: `${(Math.random() * 8 + 2).toFixed(2)}s`
		}));

		if (!counterEl) return;
		const observer = new IntersectionObserver(
			(entries) => {
				if (!entries[0].isIntersecting) return;
				observer.disconnect();
				const from = Math.max(0, hours - 40);
				const to = hours;
				const dur = 1200;
				const start = performance.now();
				function tick(now: number) {
					const progress = Math.min((now - start) / dur, 1);
					const eased = 1 - Math.pow(1 - progress, 3);
					displayValue = Math.round(from + (to - from) * eased);
					if (progress < 1) requestAnimationFrame(tick);
				}
				requestAnimationFrame(tick);
			},
			{ threshold: 0.3 }
		);
		observer.observe(counterEl);
		return () => observer.disconnect();
	});
</script>

<div class="relative h-full w-full">
	<!-- Meteors — absolute to the card, behind content -->
	{#if browser && meteors.length > 0}
		<div class="pointer-events-none absolute -inset-10" aria-hidden="true">
			{#each meteors as m}
				<span
					class="meteor"
					style="top:0px;left:{m.left};animation-delay:{m.delay};animation-duration:{m.duration};"
				></span>
			{/each}
		</div>
	{/if}

	<!-- Content -->
	<div class="relative z-[2] flex h-full flex-col items-center justify-center gap-3 text-center">
		<div class="transition duration-200 group-hover/bento:translate-x-2">
			<h2
				class="mb-1 font-heading text-2xl font-extrabold text-white uppercase sm:text-3xl lg:text-4xl"
			>
				WakaTime
			</h2>
		</div>

		<h2 class="my-4 text-center text-6xl font-semibold text-white sm:my-6 sm:text-7xl">
			<span bind:this={counterEl}>{displayValue}</span>
			<span class="ms-2 text-xl">Hrs</span>
		</h2>

		<p class="w-40 text-center text-sm text-neutral-400">
			Coding Time Since {since}
		</p>
	</div>
</div>

<style>
	.meteor {
		position: absolute;
		left: 50%;
		top: 50%;
		z-index: 1;
		height: 0.125rem;
		width: 0.125rem;
		border-radius: 9999px;
		background-color: #64748b;
		box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.063);
		animation: meteor-effect linear infinite;
	}

	.meteor::before {
		content: '';
		position: absolute;
		top: 50%;
		height: 1px;
		width: 50px;
		transform: translateY(-50%);
		background: linear-gradient(to right, #64748b, transparent);
	}

	@keyframes meteor-effect {
		0% {
			transform: rotate(215deg) translateX(0);
			opacity: 1;
		}
		70% {
			opacity: 1;
		}
		100% {
			transform: rotate(215deg) translateX(-500px);
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.meteor {
			animation: none;
		}
	}
</style>
