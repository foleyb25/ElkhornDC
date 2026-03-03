<script lang="ts">
	import Container from '../ui/Container.svelte';
	import NewsletterForm from '../forms/NewsletterForm.svelte';
</script>

<footer class="border-t border-bark-200 bg-bark-800 text-bark-100">
	<Container class="py-12">
		<div class="grid gap-8 md:grid-cols-4">
			<!-- Brand -->
			<div>
				<h3 class="font-heading text-xl text-white">Elkhorn Dog Chews</h3>
				<p class="mt-3 text-sm text-bark-300">
					Premium elk antler chews, personally sized for your dog. 100% natural, sustainably sourced.
				</p>
			</div>

			<!-- Quick Links -->
			<div>
				<h4 class="font-semibold text-white">Quick Links</h4>
				<nav class="mt-3 flex flex-col gap-2">
					<a href="/products" class="text-sm text-bark-300 hover:text-white">Products</a>
					<a href="/sizing-guide" class="text-sm text-bark-300 hover:text-white">Sizing Guide</a>
					<a href="/get-sized" class="text-sm text-bark-300 hover:text-white">Get Sized</a>
					<a href="/faq" class="text-sm text-bark-300 hover:text-white">FAQ</a>
				</nav>
			</div>

			<!-- Company -->
			<div>
				<h4 class="font-semibold text-white">Company</h4>
				<nav class="mt-3 flex flex-col gap-2">
					<a href="/about" class="text-sm text-bark-300 hover:text-white">About Us</a>
					<a href="/contact" class="text-sm text-bark-300 hover:text-white">Contact</a>
				</nav>
			</div>

			<!-- Newsletter -->
			<div>
				<h4 class="font-semibold text-white">Stay in the Loop</h4>
				<p class="mt-3 text-sm text-bark-300">Get updates on new products and sizing tips.</p>
				<div class="mt-4">
					<NewsletterForm />
				</div>
			</div>
		</div>

		<div class="mt-10 border-t border-bark-700 pt-6 text-center text-sm text-bark-400">
			&copy; {new Date().getFullYear()} Elkhorn Dog Chews. All rights reserved.
		</div>
	</Container>
</footer>
