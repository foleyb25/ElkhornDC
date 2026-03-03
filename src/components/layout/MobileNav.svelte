<script lang="ts">
	import Button from '../ui/Button.svelte';

	interface Props {
		open: boolean;
		navLinks: { href: string; label: string }[];
	}

	let { open = $bindable(), navLinks }: Props = $props();
</script>

{#if open}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 z-50 bg-charcoal/50"
		onclick={() => (open = false)}
		onkeydown={(e) => e.key === 'Escape' && (open = false)}
		role="button"
		tabindex="-1"
		aria-label="Close menu"
	></div>

	<!-- Drawer -->
	<div class="fixed inset-y-0 right-0 z-50 w-72 bg-cream shadow-xl">
		<div class="flex items-center justify-between border-b border-bark-200 px-4 py-4">
			<img src="/images/logo_alternate.JPG" alt="Elkhorn Dog Chews" class="h-10 w-auto" />
			<button
				onclick={() => (open = false)}
				class="rounded-md p-2 text-charcoal hover:bg-bark-100"
				aria-label="Close menu"
			>
				<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>

		<nav class="flex flex-col gap-1 p-4">
			{#each navLinks as link}
				<a
					href={link.href}
					class="rounded-lg px-4 py-3 text-base font-medium text-charcoal-light transition-colors hover:bg-bark-100 hover:text-bark-700"
					onclick={() => (open = false)}
				>
					{link.label}
				</a>
			{/each}
			<div class="mt-4">
				<Button href="/get-sized" class="w-full" onclick={() => (open = false)}>Get Sized</Button>
			</div>
		</nav>
	</div>
{/if}
