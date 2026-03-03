<script lang="ts">
	import Container from '../ui/Container.svelte';
	import Button from '../ui/Button.svelte';
</script>

<section class="py-16">
	<Container>
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="font-heading text-3xl text-charcoal sm:text-4xl">Our Story</h2>
			<p class="mt-6 text-lg leading-relaxed text-charcoal-light">
				Elkhorn Dog Chews was born from a simple belief: every dog deserves a safe, natural chew that's perfectly matched to their size and chewing style. We source naturally shed elk antlers from the Rocky Mountain region and personally assess each order to ensure your pup gets exactly the right fit. No mass production, no guesswork — just quality antlers and personal service.
			</p>
			<div class="mt-8">
				<Button href="/about" variant="outline">Read Our Story</Button>
			</div>
		</div>
	</Container>
</section>
