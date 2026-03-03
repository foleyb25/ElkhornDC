<script lang="ts">
	import type { Product } from '$lib/types';
	import { formatPrice, formatSizeTier, formatCutType } from '$lib/utils';
	import Badge from '../ui/Badge.svelte';

	interface Props {
		product: Product;
	}

	let { product }: Props = $props();
</script>

<a href="/products/{product.slug}" class="group block overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md">
	<div class="aspect-square bg-bark-100">
		{#if product.images.length > 0}
			<img
				src={product.images[0]}
				alt={product.name}
				class="h-full w-full object-cover transition-transform group-hover:scale-105"
			/>
		{:else}
			<div class="flex h-full items-center justify-center text-bark-300">
				<svg class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
					<path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
			</div>
		{/if}
	</div>
	<div class="p-4">
		<div class="flex gap-2">
			<Badge>{formatSizeTier(product.size_tier)}</Badge>
			<Badge variant="forest">{formatCutType(product.cut_type)}</Badge>
		</div>
		<h3 class="mt-2 font-heading text-lg text-charcoal">{product.name}</h3>
		<p class="mt-1 text-sm text-charcoal-light line-clamp-2">{product.short_description}</p>
		<p class="mt-3 text-lg font-bold text-bark-700">{formatPrice(product.price_cents)}</p>
	</div>
</a>
