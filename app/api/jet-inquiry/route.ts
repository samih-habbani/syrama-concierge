import { prisma } from '@/lib/prisma'
import { sendEmail, CONTACT_TO } from '@/lib/email'

// Jet Finder request from /jet — stored as a Message row (the table the
// concierge back-office reads) and emailed via Gmail, same as the homepage
// contact form.
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      tripType, from, to, date, returnDate,
      passengers, animals, aircraftType, flexibility, notes, contact,
    } = body

    const name: string = contact?.name?.trim() || ''
    const email: string = contact?.email?.trim() || ''
    const phone: string = contact?.phone?.trim() || ''

    if (!name || (!email && !phone)) {
      return Response.json({ ok: false, error: 'Name and an email or phone are required' }, { status: 400 })
    }
    if (!from || !to || !date) {
      return Response.json({ ok: false, error: 'Departure, destination and date are required' }, { status: 400 })
    }

    const tripLabel = tripType === 'roundtrip' ? 'Round Trip' : tripType === 'multileg' ? 'Multi-Leg' : 'One Way'
    const route = `${from} → ${to}`
    const guestCount = typeof passengers === 'string' ? parseInt(passengers, 10) : Number(passengers)

    const bodyLines = [
      notes?.trim() ? notes.trim() : null,
      notes?.trim() ? '' : null,
      `Trip type: ${tripLabel}`,
      `Route: ${route}`,
      `Departure: ${date}`,
      returnDate ? `Return: ${returnDate}` : null,
      `Passengers: ${passengers}`,
      animals ? `Animals: ${animals}` : null,
      `Aircraft: ${aircraftType}`,
      `Flexibility: ${flexibility}`,
    ].filter((l) => l !== null).join('\n')

    const saved = await prisma.message.create({
      data: {
        name,
        email: email || 'no-email@syrama.ae',
        phone: phone || null,
        subject: `Jet charter request — ${route}`,
        message: bodyLines,
        destination: to || null,
        preferredDate: date || null,
        numberOfGuests: Number.isFinite(guestCount) ? guestCount : null,
        status: 'unread',
      },
    })

    const row = (label: string, value: string) =>
      `<tr><td style="padding:12px 0;border-bottom:1px solid rgba(184,151,74,0.15);color:#8f8f7f;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;width:38%;">${label}</td><td style="padding:12px 0;border-bottom:1px solid rgba(184,151,74,0.15);color:#f5eedd;font-size:15px;">${escapeHtml(value)}</td></tr>`

    sendEmail({
      to: CONTACT_TO,
      replyTo: email || undefined,
      subject: `Jet charter request — ${route} · ${date}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #06090f; color: #f5eedd; padding: 40px;">
          <div style="border-bottom: 1px solid #b8974a; padding-bottom: 24px; margin-bottom: 32px;">
            <div style="font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: #b8974a; margin-bottom: 8px;">Syrama · Private Aviation</div>
            <h1 style="font-size: 26px; font-weight: 300; color: #f5eedd; margin: 0;">New Jet Charter Request</h1>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            ${row('Trip type', tripLabel)}
            ${row('From', String(from))}
            ${row('To', String(to))}
            ${row('Departure', String(date))}
            ${returnDate ? row('Return', String(returnDate)) : ''}
            ${row('Passengers', String(passengers))}
            ${animals ? row('Animals', String(animals)) : ''}
            ${row('Aircraft', String(aircraftType))}
            ${row('Flexibility', String(flexibility))}
          </table>
          ${notes?.trim() ? `<div style="margin-top:28px;padding:20px;border-left:3px solid #b8974a;background:rgba(184,151,74,0.05);"><div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#b8974a;margin-bottom:12px;">Notes</div><p style="white-space:pre-wrap;color:#f5eedd;font-size:15px;line-height:1.7;margin:0;">${escapeHtml(notes.trim())}</p></div>` : ''}
          <div style="margin-top: 32px; padding: 24px; border: 1px solid rgba(184,151,74,0.3); background: rgba(184,151,74,0.05);">
            <div style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #b8974a; margin-bottom: 16px;">Client Contact</div>
            <div style="color: #f5eedd; font-size: 15px; margin-bottom: 6px;">${escapeHtml(name)}</div>
            ${email ? `<div style="color: #8f8f7f; font-size: 13px; margin-bottom: 4px;">${escapeHtml(email)}</div>` : ''}
            ${phone ? `<div style="color: #8f8f7f; font-size: 13px;">${escapeHtml(phone)}</div>` : ''}
          </div>
          <div style="margin-top: 32px; font-size: 11px; color: rgba(143,143,127,0.6); text-align: center; letter-spacing: 0.1em;">SYRAMA · DUBAI · PRIVATE AVIATION</div>
        </div>
      `,
    }).catch((err) => console.error('[jet-inquiry] email failed for message', saved.id, err))

    return Response.json({ ok: true }, { status: 201 })
  } catch (error) {
    console.error('Jet inquiry error:', error)
    return Response.json({ ok: false, error: 'Failed to send your request' }, { status: 500 })
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))
}
