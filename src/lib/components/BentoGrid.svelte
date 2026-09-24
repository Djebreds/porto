<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		class: cls = ''
	}: { children: Snippet; class?: string } = $props();
</script>

<div
	class="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:auto-rows-[18rem] md:grid-cols-3 {cls}">
	{@render children()}
</div>
