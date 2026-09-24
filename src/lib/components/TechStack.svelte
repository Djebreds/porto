<script lang="ts">
	type Item = { name: string };

	const frameworks: Item[] = [
		{ name: 'Ruby on Rails' },
		{ name: 'NestJS' },
		{ name: 'Express.js' },
		{ name: 'Next.js' },
		{ name: 'SvelteKit' },
		{ name: 'Laravel' },
	];

	const databases: Item[] = [
		{ name: 'PostgreSQL' },
		{ name: 'MySQL' },
		{ name: 'Redis' },
		{ name: 'MongoDB' },
		{ name: 'TypeORM' },
		{ name: 'Prisma' },
	];

	const infrastructures: Item[] = [
		{ name: 'Docker' },
		{ name: 'Nginx' },
		{ name: 'Kubernetes' },
		{ name: 'Git' },
		{ name: 'GitHub' },
		{ name: 'GitLab' },
		{ name: 'DigitalOcean' },
		{ name: 'AWS' },
		{ name: 'GCP' },
		{ name: 'RabbitMQ' },
		{ name: 'BullMQ' },
		{ name: 'Sidekiq' },
	];

	const languages: Item[] = [
		{ name: 'Ruby' },
		{ name: 'TypeScript' },
		{ name: 'JavaScript' },
		{ name: 'PHP' },
		{ name: 'TailwindCSS' },
		{ name: 'SCSS' },
	];

	// Triple items so the loop is seamless regardless of container width
	function tripled(items: Item[]): Item[] {
		return [...items, ...items, ...items];
	}
</script>

<div class="w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
	<div class="marquee-row mb-3" style="--dir: forwards;">
		{#each tripled(frameworks) as item}
			<span class="marquee-chip">{item.name}</span>
		{/each}
	</div>
	<div class="marquee-row mb-3" style="--dir: reverse;">
		{#each tripled(databases) as item}
			<span class="marquee-chip">{item.name}</span>
		{/each}
	</div>
	<div class="marquee-row mb-3" style="--dir: forwards;">
		{#each tripled(infrastructures) as item}
			<span class="marquee-chip">{item.name}</span>
		{/each}
	</div>
	<div class="marquee-row" style="--dir: reverse;">
		{#each tripled(languages) as item}
			<span class="marquee-chip">{item.name}</span>
		{/each}
	</div>
</div>

<style>
	.marquee-row {
		display: flex;
		width: max-content;
		flex-wrap: nowrap;
		gap: 0.5rem;
		animation: marquee-scroll 30s linear infinite;
		animation-direction: var(--dir, forwards);
	}

	@media (prefers-reduced-motion: reduce) {
		.marquee-row { animation: none; }
	}

	.marquee-chip {
		display: inline-flex;
		align-items: center;
		white-space: nowrap;
		border-radius: 9999px;
		border: 1px solid rgba(125, 170, 225, 0.16);
		background: rgba(20, 35, 60, 0.45);
		-webkit-backdrop-filter: blur(16px);
		backdrop-filter: blur(16px);
		box-shadow: inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 3px rgba(0,0,0,0.4);
		padding: 0.375rem 0.875rem;
		font-size: 0.8125rem;
		color: rgb(197 210 228);
		transition: border-color 0.2s, background 0.2s, color 0.2s;
	}

	.marquee-chip:hover {
		border-color: rgba(140, 185, 235, 0.4);
		background: rgba(34, 63, 102, 0.6);
		color: #fff;
	}

	@keyframes marquee-scroll {
		from { transform: translateX(0); }
		to   { transform: translateX(-33.333%); }
	}
</style>
