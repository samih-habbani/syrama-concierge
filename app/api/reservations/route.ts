import { prisma } from '@/lib/prisma'

// Charter request from a yacht's detail page — creates the client (or reuses
// one matched by email) and a pending reservation. Admin listing/editing of
// reservations lives in the syrama-yachting back-office, not here.
export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { fullName, email, phone, yachtId, date, numberOfPeople, location } = data

    if (!yachtId || !date || !numberOfPeople) {
      return Response.json(
        { error: 'Yacht, date and number of people are required' },
        { status: 400 }
      )
    }

    if (!fullName || !email || !phone) {
      return Response.json(
        { error: 'Name, email and phone are required' },
        { status: 400 }
      )
    }

    const yacht = await prisma.yacht.findUnique({
      where: { id: parseInt(yachtId) },
      select: { region: true, model: true },
    })

    if (!yacht) {
      return Response.json({ error: 'Yacht not found' }, { status: 404 })
    }

    // Reuse an existing client with the same email rather than hitting the
    // unique constraint on client.email.
    const existing = await prisma.client.findUnique({ where: { email } })
    const client = existing
      ? existing
      : await prisma.client.create({ data: { fullName, email, phone } })

    const reservation = await prisma.reservation.create({
      data: {
        clientId: client.id,
        yachtId: parseInt(yachtId),
        date: new Date(date),
        numberOfPeople: parseInt(numberOfPeople),
        location: location || 'Not specified',
        region: yacht.region || 'Unknown',
      },
      include: {
        client: true,
        yacht: { select: { id: true, model: true } },
      },
    })

    return Response.json(reservation, { status: 201 })
  } catch (error) {
    console.error('Create reservation error:', error)
    return Response.json({ error: 'Failed to create reservation' }, { status: 500 })
  }
}
