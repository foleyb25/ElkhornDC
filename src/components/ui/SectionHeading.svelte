<script lang="ts">
	interface Props {
		title: string;
		subtitle?: string;
		centered?: boolean;
	}

	let { title, subtitle = '', centered = true }: Props = $props();
</script>

<div class={centered ? 'text-center' : ''}>
	<h2 class="font-heading text-3xl text-charcoal sm:text-4xl">{title}</h2>
	{#if subtitle}
		<p class="mx-auto mt-4 max-w-2xl text-lg text-charcoal-light">{subtitle}</p>
	{/if}
</div>
