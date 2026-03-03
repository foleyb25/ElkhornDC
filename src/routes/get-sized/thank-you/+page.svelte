<script lang="ts">
	import { page } from '$app/stores';
	import SEO from '../../../components/ui/SEO.svelte';
	import Container from '../../../components/ui/Container.svelte';
	import Button from '../../../components/ui/Button.svelte';

	const name = $derived($page.url.searchParams.get('name') || 'there');
</script>

<SEO
	title="Thank You"
	description="Your sizing request has been submitted. We'll be in touch within 24 hours."
/>

<section class="py-20">
	<Container class="max-w-2xl text-center">
		<div class="text-5xl">🎉</div>
		<h1 class="mt-6 font-heading text-3xl text-charcoal sm:text-4xl">
			Thank You, {name}!
		</h1>
		<p class="mt-4 text-lg text-charcoal-light">
			We've received your sizing request and our team is already reviewing it. We'll be in touch within <strong class="text-charcoal">24 hours</strong> with a personalized recommendation.
		</p>
		<p class="mt-2 text-charcoal-light">
			Check your email for a confirmation.
		</p>

		<div class="mt-10 flex flex-wrap justify-center gap-4">
			<Button href="/sizing-guide" variant="outline">Sizing Guide</Button>
			<Button href="/faq" variant="outline">FAQ</Button>
			<Button href="/products">Browse Products</Button>
		</div>
	</Container>
</section>
