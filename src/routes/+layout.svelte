<script lang="ts">
	import '../app.css';
	import AnnouncementBar from '../components/layout/AnnouncementBar.svelte';
	import Header from '../components/layout/Header.svelte';
	import Footer from '../components/layout/Footer.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<AnnouncementBar />
	<Header />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
