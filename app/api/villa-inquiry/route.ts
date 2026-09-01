import { prisma } from '@/lib/prisma'

// A villa stay request from a property's detail page — stored as a Message
// (the same table the concierge back-office reads for contact requests).
export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { propertyId, propertyTitle, fullName, email, phone, checkIn, checkOut, guests, notes } = data

    if (!email || !fullName || !phone) {
      return Response.json({ error: 'Name, email and phone are required' }, { status: 400 })
    }
    if (!checkIn || !guests) {
      return Response.json({ error: 'Check-in date and number of guests are required' }, { status: 400 })
    }

    const bodyLines = [
      notes?.trim() ? notes.trim() : null,
      '',
      `Villa: ${propertyTitle}${propertyId ? ` (#${propertyId})` : ''}`,
      `Check-in: ${checkIn}`,
      checkOut ? `Check-out: ${checkOut}` : null,
      `Guests: ${guests}`,
    ].filter((l) => l !== null).join('\n')

    await prisma.message.create({
      data: {
        name: fullName,
        email,
        phone: phone || null,
        subject: `Villa stay request — ${propertyTitle}`,
        message: bodyLines,
        destination: propertyTitle || null,
        preferredDate: checkIn || null,
        numberOfGuests: guests ? parseInt(guests) : null,
      },
    })

    return Response.json({ ok: true }, { status: 201 })
  } catch (error) {
    console.error('Villa inquiry error:', error)
    return Response.json({ error: 'Failed to send inquiry' }, { status: 500 })
  }
}
