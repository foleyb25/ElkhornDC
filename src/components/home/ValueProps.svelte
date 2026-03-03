<script lang="ts">
	import Container from '../ui/Container.svelte';

	const props = [
		{
			icon: '🦌',
			title: '100% Natural',
			desc: 'No chemicals, no additives. Just pure elk antler.'
		},
		{
			icon: '🇺🇸',
			title: 'USA Sourced',
			desc: 'Naturally shed antlers from the Rocky Mountain region.'
		},
		{
			icon: '🏔️',
			title: 'Elk Antler Only',
			desc: 'We specialize in elk — the premium choice for dog chews.'
		},
		{
			icon: '📏',
			title: 'Personally Sized',
			desc: 'Every chew is matched to your dog by our team.'
		}
	];
</script>

<section class="bg-white py-16">
	<Container>
		<div class="grid grid-cols-2 gap-8 lg:grid-cols-4">
			{#each props as prop}
				<div class="text-center">
					<div class="text-4xl">{prop.icon}</div>
					<h3 class="mt-3 font-heading text-lg text-charcoal">{prop.title}</h3>
					<p class="mt-1 text-sm text-charcoal-light">{prop.desc}</p>
				</div>
			{/each}
		</div>
	</Container>
</section>
