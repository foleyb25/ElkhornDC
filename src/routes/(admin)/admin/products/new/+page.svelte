<script lang="ts">
	import ProductForm from '../../../../../components/admin/ProductForm.svelte';

	let { form } = $props();
</script>

<svelte:head>
	<title>Add Product | Elkhorn Admin</title>
</svelte:head>

<div>
	<div class="mb-6">
		<a href="/admin/products" class="text-sm text-charcoal-light hover:text-charcoal">&larr; Back to Products</a>
		<h1 class="mt-2 font-heading text-3xl text-charcoal">Add Product</h1>
	</div>

	<ProductForm {form} />
</div>
