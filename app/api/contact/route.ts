import { prisma } from '@/lib/prisma'
import { sendEmail, CONTACT_TO } from '@/lib/email'

// Homepage contact form — mirrors syrama-yachting's /api/messages:
// stores the request as a Message row, then emails it via Gmail.
export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { firstName, lastName, email, phone, requestType, message } = data

    if (!firstName || !lastName || !email || !message) {
      return Response.json(
        { error: 'First name, last name, email and message are required' },
        { status: 400 },
      )
    }

    const subject = requestType || 'General enquiry'
    const fullName = `${firstName} ${lastName}`.trim()

    const saved = await prisma.message.create({
      data: {
        firstName,
        lastName,
        name: fullName,
        email,
        phone: phone || null,
        subject,
        message,
        status: 'unread',
      },
    })

    // Send the notification email without blocking the response.
    sendEmail({
      to: CONTACT_TO,
      replyTo: email,
      subject: `New enquiry — ${subject} · ${fullName}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #06090f; color: #f5eedd; padding: 40px;">
          <div style="border-bottom: 1px solid #b8974a; padding-bottom: 24px; margin-bottom: 32px;">
            <div style="font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: #b8974a; margin-bottom: 8px;">Syrama · Dubai Concierge</div>
            <h1 style="font-size: 26px; font-weight: 300; color: #f5eedd; margin: 0;">New Contact Enquiry</h1>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(184,151,74,0.15); color: #8f8f7f; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; width: 35%;">Name</td><td style="padding: 12px 0; border-bottom: 1px solid rgba(184,151,74,0.15); color: #f5eedd; font-size: 15px;">${fullName}</td></tr>
            <tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(184,151,74,0.15); color: #8f8f7f; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;">Email</td><td style="padding: 12px 0; border-bottom: 1px solid rgba(184,151,74,0.15); color: #f5eedd; font-size: 15px;">${email}</td></tr>
            ${phone ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(184,151,74,0.15); color: #8f8f7f; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;">Phone</td><td style="padding: 12px 0; border-bottom: 1px solid rgba(184,151,74,0.15); color: #f5eedd; font-size: 15px;">${phone}</td></tr>` : ''}
            <tr><td style="padding: 12px 0; border-bottom: 1px solid rgba(184,151,74,0.15); color: #8f8f7f; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;">Request type</td><td style="padding: 12px 0; border-bottom: 1px solid rgba(184,151,74,0.15); color: #f5eedd; font-size: 15px;">${subject}</td></tr>
          </table>
          <div style="margin-top: 28px; padding: 20px; border-left: 3px solid #b8974a; background: rgba(184,151,74,0.05);">
            <div style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #b8974a; margin-bottom: 12px;">Message</div>
            <p style="white-space: pre-wrap; color: #f5eedd; font-size: 15px; line-height: 1.7; margin: 0;">${escapeHtml(message)}</p>
          </div>
          <div style="margin-top: 32px; font-size: 11px; color: rgba(143,143,127,0.6); text-align: center; letter-spacing: 0.1em;">SYRAMA · DUBAI · PRIVATE CONCIERGE</div>
        </div>
      `,
    }).catch((err) => console.error('[contact] email failed for message', saved.id, err))

    return Response.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Contact form error:', error)
    return Response.json({ error: 'Failed to send your request' }, { status: 500 })
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))
}
