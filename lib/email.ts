import nodemailer from 'nodemailer'

// Gmail transport — same setup as syrama-yachting. Needs GMAIL_EMAIL and a
// Gmail App Password (GMAIL_APP_PASSWORD, generated at
// https://myaccount.google.com/apppasswords).
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

// Where contact-form messages are delivered (defaults to the Gmail account).
export const CONTACT_TO = process.env.CONTACT_TO || process.env.GMAIL_EMAIL || 'contact@syrama.ae'

export async function sendEmail(opts: { to: string; subject: string; html: string; replyTo?: string }) {
  if (!process.env.GMAIL_EMAIL || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error('Gmail credentials not configured — set GMAIL_EMAIL and GMAIL_APP_PASSWORD.')
  }

  const result = await transporter.sendMail({
    from: `"Syrama · Dubai Concierge" <${process.env.GMAIL_EMAIL}>`,
    to: opts.to,
    replyTo: opts.replyTo,
    subject: opts.subject,
    html: opts.html,
  })

  return { success: true, messageId: result.messageId }
}
