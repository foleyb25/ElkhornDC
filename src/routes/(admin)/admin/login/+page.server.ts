import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { loginSchema } from '$lib/schemas';
import { getSupabase } from '$lib/supabase';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/admin');
	}
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const rawData = Object.fromEntries(formData);

		const result = loginSchema.safeParse(rawData);

		if (!result.success) {
			const errors: Record<string, string[]> = {};
			for (const issue of result.error.issues) {
				const field = issue.path[0]?.toString() ?? '';
				if (!errors[field]) errors[field] = [];
				errors[field].push(issue.message);
			}
			return fail(400, {
				errors,
				values: { email: rawData.email as string }
			});
		}

		const { email, password } = result.data;

		const { data, error } = await getSupabase().auth.signInWithPassword({
			email,
			password
		});

		if (error || !data.session) {
			return fail(401, {
				errors: { _form: ['Invalid email or password'] },
				values: { email }
			});
		}

		cookies.set('admin_session', data.session.access_token, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7 // 7 days
		});

		throw redirect(302, '/admin');
	}
};
