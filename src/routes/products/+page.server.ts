import type { PageServerLoad } from './$types';
import { supabaseAdmin } from '$lib/server/supabase';

export const load: PageServerLoad = async ({ url }) => {
	const size = url.searchParams.get('size');
	const cut = url.searchParams.get('cut');

	let query = supabaseAdmin
		.from('products')
		.select('*')
		.eq('active', true)
		.order('sort_order');

	if (size) {
		query = query.eq('size_tier', size);
	}
	if (cut) {
		query = query.eq('cut_type', cut);
	}

	const { data: products } = await query;

	return {
		products: products ?? []
	};
};
