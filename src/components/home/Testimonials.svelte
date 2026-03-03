<script lang="ts">
	import Container from '../ui/Container.svelte';
	import SectionHeading from '../ui/SectionHeading.svelte';

	const testimonials = [
		{
			quote: "My German Shepherd destroys every toy in minutes. The elk antler from Elkhorn has lasted over a month and he's still obsessed with it.",
			author: 'Sarah M.',
			dog: 'Rex, German Shepherd'
		},
		{
			quote: "I loved that they actually asked about my dog before recommending a size. The split antler was perfect for my older Lab who loves to chew but has sensitive teeth.",
			author: 'Mike T.',
			dog: 'Buddy, Labrador Retriever'
		},
		{
			quote: "Finally a chew company that gets it. The personal sizing made all the difference — no more guessing at the pet store.",
			author: 'Jessica R.',
			dog: 'Luna, Golden Retriever'
		}
	];
</script>

<section class="bg-bark-50 py-16">
	<Container>
		<SectionHeading title="What Dog Parents Say" />
		<div class="mt-12 grid gap-8 md:grid-cols-3">
			{#each testimonials as t}
				<div class="rounded-xl bg-white p-6 shadow-sm">
					<div class="mb-4 text-bark-400">
						<svg class="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
							<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
						</svg>
					</div>
					<p class="text-charcoal-light">{t.quote}</p>
					<div class="mt-4 border-t border-bark-100 pt-4">
						<p class="font-semibold text-charcoal">{t.author}</p>
						<p class="text-sm text-charcoal-light">{t.dog}</p>
					</div>
				</div>
			{/each}
		</div>
	</Container>
</section>
