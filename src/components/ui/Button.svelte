<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'primary' | 'secondary' | 'outline';
		size?: 'sm' | 'md' | 'lg';
		href?: string;
		type?: 'button' | 'submit';
		disabled?: boolean;
		class?: string;
		onclick?: (e: MouseEvent) => void;
		children: Snippet;
	}

	let {
		variant = 'primary',
		size = 'md',
		href,
		type = 'button',
		disabled = false,
		class: className = '',
		onclick,
		children
	}: Props = $props();

	const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

	const variantClasses: Record<string, string> = {
		primary: 'bg-bark-600 text-white hover:bg-bark-700 focus:ring-bark-500',
		secondary: 'bg-forest-600 text-white hover:bg-forest-700 focus:ring-forest-500',
		outline: 'border-2 border-bark-600 text-bark-700 hover:bg-bark-50 focus:ring-bark-500'
	};

	const sizeClasses: Record<string, string> = {
		sm: 'px-4 py-2 text-sm',
		md: 'px-6 py-3 text-base',
		lg: 'px-8 py-4 text-lg'
	};

	const classes = $derived(`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`);
</script>

{#if href}
	<a {href} class={classes} {onclick}>
		{@render children()}
	</a>
{:else}
	<button {type} {disabled} class={classes} {onclick}>
		{@render children()}
	</button>
{/if}
