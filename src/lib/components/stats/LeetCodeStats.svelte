<script lang="ts">
	import type { LeetCodeStats } from '$lib/server/stats';

	let { data }: { data: LeetCodeStats | null } = $props();

	const user = $derived(data?.matchedUser ?? null);

	const allProblems = $derived(data?.allQuestionsCount.filter((v) => v.difficulty !== 'All') ?? []);

	const solved = $derived(
		user?.submitStatsGlobal.acSubmissionNum.filter((v) => v.difficulty !== 'All') ?? []
	);

	const beats = $derived(
		user?.problemsSolvedBeatsStats.filter((v) => v.difficulty !== 'All') ?? []
	);

	const progress = $derived(
		solved.map((s, i) => ({
			difficulty: s.difficulty,
			count: s.count,
			total: allProblems[i]?.count ?? 0,
			pct: allProblems[i]?.count ? (s.count / allProblems[i].count) * 100 : 0,
			beatsPct: beats[i]?.percentage ?? null,
			bg:
				s.difficulty === 'Easy'
					? 'bg-teal-900'
					: s.difficulty === 'Medium'
						? 'bg-yellow-900'
						: 'bg-rose-900',
			fg:
				s.difficulty === 'Easy'
					? 'bg-teal-500'
					: s.difficulty === 'Medium'
						? 'bg-yellow-500'
						: 'bg-rose-500'
		}))
	);

	const totalSolved = $derived(
		user?.submitStatsGlobal.acSubmissionNum.find((v) => v.difficulty === 'All')?.count ?? 0
	);

	const submissions = $derived(() => {
		try {
			const cal = JSON.parse(user?.userCalendar?.submissionCalendar ?? '{}') as Record<
				string,
				number
			>;
			return Object.values(cal).reduce((a, b) => a + b, 0);
		} catch {
			return 0;
		}
	});

	const currentYear = new Date().getFullYear();
</script>

<div class="flex h-full flex-col gap-4 transition duration-200 group-hover/bento:translate-x-2">
	<div class="flex items-start justify-between">
		<div>
			<h2 class="font-heading text-2xl font-extrabold text-white uppercase sm:text-3xl">
				LeetCode
			</h2>
			{#if user}
				<div class="mt-1 flex gap-1 text-sm">
					<span class="text-white/60">Rank</span>
					<span class="font-semibold text-white">{user.profile.ranking.toLocaleString()}</span>
				</div>
			{/if}
		</div>
		{#if user}
			<span class="text-lg font-semibold text-white/60">{user.username}</span>
		{/if}
	</div>

	{#if !data || !user}
		<p class="text-sm text-neutral-500">
			Set <code class="rounded bg-white/5 px-1 text-neutral-400">LEETCODE_USERNAME</code> to show live
			stats.
		</p>
	{:else}
		<div class="flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm">
			<div>
				<span class="font-semibold text-white">{submissions()}</span>
				<span class="text-white/60"> Submissions ({currentYear})</span>
			</div>
			<div>
				<span class="font-semibold text-white">{totalSolved}</span>
				<span class="text-white/60"> Solved</span>
			</div>
		</div>

		<div class="space-y-3">
			{#each progress as p}
				<div>
					<div class="mb-1 flex items-baseline gap-2 text-sm">
						<span class="w-14 text-white/60">{p.difficulty}</span>
						<span class="font-semibold text-white">{p.count}</span>
						<span class="text-white/40">/ {p.total}</span>
						{#if p.beatsPct !== null}
							<span class="ml-auto text-white/40">Beats {p.beatsPct.toFixed(1)}%</span>
						{/if}
					</div>
					<div class="h-2 w-full overflow-hidden rounded-full {p.bg}">
						<div
							class="h-full rounded-full {p.fg} transition-all duration-700"
							style="width:{p.pct}%"
						></div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
