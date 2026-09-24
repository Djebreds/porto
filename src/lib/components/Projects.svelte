<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { tilt, spotlight } from '$lib/actions/interactions';
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';
	import { projects } from '$lib/data/profile';

	const featured = projects.filter((p) => p.featured);
	const rest = projects.filter((p) => !p.featured);

	function monogram(title: string): string {
		return title
			.split(/\s+/)
			.slice(0, 2)
			.map((w) => w[0])
			.join('')
			.toUpperCase();
	}

	const deployLog = [
		{ t: '$', text: 'git push cahaves main', tone: 'text-white' },
		{ t: '→', text: 'Building image from Dockerfile', tone: 'text-neutral-400' },
		{ t: '→', text: 'Provisioning PostgreSQL 16', tone: 'text-neutral-400' },
		{ t: '→', text: 'Issuing TLS certificate', tone: 'text-neutral-400' },
		{ t: '✓', text: 'Live at https://app.example.com', tone: 'text-secondary-200' }
	];
</script>

<div class="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:gap-5 md:px-8">
	{#each featured as project (project.title)}
		<div class="sm:col-span-2" use:reveal={{ direction: 'up', duration: 600 }}>
			<article
				class="spot group/project surface-card grid h-full overflow-hidden rounded-2xl transition-[border-color] duration-300 hover:border-[var(--border-strong)] md:grid-cols-[1.1fr_1fr]"
				use:spotlight
			>
				<div class="relative z-[2] flex flex-col p-5 sm:p-7">
					<div class="mb-3 flex flex-wrap items-center gap-1.5">
						<span
							class="rounded-full bg-secondary-300/20 px-2 py-0.5 text-[0.6875rem] font-semibold tracking-wide text-secondary-100 uppercase"
						>
							Featured
						</span>
						{#each project.roles as role (role)}
							<span
								class="rounded-full bg-secondary-500/15 px-2 py-0.5 text-[0.6875rem] font-semibold tracking-wide text-secondary-100 uppercase"
							>
								{role}
							</span>
						{/each}
						<span class="ml-auto text-[0.6875rem] text-neutral-500">{project.period}</span>
					</div>

					<h3 class="font-heading text-2xl font-extrabold text-white sm:text-3xl">
						{project.title}
					</h3>
					<p class="mt-1 text-sm text-secondary-200">{project.subtitle}</p>
					<p class="mt-3 text-sm leading-relaxed text-neutral-400">{project.summary}</p>

					{#if project.highlights}
						<ul
							class="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-neutral-400 marker:text-secondary-400"
						>
							{#each project.highlights as h (h)}
								<li>{h}</li>
							{/each}
						</ul>
					{/if}

					<ul class="mt-5 flex flex-wrap gap-1.5">
						{#each project.stack as tech (tech)}
							<li
								class="rule-soft rounded-md border bg-white/[0.02] px-2 py-0.5 text-[0.6875rem] text-neutral-400"
							>
								{tech}
							</li>
						{/each}
					</ul>

					{#if project.href}
						<a
							href={project.href}
							target="_blank"
							rel="noopener noreferrer"
							class="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white transition hover:border-white/25 hover:bg-white/[0.08]"
						>
							Visit {new URL(project.href).host}
							<ArrowUpRight class="h-4 w-4" aria-hidden="true" />
						</a>
					{/if}
				</div>

				<!-- Deploy log: shows what the product does without needing a screenshot -->
				<div
					class="bg-dot rule-soft relative flex items-center border-t p-5 sm:p-7 md:border-t-0 md:border-l"
					style="--dot-color: rgba(56,104,167,0.3); background-color: var(--surface-bottom);"
					aria-hidden="true"
				>
					<div
						class="w-full overflow-hidden rounded-xl border border-white/10 bg-black/60 shadow-2xl shadow-black/50"
					>
						<div class="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
							<span class="h-2.5 w-2.5 rounded-full bg-white/15"></span>
							<span class="h-2.5 w-2.5 rounded-full bg-white/15"></span>
							<span class="h-2.5 w-2.5 rounded-full bg-white/15"></span>
							<span class="ml-2 truncate font-mono text-[0.6875rem] text-neutral-500"
								>cloud.cahaves.com</span
							>
						</div>
						<ol class="space-y-1.5 p-4 font-mono text-xs leading-relaxed sm:text-[0.8125rem]">
							{#each deployLog as line (line.text)}
								<li class="flex gap-2 {line.tone}">
									<span class="shrink-0 text-neutral-600">{line.t}</span>
									<span class="min-w-0 break-words">{line.text}</span>
								</li>
							{/each}
						</ol>
					</div>
				</div>
			</article>
		</div>
	{/each}

	{#each rest as project, i (project.title)}
		<div use:reveal={{ direction: 'up', duration: 600, delay: (i % 2) * 90 }}>
			<article
				class="spot group/project surface-card flex h-full flex-col overflow-hidden rounded-2xl transition-[border-color] duration-300 hover:border-[var(--border-strong)]"
				use:tilt={{ max: 6, scale: 1.015 }}
				use:spotlight
			>
				<div class="rule-soft relative aspect-[16/10] overflow-hidden border-b">
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
						{#each project.roles as role (role)}
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
							class="mt-0.5 h-4 w-4 shrink-0 text-neutral-600 transition duration-300 group-hover/project:translate-x-0.5 group-hover/project:-translate-y-0.5 group-hover/project:text-secondary-200"
							aria-hidden="true"
						/>
					</h3>
					<p class="text-xs text-secondary-200/80">{project.subtitle}</p>

					<p class="mt-2 text-sm leading-relaxed text-neutral-400">{project.summary}</p>

					<ul class="mt-auto flex flex-wrap gap-1.5 pt-4">
						{#each project.stack as tech (tech)}
							<li
								class="rule-soft rounded-md border bg-white/[0.02] px-2 py-0.5 text-[0.6875rem] text-neutral-400"
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
