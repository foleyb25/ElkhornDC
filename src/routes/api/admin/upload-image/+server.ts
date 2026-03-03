import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getSupabaseAdmin } from '$lib/server/supabase';
import { env as publicEnv } from '$env/dynamic/public';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		throw error(401, 'Unauthorized');
	}

	const formData = await request.formData();
	const file = formData.get('file') as File | null;

	if (!file || !(file instanceof File)) {
		throw error(400, 'No file provided');
	}

	const allowedMime = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
	const allowedExt = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
	const ext = file.name.split('.').pop()?.toLowerCase() ?? '';

	if (!allowedMime.includes(file.type) && !allowedExt.includes(ext)) {
		throw error(400, 'File must be JPEG, PNG, WebP, or GIF');
	}

	if (file.size > 5 * 1024 * 1024) {
		throw error(400, 'File must be under 5MB');
	}

	// Normalize extension: .jpeg/.JPG/.JPEG -> .jpg
	const normalizedExt = ext === 'jpeg' ? 'jpg' : (allowedExt.includes(ext) ? ext : 'jpg');
	const filename = `${crypto.randomUUID()}.${normalizedExt}`;

	const arrayBuffer = await file.arrayBuffer();
	const { error: uploadError } = await getSupabaseAdmin().storage
		.from('product_images')
		.upload(filename, arrayBuffer, {
			contentType: file.type,
			upsert: false
		});

	if (uploadError) {
		console.error('Upload error:', uploadError);
		throw error(500, 'Failed to upload image');
	}

	const publicUrl = `${publicEnv.PUBLIC_SUPABASE_URL}/storage/v1/object/public/product_images/${filename}`;

	return json({ url: publicUrl });
};
