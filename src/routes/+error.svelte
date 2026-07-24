<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="mx-auto max-w-3xl px-4">
	<div class="mt-16 rounded-lg border border-line bg-card px-6 py-16 text-center">
		<p class="font-label" style="color: var(--accent)">{page.status}</p>
		<h1 class="font-display m-0 mt-2 text-[32px] leading-tight text-ink">
			{page.status === 404 ? 'Lost in the stacks' : 'Something went sideways'}
		</h1>
		<p class="m-0 mt-2 text-[13px] text-ink-secondary">
			{page.status === 404
				? "This shelf doesn't exist — or it's hidden very, very well."
				: (page.error?.message ?? 'An unexpected error occurred.')}
		</p>
		<a
			href="/"
			class="mt-6 inline-block rounded-md bg-brass px-6 py-3 text-[12px] font-semibold text-brass-ink no-underline hover:bg-brass-hi"
		>
			Back to the shop
		</a>
	</div>
</div>
