import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';

let _client: ReturnType<typeof createClient> | null = null;

export function getSupabase() {
	if (!_client) {
		_client = createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY);
	}
	return _client;
}

export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
	get(_, prop) {
		return (getSupabase() as any)[prop];
	}
});
