<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const collection = $derived(data.collection);
</script>

<svelte:head>
	<title>{collection.title} — Obscurio Books</title>
	{#if collection.description}
		<meta name="description" content={collection.description} />
	{/if}
</svelte:head>

<div class="mx-auto max-w-7xl px-4">
	<div class="pt-4">
		<SearchBar />
	</div>

	<nav class="mt-5 text-[11px] text-ink-faint" aria-label="Breadcrumb">
		<a href="/" class="text-ink-faint no-underline hover:text-ink-muted">Home</a>
		<span class="mx-1.5">/</span>
		<span class="text-ink-muted">{collection.title}</span>
	</nav>

	<header class="mt-3">
		<p class="font-label" style="color: var(--accent)">Collection</p>
		<h1 class="font-display m-0 mt-1 text-[32px] leading-tight text-ink">{collection.title}</h1>
		{#if collection.description}
			<p class="m-0 mt-1.5 max-w-lg text-[13px] leading-relaxed text-ink-secondary">
				{collection.description}
			</p>
		{/if}
		<p class="m-0 mt-2 text-[11px] text-ink-faint">
			{collection.products.length}
			{collection.products.length === 1 ? 'item' : 'items'}
		</p>
	</header>

	{#if collection.products.length}
		<div class="mt-6 grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
			{#each collection.products as product (product.handle)}
				<ProductCard {product} fluid />
			{/each}
		</div>
	{:else}
		<div class="mt-12 rounded-lg border border-line bg-card px-6 py-12 text-center">
			<p class="font-display-italic m-0 text-lg text-ink-secondary">The shelf is bare.</p>
			<p class="m-0 mt-1 text-[12px] text-ink-faint">
				Nothing here yet — check back soon, or browse the whole shop.
			</p>
			<a
				href="/"
				class="mt-5 inline-block rounded-md bg-brass px-5 py-2.5 text-[12px] font-medium text-brass-ink no-underline hover:bg-brass-hi"
			>
				Back to the shop
			</a>
		</div>
	{/if}
</div>
