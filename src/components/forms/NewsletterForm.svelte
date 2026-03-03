<script lang="ts">
	let email = $state('');
	let status = $state<'idle' | 'loading' | 'success' | 'error'>('idle');
	let message = $state('');

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		status = 'loading';
		try {
			const res = await fetch('/api/newsletter', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			});
			const data = await res.json();
			if (res.ok) {
				status = 'success';
				message = 'Thanks for subscribing!';
				email = '';
			} else {
				status = 'error';
				message = data.error || 'Something went wrong.';
			}
		} catch {
			status = 'error';
			message = 'Something went wrong. Please try again.';
		}
	}
</script>

<form onsubmit={handleSubmit} class="flex gap-2">
	<input
		type="email"
		bind:value={email}
		placeholder="Your email"
		required
		class="flex-1 rounded-lg border border-bark-200 bg-white px-3 py-2 text-sm text-charcoal placeholder-charcoal-light/50 focus:border-bark-500 focus:outline-none focus:ring-1 focus:ring-bark-500"
	/>
	<button
		type="submit"
		disabled={status === 'loading'}
		class="rounded-lg bg-charcoal px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-charcoal-light disabled:opacity-50"
	>
		{status === 'loading' ? '...' : 'Join'}
	</button>
</form>
{#if message}
	<p class="mt-2 text-sm {status === 'success' ? 'text-forest-600' : 'text-red-600'}">
		{message}
	</p>
{/if}
