<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col bg-page text-ink">
	<Header />

	<main class="w-full flex-1">
		{@render children()}
	</main>

	<footer class="mt-16 border-t border-line bg-panel">
		<div class="mx-auto max-w-5xl px-4 py-10">
			<div class="flex items-baseline gap-1.5">
				<span class="font-display text-[17px] text-ink">obscurio</span>
				<span
					class="text-brass"
					style="font-family:var(--font-label);font-size:10px;letter-spacing:.28em;text-transform:uppercase"
				>
					books
				</span>
			</div>
			<p class="mt-2 max-w-sm text-[12px] leading-relaxed text-ink-faint">
				Books, oddities, and quiet rituals — curated for the curious.
			</p>
			<div class="mt-6 flex flex-wrap gap-x-6 gap-y-2">
				<a href="/collections/books" class="text-[11px] text-ink-muted no-underline hover:text-ink">Books</a>
				<a href="/collections/occult" class="text-[11px] text-ink-muted no-underline hover:text-ink">Occult</a>
				<a href="/collections/open-source-tech" class="text-[11px] text-ink-muted no-underline hover:text-ink">Reading Tech</a>
				<a href="/collections/decor" class="text-[11px] text-ink-muted no-underline hover:text-ink">Decor</a>
			</div>
			<p class="font-label mt-8">© 2026 Obscurio Books</p>
		</div>
	</footer>
</div>
