export function buildInquiryConfirmationEmail(customerName: string, dogName: string): string {
	return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #2d2926;">
  <h1 style="color: #8b5e28;">Thanks, ${customerName}!</h1>

  <p>We received your sizing request for <strong>${dogName}</strong> and we're excited to help find the perfect elk antler chew.</p>

  <p>Here's what happens next:</p>
  <ol>
    <li>Our team will review ${dogName}'s details</li>
    <li>We'll personally recommend the right size and cut</li>
    <li>We'll reach out within <strong>24 hours</strong> to finalize your order</li>
  </ol>

  <p>In the meantime, check out our <a href="https://elkhornchews.com/sizing-guide" style="color: #8b5e28;">Sizing Guide</a> or <a href="https://elkhornchews.com/faq" style="color: #8b5e28;">FAQ</a> if you have any questions.</p>

  <p style="margin-top: 30px; color: #6f4820;">Happy chewing,<br><strong>The Elkhorn Dog Chews Team</strong></p>
</body>
</html>`;
}
