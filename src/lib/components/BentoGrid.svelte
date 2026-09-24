<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, class: cls = '' }: { children: Snippet; class?: string } = $props();
</script>

<!-- 1 column on phones, 2 on tablets, 3 on desktop. Rows grow with their content
     (no fixed height), and dense flow backfills gaps left by wide cards. -->
<div
	class="mx-auto grid max-w-5xl grid-flow-row-dense grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:auto-rows-[minmax(18rem,auto)] lg:grid-cols-3 {cls}"
>
	{@render children()}
</div>
