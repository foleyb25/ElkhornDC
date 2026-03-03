<script lang="ts">
	import MobileNav from './MobileNav.svelte';
	import Button from '../ui/Button.svelte';

	let mobileOpen = $state(false);

	const navLinks = [
		{ href: '/products', label: 'Products' },
		{ href: '/sizing-guide', label: 'Sizing Guide' },
		{ href: '/about', label: 'About' },
		{ href: '/faq', label: 'FAQ' },
		{ href: '/contact', label: 'Contact' }
	];
</script>

<header class="sticky top-0 z-40 border-b border-bark-200 bg-cream">
	<div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
		<a href="/" class="font-heading text-2xl text-bark-800">Elkhorn Dog Chews</a>

		<nav class="hidden items-center gap-8 md:flex">
			{#each navLinks as link}
				<a href={link.href} class="text-sm font-medium text-charcoal-light transition-colors hover:text-bark-700">
					{link.label}
				</a>
			{/each}
			<Button href="/get-sized" size="sm">Get Sized</Button>
		</nav>

		<button
			class="inline-flex items-center justify-center rounded-md p-2 text-charcoal hover:bg-bark-100 md:hidden"
			onclick={() => (mobileOpen = true)}
			aria-label="Open menu"
		>
			<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
			</svg>
		</button>
	</div>
</header>

<MobileNav bind:open={mobileOpen} {navLinks} />
