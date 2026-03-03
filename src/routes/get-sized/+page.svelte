<script lang="ts">
	import SEO from '../../components/ui/SEO.svelte';
	import Container from '../../components/ui/Container.svelte';
	import SizingForm from '../../components/forms/SizingForm.svelte';

	let { data, form } = $props();
</script>

<SEO
	title="Get Sized"
	description="Tell us about your dog and we'll personally recommend the perfect elk antler chew. Fill out our sizing form to get started."
/>

<section class="py-12">
	<Container class="max-w-3xl">
		<div class="text-center">
			<h1 class="font-heading text-3xl text-charcoal sm:text-4xl">Get Sized for Your Dog</h1>
			<p class="mt-4 text-lg text-charcoal-light">
				Tell us about your pup and we'll recommend the perfect elk antler chew. We personally review every request and reach out within 24 hours.
			</p>
		</div>
		<div class="mt-10">
			<SizingForm {form} productOfInterest={data.productOfInterest} />
		</div>
	</Container>
</section>
