// lib/email.ts
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendVerificationEmail(email: string, token: string) {
  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify?token=${token}`;

  const msg = {
    to: email,
    from: process.env.SENDGRID_SENDER!,
    subject: "Verify your email for Ocera",
    html: `
    <div style="font-family: 'Segoe UI', sans-serif; padding: 24px; background-color: #f4f4f4;">
      <div style="max-width: 520px; margin: auto; background: white; border-radius: 8px; padding: 32px; box-shadow: 0 8px 24px rgba(0,0,0,0.05);">
        <h2 style="color: #6B21A8; text-align: center;">Welcome to Ocera ✨</h2>
        <p style="font-size: 16px; color: #333;">
          Thank you for signing up! Please verify your email address to activate your account:
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${link}" 
            style="background-color: #7C3AED; color: white; padding: 12px 24px; text-decoration: none; font-weight: 600; border-radius: 6px; display: inline-block;">
            Verify Email
          </a>
        </div>
        <p style="font-size: 14px; color: #666; text-align: center;">
          This link will expire in 1 hour. If you did not sign up, you can safely ignore this email.
        </p>
      </div>
      <p style="text-align: center; color: #aaa; font-size: 12px; margin-top: 16px;">
        &copy; ${new Date().getFullYear()} Ocera. All rights reserved.
      </p>
    </div>
    `,
  };


  try {
    await sgMail.send(msg);
    console.log("Verification email sent to:", email);
  } catch (error: any) {
    console.error("SendGrid error:", error.response?.body || error.message);
    throw new Error("Failed to send verification email");
  }
}
