<script lang="ts">
	import type { Snippet } from 'svelte';
	import AdminSidebar from '../../../components/admin/AdminSidebar.svelte';

	let { data, children }: { data: { user: { email: string } | null }; children: Snippet } =
		$props();
</script>

{#if data.user}
	<div class="flex min-h-screen bg-gray-100">
		<AdminSidebar email={data.user.email ?? ''} />
		<main class="flex-1 p-8">
			{@render children()}
		</main>
	</div>
{:else}
	<div class="flex min-h-screen items-center justify-center bg-gray-100">
		{@render children()}
	</div>
{/if}
