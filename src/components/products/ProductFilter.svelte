<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const sizes = ['small', 'medium', 'large', 'x-large'] as const;
	const cuts = ['whole', 'split'] as const;

	const sizeLabels: Record<string, string> = {
		small: 'Small',
		medium: 'Medium',
		large: 'Large',
		'x-large': 'X-Large'
	};

	let currentSize = $derived($page.url.searchParams.get('size') || '');
	let currentCut = $derived($page.url.searchParams.get('cut') || '');

	function setFilter(key: string, value: string) {
		const params = new URLSearchParams($page.url.searchParams);
		if (params.get(key) === value) {
			params.delete(key);
		} else {
			params.set(key, value);
		}
		goto(`/products?${params.toString()}`, { replaceState: true });
	}
</script>

<div class="flex flex-wrap gap-4">
	<div>
		<span class="mr-2 text-sm font-medium text-charcoal-light">Size:</span>
		{#each sizes as size}
			<button
				onclick={() => setFilter('size', size)}
				class="mr-1 rounded-full px-4 py-1.5 text-sm font-medium transition-colors {currentSize === size
					? 'bg-bark-600 text-white'
					: 'bg-bark-100 text-bark-700 hover:bg-bark-200'}"
			>
				{sizeLabels[size]}
			</button>
		{/each}
	</div>
	<div>
		<span class="mr-2 text-sm font-medium text-charcoal-light">Cut:</span>
		{#each cuts as cut}
			<button
				onclick={() => setFilter('cut', cut)}
				class="mr-1 rounded-full px-4 py-1.5 text-sm font-medium transition-colors {currentCut === cut
					? 'bg-forest-600 text-white'
					: 'bg-forest-100 text-forest-700 hover:bg-forest-200'}"
			>
				{cut.charAt(0).toUpperCase() + cut.slice(1)}
			</button>
		{/each}
	</div>
</div>
