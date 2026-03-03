import type { PageServerLoad } from './$types';
import { supabaseAdmin } from '$lib/server/supabase';
import { getRecentPosts } from '$lib/server/instagram';

export const load: PageServerLoad = async () => {
	const [{ data: products }, instagramPosts] = await Promise.all([
		supabaseAdmin
			.from('products')
			.select('*')
			.eq('active', true)
			.eq('featured', true)
			.order('sort_order'),
		getRecentPosts(5)
	]);

	return {
		featuredProducts: products ?? [],
		instagramPosts
	};
};
