import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || '');
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'CreatorHub Pro <noreply@creatorhubpro.com>';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://creatorhubpro.com';

export interface BookingConfirmationParams {
  clientName: string;
  clientEmail: string;
  trainerName: string;
  serviceName: string;
  scheduledAt: string; // ISO string
  meetingUrl?: string;
  bookingId: string;
}

export async function sendBookingConfirmation(params: BookingConfirmationParams) {
  const {
    clientName, clientEmail, trainerName, serviceName, scheduledAt, meetingUrl, bookingId,
  } = params;

  const date = new Date(scheduledAt).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  const time = new Date(scheduledAt).toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
  });

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: clientEmail,
      subject: `✅ Booking Confirmed: ${serviceName} with ${trainerName}`,
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; background: #fafafa;">
          <div style="background: #3525cd; border-radius: 16px; padding: 32px; text-align: center; margin-bottom: 24px;">
            <h1 style="color: white; font-size: 24px; font-weight: 700; margin: 0;">Booking Confirmed ✅</h1>
          </div>
          <div style="background: white; border-radius: 16px; padding: 32px; border: 1px solid #e2e8f0;">
            <p style="color: #475569; margin-top: 0;">Hi ${clientName},</p>
            <p style="color: #1e293b; font-weight: 600; font-size: 18px; margin: 0 0 8px;">${serviceName}</p>
            <p style="color: #475569; margin: 0 0 24px;">with <strong>${trainerName}</strong></p>
            <div style="background: #f8fafc; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
              <p style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 4px;">Date & Time</p>
              <p style="color: #1e293b; font-weight: 600; margin: 0;">${date} at ${time}</p>
            </div>
            ${meetingUrl ? `
            <a href="${meetingUrl}" style="display: block; background: #3525cd; color: white; text-align: center; padding: 14px 24px; border-radius: 12px; font-weight: 700; text-decoration: none; margin-bottom: 24px;">
              Join Meeting
            </a>
            ` : ''}
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
              Booking ID: ${bookingId} · 
              <a href="${APP_URL}/dashboard" style="color: #3525cd;">View in Dashboard</a>
            </p>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error('Failed to send booking confirmation email:', err);
  }
}

export interface SessionReminderParams {
  recipientName: string;
  recipientEmail: string;
  otherPartyName: string;
  serviceName: string;
  scheduledAt: string;
  meetingUrl?: string;
  hoursUntil: number;
}

export async function sendSessionReminder(params: SessionReminderParams) {
  const {
    recipientName, recipientEmail, otherPartyName, serviceName, scheduledAt, meetingUrl, hoursUntil,
  } = params;

  const time = new Date(scheduledAt).toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
  });

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: recipientEmail,
      subject: `⏰ Reminder: ${serviceName} in ${hoursUntil}h`,
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px;">
          <div style="background: white; border-radius: 16px; padding: 32px; border: 1px solid #e2e8f0;">
            <h2 style="color: #1e293b; margin: 0 0 8px;">Session in ${hoursUntil} hour${hoursUntil !== 1 ? 's' : ''} ⏰</h2>
            <p style="color: #475569;">Hi ${recipientName}, your session with <strong>${otherPartyName}</strong> starts soon.</p>
            <div style="background: #f8fafc; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
              <p style="color: #1e293b; font-weight: 600; margin: 0;">${serviceName} at ${time}</p>
            </div>
            ${meetingUrl ? `
            <a href="${meetingUrl}" style="display: block; background: #3525cd; color: white; text-align: center; padding: 14px 24px; border-radius: 12px; font-weight: 700; text-decoration: none;">
              Join Now
            </a>
            ` : ''}
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error('Failed to send reminder email:', err);
  }
}

export async function sendPaymentReceipt(params: {
  clientEmail: string;
  clientName: string;
  amount: number;
  currency: string;
  serviceName: string;
  trainerName: string;
  receiptUrl?: string;
}) {
  const { clientEmail, clientName, amount, currency, serviceName, trainerName, receiptUrl } = params;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: clientEmail,
      subject: `💳 Payment Receipt: ${serviceName}`,
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px;">
          <div style="background: white; border-radius: 16px; padding: 32px; border: 1px solid #e2e8f0;">
            <h2 style="color: #1e293b; margin: 0 0 24px;">Payment Receipt 💳</h2>
            <p style="color: #475569;">Hi ${clientName},</p>
            <div style="background: #f8fafc; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="color: #64748b;">${serviceName}</span>
                <span style="font-weight: 600; color: #1e293b;">${currency.toUpperCase()} ${amount.toFixed(2)}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #64748b;">Trainer</span>
                <span style="color: #1e293b;">${trainerName}</span>
              </div>
            </div>
            ${receiptUrl ? `<a href="${receiptUrl}" style="color: #3525cd; font-size: 14px;">View full receipt →</a>` : ''}
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error('Failed to send payment receipt:', err);
  }
}
