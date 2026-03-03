import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ cookies }) => {
		// Delete with both paths to clear cookies set before the path migration
		cookies.delete('admin_session', { path: '/' });
		cookies.delete('admin_session', { path: '/admin' });
		throw redirect(302, '/admin/login');
	}
};
