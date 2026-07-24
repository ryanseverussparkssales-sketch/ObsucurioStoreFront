<script lang="ts">
	import type { ProductCard } from '$lib/types';

	let { product, fluid = false }: { product: ProductCard; fluid?: boolean } = $props();
</script>

<a
	href={`/products/${product.handle}`}
	class={`group block no-underline ${fluid ? 'w-full' : 'w-[140px] sm:w-[160px]'}`}
>
	<div
		class={`flex items-center justify-center overflow-hidden rounded-md border border-line bg-card transition-colors group-hover:border-line-subtle ${fluid ? 'aspect-[4/5]' : 'h-[180px] sm:h-[200px]'}`}
	>
		{#if product.image}
			<img
				src={product.image}
				alt={product.imageAlt ?? product.title}
				loading="lazy"
				class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
			/>
		{:else}
			<span class="font-display-italic text-lg text-ink-faint">Obscurio</span>
		{/if}
	</div>
	<div class="pt-2">
		<p class="m-0 line-clamp-2 text-[12.5px] leading-snug text-ink">{product.title}</p>
		<p class="m-0 mt-0.5 truncate text-[11px] text-ink-faint">{product.vendor}</p>
		<p class="tabular-nums m-0 mt-1 text-[13px] font-medium text-brass">
			${product.price}
			{#if product.compareAt}
				<span class="ml-1 text-[11px] font-normal text-ink-faint line-through">${product.compareAt}</span>
			{/if}
		</p>
	</div>
</a>
