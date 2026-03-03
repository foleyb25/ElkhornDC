import type { PageServerLoad } from './$types';
import { supabaseAdmin } from '$lib/server/supabase';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const { data: product } = await supabaseAdmin
		.from('products')
		.select('*')
		.eq('slug', params.slug)
		.eq('active', true)
		.single();

	if (!product) {
		error(404, 'Product not found');
	}

	return { product };
};
