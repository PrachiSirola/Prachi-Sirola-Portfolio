import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import { escapeHtml } from '../utils/sanitize.js';

export interface ContactEmailInput {
  name: string;
  email: string;
  message: string;
}

function isSmtpConfigured(): boolean {
  return Boolean(
    env.smtp.host &&
      env.smtp.user &&
      env.smtp.pass &&
      !env.smtp.user.includes('your_smtp') &&
      !env.smtp.pass.includes('your_smtp')
  );
}

export async function sendContactEmail({ name, email, message }: ContactEmailInput): Promise<void> {
  if (!isSmtpConfigured()) {
    console.info('[Contact Form — Dev Mode (SMTP not configured)]', {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: env.smtp.host,
    port: env.smtp.port,
    secure: env.smtp.secure,
    auth: {
      user: env.smtp.user,
      pass: env.smtp.pass,
    },
  });

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

  await transporter.sendMail({
    from: `"Portfolio Contact" <${env.emailFrom}>`,
    to: env.emailTo,
    replyTo: email,
    subject: `Portfolio Inquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #111827; line-height: 1.6;">
        <h2 style="margin-bottom: 12px;">New Portfolio Message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
        <p>${safeMessage}</p>
      </div>
    `,
  });
}
