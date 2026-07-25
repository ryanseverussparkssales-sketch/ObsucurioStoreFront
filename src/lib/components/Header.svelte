<script lang="ts">
	let menuOpen: boolean = $state(false);

	const navLinks: Array<{ label: string; href: string }> = [
		{ label: 'All Books', href: '/collections/books' },
		{ label: 'Epic Fantasy', href: '/collections/epic-fantasy' },
		{ label: 'Romantasy', href: '/collections/romantasy' },
		{ label: 'Sci-Fi', href: '/collections/sci-fi' },
		{ label: 'Tabletop RPGs', href: '/collections/tabletop-role-playing' },
		{ label: 'Board Games', href: '/collections/board-games' },
		{ label: 'Collectibles', href: '/collections/collectibles' },
		{ label: "The Maker's Shelf", href: '/collections/art-supplies-oddities' },
		{ label: 'Candles', href: '/collections/candles' }
	];
</script>

<header class="sticky top-0 z-40 border-b border-line bg-page/95 backdrop-blur-sm">
	<div class="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
		<div class="flex items-center gap-3">
			<button
				type="button"
				aria-label={menuOpen ? 'Close menu' : 'Open menu'}
				class="flex h-9 w-9 items-center justify-center rounded-md text-ink-muted transition-colors hover:text-ink"
				onclick={() => (menuOpen = !menuOpen)}
			>
				{#if menuOpen}
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6l12 12M18 6L6 18" /></svg>
				{:else}
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
				{/if}
			</button>

			<a href="/" class="flex items-baseline gap-1.5 no-underline">
				<span class="font-display text-[19px] leading-none text-ink">obscurio</span>
				<span
					class="leading-none text-brass"
					style="font-family:var(--font-label);font-size:11px;letter-spacing:.28em;text-transform:uppercase"
				>
					books
				</span>
			</a>
		</div>

		<div class="flex items-center gap-1">
			<a
				href="/wishlist"
				aria-label="Wishlist"
				class="flex h-9 w-9 items-center justify-center rounded-md text-ink-muted transition-colors hover:text-brass"
			>
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<path d="M12 3l2.7 5.8 6.3.7-4.7 4.3 1.3 6.2-5.6-3.2-5.6 3.2 1.3-6.2L3 9.5l6.3-.7L12 3z" stroke-linejoin="round" />
				</svg>
			</a>
			<a
				href="/cart"
				aria-label="Cart"
				class="relative flex h-9 w-9 items-center justify-center rounded-md text-ink-muted transition-colors hover:text-brass"
			>
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
					<path d="M3 4h2l2.4 12.2A2 2 0 0 0 9.4 18h8.9a2 2 0 0 0 2-1.6L22 8H6" stroke-linejoin="round" />
					<circle cx="10" cy="21" r="1" />
					<circle cx="18" cy="21" r="1" />
				</svg>
			</a>
		</div>
	</div>

	{#if menuOpen}
		<nav class="border-t border-line-ghost bg-panel">
			<div class="mx-auto max-w-7xl px-4 py-3">
				<p class="font-label mb-2">Browse the shop</p>
				<ul class="m-0 flex list-none flex-col p-0">
					{#each navLinks as link (link.href)}
						<li>
							<a
								href={link.href}
								class="block border-b border-line-ghost py-2.5 text-sm text-ink-secondary no-underline transition-colors last:border-b-0 hover:text-ink"
								onclick={() => (menuOpen = false)}
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</nav>
	{/if}
</header>
