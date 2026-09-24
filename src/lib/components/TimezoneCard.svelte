<script lang="ts">
	import { onMount } from 'svelte';
	import Globe from '$lib/components/Globe.svelte';
	import { places } from '$lib/data/profile';

	const home = places.find((p) => p.current) ?? places[0];

	// Rendered as a placeholder on the server, filled on mount to avoid a hydration mismatch.
	let time = $state('--:--');

	const fmt = new Intl.DateTimeFormat('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
		timeZone: 'Asia/Kuala_Lumpur'
	});

	onMount(() => {
		const tick = () => (time = fmt.format(new Date()));
		tick();
		const id = setInterval(tick, 15_000);
		return () => clearInterval(id);
	});
</script>

<div class="relative flex h-full flex-col md:min-h-[16rem]">
	<div class="relative z-[2] transition duration-200 group-hover/bento:translate-x-2">
		<h3 class="font-heading text-2xl font-extrabold text-white uppercase sm:text-3xl">
			Flexible with timezone communications
		</h3>
		<p class="mt-3 max-w-sm text-sm leading-relaxed text-neutral-400 md:max-w-[22rem]">
			Based in {home.name}. I've shipped with teams in Malaysia, Indonesia, and Saudi Arabia, and
			keep async, written updates flowing across timezones.
		</p>

		<div class="mt-4 flex max-w-sm flex-wrap items-center gap-2 md:max-w-[22rem]">
			<span
				class="rule-soft inline-flex items-center gap-2 rounded-full border bg-white/[0.04] px-3 py-1 text-xs text-neutral-200"
			>
				<span class="relative flex h-1.5 w-1.5">
					<span
						class="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary-300 opacity-75"
					></span>
					<span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-secondary-300"></span>
				</span>
				<span class="font-mono tabular-nums">{time}</span>
				<span class="text-neutral-500">GMT+8</span>
			</span>
			{#each places.filter((p) => !p.current) as place (place.name)}
				<span class="rule-soft rounded-full border px-2.5 py-1 text-[0.6875rem] text-neutral-400">
					{place.name}
				</span>
			{/each}
		</div>
	</div>

	<!-- Phones: the globe sits in flow under the text and is cropped by the card's bottom
	     edge. From md up the card is wide enough to anchor it in the right corner instead. -->
	<div
		class="relative mx-auto mt-4 -mb-[42%] w-full max-w-[26rem] md:absolute md:-right-12 md:-bottom-40 md:mx-0 md:mb-0 md:w-[22rem] md:max-w-none lg:-right-20 lg:-bottom-44 lg:w-[24rem]"
	>
		<Globe />
	</div>
</div>
