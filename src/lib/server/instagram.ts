import { env } from '$env/dynamic/private';

export interface InstagramPost {
	id: string;
	caption: string;
	media_url: string;
	permalink: string;
	timestamp: string;
	media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
	thumbnail_url?: string;
}

let cache: { posts: InstagramPost[]; fetchedAt: number } | null = null;
const CACHE_TTL = 1000 * 60 * 15; // 15 minutes

export async function getRecentPosts(count = 5): Promise<InstagramPost[]> {
	const token = env.INSTAGRAM_ACCESS_TOKEN;
	if (!token) {
		console.warn('INSTAGRAM_ACCESS_TOKEN not set, skipping Instagram feed');
		return [];
	}

	// Return cached data if still fresh
	if (cache && Date.now() - cache.fetchedAt < CACHE_TTL) {
		return cache.posts.slice(0, count);
	}

	try {
		const fields = 'id,caption,media_url,permalink,timestamp,media_type,thumbnail_url';
		const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=${count}&access_token=${token}`;

		const res = await fetch(url);
		if (!res.ok) {
			const err = await res.json().catch(() => ({}));
			console.error('Instagram API error:', res.status, err);
			// Return stale cache if available
			return cache?.posts.slice(0, count) ?? [];
		}

		const data = await res.json();
		const posts: InstagramPost[] = data.data ?? [];

		cache = { posts, fetchedAt: Date.now() };
		return posts.slice(0, count);
	} catch (e) {
		console.error('Instagram fetch error:', e);
		return cache?.posts.slice(0, count) ?? [];
	}
}
