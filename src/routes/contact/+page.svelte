<script lang="ts">
	import SEO from '../../components/ui/SEO.svelte';
	import Container from '../../components/ui/Container.svelte';
	import ContactForm from '../../components/forms/ContactForm.svelte';

	let { form } = $props();
</script>

<SEO
	title="Contact"
	description="Get in touch with Elkhorn Dog Chews. Have a question about our elk antler chews or need help with an order? We'd love to hear from you."
/>

<section class="py-12">
	<Container class="max-w-2xl">
		<div class="text-center">
			<h1 class="font-heading text-3xl text-charcoal sm:text-4xl">Contact Us</h1>
			<p class="mt-4 text-lg text-charcoal-light">
				Have a question? Need help with an order? We'd love to hear from you.
			</p>
		</div>
		<div class="mt-10">
			<ContactForm {form} />
		</div>
	</Container>
</section>
