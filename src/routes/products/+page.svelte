<script lang="ts">
	import SEO from '../../components/ui/SEO.svelte';
	import Container from '../../components/ui/Container.svelte';
	import SectionHeading from '../../components/ui/SectionHeading.svelte';
	import ProductFilter from '../../components/products/ProductFilter.svelte';
	import ProductGrid from '../../components/products/ProductGrid.svelte';

	let { data } = $props();
</script>

<SEO
	title="Products"
	description="Browse our full selection of premium elk antler dog chews. Available in small, medium, large, and x-large — whole or split."
/>

<section class="py-12">
	<Container>
		<SectionHeading
			title="Our Elk Antler Chews"
			subtitle="Every antler is hand-selected and sized for your dog"
		/>
		<div class="mt-8">
			<ProductFilter />
		</div>
		<div class="mt-8">
			<ProductGrid products={data.products} />
		</div>
	</Container>
</section>
