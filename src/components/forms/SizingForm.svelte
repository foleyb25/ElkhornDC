<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '../ui/Button.svelte';

	interface Props {
		form: {
			errors?: Record<string, string[]>;
			values?: Record<string, string>;
		} | null;
		productOfInterest?: string;
	}

	let { form, productOfInterest = '' }: Props = $props();
	let submitting = $state(false);

	function getError(field: string): string {
		return form?.errors?.[field]?.[0] ?? '';
	}

	function getValue(field: string, fallback: string = ''): string {
		return form?.values?.[field] ?? fallback;
	}
</script>

<form
	method="POST"
	use:enhance={() => {
		submitting = true;
		return async ({ update }) => {
			submitting = false;
			await update();
		};
	}}
	class="space-y-10"
>
	<!-- Customer Info -->
	<fieldset>
		<legend class="font-heading text-2xl text-charcoal">Your Information</legend>
		<div class="mt-4 grid gap-4 sm:grid-cols-2">
			<div>
				<label for="customer_name" class="block text-sm font-medium text-charcoal">Name *</label>
				<input
					type="text"
					id="customer_name"
					name="customer_name"
					value={getValue('customer_name')}
					required
					class="mt-1 w-full rounded-lg border border-bark-200 px-4 py-2.5 text-charcoal focus:border-bark-500 focus:outline-none focus:ring-1 focus:ring-bark-500"
				/>
				{#if getError('customer_name')}<p class="mt-1 text-sm text-red-600">{getError('customer_name')}</p>{/if}
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
			<div class="sm:col-span-2">
				<label for="phone" class="block text-sm font-medium text-charcoal">Phone (optional)</label>
				<input
					type="tel"
					id="phone"
					name="phone"
					value={getValue('phone')}
					class="mt-1 w-full rounded-lg border border-bark-200 px-4 py-2.5 text-charcoal focus:border-bark-500 focus:outline-none focus:ring-1 focus:ring-bark-500"
				/>
			</div>
		</div>
	</fieldset>

	<!-- Dog Info -->
	<fieldset>
		<legend class="font-heading text-2xl text-charcoal">About Your Dog</legend>
		<div class="mt-4 grid gap-4 sm:grid-cols-2">
			<div>
				<label for="dog_name" class="block text-sm font-medium text-charcoal">Dog's Name *</label>
				<input
					type="text"
					id="dog_name"
					name="dog_name"
					value={getValue('dog_name')}
					required
					class="mt-1 w-full rounded-lg border border-bark-200 px-4 py-2.5 text-charcoal focus:border-bark-500 focus:outline-none focus:ring-1 focus:ring-bark-500"
				/>
				{#if getError('dog_name')}<p class="mt-1 text-sm text-red-600">{getError('dog_name')}</p>{/if}
			</div>
			<div>
				<label for="dog_breed" class="block text-sm font-medium text-charcoal">Breed *</label>
				<input
					type="text"
					id="dog_breed"
					name="dog_breed"
					value={getValue('dog_breed')}
					required
					class="mt-1 w-full rounded-lg border border-bark-200 px-4 py-2.5 text-charcoal focus:border-bark-500 focus:outline-none focus:ring-1 focus:ring-bark-500"
				/>
				{#if getError('dog_breed')}<p class="mt-1 text-sm text-red-600">{getError('dog_breed')}</p>{/if}
			</div>
			<div>
				<label for="dog_weight_lbs" class="block text-sm font-medium text-charcoal">Weight (lbs) *</label>
				<input
					type="number"
					id="dog_weight_lbs"
					name="dog_weight_lbs"
					value={getValue('dog_weight_lbs')}
					min="1"
					max="300"
					required
					class="mt-1 w-full rounded-lg border border-bark-200 px-4 py-2.5 text-charcoal focus:border-bark-500 focus:outline-none focus:ring-1 focus:ring-bark-500"
				/>
				{#if getError('dog_weight_lbs')}<p class="mt-1 text-sm text-red-600">{getError('dog_weight_lbs')}</p>{/if}
			</div>
			<div>
				<label for="dog_age" class="block text-sm font-medium text-charcoal">Age *</label>
				<input
					type="text"
					id="dog_age"
					name="dog_age"
					value={getValue('dog_age')}
					placeholder="e.g., 3 years, 6 months"
					required
					class="mt-1 w-full rounded-lg border border-bark-200 px-4 py-2.5 text-charcoal focus:border-bark-500 focus:outline-none focus:ring-1 focus:ring-bark-500"
				/>
				{#if getError('dog_age')}<p class="mt-1 text-sm text-red-600">{getError('dog_age')}</p>{/if}
			</div>
		</div>
	</fieldset>

	<!-- Chewing Details -->
	<fieldset>
		<legend class="font-heading text-2xl text-charcoal">Chewing Details</legend>
		<div class="mt-4 space-y-4">
			<div>
				<label for="chewing_style" class="block text-sm font-medium text-charcoal">Chewing Style *</label>
				<select
					id="chewing_style"
					name="chewing_style"
					required
					class="mt-1 w-full rounded-lg border border-bark-200 px-4 py-2.5 text-charcoal focus:border-bark-500 focus:outline-none focus:ring-1 focus:ring-bark-500"
				>
					<option value="">Select chewing style...</option>
					<option value="light" selected={getValue('chewing_style') === 'light'}>Light — Gentle nibbler</option>
					<option value="moderate" selected={getValue('chewing_style') === 'moderate'}>Moderate — Enjoys a steady chew</option>
					<option value="heavy" selected={getValue('chewing_style') === 'heavy'}>Heavy — Aggressive chewer</option>
					<option value="extreme" selected={getValue('chewing_style') === 'extreme'}>Extreme — Destroys everything</option>
				</select>
				{#if getError('chewing_style')}<p class="mt-1 text-sm text-red-600">{getError('chewing_style')}</p>{/if}
			</div>
			<div>
				<label class="flex items-center gap-3">
					<input
						type="checkbox"
						name="previous_antler_experience"
						value="true"
						checked={getValue('previous_antler_experience') === 'true'}
						class="h-4 w-4 rounded border-bark-300 text-bark-600 focus:ring-bark-500"
					/>
					<span class="text-sm font-medium text-charcoal">My dog has had antler chews before</span>
				</label>
			</div>
			<div>
				<label for="previous_antler_notes" class="block text-sm font-medium text-charcoal">
					Notes about previous antler experience (optional)
				</label>
				<textarea
					id="previous_antler_notes"
					name="previous_antler_notes"
					rows="2"
					class="mt-1 w-full rounded-lg border border-bark-200 px-4 py-2.5 text-charcoal focus:border-bark-500 focus:outline-none focus:ring-1 focus:ring-bark-500"
				>{getValue('previous_antler_notes')}</textarea>
			</div>
		</div>
	</fieldset>

	<!-- Order Preferences -->
	<fieldset>
		<legend class="font-heading text-2xl text-charcoal">Order Preferences</legend>
		<div class="mt-4 grid gap-4 sm:grid-cols-2">
			<div>
				<label for="products_of_interest" class="block text-sm font-medium text-charcoal">Product(s) of Interest (optional)</label>
				<input
					type="text"
					id="products_of_interest"
					name="products_of_interest"
					value={getValue('products_of_interest', productOfInterest)}
					placeholder="e.g., Medium Whole Elk Antler"
					class="mt-1 w-full rounded-lg border border-bark-200 px-4 py-2.5 text-charcoal focus:border-bark-500 focus:outline-none focus:ring-1 focus:ring-bark-500"
				/>
			</div>
			<div>
				<label for="quantity" class="block text-sm font-medium text-charcoal">Quantity</label>
				<input
					type="number"
					id="quantity"
					name="quantity"
					value={getValue('quantity', '1')}
					min="1"
					max="20"
					class="mt-1 w-full rounded-lg border border-bark-200 px-4 py-2.5 text-charcoal focus:border-bark-500 focus:outline-none focus:ring-1 focus:ring-bark-500"
				/>
			</div>
			<div class="sm:col-span-2">
				<label for="additional_notes" class="block text-sm font-medium text-charcoal">Additional Notes (optional)</label>
				<textarea
					id="additional_notes"
					name="additional_notes"
					rows="3"
					placeholder="Anything else we should know about your dog?"
					class="mt-1 w-full rounded-lg border border-bark-200 px-4 py-2.5 text-charcoal focus:border-bark-500 focus:outline-none focus:ring-1 focus:ring-bark-500"
				>{getValue('additional_notes')}</textarea>
			</div>
		</div>
	</fieldset>

	<!-- Shipping -->
	<fieldset>
		<legend class="font-heading text-2xl text-charcoal">Shipping Address</legend>
		<div class="mt-4 grid gap-4 sm:grid-cols-2">
			<div class="sm:col-span-2">
				<label for="shipping_name" class="block text-sm font-medium text-charcoal">Full Name *</label>
				<input
					type="text"
					id="shipping_name"
					name="shipping_name"
					value={getValue('shipping_name')}
					required
					class="mt-1 w-full rounded-lg border border-bark-200 px-4 py-2.5 text-charcoal focus:border-bark-500 focus:outline-none focus:ring-1 focus:ring-bark-500"
				/>
				{#if getError('shipping_name')}<p class="mt-1 text-sm text-red-600">{getError('shipping_name')}</p>{/if}
			</div>
			<div class="sm:col-span-2">
				<label for="shipping_address" class="block text-sm font-medium text-charcoal">Street Address *</label>
				<input
					type="text"
					id="shipping_address"
					name="shipping_address"
					value={getValue('shipping_address')}
					required
					class="mt-1 w-full rounded-lg border border-bark-200 px-4 py-2.5 text-charcoal focus:border-bark-500 focus:outline-none focus:ring-1 focus:ring-bark-500"
				/>
				{#if getError('shipping_address')}<p class="mt-1 text-sm text-red-600">{getError('shipping_address')}</p>{/if}
			</div>
			<div>
				<label for="shipping_city" class="block text-sm font-medium text-charcoal">City *</label>
				<input
					type="text"
					id="shipping_city"
					name="shipping_city"
					value={getValue('shipping_city')}
					required
					class="mt-1 w-full rounded-lg border border-bark-200 px-4 py-2.5 text-charcoal focus:border-bark-500 focus:outline-none focus:ring-1 focus:ring-bark-500"
				/>
				{#if getError('shipping_city')}<p class="mt-1 text-sm text-red-600">{getError('shipping_city')}</p>{/if}
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div>
					<label for="shipping_state" class="block text-sm font-medium text-charcoal">State *</label>
					<input
						type="text"
						id="shipping_state"
						name="shipping_state"
						value={getValue('shipping_state')}
						required
						class="mt-1 w-full rounded-lg border border-bark-200 px-4 py-2.5 text-charcoal focus:border-bark-500 focus:outline-none focus:ring-1 focus:ring-bark-500"
					/>
					{#if getError('shipping_state')}<p class="mt-1 text-sm text-red-600">{getError('shipping_state')}</p>{/if}
				</div>
				<div>
					<label for="shipping_zip" class="block text-sm font-medium text-charcoal">ZIP *</label>
					<input
						type="text"
						id="shipping_zip"
						name="shipping_zip"
						value={getValue('shipping_zip')}
						required
						class="mt-1 w-full rounded-lg border border-bark-200 px-4 py-2.5 text-charcoal focus:border-bark-500 focus:outline-none focus:ring-1 focus:ring-bark-500"
					/>
					{#if getError('shipping_zip')}<p class="mt-1 text-sm text-red-600">{getError('shipping_zip')}</p>{/if}
				</div>
			</div>
		</div>
	</fieldset>

	<div>
		<Button type="submit" size="lg" class="w-full" disabled={submitting}>
			{submitting ? 'Submitting...' : 'Submit Sizing Request'}
		</Button>
		<p class="mt-3 text-center text-sm text-charcoal-light">
			We'll review your request and reach out within 24 hours.
		</p>
	</div>
</form>
