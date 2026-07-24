<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	const cart = $derived(data.cart);
</script>

<svelte:head>
	<title>Cart — Obscurio Books</title>
</svelte:head>

<div class="mx-auto max-w-3xl px-4">
	<header class="pt-6">
		<p class="font-label" style="color: var(--accent)">Your haul</p>
		<h1 class="font-display m-0 mt-1 text-[30px] leading-tight text-ink">Cart</h1>
	</header>

	{#if !cart || cart.lines.length === 0}
		<div class="mt-8 rounded-lg border border-line bg-card px-6 py-14 text-center">
			<p class="font-display-italic m-0 text-xl text-ink-secondary">Nothing here but dust.</p>
			<p class="m-0 mt-1.5 text-[12px] text-ink-faint">
				Your cart is empty — the curiosities await.
			</p>
			<a
				href="/"
				class="mt-6 inline-block rounded-md bg-brass px-6 py-3 text-[12px] font-semibold text-brass-ink no-underline hover:bg-brass-hi"
			>
				Browse the shop
			</a>
		</div>
	{:else}
		<ul class="m-0 mt-6 flex list-none flex-col gap-3 p-0">
			{#each cart.lines as line (line.id)}
				<li class="flex gap-4 rounded-lg border border-line bg-card p-3">
					<a
						href={`/products/${line.productHandle}`}
						class="block h-24 w-20 shrink-0 overflow-hidden rounded-md border border-line-ghost bg-panel"
					>
						{#if line.image}
							<img src={line.image} alt={line.productTitle} class="h-full w-full object-cover" />
						{/if}
					</a>

					<div class="flex min-w-0 flex-1 flex-col">
						<a
							href={`/products/${line.productHandle}`}
							class="line-clamp-2 text-[13px] leading-snug text-ink no-underline hover:text-brass"
						>
							{line.productTitle}
						</a>
						{#if line.variantTitle && line.variantTitle !== 'Default Title'}
							<p class="m-0 mt-0.5 text-[11px] text-ink-faint">{line.variantTitle}</p>
						{/if}
						<p class="tabular-nums m-0 mt-1 text-[12px] text-ink-muted">${line.price} each</p>

						<div class="mt-auto flex items-center justify-between pt-2">
							<form
								method="POST"
								action="?/update"
								class="flex items-center gap-2"
								use:enhance={() => async ({ update }) => {
									await update({ reset: false });
									await invalidateAll();
								}}
							>
								<input type="hidden" name="lineId" value={line.id} />
								<label class="sr-only" for={`qty-${line.id}`}>Quantity</label>
								<input
									id={`qty-${line.id}`}
									name="quantity"
									type="number"
									min="0"
									max="10"
									value={line.quantity}
									class="w-16 rounded-md border border-line-subtle bg-input px-2 py-1.5 text-center text-[12px] text-ink focus:border-brass focus:outline-none"
								/>
								<button
									type="submit"
									class="rounded-md border border-line-subtle px-3 py-1.5 text-[11px] text-ink-secondary transition-colors hover:text-ink"
								>
									Update
								</button>
							</form>

							<form
								method="POST"
								action="?/remove"
								use:enhance={() => async ({ update }) => {
									await update({ reset: false });
									await invalidateAll();
								}}
							>
								<input type="hidden" name="lineId" value={line.id} />
								<button
									type="submit"
									aria-label={`Remove ${line.productTitle}`}
									class="text-[11px] transition-colors"
									style="color: var(--crimson-text)"
								>
									Remove
								</button>
							</form>
						</div>
					</div>

					<p class="tabular-nums shrink-0 text-[13px] font-medium text-ink">${line.lineTotal}</p>
				</li>
			{/each}
		</ul>

		{#if form?.message}
			<p class="m-0 mt-3 text-[12px]" style="color: var(--crimson-text)">{form.message}</p>
		{/if}

		<div class="mt-6 rounded-lg border border-line bg-panel p-5">
			<div class="flex items-center justify-between">
				<p class="m-0 text-[13px] text-ink-secondary">
					Subtotal · {cart.totalQuantity} {cart.totalQuantity === 1 ? 'item' : 'items'}
				</p>
				<p class="tabular-nums m-0 text-[18px] font-medium text-ink">${cart.subtotal}</p>
			</div>
			<p class="m-0 mt-1 text-[11px] text-ink-faint">
				Shipping and taxes calculated at checkout.
			</p>
			<a
				href={cart.checkoutUrl}
				class="mt-4 block rounded-md bg-brass px-6 py-3.5 text-center text-[13px] font-semibold text-brass-ink no-underline transition-colors hover:bg-brass-hi"
			>
				Check out →
			</a>
		</div>
	{/if}
</div>
