<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: className = '', children }: Props = $props();
</script>

<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 {className}">
	{@render children()}
</div>
