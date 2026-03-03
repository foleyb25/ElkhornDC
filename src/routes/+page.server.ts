import type { PageServerLoad } from './$types';
import { supabaseAdmin } from '$lib/server/supabase';

export const load: PageServerLoad = async () => {
	const { data: products } = await supabaseAdmin
		.from('products')
		.select('*')
		.eq('active', true)
		.eq('featured', true)
		.order('sort_order');

	return {
		featuredProducts: products ?? []
	};
};
