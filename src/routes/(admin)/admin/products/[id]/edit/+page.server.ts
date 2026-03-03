import type { PageServerLoad, Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { productFormSchema } from '$lib/schemas';
import { supabaseAdmin } from '$lib/server/supabase';
import type { Product } from '$lib/types';

export const load: PageServerLoad = async ({ params }) => {
	const { data } = await supabaseAdmin.from('products').select('*').eq('id', params.id).single();

	if (!data) {
		throw error(404, 'Product not found');
	}

	return {
		product: data as Product
	};
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const formData = await request.formData();
		const rawData: Record<string, string> = {};
		for (const [key, value] of formData.entries()) {
			rawData[key] = value as string;
		}

		if (!formData.has('featured')) rawData.featured = '';
		if (!formData.has('active')) rawData.active = '';

		const result = productFormSchema.safeParse(rawData);

		if (!result.success) {
			const errors: Record<string, string[]> = {};
			for (const issue of result.error.issues) {
				const field = issue.path[0]?.toString() ?? '';
				if (!errors[field]) errors[field] = [];
				errors[field].push(issue.message);
			}
			return fail(400, { errors, values: rawData });
		}

		const data = result.data;
		let images: string[] = [];
		try {
			const parsed = JSON.parse(data.images);
			if (Array.isArray(parsed)) images = parsed.filter(Boolean);
		} catch {
			// Fallback: comma-separated
			images = data.images
				? data.images.split(',').map((s) => s.trim()).filter(Boolean)
				: [];
		}

		const { error: dbError } = await supabaseAdmin
			.from('products')
			.update({
				name: data.name,
				slug: data.slug,
				description: data.description,
				short_description: data.short_description,
				size_tier: data.size_tier,
				cut_type: data.cut_type,
				chewer_level: data.chewer_level,
				dog_weight_min: data.dog_weight_min,
				dog_weight_max: data.dog_weight_max,
				price_cents: data.price_cents,
				images,
				featured: data.featured,
				sort_order: data.sort_order,
				active: data.active
			})
			.eq('id', params.id);

		if (dbError) {
			console.error('Product update error:', dbError);
			if (dbError.code === '23505') {
				return fail(400, {
					errors: { slug: ['A product with this slug already exists'] },
					values: rawData
				});
			}
			return fail(500, {
				errors: { _form: ['Something went wrong. Please try again.'] },
				values: rawData
			});
		}

		throw redirect(302, '/admin/products');
	}
};
