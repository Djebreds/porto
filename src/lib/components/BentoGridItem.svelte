<script lang="ts">
	import type { Snippet } from 'svelte';
	import { spotlight } from '$lib/actions/interactions';

	let {
		children,
		class: cls = '',
		span = 1
	}: { children: Snippet; class?: string; span?: 1 | 2 | 3 } = $props();

	const colSpanMap: Record<number, string> = { 1: '', 2: 'md:col-span-2', 3: 'md:col-span-3' };
	const colSpan = $derived(colSpanMap[span] ?? '');
</script>

<div
	use:spotlight
	class="spot group/bento surface-card relative row-span-1 justify-between space-y-4 overflow-hidden rounded-2xl p-6 transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[var(--border-strong)] sm:p-7 {colSpan} {cls}"
>
	{@render children()}
</div>
