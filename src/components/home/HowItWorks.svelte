<script lang="ts">
	import Container from '../ui/Container.svelte';
	import SectionHeading from '../ui/SectionHeading.svelte';

	const steps = [
		{
			number: '1',
			title: 'Browse Our Chews',
			desc: 'Explore our selection of premium elk antler chews in various sizes and cuts.'
		},
		{
			number: '2',
			title: 'Fill Out the Sizing Form',
			desc: "Tell us about your dog — breed, weight, age, and chewing style."
		},
		{
			number: '3',
			title: 'We Match Your Dog',
			desc: "Our team personally recommends the perfect chew and reaches out to finalize your order."
		}
	];
</script>

<section class="py-16">
	<Container>
		<SectionHeading title="How It Works" subtitle="Getting the right chew is easy" />
		<div class="mt-12 grid gap-8 md:grid-cols-3">
			{#each steps as step}
				<div class="text-center">
					<div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-bark-600 font-heading text-2xl text-white">
						{step.number}
					</div>
					<h3 class="mt-4 font-heading text-xl text-charcoal">{step.title}</h3>
					<p class="mt-2 text-charcoal-light">{step.desc}</p>
				</div>
			{/each}
		</div>
	</Container>
</section>
