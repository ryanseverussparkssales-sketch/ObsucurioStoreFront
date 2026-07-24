<script lang="ts">
	import SearchBar from '$lib/components/SearchBar.svelte';
	import HeroCard from '$lib/components/HeroCard.svelte';
	import PromoBanner from '$lib/components/PromoBanner.svelte';
	import ProductCarousel from '$lib/components/ProductCarousel.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const home = $derived(data.home);
</script>

<svelte:head>
	<title>Obscurio Books — Books, Oddities & Quiet Rituals</title>
	<meta
		name="description"
		content="A curiosity shop for readers: books, tarot, reading tech, and decor for the reading nook."
	/>
</svelte:head>

<div class="mx-auto max-w-5xl px-4">
	<!-- Search -->
	<div class="pt-4">
		<SearchBar />
	</div>

	<!-- Hero feature card -->
	<div class="mt-5">
		<HeroCard hero={home.hero} />
	</div>

	<!-- Promo banner stack -->
	<div class="mt-5 flex flex-col gap-3">
		<PromoBanner
			variant="brass"
			title="The Obscurio Society"
			subtitle="Join now for early access to rare finds"
			href="/society"
		/>
		<PromoBanner
			variant="card"
			title="Summer Grimoire Sale"
			subtitle="Save up to 20% on eligible oddities"
			href="/collections/featured"
		/>
		<PromoBanner
			variant="crimson"
			title="Occult & Oddities"
			subtitle="Shop rare and curious things"
			href="/collections/occult"
		/>
	</div>

	<!-- Product shelves -->
	{#each home.shelves as shelf (shelf.handle)}
		<ProductCarousel {shelf} />
	{/each}
</div>
