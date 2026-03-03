<script lang="ts">
	import { enhance } from '$app/forms';
	import { formatPrice, formatSizeTier, formatCutType } from '$lib/utils';
	import type { Product } from '$lib/types';

	let { data } = $props();

	let deleteTarget = $state<Product | null>(null);
	let deleting = $state(false);
</script>

<svelte:head>
	<title>Products | Elkhorn Admin</title>
</svelte:head>

<div>
	<div class="flex items-center justify-between">
		<h1 class="font-heading text-3xl text-charcoal">Products</h1>
		<a
			href="/admin/products/new"
			class="rounded-lg bg-bark-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-bark-700"
		>
			Add Product
		</a>
	</div>

	<div class="mt-6 overflow-x-auto rounded-xl bg-white shadow-sm">
		<table class="w-full text-left text-sm">
			<thead class="border-b border-gray-200 bg-gray-50">
				<tr>
					<th class="px-4 py-3 font-medium text-charcoal-light">Name</th>
					<th class="px-4 py-3 font-medium text-charcoal-light">Size</th>
					<th class="px-4 py-3 font-medium text-charcoal-light">Cut</th>
					<th class="px-4 py-3 font-medium text-charcoal-light">Price</th>
					<th class="px-4 py-3 font-medium text-charcoal-light">Active</th>
					<th class="px-4 py-3 font-medium text-charcoal-light">Featured</th>
					<th class="px-4 py-3 font-medium text-charcoal-light">Sort</th>
					<th class="px-4 py-3 font-medium text-charcoal-light">Actions</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-100">
				{#each data.products as product}
					<tr class="hover:bg-gray-50">
						<td class="px-4 py-3 font-medium text-charcoal">{product.name}</td>
						<td class="px-4 py-3 text-charcoal-light">{formatSizeTier(product.size_tier)}</td>
						<td class="px-4 py-3 text-charcoal-light">{formatCutType(product.cut_type)}</td>
						<td class="px-4 py-3 text-charcoal-light">{formatPrice(product.price_cents)}</td>
						<td class="px-4 py-3">
							<span
								class="inline-block rounded-full px-2 py-0.5 text-xs font-medium {product.active
									? 'bg-forest-100 text-forest-700'
									: 'bg-gray-100 text-gray-600'}"
							>
								{product.active ? 'Yes' : 'No'}
							</span>
						</td>
						<td class="px-4 py-3">
							<span
								class="inline-block rounded-full px-2 py-0.5 text-xs font-medium {product.featured
									? 'bg-bark-100 text-bark-700'
									: 'bg-gray-100 text-gray-600'}"
							>
								{product.featured ? 'Yes' : 'No'}
							</span>
						</td>
						<td class="px-4 py-3 text-charcoal-light">{product.sort_order}</td>
						<td class="px-4 py-3">
							<div class="flex items-center gap-2">
								<a
									href="/admin/products/{product.id}/edit"
									class="text-sm font-medium text-bark-600 hover:text-bark-700"
								>
									Edit
								</a>
								<button
									type="button"
									onclick={() => (deleteTarget = product)}
									class="text-sm font-medium text-red-600 hover:text-red-700"
								>
									Delete
								</button>
							</div>
						</td>
					</tr>
				{/each}
				{#if data.products.length === 0}
					<tr>
						<td colspan="8" class="px-4 py-8 text-center text-charcoal-light">
							No products found. <a href="/admin/products/new" class="text-bark-600 hover:underline">Add one</a>.
						</td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>
</div>

{#if deleteTarget}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
		onkeydown={(e) => { if (e.key === 'Escape') deleteTarget = null; }}
	>
		<div class="mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
			<h2 class="text-lg font-semibold text-charcoal">Delete Product</h2>
			<p class="mt-2 text-sm text-charcoal-light">
				Are you sure you want to delete <strong class="text-charcoal">{deleteTarget.name}</strong>? This action cannot be undone.
			</p>
			<div class="mt-6 flex justify-end gap-3">
				<button
					type="button"
					onclick={() => (deleteTarget = null)}
					disabled={deleting}
					class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:bg-gray-50"
				>
					Cancel
				</button>
				<form
					method="POST"
					action="?/delete"
					use:enhance={() => {
						deleting = true;
						return async ({ update }) => {
							await update();
							deleting = false;
							deleteTarget = null;
						};
					}}
				>
					<input type="hidden" name="id" value={deleteTarget.id} />
					<button
						type="submit"
						disabled={deleting}
						class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
					>
						{deleting ? 'Deleting...' : 'Delete'}
					</button>
				</form>
			</div>
		</div>
	</div>
{/if}
