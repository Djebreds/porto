<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		class: cls = '',
		containerClass = ''
	}: {
		children: Snippet;
		class?: string;
		containerClass?: string;
	} = $props();

	let mouseX = $state(0);
	let mouseY = $state(0);
	let hovering = $state(false);

	function onmousemove(e: MouseEvent) {
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		mouseX = (e.clientX - (rect.left + rect.width / 2)) / 20;
		mouseY = (e.clientY - (rect.top + rect.height / 2)) / 20;
	}

	function onmouseenter() { hovering = true; }
	function onmouseleave() { hovering = false; mouseX = 0; mouseY = 0; }

	const outerTransform = $derived(
		hovering
			? `translate3d(${mouseX}px,${mouseY}px,0) scale3d(1,1,1)`
			: 'translate3d(0,0,0) scale3d(1,1,1)'
	);

	const innerTransform = $derived(
		hovering
			? `translate3d(${-mouseX}px,${-mouseY}px,0) scale3d(1.03,1.03,1)`
			: 'translate3d(0,0,0) scale3d(1,1,1)'
	);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="relative mx-auto w-full overflow-hidden rounded-2xl bg-indigo-800 {containerClass}"
	style="transform:{outerTransform};transition:transform 0.1s ease-out;"
	{onmousemove}
	{onmouseenter}
	{onmouseleave}
>
	<div
		class="relative h-full overflow-hidden [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))]"
		style="box-shadow:0 10px 32px rgba(34,42,53,0.12),0 1px 1px rgba(0,0,0,0.05),0 0 0 1px rgba(34,42,53,0.05),0 4px 6px rgba(34,42,53,0.08),0 24px 108px rgba(47,48,55,0.10);"
	>
		<div
			class="h-full px-4 py-20 sm:px-10 {cls}"
			style="transform:{innerTransform};transition:transform 0.1s ease-out;"
		>
			<!-- Noise overlay — same as original WobbleCard -->
			<div
				class="pointer-events-none absolute inset-0 scale-[1.2] opacity-10 [mask-image:radial-gradient(#fff,transparent,75%)]"
				style="background-image:url(/noise.webp);background-size:30%;"
				aria-hidden="true"
			></div>
			{@render children()}
		</div>
	</div>
</div>
