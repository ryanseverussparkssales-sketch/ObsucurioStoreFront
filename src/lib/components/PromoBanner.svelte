<script lang="ts">
	let {
		title,
		subtitle,
		href,
		variant = 'card'
	}: {
		title: string;
		subtitle: string;
		href: string;
		variant?: 'brass' | 'card' | 'crimson';
	} = $props();

	const styles = $derived(
		variant === 'brass'
			? 'background: linear-gradient(120deg, #c8a24a 0%, #b08d3c 100%); color: var(--accent-ink); border-color: transparent;'
			: variant === 'crimson'
				? 'background: linear-gradient(120deg, #6d1420 0%, #a01e2e 100%); color: #fff; border-color: transparent;'
				: 'background: var(--c-card); color: var(--c-text-primary); border-color: var(--c-border);'
	);
</script>

<a
	{href}
	class="flex items-center justify-between gap-4 rounded-lg border px-5 py-4 no-underline transition-transform duration-200 active:scale-[.99]"
	style={styles}
>
	<div class="min-w-0">
		<p class="m-0 text-[15px] font-semibold leading-snug">{title}</p>
		<p class="m-0 mt-0.5 truncate text-[13px] leading-snug" style="opacity:.78">{subtitle}</p>
	</div>
	<svg
		width="18"
		height="18"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		class="shrink-0"
		aria-hidden="true"
	>
		<path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
</a>
