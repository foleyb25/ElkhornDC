<script lang="ts">
	import Button from '../ui/Button.svelte';
	import Container from '../ui/Container.svelte';
</script>

<section class="relative bg-bark-800 py-20 sm:py-28">
	<div class="absolute inset-0 bg-gradient-to-br from-bark-900/90 to-bark-700/80"></div>
	<Container class="relative z-10 text-center">
		<h1 class="font-heading text-4xl text-white sm:text-5xl lg:text-6xl">
			Premium Elk Antler Chews,<br />Sized Just for Your Dog
		</h1>
		<p class="mx-auto mt-6 max-w-2xl text-lg text-bark-200">
			Every dog is different. We personally assess your pup and recommend the perfect elk antler chew — 100% natural, long-lasting, and sustainably sourced.
		</p>
		<div class="mt-10 flex flex-wrap justify-center gap-4">
			<Button href="/products" size="lg">Browse Our Chews</Button>
			<Button href="/get-sized" variant="outline" size="lg" class="border-white text-white hover:bg-white/10">
				Get Sized
			</Button>
		</div>
	</Container>
</section>
