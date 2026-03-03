import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { supabaseAdmin } from '$lib/server/supabase';
import type { Product } from '$lib/types';

export const load: PageServerLoad = async () => {
	const { data, error } = await supabaseAdmin
		.from('products')
		.select('*')
		.order('sort_order', { ascending: true });

	if (error) {
		console.error('Failed to load products:', error);
	}

	return {
		products: (data as Product[]) ?? []
	};
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const formData = await request.formData();
		const rawEntries = Object.fromEntries(formData);
		console.log('[DELETE] Raw form data:', rawEntries);

		const id = formData.get('id') as string;
		console.log('[DELETE] Product ID:', JSON.stringify(id));

		if (!id) {
			console.log('[DELETE] No ID provided, returning 400');
			return fail(400, { error: 'Product ID is required' });
		}

		console.log('[DELETE] Calling supabaseAdmin.from("products").delete().eq("id", id)');
		const { data, error, count, status, statusText } = await supabaseAdmin
			.from('products')
			.delete()
			.eq('id', id)
			.select();

		console.log('[DELETE] Response status:', status, statusText);
		console.log('[DELETE] Response data:', JSON.stringify(data));
		console.log('[DELETE] Response count:', count);
		console.log('[DELETE] Response error:', JSON.stringify(error));

		if (error) {
			console.error('[DELETE] Failed to delete product:', error);
			return fail(500, { error: 'Failed to delete product' });
		}

		if (!data || data.length === 0) {
			console.log('[DELETE] No rows were deleted — product may not exist or RLS is blocking');
		}

		console.log('[DELETE] Success, returning deleted: true');
		return { deleted: true };
	}
};
