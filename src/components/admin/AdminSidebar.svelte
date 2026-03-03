<script lang="ts">
	import { page } from '$app/state';
	import { enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';

	interface Props {
		email: string;
	}

	let { email }: Props = $props();

	const navItems = [
		{ href: '/admin', label: 'Dashboard', icon: 'grid' },
		{ href: '/admin/products', label: 'Products', icon: 'package' }
	];

	function isActive(href: string): boolean {
		if (href === '/admin') return page.url.pathname === '/admin';
		return page.url.pathname.startsWith(href);
	}
</script>

<aside class="flex w-64 flex-col bg-charcoal text-white">
	<div class="border-b border-white/10 p-6">
		<div class="flex items-center gap-3">
			<img src="/images/logo_primary.PNG" alt="Elkhorn Dog Chews" class="h-10 w-10 rounded-full bg-white p-0.5" />
			<span class="text-sm font-semibold text-white/80">Admin</span>
		</div>
	</div>

	<nav class="flex-1 p-4">
		<ul class="space-y-1">
			{#each navItems as item}
				<li>
					<a
						href={item.href}
						class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
							{isActive(item.href)
							? 'bg-white/10 text-white'
							: 'text-white/60 hover:bg-white/5 hover:text-white'}"
					>
						{#if item.icon === 'grid'}
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
								/>
							</svg>
						{:else}
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
								/>
							</svg>
						{/if}
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="border-t border-white/10 p-4">
		<p class="mb-3 truncate text-sm text-white/60">{email}</p>
		<form method="POST" action="/admin/logout" use:enhance={() => {
			return async () => {
				await invalidateAll();
				await goto('/admin/login', { replaceState: true });
			};
		}}>
			<button
				type="submit"
				class="w-full rounded-lg px-3 py-2 text-left text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
			>
				Log out
			</button>
		</form>
	</div>
</aside>
