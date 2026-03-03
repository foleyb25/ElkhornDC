import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { sizingFormSchema } from '$lib/schemas';
import { supabaseAdmin } from '$lib/server/supabase';
import { resend } from '$lib/server/resend';
import { env } from '$env/dynamic/private';
import { buildInquiryNotificationEmail } from '$lib/server/email-templates/inquiry-notification';
import { buildInquiryConfirmationEmail } from '$lib/server/email-templates/inquiry-confirmation';

export const load: PageServerLoad = async ({ url }) => {
	return {
		productOfInterest: url.searchParams.get('product') ?? ''
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const rawData = Object.fromEntries(formData);

		const result = sizingFormSchema.safeParse(rawData);

		if (!result.success) {
			const errors: Record<string, string[]> = {};
			for (const issue of result.error.issues) {
				const field = issue.path[0]?.toString() ?? '';
				if (!errors[field]) errors[field] = [];
				errors[field].push(issue.message);
			}
			return fail(400, {
				errors,
				values: rawData as Record<string, string>
			});
		}

		const data = result.data;

		// Insert into Supabase
		const { error: dbError } = await supabaseAdmin.from('inquiries').insert({
			customer_name: data.customer_name,
			email: data.email,
			phone: data.phone || null,
			dog_name: data.dog_name,
			dog_breed: data.dog_breed,
			dog_weight_lbs: data.dog_weight_lbs,
			dog_age: data.dog_age,
			chewing_style: data.chewing_style,
			previous_antler_experience: data.previous_antler_experience,
			previous_antler_notes: data.previous_antler_notes || null,
			products_of_interest: data.products_of_interest || null,
			quantity: data.quantity,
			additional_notes: data.additional_notes || null,
			shipping_name: data.shipping_name,
			shipping_address: data.shipping_address,
			shipping_city: data.shipping_city,
			shipping_state: data.shipping_state,
			shipping_zip: data.shipping_zip
		});

		if (dbError) {
			console.error('Supabase insert error:', dbError);
			return fail(500, {
				errors: { _form: ['Something went wrong. Please try again.'] },
				values: rawData as Record<string, string>
			});
		}

		// Send team notification email
		try {
			await resend.emails.send({
				from: 'Elkhorn Dog Chews <noreply@elkhornchews.com>',
				to: env.TEAM_EMAIL,
				subject: `New Sizing Inquiry: ${data.dog_name} (${data.dog_breed})`,
				html: buildInquiryNotificationEmail(data)
			});
		} catch (e) {
			console.error('Team email error:', e);
		}

		// Send customer confirmation email
		try {
			await resend.emails.send({
				from: 'Elkhorn Dog Chews <noreply@elkhornchews.com>',
				to: data.email,
				subject: `We received your sizing request for ${data.dog_name}!`,
				html: buildInquiryConfirmationEmail(data.customer_name, data.dog_name)
			});
		} catch (e) {
			console.error('Customer email error:', e);
		}

		redirect(303, `/get-sized/thank-you?name=${encodeURIComponent(data.customer_name)}`);
	}
};
