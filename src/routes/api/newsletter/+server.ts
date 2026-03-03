import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { newsletterSchema } from '$lib/schemas';
import { supabaseAdmin } from '$lib/server/supabase';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const result = newsletterSchema.safeParse(body);

	if (!result.success) {
		return json({ error: 'Please enter a valid email address.' }, { status: 400 });
	}

	const { error } = await supabaseAdmin
		.from('newsletter_signups')
		.upsert({ email: result.data.email }, { onConflict: 'email' });

	if (error) {
		console.error('Newsletter signup error:', error);
		return json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
	}

	return json({ success: true });
};
