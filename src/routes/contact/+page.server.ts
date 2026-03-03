import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { contactFormSchema } from '$lib/schemas';
import { supabaseAdmin } from '$lib/server/supabase';
import { resend } from '$lib/server/resend';
import { env } from '$env/dynamic/private';
import { buildContactNotificationEmail } from '$lib/server/email-templates/contact-notification';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const rawData = Object.fromEntries(formData);

		const result = contactFormSchema.safeParse(rawData);

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

		const { error: dbError } = await supabaseAdmin.from('contact_submissions').insert({
			name: data.name,
			email: data.email,
			subject: data.subject,
			message: data.message
		});

		if (dbError) {
			console.error('Contact form DB error:', dbError);
			return fail(500, {
				errors: { _form: ['Something went wrong. Please try again.'] },
				values: rawData as Record<string, string>
			});
		}

		try {
			await resend.emails.send({
				from: 'Elkhorn Dog Chews <noreply@elkhornchews.com>',
				to: env.TEAM_EMAIL,
				subject: `Contact Form: ${data.subject}`,
				html: buildContactNotificationEmail(data)
			});
		} catch (e) {
			console.error('Contact email error:', e);
		}

		return { success: true };
	}
};
