<script lang="ts">
	import type { GitHubStats } from '$lib/server/stats';
	import GitCommit from 'lucide-svelte/icons/git-commit-horizontal';
	import GitPullRequest from 'lucide-svelte/icons/git-pull-request';
	import GitMerge from 'lucide-svelte/icons/git-merge';
	import BookOpen from 'lucide-svelte/icons/book-open';
	import Star from 'lucide-svelte/icons/star';
	import CircleDot from 'lucide-svelte/icons/circle-dot';

	let { stats }: { stats: GitHubStats | null } = $props();

	const stargazers = $derived(
		stats?.repositories.nodes
			.filter((r) => r.stargazers.totalCount > 0)
			.reduce((sum, r) => sum + r.stargazers.totalCount, 0) ?? 0
	);

	const currentYear = new Date().getFullYear();

	const items = $derived(stats ? [
		{ icon: BookOpen, label: `${stats.repositories.totalCount} Public Repositories` },
		{ icon: Star, label: `${stargazers} Stars Earned` },
		{ icon: GitCommit, label: `${stats.contributionsCollection.totalCommitContributions} Commits (${currentYear})` },
		{ icon: GitPullRequest, label: `${stats.pullRequests.totalCount} Pull Requests` },
		{ icon: CircleDot, label: `${stats.openIssues.totalCount + stats.closedIssues.totalCount} Issues` },
		{ icon: GitMerge, label: `${stats.repositoriesContributedTo.totalCount} Contributed to` }
	] : []);
</script>

<div class="flex h-full flex-col transition duration-200 group-hover/bento:translate-x-2">
	<div class="mb-6 flex items-start justify-between gap-4">
		<h2 class="text-3xl font-heading font-extrabold uppercase text-white">GitHub Stats</h2>
		<svg viewBox="0 0 24 24" class="h-16 w-16 shrink-0 opacity-20" fill="currentColor" aria-hidden="true">
			<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
		</svg>
	</div>
	{#if !stats}
		<p class="text-sm text-neutral-500">
			Set <code class="rounded bg-white/5 px-1 text-neutral-400">GITHUB_API_KEY</code> to show live stats.
		</p>
	{:else}
		<ul class="space-y-2.5">
			{#each items as item}
				<li class="flex items-center gap-2.5 text-sm text-neutral-300">
					<item.icon class="h-4 w-4 shrink-0 text-secondary-300" aria-hidden="true" />
					{item.label}
				</li>
			{/each}
		</ul>
	{/if}
</div>
