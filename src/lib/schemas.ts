import { z } from 'zod';

export const sizingFormSchema = z.object({
	customer_name: z.string().min(1, 'Name is required').max(100),
	email: z.string().email('Please enter a valid email address'),
	phone: z.string().max(20).optional().default(''),
	dog_name: z.string().min(1, "Dog's name is required").max(50),
	dog_breed: z.string().min(1, 'Breed is required').max(100),
	dog_weight_lbs: z.coerce.number().min(1, 'Weight must be at least 1 lb').max(300),
	dog_age: z.string().min(1, 'Age is required').max(50),
	chewing_style: z.enum(['light', 'moderate', 'heavy', 'extreme'], {
		errorMap: () => ({ message: 'Please select a chewing style' })
	}),
	previous_antler_experience: z.coerce.boolean().default(false),
	previous_antler_notes: z.string().max(500).optional().default(''),
	products_of_interest: z.string().max(200).optional().default(''),
	quantity: z.coerce.number().min(1).max(20).default(1),
	additional_notes: z.string().max(1000).optional().default(''),
	shipping_name: z.string().min(1, 'Shipping name is required').max(100),
	shipping_address: z.string().min(1, 'Address is required').max(200),
	shipping_city: z.string().min(1, 'City is required').max(100),
	shipping_state: z.string().min(1, 'State is required').max(50),
	shipping_zip: z.string().min(1, 'ZIP code is required').max(20)
});

export type SizingFormData = z.infer<typeof sizingFormSchema>;

export const contactFormSchema = z.object({
	name: z.string().min(1, 'Name is required').max(100),
	email: z.string().email('Please enter a valid email address'),
	subject: z.string().min(1, 'Subject is required').max(200),
	message: z.string().min(1, 'Message is required').max(5000)
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const newsletterSchema = z.object({
	email: z.string().email('Please enter a valid email address')
});
