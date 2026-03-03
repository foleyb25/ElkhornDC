<script lang="ts">
	import SEO from '../../components/ui/SEO.svelte';
	import Container from '../../components/ui/Container.svelte';
	import Button from '../../components/ui/Button.svelte';
</script>

<SEO
	title="Sizing Guide"
	description="Find the right elk antler chew for your dog. Our sizing guide covers weight ranges, chewing styles, and whole vs. split cuts."
/>

<section class="py-12">
	<Container class="max-w-4xl">
		<div class="text-center">
			<h1 class="font-heading text-3xl text-charcoal sm:text-4xl">Sizing Guide</h1>
			<p class="mt-4 text-lg text-charcoal-light">
				Finding the right antler starts with understanding your dog. Use this guide to learn about our sizes, cuts, and which is best for your pup.
			</p>
		</div>

		<!-- Size Chart -->
		<div class="mt-12">
			<h2 class="font-heading text-2xl text-charcoal">Size Chart</h2>
			<div class="mt-4 overflow-x-auto">
				<table class="w-full border-collapse text-left">
					<thead>
						<tr class="border-b-2 border-bark-200">
							<th class="px-4 py-3 text-sm font-semibold text-charcoal">Size</th>
							<th class="px-4 py-3 text-sm font-semibold text-charcoal">Dog Weight</th>
							<th class="px-4 py-3 text-sm font-semibold text-charcoal">Cut Types</th>
							<th class="px-4 py-3 text-sm font-semibold text-charcoal">Best For</th>
						</tr>
					</thead>
					<tbody>
						<tr class="border-b border-bark-100">
							<td class="px-4 py-3 font-medium text-charcoal">Small</td>
							<td class="px-4 py-3 text-charcoal-light">5–20 lbs</td>
							<td class="px-4 py-3 text-charcoal-light">Whole &amp; Split</td>
							<td class="px-4 py-3 text-charcoal-light">Chihuahuas, Yorkies, Dachshunds, Puppies</td>
						</tr>
						<tr class="border-b border-bark-100 bg-bark-50">
							<td class="px-4 py-3 font-medium text-charcoal">Medium</td>
							<td class="px-4 py-3 text-charcoal-light">20–50 lbs</td>
							<td class="px-4 py-3 text-charcoal-light">Whole &amp; Split</td>
							<td class="px-4 py-3 text-charcoal-light">Beagles, Bulldogs, Corgis, Cocker Spaniels</td>
						</tr>
						<tr class="border-b border-bark-100">
							<td class="px-4 py-3 font-medium text-charcoal">Large</td>
							<td class="px-4 py-3 text-charcoal-light">50–90 lbs</td>
							<td class="px-4 py-3 text-charcoal-light">Whole &amp; Split</td>
							<td class="px-4 py-3 text-charcoal-light">Labs, Golden Retrievers, German Shepherds</td>
						</tr>
						<tr class="bg-bark-50">
							<td class="px-4 py-3 font-medium text-charcoal">X-Large</td>
							<td class="px-4 py-3 text-charcoal-light">90+ lbs</td>
							<td class="px-4 py-3 text-charcoal-light">Whole &amp; Split</td>
							<td class="px-4 py-3 text-charcoal-light">Great Danes, Mastiffs, St. Bernards</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- Chewing Styles -->
		<div class="mt-12">
			<h2 class="font-heading text-2xl text-charcoal">How to Determine Chewing Style</h2>
			<div class="mt-4 space-y-4">
				<div class="rounded-lg bg-white p-5 shadow-sm">
					<h3 class="font-semibold text-charcoal">Light Chewer</h3>
					<p class="mt-1 text-charcoal-light">Your dog nibbles gently, takes their time, and is content to lick and gnaw rather than crunch. Toys and chews last a long time. Best with split antlers for easy access to marrow.</p>
				</div>
				<div class="rounded-lg bg-white p-5 shadow-sm">
					<h3 class="font-semibold text-charcoal">Moderate Chewer</h3>
					<p class="mt-1 text-charcoal-light">Your dog enjoys a good chew session but doesn't obsessively destroy toys. Chews typically last weeks. Works well with either whole or split antlers.</p>
				</div>
				<div class="rounded-lg bg-white p-5 shadow-sm">
					<h3 class="font-semibold text-charcoal">Heavy Chewer</h3>
					<p class="mt-1 text-charcoal-light">Your dog actively seeks things to chew and goes through most toys and chews relatively quickly. Whole antlers are recommended for longer-lasting enjoyment.</p>
				</div>
				<div class="rounded-lg bg-white p-5 shadow-sm">
					<h3 class="font-semibold text-charcoal">Extreme Chewer</h3>
					<p class="mt-1 text-charcoal-light">Your dog destroys everything — plush toys last seconds, rubber toys last days at best. Whole antlers in a size up are strongly recommended.</p>
				</div>
			</div>
		</div>

		<!-- Whole vs Split -->
		<div class="mt-12">
			<h2 class="font-heading text-2xl text-charcoal">Whole vs. Split</h2>
			<div class="mt-4 grid gap-6 md:grid-cols-2">
				<div class="rounded-lg bg-white p-6 shadow-sm">
					<h3 class="font-heading text-xl text-charcoal">Whole Antler</h3>
					<ul class="mt-3 space-y-2 text-charcoal-light">
						<li>Longer-lasting — dog must work to reach marrow</li>
						<li>Best for moderate to extreme chewers</li>
						<li>More durable outer shell intact</li>
						<li>Great for dogs who need extended stimulation</li>
					</ul>
				</div>
				<div class="rounded-lg bg-white p-6 shadow-sm">
					<h3 class="font-heading text-xl text-charcoal">Split Antler</h3>
					<ul class="mt-3 space-y-2 text-charcoal-light">
						<li>Marrow is immediately accessible</li>
						<li>Best for light to moderate chewers</li>
						<li>Great introduction to antler chews</li>
						<li>Good for puppies and senior dogs</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="mt-12 text-center">
			<p class="text-lg text-charcoal-light">Not sure which is right? Let us help!</p>
			<div class="mt-4">
				<Button href="/get-sized" size="lg">Get Sized</Button>
			</div>
		</div>
	</Container>
</section>
