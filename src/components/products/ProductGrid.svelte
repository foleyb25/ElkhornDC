<script lang="ts">
	import type { Product } from '$lib/types';
	import ProductCard from './ProductCard.svelte';

	interface Props {
		products: Product[];
	}

	let { products }: Props = $props();
</script>

{#if products.length === 0}
	<div class="py-12 text-center">
		<p class="text-lg text-charcoal-light">No products match your filters.</p>
		<a href="/products" class="mt-2 inline-block text-bark-600 underline hover:text-bark-700">Clear filters</a>
	</div>
{:else}
	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each products as product}
			<ProductCard {product} />
		{/each}
	</div>
{/if}
