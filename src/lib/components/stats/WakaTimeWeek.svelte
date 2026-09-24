<script lang="ts">
	import type { WakaTimeWeek } from '$lib/server/stats';

	let { wakaTimeWeek }: { wakaTimeWeek: WakaTimeWeek } = $props();

	function ordinal(n: number): string {
		const s = ['th', 'st', 'nd', 'rd'];
		const v = n % 100;
		return s[(v - 20) % 10] ?? s[v] ?? s[0];
	}

	function toH(secs: number) { return Math.floor(secs / 3600); }
	function toM(secs: number) { return Math.floor((secs % 3600) / 60); }
</script>

<div class="flex h-full flex-col transition duration-200 group-hover/bento:translate-x-2">
	<div class="mb-4">
		<h2 class="text-3xl font-heading font-extrabold uppercase text-white">WakaTime Stats</h2>
		<span class="text-sm text-white/60">Last week</span>
	</div>

	<ul class="grid grid-cols-2 gap-5">
		<li>
			<div class="flex items-baseline font-semibold text-white">
				<span class="text-3xl">{wakaTimeWeek.worldRank ?? '—'}</span>
				{#if wakaTimeWeek.worldRank !== null}
					<span class="text-base">{ordinal(wakaTimeWeek.worldRank)}</span>
				{/if}
			</div>
			<span class="text-sm text-white/60">World Rank</span>
		</li>
		<li>
			<div class="flex items-baseline font-semibold text-white">
				<span class="text-3xl">{wakaTimeWeek.countryRank ?? '—'}</span>
				{#if wakaTimeWeek.countryRank !== null}
					<span class="text-base">{ordinal(wakaTimeWeek.countryRank)}</span>
				{/if}
			</div>
			<span class="text-sm text-white/60">Indonesia Rank</span>
		</li>
		<li>
			<div class="flex items-baseline font-semibold text-white">
				<span class="text-3xl">{toH(wakaTimeWeek.totalSeconds)}</span>
				<span class="text-base">H&nbsp;</span>
				<span class="text-3xl">{toM(wakaTimeWeek.totalSeconds)}</span>
				<span class="text-base">M</span>
			</div>
			<span class="text-sm text-white/60">Coding Time</span>
		</li>
		<li>
			<div class="flex items-baseline font-semibold text-white">
				<span class="text-3xl">{toH(wakaTimeWeek.dailyAverage)}</span>
				<span class="text-base">H&nbsp;</span>
				<span class="text-3xl">{toM(wakaTimeWeek.dailyAverage)}</span>
				<span class="text-base">M</span>
			</div>
			<span class="text-sm text-white/60">Daily Average</span>
		</li>
	</ul>

	{#if wakaTimeWeek.languages.length > 0}
		<ul class="mt-5 space-y-1.5">
			{#each wakaTimeWeek.languages.slice(0, 4) as lang}
				<li class="flex items-center justify-between text-sm">
					<span class="text-neutral-300">{lang.name}</span>
					<span class="text-neutral-500">{lang.total}</span>
				</li>
			{/each}
		</ul>
	{/if}
</div>
