<script lang="ts">
	import { onMount } from 'svelte';

	let {
		words,
		interval = 2200,
		class: cls = ''
	}: { words: string[]; interval?: number; class?: string } = $props();

	let i = $state(0);

	// Reserve width for the longest word so the line doesn't reflow on change.
	const widest = $derived(words.reduce((a, b) => (b.length > a.length ? b : a), ''));

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const id = setInterval(() => {
			i = (i + 1) % words.length;
		}, interval);
		return () => clearInterval(id);
	});
</script>

<span class="rotor" aria-live="polite">
	<span class="rotor-ghost {cls}">{widest}</span>
	{#key i}
		<span class="rotor-word {cls}">{words[i]}</span>
	{/key}
</span>

<style>
	.rotor {
		position: relative;
		display: inline-grid;
		vertical-align: bottom;
		overflow: hidden;
	}
	.rotor-ghost {
		visibility: hidden;
		white-space: nowrap;
	}
	.rotor-word {
		position: absolute;
		inset: 0;
		text-align: left;
		white-space: nowrap;
		animation: rotor-in 520ms cubic-bezier(0.22, 1, 0.36, 1);
	}
	@keyframes rotor-in {
		0% {
			opacity: 0;
			transform: translateY(0.7em);
			filter: blur(6px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
			filter: blur(0);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.rotor-word {
			animation: none;
		}
	}
</style>
