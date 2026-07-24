<svelte:head>
	<title>The Obscurio Society — Obscurio Books</title>
</svelte:head>

<div class="mx-auto max-w-3xl px-4">
	<header class="pt-8 text-center">
		<p class="font-label" style="color: var(--accent)">Members only · free to join</p>
		<h1 class="font-display m-0 mt-2 text-[38px] leading-tight text-ink">The Obscurio Society</h1>
		<p class="mx-auto m-0 mt-3 max-w-md text-[13px] leading-relaxed text-ink-secondary">
			First look at rare finds, early access to the vault, and the occasional letter from the
			curator. No dues, no rituals — unless you want them.
		</p>
	</header>

	<div class="mx-auto mt-8 max-w-sm rounded-lg border border-line bg-card p-6">
		<form
			class="flex flex-col gap-3"
			onsubmit={(e) => {
				e.preventDefault();
			}}
		>
			<label for="email" class="font-label">Your email</label>
			<input
				id="email"
				type="email"
				required
				placeholder="you@somewhere.quiet"
				class="w-full rounded-md border border-line-subtle bg-input px-4 py-3 text-sm text-ink placeholder-ink-faint focus:border-brass focus:outline-none"
			/>
			<button
				type="submit"
				class="mt-1 rounded-md bg-brass px-6 py-3 text-[13px] font-semibold text-brass-ink transition-colors hover:bg-brass-hi"
			>
				Join the Society
			</button>
			<p class="m-0 text-center text-[10px] text-ink-faint">
				Signup wiring comes with the email provider — this form is a placeholder.
			</p>
		</form>
	</div>
</div>
