import { prisma } from '@/lib/prisma'
import { requireAdmin, isUnauthorized, unauthorized, serverError } from '@/lib/admin-auth'

const FIELDS = ['fullName', 'email', 'phone', 'address', 'city', 'country', 'region', 'notes'] as const

function pick(data: Record<string, unknown>) {
  const out: Record<string, unknown> = {}
  for (const f of FIELDS) if (f in data) out[f] = data[f] === '' ? null : data[f]
  return out
}

export async function GET(request: Request) {
  try {
    await requireAdmin()
    const q = new URL(request.url).searchParams.get('q')?.trim()
    const where = q
      ? { OR: [
          { fullName: { contains: q, mode: 'insensitive' as const } },
          { email: { contains: q, mode: 'insensitive' as const } },
          { phone: { contains: q, mode: 'insensitive' as const } },
        ] }
      : {}
    const clients = await prisma.client.findMany({ where, orderBy: { createdAt: 'desc' }, take: 500 })
    return Response.json({ clients })
  } catch (err) {
    if (isUnauthorized(err)) return unauthorized()
    console.error('[admin/clients GET]', err)
    return serverError('Failed to load clients')
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin()
    const data = await request.json()
    if (!data.fullName) return Response.json({ error: 'Name is required' }, { status: 400 })
    const client = await prisma.client.create({ data: { ...pick(data), fullName: data.fullName } as never })
    return Response.json({ client }, { status: 201 })
  } catch (err) {
    if (isUnauthorized(err)) return unauthorized()
    console.error('[admin/clients POST]', err)
    return serverError('Failed to create client')
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdmin()
    const data = await request.json()
    if (!data.id) return Response.json({ error: 'id required' }, { status: 400 })
    const client = await prisma.client.update({
      where: { id: Number(data.id) },
      data: { ...pick(data), updatedAt: new Date() } as never,
    })
    return Response.json({ client })
  } catch (err) {
    if (isUnauthorized(err)) return unauthorized()
    console.error('[admin/clients PUT]', err)
    return serverError('Failed to update client')
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdmin()
    const id = new URL(request.url).searchParams.get('id')
    if (!id) return Response.json({ error: 'id required' }, { status: 400 })
    await prisma.client.delete({ where: { id: Number(id) } })
    return Response.json({ success: true })
  } catch (err) {
    if (isUnauthorized(err)) return unauthorized()
    console.error('[admin/clients DELETE]', err)
    return serverError('Failed to delete client (they may have reservations)')
  }
}
