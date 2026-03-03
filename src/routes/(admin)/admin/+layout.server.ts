import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	if (!locals.user && url.pathname !== '/admin/login') {
		throw redirect(302, '/admin/login');
	}

	return {
		user: locals.user ? { email: locals.user.email } : null
	};
};
