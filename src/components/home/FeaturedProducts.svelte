<script lang="ts">
	import type { Product } from '$lib/types';
	import Container from '../ui/Container.svelte';
	import SectionHeading from '../ui/SectionHeading.svelte';
	import ProductCard from '../products/ProductCard.svelte';
	import Button from '../ui/Button.svelte';

	interface Props {
		products: Product[];
	}

	let { products }: Props = $props();
</script>

<section class="bg-white py-16">
	<Container>
		<SectionHeading title="Featured Chews" subtitle="Hand-picked favorites from our collection" />
		<div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each products as product}
				<ProductCard {product} />
			{/each}
		</div>
		<div class="mt-10 text-center">
			<Button href="/products" variant="outline">View All Products</Button>
		</div>
	</Container>
</section>
