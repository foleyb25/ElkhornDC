<script lang="ts">
	import SEO from '../../components/ui/SEO.svelte';
	import Container from '../../components/ui/Container.svelte';
	import Button from '../../components/ui/Button.svelte';

	const sections = [
		{
			title: 'About Our Chews',
			questions: [
				{
					q: 'What are elk antler chews?',
					a: 'Elk antler chews are 100% natural dog chews made from naturally shed elk antlers. They are rich in calcium, phosphorus, and other minerals. Unlike rawhide or bones, they do not splinter and leave no greasy residue.'
				},
				{
					q: 'Are elk antler chews safe for dogs?',
					a: 'Yes! Elk antlers are one of the safest natural chews available. They do not splinter like cooked bones and are free of chemicals and artificial ingredients. As with any chew, we recommend supervising your dog and removing the antler once it becomes small enough to swallow.'
				},
				{
					q: 'How long do elk antler chews last?',
					a: "It depends on your dog's chewing style. Light chewers may enjoy a single antler for months, while heavy chewers may go through one in a few weeks. Whole antlers generally last longer than split antlers."
				},
				{
					q: 'What is the difference between whole and split antlers?',
					a: 'Whole antlers have the outer shell intact, making them more durable and longer-lasting. Split antlers are cut lengthwise to expose the marrow, providing instant gratification and a slightly easier chew. Split antlers are great for puppies, seniors, and light chewers.'
				}
			]
		},
		{
			title: 'Sizing & Ordering',
			questions: [
				{
					q: 'How do I order?',
					a: "We take a consultation approach rather than traditional e-commerce. Browse our products to see what we offer, then fill out our Sizing Form with details about your dog. Our team personally reviews every request, recommends the right chew, and reaches out within 24 hours to finalize your order and arrange payment."
				},
				{
					q: 'How do you determine the right size?',
					a: "We consider your dog's breed, weight, age, and chewing style. Our team has matched hundreds of dogs with the right antler, and we take the guesswork out of the process."
				},
				{
					q: 'How much does shipping cost?',
					a: 'Shipping costs vary based on your location and order size. We will provide shipping details when we reach out to finalize your order.'
				},
				{
					q: 'Can I order multiple chews?',
					a: 'Absolutely! You can specify the quantity on the sizing form. If you have multiple dogs, feel free to submit a separate form for each or mention all dogs in the notes.'
				}
			]
		},
		{
			title: 'About Elk Antlers',
			questions: [
				{
					q: 'Where do your antlers come from?',
					a: 'All of our antlers are naturally shed and sourced from the Rocky Mountain region of the United States. Elk naturally shed and regrow their antlers each year, making this a fully sustainable and cruelty-free process.'
				},
				{
					q: 'Are any animals harmed?',
					a: 'No. Elk naturally shed their antlers every spring. Our collectors gather these shed antlers from the wild. No animals are harmed or farmed for our products.'
				},
				{
					q: 'How are the antlers processed?',
					a: 'Each antler is cleaned and sanitized using only hot water — no chemicals, bleaches, or artificial preservatives. We then inspect each piece for quality and safety before cutting to size.'
				}
			]
		}
	];
</script>

<SEO
	title="FAQ"
	description="Frequently asked questions about elk antler dog chews, our sizing process, ordering, and more."
/>

<section class="py-12">
	<Container class="max-w-3xl">
		<div class="text-center">
			<h1 class="font-heading text-3xl text-charcoal sm:text-4xl">Frequently Asked Questions</h1>
			<p class="mt-4 text-lg text-charcoal-light">
				Everything you need to know about our elk antler chews and how ordering works.
			</p>
		</div>

		<div class="mt-10 space-y-10">
			{#each sections as section}
				<div>
					<h2 class="font-heading text-2xl text-charcoal">{section.title}</h2>
					<div class="mt-4 space-y-2">
						{#each section.questions as faq}
							<details class="group rounded-lg bg-white shadow-sm">
								<summary class="cursor-pointer px-6 py-4 font-medium text-charcoal hover:text-bark-700">
									{faq.q}
								</summary>
								<div class="px-6 pb-4 text-charcoal-light">
									{faq.a}
								</div>
							</details>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<div class="mt-12 text-center">
			<p class="text-lg text-charcoal-light">Have a question that's not listed here?</p>
			<div class="mt-4">
				<Button href="/contact" variant="outline">Contact Us</Button>
			</div>
		</div>
	</Container>
</section>
