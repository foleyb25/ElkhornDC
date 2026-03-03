<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '../ui/Button.svelte';

	interface Props {
		form: {
			errors?: Record<string, string[]>;
			values?: Record<string, string>;
			success?: boolean;
		} | null;
	}

	let { form }: Props = $props();
	let submitting = $state(false);

	function getError(field: string): string {
		return form?.errors?.[field]?.[0] ?? '';
	}

	function getValue(field: string): string {
		return form?.values?.[field] ?? '';
	}
</script>

{#if form?.success}
	<div class="rounded-lg bg-forest-50 p-6 text-center">
		<p class="text-lg font-semibold text-forest-800">Message sent!</p>
		<p class="mt-1 text-forest-700">We'll get back to you as soon as possible.</p>
	</div>
{:else}
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
		<div class="grid gap-4 sm:grid-cols-2">
			<div>
				<label for="name" class="block text-sm font-medium text-charcoal">Name *</label>
				<input
					type="text"
					id="name"
					name="name"
					value={getValue('name')}
					required
					class="mt-1 w-full rounded-lg border border-bark-200 px-4 py-2.5 text-charcoal focus:border-bark-500 focus:outline-none focus:ring-1 focus:ring-bark-500"
				/>
				{#if getError('name')}<p class="mt-1 text-sm text-red-600">{getError('name')}</p>{/if}
			</div>
			<div>
				<label for="email" class="block text-sm font-medium text-charcoal">Email *</label>
				<input
					type="email"
					id="email"
					name="email"
					value={getValue('email')}
					required
					class="mt-1 w-full rounded-lg border border-bark-200 px-4 py-2.5 text-charcoal focus:border-bark-500 focus:outline-none focus:ring-1 focus:ring-bark-500"
				/>
				{#if getError('email')}<p class="mt-1 text-sm text-red-600">{getError('email')}</p>{/if}
			</div>
		</div>
		<div>
			<label for="subject" class="block text-sm font-medium text-charcoal">Subject *</label>
			<input
				type="text"
				id="subject"
				name="subject"
				value={getValue('subject')}
				required
				class="mt-1 w-full rounded-lg border border-bark-200 px-4 py-2.5 text-charcoal focus:border-bark-500 focus:outline-none focus:ring-1 focus:ring-bark-500"
			/>
			{#if getError('subject')}<p class="mt-1 text-sm text-red-600">{getError('subject')}</p>{/if}
		</div>
		<div>
			<label for="message" class="block text-sm font-medium text-charcoal">Message *</label>
			<textarea
				id="message"
				name="message"
				rows="5"
				required
				class="mt-1 w-full rounded-lg border border-bark-200 px-4 py-2.5 text-charcoal focus:border-bark-500 focus:outline-none focus:ring-1 focus:ring-bark-500"
			>{getValue('message')}</textarea>
			{#if getError('message')}<p class="mt-1 text-sm text-red-600">{getError('message')}</p>{/if}
		</div>

		{#if getError('_form')}<p class="text-sm text-red-600">{getError('_form')}</p>{/if}

		<Button type="submit" disabled={submitting} class="w-full">
			{submitting ? 'Sending...' : 'Send Message'}
		</Button>
	</form>
{/if}
