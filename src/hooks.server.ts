import type { Handle } from '@sveltejs/kit';
import { getSupabaseAdmin } from '$lib/server/supabase';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.user = null;

	const token = event.cookies.get('admin_session');
	if (token) {
		const { data, error } = await getSupabaseAdmin().auth.getUser(token);
		if (data?.user && !error) {
			event.locals.user = data.user;
		} else {
			event.cookies.delete('admin_session', { path: '/' });
		}
	}

	return resolve(event);
};
