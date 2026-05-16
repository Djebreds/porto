<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center">
	<h1 class="font-heading text-6xl font-extrabold text-slate-900">{page.status}</h1>
	<p class="text-lg text-slate-600">
		{page.error?.message ?? 'Something went wrong'}
	</p>
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
	<a href="/" class="mt-4 rounded-lg bg-orange-500 px-6 py-2 text-white hover:bg-orange-600">
		Go home
	</a>
</div>
