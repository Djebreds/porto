<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { tilt, spotlight } from '$lib/actions/interactions';
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';

	type Project = {
		title: string;
		roles: string[];
		period: string;
		summary: string;
		stack: string[];
		image?: string;
	};

	// Sourced from Refi's CV — real shipped work, newest first.
	const projects: Project[] = [
		{
			title: 'Nukitu',
			roles: ['Fullstack'],
			period: '2025 — 2026',
			summary: 'A Ruby on Rails product built and shipped over an extended engagement.',
			stack: ['Ruby on Rails', 'PostgreSQL']
		},
		{
			title: 'Gravesaint',
			roles: ['Fullstack'],
			period: '2025',
			summary:
				'Online store for a locally branded T-shirt label — local payment gateways, real-time shipping tracking, and a full admin + storefront.',
			stack: ['Ruby on Rails', 'PostgreSQL', 'Stimulus.js']
		},
		{
			title: 'Halalin',
			roles: ['Fullstack'],
			period: '2023 — 2024',
			summary:
				'Halal certification platform with manual approval workflows, an LMS serving 500+ professionals, and a Hotwire back-office (CAP).',
			stack: ['Ruby on Rails', 'Hotwire', 'Stimulus.js', 'PostgreSQL', 'Sidekiq'],
			image: '/projects/halalin.webp'
		},
		{
			title: 'Property Listing',
			roles: ['Fullstack'],
			period: '2023',
			summary:
				'Bali-focused property rental and sale platform with geolocation search filters and Google Maps listings.',
			stack: ['Ruby on Rails', 'Google Maps', 'PostgreSQL'],
			image: '/projects/property.webp'
		},
		{
			title: 'Neqat',
			roles: ['Fullstack', 'Mobile'],
			period: '2023',
			summary:
				'QR + geolocation attendance with geofencing to stop proxy entries, a Flutter companion app, and CSV/Excel exports.',
			stack: ['Ruby on Rails', 'Flutter', 'PostgreSQL']
		},
		{
			title: 'Abapparel Store',
			roles: ['Fullstack'],
			period: '2023',
			summary:
				'Custom-shirt e-commerce on Solidus — size customization, bulk ordering, and one-click guest checkout.',
			stack: ['Ruby on Rails', 'Solidus', 'PostgreSQL']
		},
		{
			title: 'Supirin',
			roles: ['Fullstack', 'Mobile'],
			period: '2022 — 2023',
			summary:
				'Online taxi aggregator: ride-booking and dispatch APIs, Xendit payments, and a Flutter app with fare estimates and driver tracking.',
			stack: ['Ruby on Rails', 'Flutter', 'Xendit', 'Redis'],
			image: '/projects/supirin.webp'
		},
		{
			title: 'Central Acrylic',
			roles: ['Fullstack'],
			period: '2022',
			summary:
				'Industrial machine-monitoring dashboards for CNC, cutting, and welding status, with maintenance and downtime reporting.',
			stack: ['Ruby on Rails', 'PostgreSQL'],
			image: '/projects/central-acrylic.webp'
		},
		{
			title: 'Basic School',
			roles: ['Fullstack'],
			period: '2022',
			summary:
				'Coding bootcamp platform with pre-recorded lessons, downloadable resources, and student/instructor roles.',
			stack: ['Laravel', 'MySQL'],
			image: '/projects/basic-school.webp'
		}
	];

	function monogram(title: string): string {
		return title
			.split(/\s+/)
			.slice(0, 2)
			.map((w) => w[0])
			.join('')
			.toUpperCase();
	}
</script>

<div class="mx-auto grid max-w-5xl grid-cols-1 gap-5 px-4 sm:grid-cols-2 md:px-8">
	{#each projects as project, i (project.title)}
		<div use:reveal={{ direction: 'up', duration: 600, delay: (i % 2) * 90 }}>
			<article
				class="spot group/project surface-card flex h-full flex-col overflow-hidden rounded-2xl transition-[border-color] duration-300 hover:border-[var(--border-strong)]"
				use:tilt={{ max: 6, scale: 1.015 }}
				use:spotlight
			>
				<div class="relative aspect-[16/10] overflow-hidden border-b rule-soft">
					{#if project.image}
						<img
							src={project.image}
							alt="{project.title} screenshot"
							loading="lazy"
							decoding="async"
							class="h-full w-full object-cover object-top transition duration-500 ease-out group-hover/project:scale-[1.04]"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-t from-[var(--surface-bottom)] via-transparent to-transparent opacity-70"
							aria-hidden="true"
						></div>
					{:else}
						<!-- no screenshot: a drawn monogram panel keeps card heights even -->
						<div
							class="bg-dot flex h-full w-full items-center justify-center"
							style="--dot-color: rgba(56,104,167,0.35); background-color: var(--surface-bottom);"
							aria-hidden="true"
						>
							<span
								class="bg-gradient-to-b from-secondary-100/80 to-secondary-400/40 bg-clip-text font-heading text-6xl font-extrabold text-transparent"
							>
								{monogram(project.title)}
							</span>
						</div>
					{/if}
					<span
						class="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[0.6875rem] font-medium text-neutral-300 backdrop-blur"
					>
						{project.period}
					</span>
				</div>

				<div class="relative z-[2] flex flex-1 flex-col p-5 sm:p-6">
					<div class="mb-2 flex flex-wrap items-center gap-1.5">
						{#each project.roles as role}
							<span
								class="rounded-full bg-secondary-500/15 px-2 py-0.5 text-[0.6875rem] font-semibold tracking-wide text-secondary-100 uppercase"
							>
								{role}
							</span>
						{/each}
					</div>

					<h3
						class="flex items-start justify-between gap-2 font-heading text-lg font-extrabold text-white"
					>
						<span class="leading-snug">{project.title}</span>
						<ArrowUpRight
							class="mt-0.5 h-4 w-4 shrink-0 text-neutral-600 transition duration-300 group-hover/project:-translate-y-0.5 group-hover/project:translate-x-0.5 group-hover/project:text-secondary-200"
							aria-hidden="true"
						/>
					</h3>

					<p class="mt-2 text-sm leading-relaxed text-neutral-400">{project.summary}</p>

					<ul class="mt-4 flex flex-wrap gap-1.5 pt-1">
						{#each project.stack as tech}
							<li
								class="rounded-md border rule-soft bg-white/[0.02] px-2 py-0.5 text-[0.6875rem] text-neutral-400"
							>
								{tech}
							</li>
						{/each}
					</ul>
				</div>
			</article>
		</div>
	{/each}
</div>
