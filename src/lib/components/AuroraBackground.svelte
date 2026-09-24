<script lang="ts">
	// Ambient page backdrop: slow-drifting aurora blobs in the brand blues over a
	// masked grid. Pure CSS motion (GPU transforms), paused for reduced-motion.
</script>

<div class="pointer-events-none fixed inset-0 -z-[2] overflow-hidden bg-neutral-950" aria-hidden="true">
	<!-- top radial wash so the page doesn't cut to flat black -->
	<div
		class="absolute inset-0"
		style="background: radial-gradient(ellipse 80% 70% at 50% -20%, rgba(41,77,123,0.35), transparent 60%);"
	></div>

	<!-- drifting aurora blobs -->
	<div class="aurora aurora-a"></div>
	<div class="aurora aurora-b"></div>
	<div class="aurora aurora-c"></div>

	<!-- masked blueprint grid -->
	<div
		class="absolute inset-0 bg-[linear-gradient(to_right,rgba(79,79,79,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(79,79,79,0.16)_1px,transparent_1px)] bg-[length:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)]"
	></div>
</div>

<style>
	.aurora {
		position: absolute;
		border-radius: 9999px;
		filter: blur(90px);
		opacity: 0.5;
		will-change: transform;
	}
	.aurora-a {
		top: -10%;
		left: 8%;
		width: 42vw;
		height: 42vw;
		background: radial-gradient(circle at 30% 30%, #3868a7, transparent 70%);
		animation: drift-a 22s ease-in-out infinite;
	}
	.aurora-b {
		top: 20%;
		right: 2%;
		width: 36vw;
		height: 36vw;
		background: radial-gradient(circle at 60% 40%, #0077cc, transparent 70%);
		opacity: 0.4;
		animation: drift-b 28s ease-in-out infinite;
	}
	.aurora-c {
		top: -6%;
		left: 38%;
		width: 30vw;
		height: 30vw;
		background: radial-gradient(circle at 50% 50%, #294d7b, transparent 70%);
		opacity: 0.35;
		animation: drift-c 25s ease-in-out infinite;
	}

	@keyframes drift-a {
		0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
		50% { transform: translate3d(6vw, 4vh, 0) scale(1.12); }
	}
	@keyframes drift-b {
		0%, 100% { transform: translate3d(0, 0, 0) scale(1.05); }
		50% { transform: translate3d(-5vw, 6vh, 0) scale(0.92); }
	}
	@keyframes drift-c {
		0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
		50% { transform: translate3d(-4vw, -3vh, 0) scale(1.15); }
	}

	@media (prefers-reduced-motion: reduce) {
		.aurora {
			animation: none !important;
		}
	}
</style>
