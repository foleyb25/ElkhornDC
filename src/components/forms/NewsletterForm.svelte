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
		class="flex-1 rounded-lg border border-bark-600 bg-bark-700 px-3 py-2 text-sm text-white placeholder-bark-400 focus:border-bark-400 focus:outline-none"
	/>
	<button
		type="submit"
		disabled={status === 'loading'}
		class="rounded-lg bg-bark-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-bark-400 disabled:opacity-50"
	>
		{status === 'loading' ? '...' : 'Join'}
	</button>
</form>
{#if message}
	<p class="mt-2 text-sm {status === 'success' ? 'text-forest-300' : 'text-red-400'}">
		{message}
	</p>
{/if}
