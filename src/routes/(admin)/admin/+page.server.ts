import type { PageServerLoad } from './$types';
import { supabaseAdmin } from '$lib/server/supabase';

export const load: PageServerLoad = async () => {
	const [productsResult, activeProductsResult, inquiriesResult] = await Promise.all([
		supabaseAdmin.from('products').select('id', { count: 'exact', head: true }),
		supabaseAdmin
			.from('products')
			.select('id', { count: 'exact', head: true })
			.eq('active', true),
		supabaseAdmin
			.from('inquiries')
			.select('id', { count: 'exact', head: true })
			.eq('status', 'new')
	]);

	return {
		totalProducts: productsResult.count ?? 0,
		activeProducts: activeProductsResult.count ?? 0,
		newInquiries: inquiriesResult.count ?? 0
	};
};
