import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';

let _client: ReturnType<typeof createClient> | null = null;

export function getSupabaseAdmin() {
	if (!_client) {
		_client = createClient(publicEnv.PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
	}
	return _client;
}

// For convenience — lazily initialized
export const supabaseAdmin = new Proxy({} as ReturnType<typeof createClient>, {
	get(_, prop) {
		return (getSupabaseAdmin() as any)[prop];
	}
});
