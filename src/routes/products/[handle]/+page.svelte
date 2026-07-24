<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	const product = $derived(data.product);

	let selectedImage: number = $state(0);
	let selectedVariantId: string = $state('');
	let quantity: number = $state(1);
	let adding: boolean = $state(false);

	const variant = $derived(
		product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0]
	);

	$effect(() => {
		// Reset selection when navigating between products
		selectedVariantId = product.variants[0]?.id ?? '';
		selectedImage = 0;
		quantity = 1;
	});
</script>

<svelte:head>
	<title>{product.title} — Obscurio Books</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-4">
	<nav class="pt-4 text-[11px] text-ink-faint" aria-label="Breadcrumb">
		<a href="/" class="text-ink-faint no-underline hover:text-ink-muted">Home</a>
		<span class="mx-1.5">/</span>
		<span class="text-ink-muted">{product.title}</span>
	</nav>

	<div class="mt-4 grid gap-8 md:grid-cols-2">
		<!-- Gallery -->
		<div>
			<div
				class="flex aspect-square items-center justify-center overflow-hidden rounded-lg border border-line bg-card"
			>
				{#if product.images.length}
					<img
						src={product.images[selectedImage]?.url}
						alt={product.images[selectedImage]?.alt}
						class="h-full w-full object-cover"
					/>
				{:else}
					<span class="font-display-italic text-2xl text-ink-faint">Obscurio</span>
				{/if}
			</div>
			{#if product.images.length > 1}
				<div class="rail mt-3">
					{#each product.images as img, i (img.url)}
						<button
							type="button"
							aria-label={`View image ${i + 1}`}
							class={`h-16 w-16 overflow-hidden rounded-md border transition-colors ${i === selectedImage ? 'border-brass' : 'border-line hover:border-line-subtle'}`}
							onclick={() => (selectedImage = i)}
						>
							<img src={img.url} alt="" class="h-full w-full object-cover" />
						</button>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Details -->
		<div>
			<p class="font-label" style="color: var(--accent)">{product.vendor}</p>
			<h1 class="font-display m-0 mt-1 text-[30px] leading-tight text-ink">{product.title}</h1>

			<p class="tabular-nums m-0 mt-3 text-[22px] font-medium text-brass">
				${variant?.price}
				{#if variant?.compareAt}
					<span class="ml-2 text-[14px] font-normal text-ink-faint line-through">
						${variant.compareAt}
					</span>
				{/if}
			</p>

			<form
				method="POST"
				action="?/add"
				class="mt-6"
				use:enhance={() => {
					adding = true;
					return async ({ update }) => {
						adding = false;
						await update({ reset: false });
					};
				}}
			>
				{#if product.variants.length > 1}
					<label for="variant" class="font-label mb-1.5 block">Edition</label>
					<select
						id="variant"
						name="variantId"
						bind:value={selectedVariantId}
						class="mb-4 w-full rounded-md border border-line-subtle bg-input px-3 py-3 text-sm text-ink focus:border-brass focus:outline-none"
					>
						{#each product.variants as v (v.id)}
							<option value={v.id} disabled={!v.available}>
								{v.title} — ${v.price}{v.available ? '' : ' (sold out)'}
							</option>
						{/each}
					</select>
				{:else}
					<input type="hidden" name="variantId" value={variant?.id ?? ''} />
				{/if}

				<div class="flex gap-3">
					<label class="sr-only" for="qty">Quantity</label>
					<input
						id="qty"
						name="quantity"
						type="number"
						min="1"
						max="10"
						bind:value={quantity}
						class="w-20 rounded-md border border-line-subtle bg-input px-3 py-3 text-center text-sm text-ink focus:border-brass focus:outline-none"
					/>
					<button
						type="submit"
						disabled={adding || !variant?.available}
						class="flex-1 rounded-md bg-brass px-6 py-3 text-[13px] font-semibold text-brass-ink transition-colors hover:bg-brass-hi disabled:cursor-not-allowed disabled:opacity-40"
					>
						{adding ? 'Adding…' : variant?.available ? 'Add to cart' : 'Sold out'}
					</button>
				</div>

				{#if form?.added}
					<p class="m-0 mt-3 text-[12px]" style="color: var(--accent)">
						Added — <a href="/cart" class="text-brass underline">view cart ({form.totalQuantity})</a>
					</p>
				{:else if form?.message}
					<p class="m-0 mt-3 text-[12px]" style="color: var(--crimson-text)">{form.message}</p>
				{/if}
			</form>

			<div class="prose-obscurio mt-8 border-t border-line pt-6">
				<p class="font-label mb-2">About this item</p>
				<!-- eslint-disable-next-line svelte/no-at-html-tags — trusted CMS content from Shopify -->
				{@html product.descriptionHtml}
			</div>
		</div>
	</div>
</div>

<style>
	.prose-obscurio :global(p) {
		margin: 0 0 0.75em;
		font-size: 13px;
		line-height: 1.65;
		color: var(--c-text-secondary);
	}
	.prose-obscurio :global(ul),
	.prose-obscurio :global(ol) {
		margin: 0 0 0.75em;
		padding-left: 1.2em;
		font-size: 13px;
		color: var(--c-text-secondary);
	}
	.prose-obscurio :global(strong) {
		color: var(--c-text-primary);
		font-weight: 600;
	}
	.prose-obscurio :global(h2),
	.prose-obscurio :global(h3) {
		font-family: var(--font-display);
		font-weight: 300;
		color: var(--c-text-primary);
		margin: 1em 0 0.4em;
	}
</style>
