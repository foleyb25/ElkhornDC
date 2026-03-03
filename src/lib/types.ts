export interface Product {
	id: string;
	name: string;
	slug: string;
	description: string;
	short_description: string;
	size_tier: 'small' | 'medium' | 'large' | 'x-large';
	cut_type: 'whole' | 'split';
	chewer_level: string;
	dog_weight_min: number;
	dog_weight_max: number;
	price_cents: number;
	images: string[];
	featured: boolean;
	sort_order: number;
	active: boolean;
	created_at: string;
	updated_at: string;
}

export interface Inquiry {
	id: string;
	customer_name: string;
	email: string;
	phone: string | null;
	dog_name: string;
	dog_breed: string;
	dog_weight_lbs: number;
	dog_age: string;
	chewing_style: 'light' | 'moderate' | 'heavy' | 'extreme';
	previous_antler_experience: boolean;
	previous_antler_notes: string | null;
	products_of_interest: string | null;
	quantity: number;
	additional_notes: string | null;
	shipping_name: string;
	shipping_address: string;
	shipping_city: string;
	shipping_state: string;
	shipping_zip: string;
	status: 'new' | 'contacted' | 'fulfilled' | 'closed';
	team_notes: string | null;
	created_at: string;
	updated_at: string;
}

export interface NewsletterSignup {
	id: string;
	email: string;
	created_at: string;
}

export interface ContactSubmission {
	id: string;
	name: string;
	email: string;
	subject: string;
	message: string;
	created_at: string;
}
