import { Resend } from 'resend';
import { env } from '$env/dynamic/private';

let _client: Resend | null = null;

export function getResend() {
	if (!_client) {
		_client = new Resend(env.RESEND_API_KEY);
	}
	return _client;
}

export const resend = new Proxy({} as Resend, {
	get(_, prop) {
		return (getResend() as any)[prop];
	}
});
