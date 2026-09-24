<script lang="ts">
	import type { Snippet } from 'svelte';
	import { spotlight } from '$lib/actions/interactions';

	let {
		children,
		class: cls = '',
		span = 1,
		smSpan
	}: {
		children: Snippet;
		class?: string;
		/** Columns on desktop (3-column grid). */
		span?: 1 | 2 | 3;
		/** Columns on tablet (2-column grid). Defaults to full width for wide cards. */
		smSpan?: 1 | 2;
	} = $props();

	const lgMap: Record<number, string> = { 1: '', 2: 'lg:col-span-2', 3: 'lg:col-span-3' };
	const colSpan = $derived(
		[(smSpan ?? (span > 1 ? 2 : 1)) === 2 ? 'sm:col-span-2' : 'sm:col-span-1', lgMap[span]].join(
			' '
		)
	);
</script>

<div
	use:spotlight
	class="spot group/bento surface-card relative min-w-0 overflow-hidden rounded-2xl p-5 transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[var(--border-strong)] sm:p-6 lg:p-7 {colSpan} {cls}"
>
	{@render children()}
</div>
