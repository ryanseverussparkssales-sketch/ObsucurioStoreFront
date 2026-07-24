<script lang="ts">
	import type { HomeData } from '$lib/types';

	let { hero }: { hero: HomeData['hero'] } = $props();
</script>

<a
	href={hero.href}
	class="block overflow-hidden rounded-lg border border-line bg-card no-underline transition-colors hover:border-line-subtle"
>
	<!-- Collage banner -->
	<div class="relative flex h-52 items-end overflow-hidden bg-panel">
		<div class="absolute inset-0 flex items-center justify-center gap-3 px-6" aria-hidden="true">
			{#each hero.images as img, i (img)}
				<img
					src={img}
					alt=""
					loading="lazy"
					class="h-36 w-24 rounded-sm object-cover shadow-lg"
					style={`transform: rotate(${i % 2 === 0 ? -4 : 3}deg) translateY(${i % 2 === 0 ? '-6px' : '4px'}); border: 1px solid var(--c-border-subtle);`}
				/>
			{/each}
		</div>
		<!-- Brass wash + fade -->
		<div
			class="absolute inset-0"
			aria-hidden="true"
			style="background:
				linear-gradient(to top, rgba(0,0,0,.92) 0%, rgba(0,0,0,.35) 45%, rgba(0,0,0,.15) 100%),
				radial-gradient(ellipse 90% 70% at 50% 20%, rgba(200,162,74,.14), transparent 70%);"
		></div>
		<div class="relative z-10 px-5 pb-4">
			<p class="font-label mb-1" style="color: var(--accent)">Summer 2026 · so far</p>
			<h2 class="font-display m-0 text-[30px] leading-tight text-ink">{hero.title}</h2>
		</div>
	</div>

	<!-- Caption row -->
	<div class="flex items-center justify-between px-5 py-4">
		<div>
			<p class="m-0 text-sm font-medium text-ink">{hero.subtitle}</p>
			<p class="m-0 mt-0.5 text-xs text-brass">{hero.linkText} →</p>
		</div>
	</div>
</a>
