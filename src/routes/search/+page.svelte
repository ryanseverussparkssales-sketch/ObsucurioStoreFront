<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.q ? `"${data.q}" — Search` : 'Search'} — Obscurio Books</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-4">
	<div class="pt-4">
		<SearchBar />
	</div>

	<header class="mt-6">
		<p class="font-label" style="color: var(--accent)">Search</p>
		{#if data.q}
			<h1 class="font-display m-0 mt-1 text-[28px] leading-tight text-ink">
				Results for <span class="font-display-italic">“{data.q}”</span>
			</h1>
			<p class="m-0 mt-2 text-[11px] text-ink-faint">
				{data.products.length}
				{data.products.length === 1 ? 'match' : 'matches'}
			</p>
		{:else}
			<h1 class="font-display m-0 mt-1 text-[28px] leading-tight text-ink">
				What are you looking for?
			</h1>
			<p class="m-0 mt-1.5 text-[13px] text-ink-secondary">
				Try a title, an author, or something stranger.
			</p>
		{/if}
	</header>

	{#if data.q && data.products.length === 0}
		<div class="mt-10 rounded-lg border border-line bg-card px-6 py-12 text-center">
			<p class="font-display-italic m-0 text-lg text-ink-secondary">Nothing surfaced.</p>
			<p class="m-0 mt-1 text-[12px] text-ink-faint">
				No matches for “{data.q}” — try fewer words, or wander the collections instead.
			</p>
			<div class="mt-5 flex flex-wrap justify-center gap-2">
				<a href="/collections/books" class="rounded-md border border-line-subtle px-4 py-2 text-[12px] text-ink-secondary no-underline hover:text-ink">Books</a>
				<a href="/collections/occult" class="rounded-md border border-line-subtle px-4 py-2 text-[12px] text-ink-secondary no-underline hover:text-ink">Occult</a>
				<a href="/collections/decor" class="rounded-md border border-line-subtle px-4 py-2 text-[12px] text-ink-secondary no-underline hover:text-ink">Decor</a>
			</div>
		</div>
	{:else if data.products.length}
		<div class="mt-6 grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
			{#each data.products as product (product.handle)}
				<ProductCard {product} fluid />
			{/each}
		</div>
	{/if}
</div>
