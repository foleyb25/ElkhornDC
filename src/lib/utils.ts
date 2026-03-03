export function formatPrice(cents: number): string {
	return `$${(cents / 100).toFixed(2)}`;
}

export function formatSizeTier(tier: string): string {
	if (tier === 'x-large') return 'X-Large';
	return tier.charAt(0).toUpperCase() + tier.slice(1);
}

export function formatCutType(type: string): string {
	return type.charAt(0).toUpperCase() + type.slice(1);
}
