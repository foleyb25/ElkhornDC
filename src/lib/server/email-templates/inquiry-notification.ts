import type { SizingFormData } from '$lib/schemas';

export function buildInquiryNotificationEmail(data: SizingFormData): string {
	return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #2d2926;">
  <h1 style="color: #8b5e28; border-bottom: 2px solid #e8d3b0; padding-bottom: 10px;">New Sizing Inquiry</h1>

  <h2 style="color: #5a3a1c;">Customer Info</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 4px 8px; font-weight: bold;">Name:</td><td>${data.customer_name}</td></tr>
    <tr><td style="padding: 4px 8px; font-weight: bold;">Email:</td><td>${data.email}</td></tr>
    <tr><td style="padding: 4px 8px; font-weight: bold;">Phone:</td><td>${data.phone || 'Not provided'}</td></tr>
  </table>

  <h2 style="color: #5a3a1c;">Dog Info</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 4px 8px; font-weight: bold;">Dog Name:</td><td>${data.dog_name}</td></tr>
    <tr><td style="padding: 4px 8px; font-weight: bold;">Breed:</td><td>${data.dog_breed}</td></tr>
    <tr><td style="padding: 4px 8px; font-weight: bold;">Weight:</td><td>${data.dog_weight_lbs} lbs</td></tr>
    <tr><td style="padding: 4px 8px; font-weight: bold;">Age:</td><td>${data.dog_age}</td></tr>
    <tr><td style="padding: 4px 8px; font-weight: bold;">Chewing Style:</td><td>${data.chewing_style}</td></tr>
    <tr><td style="padding: 4px 8px; font-weight: bold;">Previous Antler Experience:</td><td>${data.previous_antler_experience ? 'Yes' : 'No'}</td></tr>
    ${data.previous_antler_notes ? `<tr><td style="padding: 4px 8px; font-weight: bold;">Antler Notes:</td><td>${data.previous_antler_notes}</td></tr>` : ''}
  </table>

  <h2 style="color: #5a3a1c;">Order Preferences</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 4px 8px; font-weight: bold;">Products of Interest:</td><td>${data.products_of_interest || 'Not specified'}</td></tr>
    <tr><td style="padding: 4px 8px; font-weight: bold;">Quantity:</td><td>${data.quantity}</td></tr>
    ${data.additional_notes ? `<tr><td style="padding: 4px 8px; font-weight: bold;">Notes:</td><td>${data.additional_notes}</td></tr>` : ''}
  </table>

  <h2 style="color: #5a3a1c;">Shipping</h2>
  <p>${data.shipping_name}<br>${data.shipping_address}<br>${data.shipping_city}, ${data.shipping_state} ${data.shipping_zip}</p>
</body>
</html>`;
}
