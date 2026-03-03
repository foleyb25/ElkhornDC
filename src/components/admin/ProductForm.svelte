<script lang="ts">
	import { enhance } from '$app/forms';
	import { formatPrice, formatSizeTier, formatCutType } from '$lib/utils';
	import type { Product } from '$lib/types';

	interface Props {
		form: {
			errors?: Record<string, string[]>;
			values?: Record<string, string>;
		} | null;
		product?: Product;
	}

	let { form, product }: Props = $props();
	let submitting = $state(false);
	let uploadError = $state('');

	// Already-uploaded URLs (from existing product or restored after validation failure)
	let existingUrls = $state<string[]>(product?.images ?? []);
	if (form?.values?.images) {
		try {
			const parsed = JSON.parse(form.values.images);
			if (Array.isArray(parsed)) existingUrls = parsed;
		} catch {
			// Not JSON, ignore
		}
	}

	// Pending local files (not yet uploaded)
	let pendingFiles = $state<{ file: File; previewUrl: string }[]>([]);

	// Combined preview: existing URLs + local blob previews
	let allPreviews = $derived([
		...existingUrls.map((url) => ({ type: 'existing' as const, url })),
		...pendingFiles.map((p) => ({ type: 'pending' as const, url: p.previewUrl }))
	]);

	function getError(field: string): string {
		return form?.errors?.[field]?.[0] ?? '';
	}

	function getValue(field: string, fallback: string = ''): string {
		if (form?.values?.[field] !== undefined) return form.values[field];
		if (product) {
			const val = (product as Record<string, unknown>)[field];
			if (typeof val === 'boolean') return val ? 'on' : '';
			if (val !== null && val !== undefined) return String(val);
		}
		return fallback;
	}

	function isChecked(field: string): boolean {
		if (form?.values) return form.values[field] === 'on';
		if (product) return !!(product as Record<string, unknown>)[field];
		return field === 'active';
	}

	function handleFileSelect(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;

		uploadError = '';

		const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
		const allowedExt = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
		if (!allowedExt.includes(ext)) {
			uploadError = 'File must be JPEG, PNG, WebP, or GIF';
			input.value = '';
			return;
		}

		if (file.size > 5 * 1024 * 1024) {
			uploadError = 'File must be under 5MB';
			input.value = '';
			return;
		}

		const previewUrl = URL.createObjectURL(file);
		pendingFiles = [...pendingFiles, { file, previewUrl }];
		input.value = '';
	}

	function removeExisting(index: number) {
		existingUrls = existingUrls.filter((_, i) => i !== index);
	}

	function removePending(index: number) {
		const removed = pendingFiles[index];
		URL.revokeObjectURL(removed.previewUrl);
		pendingFiles = pendingFiles.filter((_, i) => i !== index);
	}

	// Preview card derived values
	let previewImage = $derived(allPreviews.length > 0 ? allPreviews[0].url : '');
	let previewName = $derived(getValue('name') || 'Product Name');
	let previewShortDesc = $derived(getValue('short_description') || 'Short description will appear here');
	let previewPrice = $derived(Number(getValue('price_cents', '0')));
	let previewSizeTier = $derived(getValue('size_tier') || 'medium');
	let previewCutType = $derived(getValue('cut_type') || 'whole');

	const inputClass =
		'mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-charcoal focus:border-bark-500 focus:outline-none focus:ring-1 focus:ring-bark-500';
</script>

<form
	method="POST"
	use:enhance={({ formData, cancel }) => {
		submitting = true;
		uploadError = '';

		// Upload pending files before submitting
		const uploadPromises = pendingFiles.map(async ({ file }) => {
			const body = new FormData();
			body.append('file', file);
			const res = await fetch('/api/admin/upload-image', { method: 'POST', body });
			if (!res.ok) {
				const err = await res.json().catch(() => ({ message: 'Upload failed' }));
				throw new Error(err.message ?? `Upload failed (${res.status})`);
			}
			const { url } = await res.json();
			return url;
		});

		return Promise.all(uploadPromises)
			.then((newUrls) => {
				const allUrls = [...existingUrls, ...newUrls];
				formData.set('images', JSON.stringify(allUrls));

				return async ({ update }: { update: () => Promise<void> }) => {
					// Clean up blob URLs
					pendingFiles.forEach((p) => URL.revokeObjectURL(p.previewUrl));
					pendingFiles = [];
					submitting = false;
					await update();
				};
			})
			.catch((e) => {
				uploadError = e instanceof Error ? e.message : 'Image upload failed';
				submitting = false;
				cancel();
			});
	}}
	class="space-y-6"
>
	<!-- Hidden field for existing image URLs (fallback, overwritten by enhance) -->
	<input type="hidden" name="images" value={JSON.stringify(existingUrls)} />

	<div class="rounded-xl bg-white p-6 shadow-sm">
		<h2 class="mb-4 text-lg font-semibold text-charcoal">Basic Info</h2>
		<div class="grid gap-4 sm:grid-cols-2">
			<div>
				<label for="name" class="block text-sm font-medium text-charcoal">Name *</label>
				<input type="text" id="name" name="name" value={getValue('name')} required class={inputClass} />
				{#if getError('name')}<p class="mt-1 text-sm text-red-600">{getError('name')}</p>{/if}
			</div>
			<div>
				<label for="slug" class="block text-sm font-medium text-charcoal">Slug *</label>
				<input type="text" id="slug" name="slug" value={getValue('slug')} required class={inputClass} />
				{#if getError('slug')}<p class="mt-1 text-sm text-red-600">{getError('slug')}</p>{/if}
			</div>
		</div>
		<div class="mt-4">
			<label for="short_description" class="block text-sm font-medium text-charcoal">Short Description *</label>
			<input
				type="text"
				id="short_description"
				name="short_description"
				value={getValue('short_description')}
				required
				class={inputClass}
			/>
			{#if getError('short_description')}<p class="mt-1 text-sm text-red-600">{getError('short_description')}</p>{/if}
		</div>
		<div class="mt-4">
			<label for="description" class="block text-sm font-medium text-charcoal">Description *</label>
			<textarea id="description" name="description" rows="4" required class={inputClass}>{getValue('description')}</textarea>
			{#if getError('description')}<p class="mt-1 text-sm text-red-600">{getError('description')}</p>{/if}
		</div>
	</div>

	<div class="rounded-xl bg-white p-6 shadow-sm">
		<h2 class="mb-4 text-lg font-semibold text-charcoal">Product Details</h2>
		<div class="grid gap-4 sm:grid-cols-3">
			<div>
				<label for="size_tier" class="block text-sm font-medium text-charcoal">Size Tier *</label>
				<select id="size_tier" name="size_tier" required class={inputClass}>
					<option value="">Select...</option>
					{#each ['small', 'medium', 'large', 'x-large'] as size}
						<option value={size} selected={getValue('size_tier') === size}>
							{size === 'x-large' ? 'X-Large' : size.charAt(0).toUpperCase() + size.slice(1)}
						</option>
					{/each}
				</select>
				{#if getError('size_tier')}<p class="mt-1 text-sm text-red-600">{getError('size_tier')}</p>{/if}
			</div>
			<div>
				<label for="cut_type" class="block text-sm font-medium text-charcoal">Cut Type *</label>
				<select id="cut_type" name="cut_type" required class={inputClass}>
					<option value="">Select...</option>
					{#each ['whole', 'split'] as cut}
						<option value={cut} selected={getValue('cut_type') === cut}>
							{cut.charAt(0).toUpperCase() + cut.slice(1)}
						</option>
					{/each}
				</select>
				{#if getError('cut_type')}<p class="mt-1 text-sm text-red-600">{getError('cut_type')}</p>{/if}
			</div>
			<div>
				<label for="chewer_level" class="block text-sm font-medium text-charcoal">Chewer Level *</label>
				<input type="text" id="chewer_level" name="chewer_level" value={getValue('chewer_level')} required class={inputClass} />
				{#if getError('chewer_level')}<p class="mt-1 text-sm text-red-600">{getError('chewer_level')}</p>{/if}
			</div>
		</div>
		<div class="mt-4 grid gap-4 sm:grid-cols-3">
			<div>
				<label for="dog_weight_min" class="block text-sm font-medium text-charcoal">Dog Weight Min (lbs) *</label>
				<input type="number" id="dog_weight_min" name="dog_weight_min" value={getValue('dog_weight_min', '0')} min="0" required class={inputClass} />
				{#if getError('dog_weight_min')}<p class="mt-1 text-sm text-red-600">{getError('dog_weight_min')}</p>{/if}
			</div>
			<div>
				<label for="dog_weight_max" class="block text-sm font-medium text-charcoal">Dog Weight Max (lbs) *</label>
				<input type="number" id="dog_weight_max" name="dog_weight_max" value={getValue('dog_weight_max', '0')} min="1" required class={inputClass} />
				{#if getError('dog_weight_max')}<p class="mt-1 text-sm text-red-600">{getError('dog_weight_max')}</p>{/if}
			</div>
			<div>
				<label for="price_cents" class="block text-sm font-medium text-charcoal">Price (cents) *</label>
				<input type="number" id="price_cents" name="price_cents" value={getValue('price_cents', '0')} min="1" required class={inputClass} />
				{#if getError('price_cents')}<p class="mt-1 text-sm text-red-600">{getError('price_cents')}</p>{/if}
			</div>
		</div>
	</div>

	<div class="rounded-xl bg-white p-6 shadow-sm">
		<h2 class="mb-4 text-lg font-semibold text-charcoal">Images</h2>

		<!-- Image thumbnails -->
		{#if allPreviews.length > 0}
			<div class="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
				{#each allPreviews as preview, i}
					<div class="group relative overflow-hidden rounded-lg border border-gray-200">
						<img src={preview.url} alt="Product image {i + 1}" class="aspect-square w-full object-cover" />
						{#if preview.type === 'pending'}
							<span class="absolute left-1 top-1 rounded bg-bark-600 px-1.5 py-0.5 text-[10px] font-medium text-white">New</span>
						{/if}
						<button
							type="button"
							onclick={() => {
								if (preview.type === 'existing') {
									removeExisting(i);
								} else {
									removePending(i - existingUrls.length);
								}
							}}
							class="absolute right-1 top-1 rounded-full bg-red-600 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
						>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				{/each}
			</div>
		{/if}

		<!-- File picker -->
		<div>
			<label
				class="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm text-charcoal-light transition-colors hover:border-bark-400 hover:text-charcoal"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
				</svg>
				Add Image
				<input
					type="file"
					accept=".jpg,.jpeg,.png,.webp,.gif"
					onchange={handleFileSelect}
					class="hidden"
				/>
			</label>
			<p class="mt-1.5 text-xs text-charcoal-light">JPEG, PNG, WebP, or GIF. Max 5MB. Images upload when you save.</p>
		</div>

		{#if uploadError}
			<p class="mt-2 text-sm text-red-600">{uploadError}</p>
		{/if}
		{#if getError('images')}<p class="mt-2 text-sm text-red-600">{getError('images')}</p>{/if}
	</div>

	<!-- Shop Preview Card -->
	<div class="rounded-xl bg-white p-6 shadow-sm">
		<h2 class="mb-4 text-lg font-semibold text-charcoal">Shop Preview</h2>
		<p class="mb-4 text-xs text-charcoal-light">This is how the product will appear to customers.</p>
		<div class="mx-auto max-w-xs">
			<div class="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
				<div class="aspect-square bg-bark-100">
					{#if previewImage}
						<img
							src={previewImage}
							alt={previewName}
							class="h-full w-full object-cover"
						/>
					{:else}
						<div class="flex h-full items-center justify-center text-bark-300">
							<svg class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
								<path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
						</div>
					{/if}
				</div>
				<div class="p-4">
					<div class="flex gap-2">
						<span class="inline-block rounded-full bg-bark-100 px-2.5 py-0.5 text-xs font-medium text-bark-800">
							{formatSizeTier(previewSizeTier)}
						</span>
						<span class="inline-block rounded-full bg-forest-100 px-2.5 py-0.5 text-xs font-medium text-forest-800">
							{formatCutType(previewCutType)}
						</span>
					</div>
					<h3 class="mt-2 font-heading text-lg text-charcoal">{previewName}</h3>
					<p class="mt-1 text-sm text-charcoal-light line-clamp-2">{previewShortDesc}</p>
					<p class="mt-3 text-lg font-bold text-bark-700">
						{previewPrice > 0 ? formatPrice(previewPrice) : '$0.00'}
					</p>
				</div>
			</div>
		</div>
	</div>

	<div class="rounded-xl bg-white p-6 shadow-sm">
		<h2 class="mb-4 text-lg font-semibold text-charcoal">Display Settings</h2>
		<div class="grid gap-4 sm:grid-cols-3">
			<div>
				<label for="sort_order" class="block text-sm font-medium text-charcoal">Sort Order</label>
				<input type="number" id="sort_order" name="sort_order" value={getValue('sort_order', '0')} min="0" class={inputClass} />
				{#if getError('sort_order')}<p class="mt-1 text-sm text-red-600">{getError('sort_order')}</p>{/if}
			</div>
			<div class="flex items-center gap-3 pt-6">
				<input type="checkbox" id="featured" name="featured" checked={isChecked('featured')} class="h-4 w-4 rounded border-gray-300" />
				<label for="featured" class="text-sm font-medium text-charcoal">Featured</label>
			</div>
			<div class="flex items-center gap-3 pt-6">
				<input type="checkbox" id="active" name="active" checked={isChecked('active')} class="h-4 w-4 rounded border-gray-300" />
				<label for="active" class="text-sm font-medium text-charcoal">Active</label>
			</div>
		</div>
	</div>

	{#if getError('_form')}
		<p class="text-sm text-red-600">{getError('_form')}</p>
	{/if}

	<div class="flex items-center gap-4">
		<button
			type="submit"
			disabled={submitting}
			class="rounded-lg bg-bark-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-bark-700 disabled:opacity-50"
		>
			{#if submitting}
				{pendingFiles.length > 0 ? 'Uploading images...' : 'Saving...'}
			{:else}
				{product ? 'Update Product' : 'Create Product'}
			{/if}
		</button>
		<a href="/admin/products" class="text-sm text-charcoal-light hover:text-charcoal">Cancel</a>
	</div>
</form>
