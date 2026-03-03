import type { ContactFormData } from '$lib/schemas';

export function buildContactNotificationEmail(data: ContactFormData): string {
	return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #2d2926;">
  <h1 style="color: #8b5e28; border-bottom: 2px solid #e8d3b0; padding-bottom: 10px;">New Contact Form Submission</h1>

  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 4px 8px; font-weight: bold;">Name:</td><td>${data.name}</td></tr>
    <tr><td style="padding: 4px 8px; font-weight: bold;">Email:</td><td>${data.email}</td></tr>
    <tr><td style="padding: 4px 8px; font-weight: bold;">Subject:</td><td>${data.subject}</td></tr>
  </table>

  <h2 style="color: #5a3a1c;">Message</h2>
  <p style="background: #faf6ee; padding: 15px; border-radius: 4px;">${data.message}</p>
</body>
</html>`;
}
