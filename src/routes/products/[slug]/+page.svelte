<script lang="ts">
	import SEO from '../../../components/ui/SEO.svelte';
	import Container from '../../../components/ui/Container.svelte';
	import Button from '../../../components/ui/Button.svelte';
	import Badge from '../../../components/ui/Badge.svelte';
	import { formatPrice, formatSizeTier, formatCutType } from '$lib/utils';

	let { data } = $props();
	const product = $derived(data.product);
</script>

<SEO
	title={product.name}
	description={product.short_description}
/>

<section class="py-12">
	<Container>
		<!-- Breadcrumb -->
		<nav class="mb-8 text-sm text-charcoal-light">
			<a href="/products" class="hover:text-bark-600">Products</a>
			<span class="mx-2">/</span>
			<span class="text-charcoal">{product.name}</span>
		</nav>

		<div class="grid gap-10 md:grid-cols-2">
			<!-- Image -->
			<div class="aspect-square overflow-hidden rounded-xl bg-bark-100">
				{#if product.images.length > 0}
					<img
						src={product.images[0]}
						alt={product.name}
						class="h-full w-full object-cover"
					/>
				{:else}
					<div class="flex h-full items-center justify-center text-bark-300">
						<svg class="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
							<path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
						</svg>
					</div>
				{/if}
			</div>

			<!-- Product Info -->
			<div>
				<div class="flex gap-2">
					<Badge>{formatSizeTier(product.size_tier)}</Badge>
					<Badge variant="forest">{formatCutType(product.cut_type)}</Badge>
				</div>
				<h1 class="mt-4 font-heading text-3xl text-charcoal sm:text-4xl">{product.name}</h1>
				<p class="mt-2 text-3xl font-bold text-bark-700">{formatPrice(product.price_cents)}</p>

				<div class="mt-6 space-y-4 text-charcoal-light">
					<p>{product.description}</p>
				</div>

				<div class="mt-8 rounded-lg bg-bark-50 p-6">
					<h3 class="font-heading text-lg text-charcoal">Details</h3>
					<dl class="mt-3 space-y-2 text-sm">
						<div class="flex justify-between">
							<dt class="text-charcoal-light">Size</dt>
							<dd class="font-medium text-charcoal">{formatSizeTier(product.size_tier)}</dd>
						</div>
						<div class="flex justify-between">
							<dt class="text-charcoal-light">Cut Type</dt>
							<dd class="font-medium text-charcoal">{formatCutType(product.cut_type)}</dd>
						</div>
						<div class="flex justify-between">
							<dt class="text-charcoal-light">Chewer Level</dt>
							<dd class="font-medium text-charcoal">{product.chewer_level}</dd>
						</div>
						<div class="flex justify-between">
							<dt class="text-charcoal-light">Dog Weight Range</dt>
							<dd class="font-medium text-charcoal">{product.dog_weight_min}–{product.dog_weight_max} lbs</dd>
						</div>
					</dl>
				</div>

				<div class="mt-8">
					<Button href="/get-sized?product={encodeURIComponent(product.name)}" size="lg" class="w-full">
						Get Sized for This Chew
					</Button>
				</div>
				<p class="mt-3 text-center text-sm text-charcoal-light">
					We'll personally match this chew to your dog
				</p>
			</div>
		</div>
	</Container>
</section>
