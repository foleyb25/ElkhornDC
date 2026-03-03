<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();
	let submitting = $state(false);

	function getError(field: string): string {
		return form?.errors?.[field]?.[0] ?? '';
	}

	function getValue(field: string): string {
		return form?.values?.[field] ?? '';
	}
</script>

<svelte:head>
	<title>Admin Login | Elkhorn Dog Chews</title>
</svelte:head>

<div class="w-full max-w-md">
	<div class="rounded-xl bg-white p-8 shadow-lg">
		<div class="mb-8 text-center">
			<img src="/images/logo_primary.PNG" alt="Elkhorn Dog Chews" class="mx-auto h-20 w-20" />
			<p class="mt-3 text-sm text-charcoal-light">Sign in to manage your store</p>
		</div>

		<form
			method="POST"
			use:enhance={() => {
				submitting = true;
				return async ({ update }) => {
					submitting = false;
					await update();
				};
			}}
			class="space-y-4"
		>
			<div>
				<label for="email" class="block text-sm font-medium text-charcoal">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					value={getValue('email')}
					required
					autocomplete="email"
					class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-charcoal focus:border-bark-500 focus:outline-none focus:ring-1 focus:ring-bark-500"
				/>
				{#if getError('email')}<p class="mt-1 text-sm text-red-600">{getError('email')}</p>{/if}
			</div>

			<div>
				<label for="password" class="block text-sm font-medium text-charcoal">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					required
					autocomplete="current-password"
					class="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-charcoal focus:border-bark-500 focus:outline-none focus:ring-1 focus:ring-bark-500"
				/>
				{#if getError('password')}<p class="mt-1 text-sm text-red-600">{getError('password')}</p>{/if}
			</div>

			{#if getError('_form')}
				<p class="text-sm text-red-600">{getError('_form')}</p>
			{/if}

			<button
				type="submit"
				disabled={submitting}
				class="w-full rounded-lg bg-bark-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-bark-700 disabled:opacity-50"
			>
				{submitting ? 'Signing in...' : 'Sign in'}
			</button>
		</form>
	</div>
</div>
