<script lang="ts">
	import type { HomeShelf } from '$lib/types';
	import ProductCard from '$lib/components/ProductCard.svelte';

	let { shelf }: { shelf: HomeShelf } = $props();
</script>

<section class="mt-10">
	<div class="mb-3 flex items-end justify-between gap-3">
		<div>
			<h2 class="font-display m-0 text-[24px] leading-tight text-ink">{shelf.title}</h2>
			<p class="m-0 mt-0.5 text-[12px] text-ink-muted">{shelf.subtitle}</p>
		</div>
		<a
			href={`/collections/${shelf.handle}`}
			class="shrink-0 pb-1 text-[11px] text-brass no-underline hover:text-brass-hi"
		>
			View all →
		</a>
	</div>

	<div class="rail">
		{#each shelf.products as product (product.handle)}
			<ProductCard {product} />
		{/each}
	</div>
</section>
