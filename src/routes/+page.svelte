<script lang="ts">
	import { site } from '$lib/site';
	import { appLink } from '$lib/app-link';
	import Download from 'lucide-svelte/icons/download';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
	import Mail from 'lucide-svelte/icons/mail';
	import TechStack from '$lib/components/TechStack.svelte';
	import Globe from '$lib/components/Globe.svelte';
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
	import WordRotator from '$lib/components/WordRotator.svelte';

	let { data } = $props();
</script>

<main class="min-h-dvh" aria-label="Portfolio home">

	<!-- ── Hero ──────────────────────────────────────────────────────────────── -->
	<section
		id="home"
		class="relative scroll-mt-28 px-4 pt-32 pb-24 text-center md:pb-28"
		aria-labelledby="home-heading"
	>
		<div class="mx-auto max-w-3xl">
			<span
				class="animate-fade-in-long inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300 backdrop-blur"
				style="animation-delay:0ms"
			>
				<span class="relative flex h-1.5 w-1.5">
					<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary-300 opacity-75"></span>
					<span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-secondary-300"></span>
				</span>
				Open to backend &amp; full-stack work
			</span>

			<h1
				id="home-heading"
				class="animate-fade-in-long mt-6 font-heading text-4xl font-extrabold leading-[1.05] text-balance text-white md:text-6xl"
				style="animation-delay:90ms"
			>
				Crafting
				<span class="bg-gradient-to-b from-secondary-100 to-secondary-400 bg-clip-text text-transparent">
					robust systems
				</span>
				and ensuring
				<span class="bg-gradient-to-b from-secondary-100 to-secondary-400 bg-clip-text text-transparent">
					seamless data flow
				</span>
				as a backend specialist.
			</h1>

			<p
				class="animate-fade-in-long mt-6 text-xl text-neutral-300 md:text-2xl"
				style="animation-delay:180ms"
			>
				I build
				<WordRotator
					words={['REST APIs', 'payment flows', 'LMS platforms', 'background jobs', 'scalable backends']}
					class="font-semibold text-secondary-200"
				/>.
			</p>

			<p
				class="animate-fade-in-long mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-400"
				style="animation-delay:260ms"
			>
				Software engineer with nearly four years in backend and full-stack development — specializing
				in Ruby on Rails and Nest.js, with frontend work in React, Vue, and Next.js. Currently based
				in Kuala Lumpur, Malaysia.
			</p>

			<div
				class="animate-fade-in-long mt-9 flex flex-wrap justify-center gap-3"
				style="animation-delay:340ms"
			>
				<a
					href={appLink('/#skills')}
					class="btn-shine inline-flex items-center gap-2 rounded-full bg-primary-500/70 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-500"
				>
					View my skills
					<ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
				</a>
				<a
					href={appLink(site.cvPath)}
					download
					class="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-neutral-300 transition hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
				>
					<Download class="h-4 w-4" aria-hidden="true" />
					Download CV
				</a>
			</div>
		</div>
	</section>

	<!-- ── About ─────────────────────────────────────────────────────────────── -->
	<section
		id="about"
		class="scroll-mt-28 border-b border-white/5 px-4 py-20 md:px-8 md:py-24"
		aria-labelledby="about-heading"
	>
		<div class="mx-auto max-w-3xl" use:reveal={{ direction: 'right', duration: 600 }}>
			<p class="eyebrow">About /</p>
			<h2 id="about-heading" class="mt-3 font-heading text-3xl font-extrabold uppercase text-white md:text-4xl">
				About me
			</h2>
			<div class="mt-6 space-y-4 text-base leading-relaxed text-neutral-400">
				<p>
					Software engineer with nearly four years in backend and full-stack development,
					specializing in Ruby on Rails and Nest.js. I build scalable applications, design clean REST
					APIs, and work with cross-functional teams to ship user-centric products.
				</p>
				<p>
					Studying Computer Science at Cakrawala University, with a foundation in algorithms, system
					design, and databases. I'm comfortable across the full delivery stack — from schema and
					background jobs to deployed service.
				</p>
				<p>
					Based in Kuala Lumpur, Malaysia, working across timezones. I optimize for clear written
					communication and a predictable cadence.
				</p>
			</div>
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
			<h2 id="skills-heading" class="mt-3 font-heading text-3xl font-extrabold uppercase text-white md:text-4xl">
				Tech stack
			</h2>
			<p class="mt-4 text-base leading-relaxed text-neutral-400">
				Primary tools and platforms used for day-to-day delivery.
			</p>
		</div>

		<div class="mx-auto mt-10 max-w-7xl px-4 md:px-8" use:reveal={{ direction: 'up', duration: 700, delay: 100 }}>
			<BentoGrid>
				<BentoGridItem>
					<GitHubStats stats={data.github} />
				</BentoGridItem>

				<BentoGridItem span={2}>
					<div class="transition duration-200 group-hover/bento:translate-x-2">
						<h3 class="font-heading text-3xl font-extrabold uppercase text-white">
							Flexible with timezone communications
						</h3>
						<div class="h-full w-full">
							<div class="relative mt-10 flex h-60 flex-col items-center bg-transparent">
								<div class="absolute -bottom-72 -right-10">
									<Globe />
								</div>
							</div>
						</div>
					</div>
				</BentoGridItem>

				<BentoGridItem span={2}>
					<FloatingPaths position={1} />
					<FloatingPaths position={-1} />
					<div class="relative flex h-full flex-col transition duration-200 group-hover/bento:translate-x-2">
						<h3 class="mb-4 font-heading text-2xl font-extrabold uppercase text-white">Tech Stack</h3>
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

				<BentoGridItem span={2}>
					<LeetCodeStats data={data.leetCode} />
				</BentoGridItem>
			</BentoGrid>
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
				class="mt-3 font-heading text-3xl font-extrabold uppercase text-white md:text-4xl"
			>
				Selected work
			</h2>
			<p class="mt-4 max-w-2xl text-base leading-relaxed text-neutral-400">
				Production systems and products I've shipped — backend platforms, full-stack delivery, and a
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
		<div class="mx-auto max-w-3xl" use:reveal={{ direction: 'right', duration: 600 }}>
			<p class="eyebrow">Experience /</p>
			<h2 id="experience-heading" class="mt-3 font-heading text-3xl font-extrabold uppercase text-white md:text-4xl">
				Work history
			</h2>

			<ol class="mt-10 space-y-10 border-l border-white/10 pl-6">
				{#each [
					{
						role: 'Software Engineer',
						company: 'Snappymob',
						location: 'Kuala Lumpur, Malaysia',
						period: '2025 — Present',
						desc: 'Custom software for clients across industries — backend development, planning, and architecture of scalable, maintainable systems.'
					},
					{
						role: 'Software Engineer',
						company: 'Aajil',
						location: 'Riyadh, Saudi Arabia',
						period: '2025',
						desc: 'Built a scalable BNPL web app in Django with n8n and Zoho Books automation and AI-assisted quotation features; CI/CD and tuning improved performance by 20%.'
					},
					{
						role: 'Backend Developer',
						company: 'Kiranatama Teknologi (Emveep)',
						location: 'Bandung, Indonesia',
						period: '2023 — 2025',
						desc: 'Built scalable backend systems and microservices; cut API response times 30% with caching, hardened security, and streamlined CI/CD deployments.'
					},
					{
						role: 'Full-stack Engineer',
						company: 'Halalin Digital International',
						location: 'Jakarta, Indonesia',
						period: '2023 — 2024',
						desc: 'Designed SSO, LMS, and certification systems for enterprise clients; delivered MVPs in agile sprints and cut production defects 35% with reviews and testing.'
					},
					{
						role: 'Full-stack Engineer',
						company: 'NIT Studio Kreatif',
						location: 'Bandung, Indonesia',
						period: '2022 — 2023',
						desc: 'Full-cycle Rails web apps and backend APIs with automated testing and CI/CD; performance work improved processing speeds by 20%.'
					},
					{
						role: 'Full-stack Intern',
						company: 'Basic Teknologi Intersolusi',
						location: 'Bandung, Indonesia',
						period: '2022',
						desc: 'Built LMS platforms and refined financial-app backends; documentation cut developer onboarding time by 25%.'
					}
				] as job, i}
					<li class="relative" use:reveal={{ direction: 'up', duration: 500, delay: i * 80 }}>
						<span
							class="absolute -left-[29px] top-1.5 h-2 w-2 rounded-full bg-secondary-400 ring-8 ring-neutral-950"
						></span>
						<div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
							<h3 class="font-heading text-lg font-bold text-white">{job.role}</h3>
							<span class="text-sm text-neutral-500">@ {job.company}</span>
						</div>
						<p class="mt-1 text-xs text-neutral-600">{job.period} · {job.location}</p>
						<p class="mt-2 text-sm leading-relaxed text-neutral-400">{job.desc}</p>
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
		<div class="mx-auto max-w-3xl" use:reveal={{ direction: 'up', duration: 600 }}>
			<p class="eyebrow">Education /</p>
			<h2 id="education-heading" class="mt-3 font-heading text-3xl font-extrabold uppercase text-white md:text-4xl">
				Education
			</h2>

			<div class="surface-card mt-8 rounded-2xl p-6">
				<div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
					<h3 class="font-heading text-lg font-bold text-white">B.Sc. Computer Science</h3>
					<span class="text-xs text-neutral-500">2025 — 2028</span>
				</div>
				<p class="mt-1 text-sm text-secondary-200">Cakrawala University</p>
				<ul class="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-400 marker:text-secondary-400">
					<li>Algorithms and data structures, system design, databases, and the software delivery lifecycle.</li>
					<li>Led the final-year team building a school management system.</li>
					<li>Ran knowledge-sharing sessions, mentoring classmates in full-stack development.</li>
				</ul>
			</div>
		</div>
	</section>

	<!-- ── Certifications ────────────────────────────────────────────────────── -->
	<section
		id="certifications"
		class="scroll-mt-28 border-b border-white/5 px-4 py-20 md:px-8 md:py-24"
		aria-labelledby="certifications-heading"
	>
		<div class="mx-auto max-w-3xl" use:reveal={{ direction: 'up', duration: 600 }}>
			<p class="eyebrow">Certifications /</p>
			<h2 id="certifications-heading" class="mt-3 font-heading text-3xl font-extrabold uppercase text-white md:text-4xl">
				Certifications
			</h2>
			<p class="mt-4 text-base leading-relaxed text-neutral-400">
				Verified credentials in engineering, databases, and cloud.
			</p>

			<div class="mt-8 grid gap-3 sm:grid-cols-2">
				{#each [
					{ name: 'Software Engineer', issuer: 'HackerRank', date: '2024' },
					{ name: 'SQL (Advanced)', issuer: 'HackerRank', date: '2024' },
					{ name: 'SQL (Intermediate)', issuer: 'HackerRank', date: '2024' },
					{ name: 'Node.js (Basic)', issuer: 'HackerRank', date: '2024' },
					{ name: 'AWS Cloud Practitioner Essentials', issuer: 'Dicoding Academy', date: '2021' },
					{ name: 'Basic of DevOps', issuer: 'Dicoding Academy', date: '2023' },
					{ name: 'Basic of Networking', issuer: 'Dicoding Academy', date: '2023' },
					{ name: 'Ruby with RSpec', issuer: 'Udemy', date: '2023' },
					{ name: 'Basic of Ruby', issuer: 'Udemy', date: '2023' }
				] as cert, i}
					<div
						class="surface-card flex items-center justify-between gap-3 rounded-xl px-4 py-3"
						use:reveal={{ direction: 'up', duration: 450, delay: (i % 2) * 70 }}
					>
						<div class="min-w-0">
							<p class="truncate text-sm font-medium text-white">{cert.name}</p>
							<p class="text-xs text-neutral-500">{cert.issuer}</p>
						</div>
						<span class="shrink-0 text-xs text-neutral-500">{cert.date}</span>
					</div>
				{/each}
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

		<div class="relative mx-auto max-w-2xl text-center" use:reveal={{ direction: 'up', duration: 600 }}>
			<p class="eyebrow">Contact /</p>
			<h2
				id="contact-heading"
				class="mt-4 font-heading text-4xl font-extrabold uppercase md:text-6xl"
			>
				<span class="bg-gradient-to-b from-secondary-100 to-secondary-400 bg-clip-text text-transparent">
					Get in touch.
				</span>
			</h2>
			<p class="mx-auto mt-5 max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg">
				Have a project in mind or want to collaborate? I'm open to new opportunities and good
				conversations.
			</p>

			<div class="mt-10 grid gap-3 sm:grid-cols-3">
				<a
					href={site.linkedin}
					target="_blank"
					rel="noopener noreferrer"
					use:spotlight
					class="spot surface-card group flex flex-col items-center gap-2 rounded-2xl px-4 py-5 transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[var(--border-strong)]"
				>
					<span
						class="flex h-10 w-10 items-center justify-center rounded-xl border rule-soft bg-secondary-500/10 text-secondary-100 transition group-hover:bg-secondary-500/20 group-hover:text-white"
					>
						<svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor" aria-hidden="true">
							<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
						</svg>
					</span>
					<span class="text-sm font-medium text-white">LinkedIn</span>
					<span class="max-w-full truncate text-xs text-neutral-500">in/refifauzan</span>
				</a>

				<a
					href={site.email}
					use:spotlight
					class="spot surface-card group flex flex-col items-center gap-2 rounded-2xl px-4 py-5 transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[var(--border-strong)]"
				>
					<span
						class="flex h-10 w-10 items-center justify-center rounded-xl border rule-soft bg-secondary-500/10 text-secondary-100 transition group-hover:bg-secondary-500/20 group-hover:text-white"
					>
						<Mail class="h-5 w-5" aria-hidden="true" />
					</span>
					<span class="text-sm font-medium text-white">Email</span>
					<span class="max-w-full truncate text-xs text-neutral-500">refi.ahmad.fauzan</span>
				</a>

				<a
					href={site.github}
					target="_blank"
					rel="noopener noreferrer"
					use:spotlight
					class="spot surface-card group flex flex-col items-center gap-2 rounded-2xl px-4 py-5 transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[var(--border-strong)]"
				>
					<span
						class="flex h-10 w-10 items-center justify-center rounded-xl border rule-soft bg-secondary-500/10 text-secondary-100 transition group-hover:bg-secondary-500/20 group-hover:text-white"
					>
						<svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor" aria-hidden="true">
							<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
						</svg>
					</span>
					<span class="text-sm font-medium text-white">GitHub</span>
					<span class="max-w-full truncate text-xs text-neutral-500">@djebreds</span>
				</a>
			</div>

			<!-- Gradient-bordered CV button — the closer's call to action -->
			<a
				href={appLink(site.cvPath)}
				download
				class="group mt-3 block rounded-full bg-gradient-to-r from-secondary-200 via-primary-400 to-primary-600 p-px transition-transform duration-300 hover:scale-[1.01]"
			>
				<span
					class="btn-shine flex w-full items-center justify-center gap-2.5 rounded-full bg-neutral-950/90 px-6 py-3.5 text-sm font-medium text-white"
				>
					<Download class="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
					Download my CV
				</span>
			</a>
		</div>
	</section>

</main>
