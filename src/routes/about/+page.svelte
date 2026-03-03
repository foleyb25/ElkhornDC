<script lang="ts">
	import SEO from '../../components/ui/SEO.svelte';
	import Container from '../../components/ui/Container.svelte';
	import Button from '../../components/ui/Button.svelte';
</script>

<SEO
	title="About"
	description="Learn about Elkhorn Dog Chews — our story, our sourcing, and why we personally size every chew for your dog."
/>

<section class="py-12">
	<Container class="max-w-3xl">
		<div class="text-center">
			<h1 class="font-heading text-3xl text-charcoal sm:text-4xl">About Elkhorn Dog Chews</h1>
		</div>

		<div class="mt-10 space-y-8 text-lg leading-relaxed text-charcoal-light">
			<p>
				Elkhorn Dog Chews started with a simple observation: most dog owners are guessing when it comes to picking the right chew. They're standing in a pet store aisle, overwhelmed by options, hoping whatever they grab will work. More often than not, it doesn't — it's too small, too hard, or gets destroyed in five minutes.
			</p>
			<p>
				We decided to do things differently. Instead of selling chews off a shelf, we take a consultation approach. You tell us about your dog — their breed, weight, age, and chewing style — and we personally recommend the right elk antler chew. No guesswork, no returns, just the right match every time.
			</p>

			<h2 class="font-heading text-2xl text-charcoal">Why Elk Antlers?</h2>
			<p>
				Elk antlers are nature's perfect dog chew. They're incredibly durable, packed with calcium, phosphorus, and other minerals, and they don't splinter like bones or leave greasy residue like rawhide. Unlike other animal antlers, elk antlers have a higher marrow-to-shell ratio, making them more rewarding and engaging for dogs.
			</p>
			<p>
				Best of all, elk shed their antlers naturally every year. That means our chews are 100% sustainable — no animals are harmed in the process.
			</p>

			<h2 class="font-heading text-2xl text-charcoal">Our Sourcing</h2>
			<p>
				Every antler we sell is naturally shed and sourced from the Rocky Mountain region of the United States. We work with trusted collectors who gather shed antlers in a sustainable and ethical manner. Each antler is then cleaned, inspected, and cut without any chemicals or artificial processing.
			</p>

			<h2 class="font-heading text-2xl text-charcoal">Our Quality Process</h2>
			<p>
				Not every antler makes the cut. We inspect each one for density, freshness, and structural integrity. Antlers with cracks, sharp points, or excessive wear are discarded. What remains is a premium, safe chew that we're proud to recommend for your dog.
			</p>
		</div>

		<div class="mt-12 text-center">
			<p class="text-lg text-charcoal-light">Ready to find the perfect chew?</p>
			<div class="mt-4">
				<Button href="/get-sized" size="lg">Get Sized</Button>
			</div>
		</div>
	</Container>
</section>
