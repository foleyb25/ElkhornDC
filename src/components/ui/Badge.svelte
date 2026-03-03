<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'bark' | 'forest' | 'neutral';
		children: Snippet;
	}

	let { variant = 'bark', children }: Props = $props();

	const variantClasses = {
		bark: 'bg-bark-100 text-bark-800',
		forest: 'bg-forest-100 text-forest-800',
		neutral: 'bg-gray-100 text-gray-800'
	};
</script>

<span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium {variantClasses[variant]}">
	{@render children()}
</span>
