<script lang="ts">
	let query: string = $state('');
</script>

<form action="/search" method="get" class="flex" role="search">
	<label for="site-search" class="sr-only">Search the catalog</label>
	<input
		id="site-search"
		name="q"
		type="search"
		placeholder="Search 200+ curiosities"
		bind:value={query}
		autocomplete="off"
		class="h-12 min-w-0 flex-1 rounded-l-md border border-line-subtle bg-input px-4 text-sm text-ink placeholder-ink-faint transition-colors focus:border-brass focus:outline-none"
	/>
	<button
		type="submit"
		aria-label="Search"
		class="flex h-12 w-14 items-center justify-center rounded-r-md bg-brass text-brass-ink transition-colors hover:bg-brass-hi"
	>
		<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
			<circle cx="11" cy="11" r="7" />
			<path d="M21 21l-4.3-4.3" stroke-linecap="round" />
		</svg>
	</button>
</form>
