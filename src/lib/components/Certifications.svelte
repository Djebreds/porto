<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { spotlight } from '$lib/actions/interactions';
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';
	import BadgeCheck from 'lucide-svelte/icons/badge-check';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import { certifications, issuers, type Issuer } from '$lib/data/profile';

	type Filter = 'All' | Issuer;

	let filter = $state<Filter>('All');
	let expanded = $state(false);

	// Collapsed view keeps the section short on phones; issuer tabs always show everything.
	const COLLAPSED = 6;

	const tabs: { key: Filter; count: number }[] = [
		{ key: 'All', count: certifications.length },
		...issuers.map((key) => ({
			key,
			count: certifications.filter((c) => c.issuer === key).length
		}))
	];

	const matching = $derived(
		filter === 'All' ? certifications : certifications.filter((c) => c.issuer === filter)
	);
	const collapsible = $derived(matching.length > COLLAPSED);
	const visible = $derived(collapsible && !expanded ? matching.slice(0, COLLAPSED) : matching);

	// Each issuer gets a tint from the brand blues so the grid scans by source at a glance.
	const tint: Record<Issuer, string> = {
		Anthropic: 'from-secondary-100/25 to-secondary-300/10 text-secondary-100',
		HackerRank: 'from-secondary-300/30 to-secondary-500/10 text-secondary-200',
		'Dicoding Academy': 'from-primary-100/40 to-primary-300/10 text-secondary-100',
		Udemy: 'from-white/15 to-white/[0.03] text-neutral-200'
	};

	const initials: Record<Issuer, string> = {
		Anthropic: 'A',
		HackerRank: 'HR',
		'Dicoding Academy': 'D',
		Udemy: 'U'
	};

	function host(url: string) {
		return new URL(url).host.replace(/^www\./, '');
	}
</script>

<div
	class="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0"
	role="group"
	aria-label="Filter by issuer"
>
	<div class="flex w-max gap-2">
		{#each tabs as tab (tab.key)}
			<button
				type="button"
				aria-pressed={filter === tab.key}
				onclick={() => (filter = tab.key)}
				class="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm whitespace-nowrap transition {filter ===
				tab.key
					? 'border-secondary-300/60 bg-secondary-500/25 text-white'
					: 'rule-soft bg-white/[0.03] text-neutral-400 hover:border-white/20 hover:text-white'}"
			>
				{tab.key}
				<span
					class="rounded-full px-1.5 text-[0.6875rem] tabular-nums {filter === tab.key
						? 'bg-white/15 text-white'
						: 'bg-white/5 text-neutral-500'}">{tab.count}</span
				>
			</button>
		{/each}
	</div>
</div>

<ul class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
	{#each visible as cert, i (cert.url + cert.name)}
		<li use:reveal={{ direction: 'up', duration: 450, delay: (i % 3) * 60 }}>
			<a
				href={cert.url}
				target="_blank"
				rel="noopener noreferrer"
				use:spotlight
				class="spot surface-card group flex h-full items-start gap-3 rounded-xl p-4 transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[var(--border-strong)]"
				aria-label="{cert.name}, {cert.issuer}, {cert.date}. Verify on {host(cert.url)}"
			>
				<span
					class="rule-soft flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-gradient-to-br font-heading text-sm font-extrabold {tint[
						cert.issuer
					]}"
					aria-hidden="true"
				>
					{initials[cert.issuer]}
				</span>
				<span class="min-w-0 flex-1">
					<span class="block text-sm leading-snug font-medium text-white">{cert.name}</span>
					<span class="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-neutral-500">
						<span>{cert.issuer}</span>
						<span aria-hidden="true">·</span>
						<span>{cert.date}</span>
					</span>
					<span
						class="mt-2 inline-flex items-center gap-1 text-[0.6875rem] text-secondary-200/70 transition group-hover:text-secondary-100"
					>
						<BadgeCheck class="h-3.5 w-3.5" aria-hidden="true" />
						Verify on {host(cert.url)}
					</span>
				</span>
				<ArrowUpRight
					class="h-4 w-4 shrink-0 text-neutral-600 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-secondary-200"
					aria-hidden="true"
				/>
			</a>
		</li>
	{/each}
</ul>

{#if collapsible}
	<div class="mt-6 flex justify-center">
		<button
			type="button"
			onclick={() => (expanded = !expanded)}
			aria-expanded={expanded}
			class="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-neutral-300 transition hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
		>
			{expanded ? 'Show fewer' : `Show all ${matching.length}`}
			<ChevronDown
				class="h-4 w-4 transition-transform {expanded ? 'rotate-180' : ''}"
				aria-hidden="true"
			/>
		</button>
	</div>
{/if}
