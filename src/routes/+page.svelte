<script lang="ts">
	import { site } from '$lib/site';
	import { appLink } from '$lib/app-link';
	import ExternalLink from 'lucide-svelte/icons/external-link';
</script>

<main class="min-h-dvh" aria-label="Portfolio home">
	<!-- First section doubles as document target for #home (skip / deep links) -->
	<section
		id="home"
		class="scroll-mt-28 border-b border-white/5 px-4 pt-24 pb-20 sm:pt-28 md:px-8 md:pb-28"
		aria-labelledby="home-heading"
	>
		<div class="mx-auto max-w-3xl">
			<p class="text-sm tracking-[0.2em] text-neutral-500 uppercase">Portfolio /</p>
			<h1 id="home-heading" class="mt-3 font-heading text-4xl font-extrabold text-balance text-white md:text-5xl">
				{site.title}
			</h1>
			<p class="mt-4 text-lg text-neutral-300 md:text-xl">{site.tagline}</p>
			<p class="mt-6 max-w-2xl text-base leading-relaxed text-neutral-400">
				{site.description.replace(/\s+/g, ' ').trim()}
			</p>
		</div>
	</section>

	<section
		id="about"
		class="scroll-mt-28 border-b border-white/5 px-4 py-20 md:px-8 md:py-28"
		aria-labelledby="about-heading"
	>
		<div class="mx-auto max-w-3xl">
			<h2 id="about-heading" class="font-heading text-2xl font-extrabold uppercase text-white md:text-3xl">About</h2>
			<p class="mt-4 text-base leading-relaxed text-neutral-400">
				Backend and full-stack delivery with a focus on maintainable APIs, clear data modeling, and
				production operations. Blogs on this site go deeper on delivery and platform notes.
			</p>
		</div>
	</section>

	<section
		id="skills"
		class="scroll-mt-28 border-b border-white/5 px-4 py-20 md:px-8 md:py-28"
		aria-labelledby="skills-heading"
	>
		<div class="mx-auto max-w-3xl">
			<h2 id="skills-heading" class="font-heading text-2xl font-extrabold uppercase text-white md:text-3xl">Skills</h2>
			<p class="mt-4 text-base leading-relaxed text-neutral-400">
				Primary tools and platforms used for day-to-day delivery.
			</p>
			<div class="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
				{#each ['Ruby on Rails', 'NestJS', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'AWS / DO', 'React / Next.js', 'SvelteKit'] as skill}
					<div
						class="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-neutral-300"
					>
						{skill}
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section
		id="experience"
		class="scroll-mt-28 border-b border-white/5 px-4 py-20 md:px-8 md:py-28"
		aria-labelledby="experience-heading"
	>
		<div class="mx-auto max-w-3xl">
			<h2 id="experience-heading" class="font-heading text-2xl font-extrabold uppercase text-white md:text-3xl">Experience</h2>
			<p class="mt-4 text-base leading-relaxed text-neutral-400">
				Recent work spans school management microservices (NestJS), halal certification platforms
				(Rails), and multi-product studio delivery (Rails / Next.js / Nest). Focus on pragmatic
				architecture, background job systems, and stable production operations.
			</p>
		</div>
	</section>

	<section
		id="services"
		class="scroll-mt-28 border-b border-white/5 px-4 py-20 md:px-8 md:py-28"
		aria-labelledby="services-heading"
	>
		<div class="mx-auto max-w-3xl">
			<h2 id="services-heading" class="font-heading text-2xl font-extrabold uppercase text-white md:text-3xl">Services</h2>
			<p class="mt-4 text-base leading-relaxed text-neutral-400">
				Available for consultation, fixed-scope projects, and monthly retainers.
			</p>
			<ul class="mt-8 space-y-4">
				<li class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary-400"></span>
					<span class="text-neutral-300">Backend development — APIs, services, data modeling</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary-400"></span>
					<span class="text-neutral-300">Full-stack delivery — from database to UI</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary-400"></span>
					<span class="text-neutral-300">Platform consulting — architecture review, DevOps, scaling</span>
				</li>
			</ul>
		</div>
	</section>

	<section
		id="contact"
		class="scroll-mt-28 px-4 py-20 md:px-8 md:py-28"
		aria-labelledby="contact-heading"
	>
		<div class="mx-auto max-w-3xl">
			<h2 id="contact-heading" class="font-heading text-2xl font-extrabold uppercase text-white md:text-3xl">Contact</h2>
			<p class="mt-3 text-neutral-400">Links and ways to reach out.</p>
			<ul class="mt-8 flex flex-col gap-3 text-sm md:flex-row md:flex-wrap md:gap-4">
				<li>
					<a
						href={site.github}
						class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-secondary-100 transition hover:border-white/20 hover:bg-white/[0.06]"
						target="_blank"
						rel="noopener noreferrer"
					>
						GitHub
						<ExternalLink class="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden="true" />
					</a>
				</li>
				<li>
					<a
						href={site.linkedin}
						class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-secondary-100 transition hover:border-white/20 hover:bg-white/[0.06]"
						target="_blank"
						rel="noopener noreferrer"
					>
						LinkedIn
						<ExternalLink class="h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden="true" />
					</a>
				</li>
				<li>
					<a
						href={site.email}
						class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-secondary-100 transition hover:border-white/20 hover:bg-white/[0.06]"
					>
						Email
					</a>
				</li>
				<li>
					<a
						href={appLink(site.cvPath)}
						class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-secondary-100 transition hover:border-white/20 hover:bg-white/[0.06]"
						download
					>
						Download CV
					</a>
				</li>
			</ul>
		</div>
	</section>
</main>
