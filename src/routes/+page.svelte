<script lang="ts">
	import SEO from '../components/ui/SEO.svelte';
	import Hero from '../components/home/Hero.svelte';
	import ValueProps from '../components/home/ValueProps.svelte';
	import HowItWorks from '../components/home/HowItWorks.svelte';
	import FeaturedProducts from '../components/home/FeaturedProducts.svelte';
	import BrandStory from '../components/home/BrandStory.svelte';
	import Testimonials from '../components/home/Testimonials.svelte';

	let { data } = $props();
</script>

<SEO
	title="Elkhorn Dog Chews"
	description="Premium elk antler dog chews, personally sized for your dog. 100% natural, sustainably sourced from the Rocky Mountain region."
/>

<Hero />
<ValueProps />
<HowItWorks />
<FeaturedProducts products={data.featuredProducts} />
<BrandStory />
<Testimonials />
