import { prisma } from '@/lib/prisma'
import { requireAdmin, isUnauthorized, unauthorized, serverError } from '@/lib/admin-auth'

const FIELDS = ['name', 'subtitle', 'location', 'country', 'month', 'category', 'description', 'highlight', 'image', 'sortOrder', 'published'] as const

function pick(data: Record<string, unknown>) {
  const out: Record<string, unknown> = {}
  for (const f of FIELDS) {
    if (!(f in data)) continue
    if (f === 'sortOrder') out[f] = Number(data[f]) || 0
    else if (f === 'published') out[f] = data[f] !== false
    else out[f] = data[f] === '' ? null : data[f]
  }
  return out
}

export async function GET() {
  try {
    await requireAdmin()
    const events = await prisma.event.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }] })
    return Response.json({ events })
  } catch (err) {
    if (isUnauthorized(err)) return unauthorized()
    console.error('[admin/events GET]', err)
    return serverError('Failed to load events')
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin()
    const data = await request.json()
    if (!data.name || !data.category || !data.image) {
      return Response.json({ error: 'Name, category and image are required' }, { status: 400 })
    }
    const event = await prisma.event.create({ data: pick(data) as never })
    return Response.json({ event }, { status: 201 })
  } catch (err) {
    if (isUnauthorized(err)) return unauthorized()
    console.error('[admin/events POST]', err)
    return serverError('Failed to create event')
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdmin()
    const data = await request.json()
    if (!data.id) return Response.json({ error: 'id required' }, { status: 400 })
    const event = await prisma.event.update({ where: { id: Number(data.id) }, data: pick(data) as never })
    return Response.json({ event })
  } catch (err) {
    if (isUnauthorized(err)) return unauthorized()
    console.error('[admin/events PUT]', err)
    return serverError('Failed to update event')
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdmin()
    const id = new URL(request.url).searchParams.get('id')
    if (!id) return Response.json({ error: 'id required' }, { status: 400 })
    await prisma.event.delete({ where: { id: Number(id) } })
    return Response.json({ success: true })
  } catch (err) {
    if (isUnauthorized(err)) return unauthorized()
    console.error('[admin/events DELETE]', err)
    return serverError('Failed to delete event')
  }
}
