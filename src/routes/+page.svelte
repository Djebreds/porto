<script lang="ts">
	import { site } from '$lib/site';
	import { appLink } from '$lib/app-link';
	import Download from 'lucide-svelte/icons/download';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import Mail from 'lucide-svelte/icons/mail';
	import MapPin from 'lucide-svelte/icons/map-pin';
	import GraduationCap from 'lucide-svelte/icons/graduation-cap';
	import TechStack from '$lib/components/TechStack.svelte';
	import TimezoneCard from '$lib/components/TimezoneCard.svelte';
	import BentoGrid from '$lib/components/BentoGrid.svelte';
	import BentoGridItem from '$lib/components/BentoGridItem.svelte';
	import GitHubStats from '$lib/components/stats/GitHubStats.svelte';
	import WakaTimeStats from '$lib/components/stats/WakaTimeStats.svelte';
	import WakaTimeWeek from '$lib/components/stats/WakaTimeWeek.svelte';
	import LeetCodeStats from '$lib/components/stats/LeetCodeStats.svelte';
	import { reveal } from '$lib/actions/reveal';
	import { spotlight } from '$lib/actions/interactions';
	import FloatingPaths from '$lib/components/FloatingPaths.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Certifications from '$lib/components/Certifications.svelte';
	import WordRotator from '$lib/components/WordRotator.svelte';
	import CountUp from '$lib/components/CountUp.svelte';
	import {
		certifications,
		education,
		experience,
		skills,
		spokenLanguages
	} from '$lib/data/profile';

	let { data } = $props();

	const facts = [
		{ value: 4, prefix: '~', suffix: ' yrs', label: 'Backend & full-stack' },
		{ value: experience.length, prefix: '', suffix: '', label: 'Companies, 3 countries' },
		{ value: certifications.length, prefix: '', suffix: '', label: 'Verified certificates' },
		{ value: 500, prefix: '', suffix: '+', label: 'Learners on an LMS I built' }
	];
</script>

<main class="min-h-dvh" aria-label="Portfolio home">
	<!-- ── Hero ──────────────────────────────────────────────────────────────── -->
	<section
		id="home"
		class="relative scroll-mt-28 px-4 pt-28 pb-20 text-center sm:pt-32 md:pb-28"
		aria-labelledby="home-heading"
	>
		<div class="mx-auto max-w-3xl">
			<span
				class="animate-fade-in-long inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300 backdrop-blur"
				style="animation-delay:0ms"
			>
				<span class="relative flex h-1.5 w-1.5">
					<span
						class="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary-300 opacity-75"
					></span>
					<span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-secondary-300"></span>
				</span>
				Open to backend &amp; full-stack work
			</span>

			<h1
				id="home-heading"
				class="animate-fade-in-long mt-6 font-heading text-[2rem] leading-[1.08] font-extrabold text-balance text-white sm:text-5xl md:text-6xl md:leading-[1.05]"
				style="animation-delay:90ms"
			>
				Crafting
				<span
					class="bg-gradient-to-b from-secondary-100 to-secondary-400 bg-clip-text text-transparent"
				>
					robust systems
				</span>
				and ensuring
				<span
					class="bg-gradient-to-b from-secondary-100 to-secondary-400 bg-clip-text text-transparent"
				>
					seamless data flow
				</span>
				as a backend specialist.
			</h1>

			<p
				class="animate-fade-in-long mt-6 text-lg text-neutral-300 sm:text-xl md:text-2xl"
				style="animation-delay:180ms"
			>
				I build
				<WordRotator
					words={[
						'REST APIs',
						'microservices',
						'payment flows',
						'LMS platforms',
						'deploy pipelines'
					]}
					class="font-semibold text-secondary-200"
				/>
			</p>

			<p
				class="animate-fade-in-long mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-400"
				style="animation-delay:260ms"
			>
				Software engineer at Snappymob with nearly four years in backend and full-stack development,
				specializing in Ruby on Rails and NestJS. Founder of
				<a
					href="https://cloud.cahaves.com"
					target="_blank"
					rel="noopener noreferrer"
					class="text-secondary-200 underline decoration-secondary-200/30 underline-offset-4 transition hover:text-white hover:decoration-white/50"
					>Cahaves Cloud</a
				>. Based in Kuala Lumpur, Malaysia.
			</p>

			<div
				class="animate-fade-in-long mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap"
				style="animation-delay:340ms"
			>
				<a
					href={appLink('/#projects')}
					class="btn-shine group inline-flex items-center justify-center gap-2 rounded-full bg-primary-500/70 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-500"
				>
					See my work
					<ArrowRight
						class="h-4 w-4 transition-transform group-hover:translate-x-0.5"
						aria-hidden="true"
					/>
				</a>
				<a
					href={appLink(site.cvPath)}
					download
					class="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-neutral-300 transition hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
				>
					<Download class="h-4 w-4" aria-hidden="true" />
					Download CV
				</a>
			</div>
		</div>

		<dl
			class="animate-fade-in-long rule-soft mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-[var(--border-soft)] sm:grid-cols-4"
			style="animation-delay:420ms"
		>
			{#each facts as fact (fact.label)}
				<div class="bg-neutral-950/80 px-4 py-5 backdrop-blur sm:py-6">
					<dt class="sr-only">{fact.label}</dt>
					<dd class="font-heading text-2xl font-extrabold text-white sm:text-3xl">
						{fact.prefix}<CountUp value={fact.value} />{fact.suffix}
					</dd>
					<dd class="mt-1 text-xs text-neutral-500" aria-hidden="true">{fact.label}</dd>
				</div>
			{/each}
		</dl>
	</section>

	<!-- ── About ─────────────────────────────────────────────────────────────── -->
	<section
		id="about"
		class="scroll-mt-28 border-b border-white/5 px-4 py-20 md:px-8 md:py-24"
		aria-labelledby="about-heading"
	>
		<div
			class="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14"
			use:reveal={{ direction: 'right', duration: 600 }}
		>
			<div>
				<p class="eyebrow">About /</p>
				<h2
					id="about-heading"
					class="mt-3 font-heading text-3xl font-extrabold text-white uppercase md:text-4xl"
				>
					About me
				</h2>
				<div class="mt-6 space-y-4 text-base leading-relaxed text-neutral-400">
					<p>
						I'm a software engineer with nearly four years in backend and full-stack development,
						specializing in Ruby on Rails and NestJS. I build scalable applications, design RESTful
						APIs and microservices, and work with cross-functional teams to ship products for
						clients in healthcare, education, fintech, and property.
					</p>
					<p>
						Outside client work I founded PT Cahaves Technology International, where I'm building
						Cahaves Cloud: a platform that builds and deploys apps on git push, with managed
						databases, custom domains, and automatic HTTPS.
					</p>
					<p>
						I'm comfortable across the full delivery stack, from schema design and background jobs
						to CI/CD and the deployed service, and I optimize for clear written communication and a
						predictable cadence across timezones.
					</p>
				</div>
			</div>

			<aside class="space-y-4 lg:pt-12">
				<div class="surface-card rounded-2xl p-5">
					<ul class="space-y-3 text-sm">
						<li class="flex items-start gap-3">
							<MapPin class="mt-0.5 h-4 w-4 shrink-0 text-secondary-300" aria-hidden="true" />
							<span class="text-neutral-300">{site.location}</span>
						</li>
						<li class="flex items-start gap-3">
							<GraduationCap
								class="mt-0.5 h-4 w-4 shrink-0 text-secondary-300"
								aria-hidden="true"
							/>
							<span class="text-neutral-300">
								Computer Science, {education.school}
								<span class="block text-xs text-neutral-500">{education.end}</span>
							</span>
						</li>
					</ul>
				</div>

				<div class="surface-card rounded-2xl p-5">
					<p class="eyebrow">Languages</p>
					<ul class="mt-3 space-y-2.5">
						{#each spokenLanguages as lang (lang.name)}
							<li class="flex items-baseline justify-between gap-3 text-sm">
								<span class="text-white">{lang.name}</span>
								<span class="text-right text-xs text-neutral-500">{lang.level}</span>
							</li>
						{/each}
					</ul>
				</div>
			</aside>
		</div>
	</section>

	<!-- ── Skills ────────────────────────────────────────────────────────────── -->
	<section
		id="skills"
		class="scroll-mt-28 border-b border-white/5 py-20 md:py-24"
		aria-labelledby="skills-heading"
	>
		<div class="mx-auto max-w-5xl px-4 md:px-8" use:reveal={{ direction: 'up', duration: 600 }}>
			<p class="eyebrow">Skills /</p>
			<h2
				id="skills-heading"
				class="mt-3 font-heading text-3xl font-extrabold text-white uppercase md:text-4xl"
			>
				Tech stack
			</h2>
			<p class="mt-4 text-base leading-relaxed text-neutral-400">
				Primary tools and platforms used for day-to-day delivery.
			</p>
		</div>

		<div
			class="mx-auto mt-10 max-w-7xl px-4 md:px-8"
			use:reveal={{ direction: 'up', duration: 700, delay: 100 }}
		>
			<BentoGrid>
				<BentoGridItem>
					<GitHubStats stats={data.github} />
				</BentoGridItem>

				<BentoGridItem span={2}>
					<TimezoneCard />
				</BentoGridItem>

				<BentoGridItem span={2}>
					<FloatingPaths position={1} />
					<FloatingPaths position={-1} />
					<div
						class="relative flex h-full flex-col transition duration-200 group-hover/bento:translate-x-2"
					>
						<h3 class="mb-4 font-heading text-2xl font-extrabold text-white uppercase sm:text-3xl">
							Tech Stack
						</h3>
						<div class="rounded-lg">
							<TechStack />
						</div>
					</div>
				</BentoGridItem>

				<BentoGridItem>
					<WakaTimeStats wakaTime={data.wakaTime} />
				</BentoGridItem>

				<BentoGridItem>
					<WakaTimeWeek wakaTimeWeek={data.wakaTimeWeek} />
				</BentoGridItem>

				<BentoGridItem span={2} smSpan={1}>
					<LeetCodeStats data={data.leetCode} />
				</BentoGridItem>
			</BentoGrid>

			<!-- Full toolbox, grouped the way the CV groups it -->
			<div class="mx-auto mt-5 max-w-5xl" use:reveal={{ direction: 'up', duration: 600 }}>
				<div class="surface-card rounded-2xl p-5 sm:p-7">
					<h3 class="font-heading text-2xl font-extrabold text-white uppercase sm:text-3xl">
						Toolbox
					</h3>
					<dl class="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
						{#each skills as group (group.label)}
							<div>
								<dt class="eyebrow">{group.label}</dt>
								<dd class="mt-2.5 flex flex-wrap gap-1.5">
									{#each group.items as item (item)}
										<span
											class="rule-soft rounded-md border bg-white/[0.03] px-2 py-1 text-xs text-neutral-300"
										>
											{item}
										</span>
									{/each}
								</dd>
							</div>
						{/each}
					</dl>
				</div>
			</div>
		</div>
	</section>

	<!-- ── Projects ─────────────────────────────────────────────────────────── -->
	<section
		id="projects"
		class="scroll-mt-28 border-b border-white/5 py-20 md:py-24"
		aria-labelledby="projects-heading"
	>
		<div class="mx-auto max-w-5xl px-4 md:px-8" use:reveal={{ direction: 'up', duration: 600 }}>
			<p class="eyebrow">Projects /</p>
			<h2
				id="projects-heading"
				class="mt-3 font-heading text-3xl font-extrabold text-white uppercase md:text-4xl"
			>
				Selected work
			</h2>
			<p class="mt-4 max-w-2xl text-base leading-relaxed text-neutral-400">
				Production systems and products I've shipped: backend platforms, full-stack delivery, and a
				few mobile apps.
			</p>
		</div>

		<div class="mt-12">
			<Projects />
		</div>
	</section>

	<!-- ── Experience ────────────────────────────────────────────────────────── -->
	<section
		id="experience"
		class="scroll-mt-28 border-b border-white/5 px-4 py-20 md:px-8 md:py-24"
		aria-labelledby="experience-heading"
	>
		<div class="mx-auto max-w-5xl">
			<div use:reveal={{ direction: 'right', duration: 600 }}>
				<p class="eyebrow">Experience /</p>
				<h2
					id="experience-heading"
					class="mt-3 font-heading text-3xl font-extrabold text-white uppercase md:text-4xl"
				>
					Work history
				</h2>
			</div>

			<ol class="relative mt-10 space-y-8 md:space-y-10">
				<!-- timeline rail: left edge on mobile, between date and content on desktop -->
				<span
					class="absolute top-2 bottom-2 left-[3px] w-px bg-white/10 md:left-[11.5rem]"
					aria-hidden="true"
				></span>
				{#each experience as job, i (job.company + job.start)}
					<li
						class="relative grid gap-1 pl-7 md:grid-cols-[10rem_1fr] md:gap-12 md:pl-0"
						use:reveal={{ direction: 'up', duration: 500, delay: Math.min(i, 3) * 60 }}
					>
						<span
							class="absolute top-1.5 left-0 h-[7px] w-[7px] rounded-full ring-4 ring-neutral-950 md:left-[calc(11.5rem-3px)] {job.end ===
							'Present'
								? 'bg-secondary-200'
								: 'bg-secondary-400'}"
							aria-hidden="true"
						></span>
						<p class="text-xs text-neutral-500 md:pt-1 md:text-right">
							{job.start} to {job.end}
							<span class="hidden md:mt-0.5 md:block">{job.location}</span>
						</p>
						<div class="surface-card rounded-2xl p-5 sm:p-6">
							<div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
								<h3 class="font-heading text-lg font-bold text-white">{job.role}</h3>
								{#if job.end === 'Present'}
									<span
										class="rounded-full bg-secondary-300/20 px-2 py-0.5 text-[0.6875rem] font-semibold tracking-wide text-secondary-100 uppercase"
										>Current</span
									>
								{/if}
							</div>
							<p class="mt-0.5 text-sm text-secondary-200">{job.company}</p>
							<p class="text-xs text-neutral-500 md:hidden">{job.location}</p>
							<ul
								class="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-neutral-400 marker:text-secondary-400"
							>
								{#each job.highlights as h (h)}
									<li>{h}</li>
								{/each}
							</ul>
						</div>
					</li>
				{/each}
			</ol>
		</div>
	</section>

	<!-- ── Education ─────────────────────────────────────────────────────────── -->
	<section
		id="education"
		class="scroll-mt-28 border-b border-white/5 px-4 py-20 md:px-8 md:py-24"
		aria-labelledby="education-heading"
	>
		<div class="mx-auto max-w-5xl" use:reveal={{ direction: 'up', duration: 600 }}>
			<p class="eyebrow">Education /</p>
			<h2
				id="education-heading"
				class="mt-3 font-heading text-3xl font-extrabold text-white uppercase md:text-4xl"
			>
				Education
			</h2>

			<div class="surface-card mt-8 rounded-2xl p-5 sm:p-7">
				<div class="flex flex-col gap-4 sm:flex-row sm:items-start">
					<span
						class="rule-soft flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-secondary-500/10 text-secondary-100"
						aria-hidden="true"
					>
						<GraduationCap class="h-6 w-6" />
					</span>
					<div class="min-w-0 flex-1">
						<div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
							<h3 class="font-heading text-lg font-bold text-white">{education.degree}</h3>
							<span class="text-xs text-neutral-500">{education.start} to {education.end}</span>
						</div>
						<p class="mt-1 text-sm text-secondary-200">
							{education.school} · {education.program}
						</p>
						<ul
							class="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-400 marker:text-secondary-400"
						>
							{#each education.highlights as h (h)}
								<li>{h}</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ── Certifications ────────────────────────────────────────────────────── -->
	<section
		id="certifications"
		class="scroll-mt-28 border-b border-white/5 px-4 py-20 md:px-8 md:py-24"
		aria-labelledby="certifications-heading"
	>
		<div class="mx-auto max-w-5xl">
			<div use:reveal={{ direction: 'up', duration: 600 }}>
				<p class="eyebrow">Certifications /</p>
				<h2
					id="certifications-heading"
					class="mt-3 font-heading text-3xl font-extrabold text-white uppercase md:text-4xl"
				>
					Certifications
				</h2>
				<p class="mt-4 max-w-2xl text-base leading-relaxed text-neutral-400">
					{certifications.length} verified credentials across AI tooling, software engineering, databases,
					and cloud. Every card links to its public verification page.
				</p>
			</div>

			<div class="mt-8">
				<Certifications />
			</div>
		</div>
	</section>

	<!-- ── Contact ───────────────────────────────────────────────────────────── -->
	<section
		id="contact"
		class="relative scroll-mt-28 overflow-hidden px-4 py-24 md:py-32"
		aria-labelledby="contact-heading"
	>
		<div
			class="bg-dot pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_55%_55%_at_50%_50%,#000,transparent_72%)] [-webkit-mask-image:radial-gradient(ellipse_55%_55%_at_50%_50%,#000,transparent_72%)]"
			style="--dot-color: rgba(56,104,167,0.45);"
			aria-hidden="true"
		></div>

		<div
			class="relative mx-auto max-w-2xl text-center"
			use:reveal={{ direction: 'up', duration: 600 }}
		>
			<p class="eyebrow">Contact /</p>
			<h2
				id="contact-heading"
				class="mt-4 font-heading text-4xl font-extrabold uppercase md:text-6xl"
			>
				<span
					class="bg-gradient-to-b from-secondary-100 to-secondary-400 bg-clip-text text-transparent"
				>
					Get in touch.
				</span>
			</h2>
			<p class="mx-auto mt-5 max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg">
				Have a project in mind or want to collaborate? I'm open to new opportunities and good
				conversations.
			</p>

			<div class="mt-10 grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
				<a
					href={site.linkedin}
					target="_blank"
					rel="noopener noreferrer"
					use:spotlight
					class="spot surface-card group flex flex-row items-center gap-3 rounded-2xl px-4 py-4 text-left transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[var(--border-strong)] min-[420px]:flex-col min-[420px]:gap-2 min-[420px]:py-5 min-[420px]:text-center"
				>
					<span
						class="rule-soft flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-secondary-500/10 text-secondary-100 transition group-hover:bg-secondary-500/20 group-hover:text-white"
					>
						<svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor" aria-hidden="true">
							<path
								d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"
							/>
						</svg>
					</span>
					<span class="min-w-0">
						<span class="block text-sm font-medium text-white">LinkedIn</span>
						<span class="block max-w-full truncate text-xs text-neutral-500">in/refifauzan</span>
					</span>
				</a>

				<a
					href={site.email}
					use:spotlight
					class="spot surface-card group flex flex-row items-center gap-3 rounded-2xl px-4 py-4 text-left transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[var(--border-strong)] min-[420px]:flex-col min-[420px]:gap-2 min-[420px]:py-5 min-[420px]:text-center"
				>
					<span
						class="rule-soft flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-secondary-500/10 text-secondary-100 transition group-hover:bg-secondary-500/20 group-hover:text-white"
					>
						<Mail class="h-5 w-5" aria-hidden="true" />
					</span>
					<span class="min-w-0">
						<span class="block text-sm font-medium text-white">Email</span>
						<span class="block max-w-full truncate text-xs text-neutral-500">refi.ahmad.fauzan</span
						>
					</span>
				</a>

				<a
					href={site.github}
					target="_blank"
					rel="noopener noreferrer"
					use:spotlight
					class="spot surface-card group flex flex-row items-center gap-3 rounded-2xl px-4 py-4 text-left transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[var(--border-strong)] min-[420px]:flex-col min-[420px]:gap-2 min-[420px]:py-5 min-[420px]:text-center"
				>
					<span
						class="rule-soft flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-secondary-500/10 text-secondary-100 transition group-hover:bg-secondary-500/20 group-hover:text-white"
					>
						<svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor" aria-hidden="true">
							<path
								d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
							/>
						</svg>
					</span>
					<span class="min-w-0">
						<span class="block text-sm font-medium text-white">GitHub</span>
						<span class="block max-w-full truncate text-xs text-neutral-500">@djebreds</span>
					</span>
				</a>
			</div>

			<!-- Gradient-bordered CV button: the closer's call to action -->
			<a
				href={appLink(site.cvPath)}
				download
				class="group mt-3 block rounded-full bg-gradient-to-r from-secondary-200 via-primary-400 to-primary-600 p-px transition-transform duration-300 hover:scale-[1.01]"
			>
				<span
					class="btn-shine flex w-full items-center justify-center gap-2.5 rounded-full bg-neutral-950/90 px-6 py-3.5 text-sm font-medium text-white"
				>
					<Download
						class="h-4 w-4 transition-transform group-hover:translate-y-0.5"
						aria-hidden="true"
					/>
					Download my CV
				</span>
			</a>
		</div>
	</section>
</main>
