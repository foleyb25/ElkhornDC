<script lang="ts">
	interface Props {
		title: string;
		description: string;
		canonical?: string;
	}

	let { title, description, canonical = '' }: Props = $props();

	const fullTitle = $derived(title === 'Elkhorn Dog Chews' ? title : `${title} | Elkhorn Dog Chews`);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	{#if canonical}
		<link rel="canonical" href={canonical} />
	{/if}
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
</svelte:head>
