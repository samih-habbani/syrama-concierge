import { prisma } from '@/lib/prisma'
import { sendEmail, CONTACT_TO } from '@/lib/email'

// Newsletter opt-in from the footer — stored as a Message row (subject
// "Newsletter subscription") so it shows up in the shared admin inbox.
export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'A valid email address is required' }, { status: 400 })
    }

    const normalized = email.trim().toLowerCase()

    // Don't create a duplicate row if this address already subscribed.
    const existing = await prisma.message.findFirst({
      where: { email: normalized, subject: 'Newsletter subscription' },
      select: { id: true },
    })

    if (!existing) {
      await prisma.message.create({
        data: {
          email: normalized,
          name: 'Newsletter',
          subject: 'Newsletter subscription',
          message: 'Requested to join the Syrama newsletter.',
          status: 'unread',
        },
      })

      sendEmail({
        to: CONTACT_TO,
        replyTo: normalized,
        subject: `Newsletter subscription · ${normalized}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; background: #06090f; color: #f5eedd; padding: 36px;">
            <div style="font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: #b8974a; margin-bottom: 8px;">Syrama · Dubai Concierge</div>
            <h1 style="font-size: 22px; font-weight: 300; margin: 0 0 20px;">New newsletter subscription</h1>
            <p style="font-size: 15px; color: #f5eedd; margin: 0;">${normalized}</p>
          </div>
        `,
      }).catch((err) => console.error('[newsletter] email failed for', normalized, err))
    }

    return Response.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Newsletter signup error:', error)
    return Response.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}
