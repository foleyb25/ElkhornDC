<script lang="ts">
	import Container from '../ui/Container.svelte';
	import NewsletterForm from '../forms/NewsletterForm.svelte';
</script>

<footer class="border-t border-bark-200 bg-white">
	<Container class="py-12">
		<div class="grid gap-8 md:grid-cols-4">
			<!-- Brand -->
			<div>
				<img src="/images/logo_alternate.JPG" alt="Elkhorn Dog Chews" class="h-14 w-auto" />
				<p class="mt-3 text-sm text-charcoal-light">
					Premium elk antler chews, personally sized for your dog. 100% natural, sustainably sourced.
				</p>
			</div>

			<!-- Quick Links -->
			<div>
				<h4 class="font-semibold text-charcoal">Quick Links</h4>
				<nav class="mt-3 flex flex-col gap-2">
					<a href="/products" class="text-sm text-charcoal-light hover:text-charcoal">Products</a>
					<a href="/sizing-guide" class="text-sm text-charcoal-light hover:text-charcoal">Sizing Guide</a>
					<a href="/get-sized" class="text-sm text-charcoal-light hover:text-charcoal">Get Sized</a>
					<a href="/faq" class="text-sm text-charcoal-light hover:text-charcoal">FAQ</a>
				</nav>
			</div>

			<!-- Company -->
			<div>
				<h4 class="font-semibold text-charcoal">Company</h4>
				<nav class="mt-3 flex flex-col gap-2">
					<a href="/about" class="text-sm text-charcoal-light hover:text-charcoal">About Us</a>
					<a href="/contact" class="text-sm text-charcoal-light hover:text-charcoal">Contact</a>
				</nav>
			</div>

			<!-- Newsletter -->
			<div>
				<h4 class="font-semibold text-charcoal">Stay in the Loop</h4>
				<p class="mt-3 text-sm text-charcoal-light">Get updates on new products and sizing tips.</p>
				<div class="mt-4">
					<NewsletterForm />
				</div>
			</div>
		</div>

		<div class="mt-10 border-t border-bark-200 pt-6 text-center text-sm text-charcoal-light">
			&copy; {new Date().getFullYear()} Elkhorn Dog Chews. All rights reserved.
		</div>
	</Container>
</footer>
