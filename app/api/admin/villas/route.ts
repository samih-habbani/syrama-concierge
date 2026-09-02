import { prisma } from '@/lib/prisma'
import { requireAdmin, isUnauthorized, unauthorized, serverError } from '@/lib/admin-auth'

const STR = ['title', 'description', 'city', 'region', 'type', 'currency', 'surfaceUnit', 'mapIframeSrc', 'reference', 'zipCode', 'status', 'checkInFrom', 'checkOutBefore'] as const
const NUM = ['bedrooms', 'bathrooms', 'beds', 'rooms', 'maxGuests', 'year'] as const
const FLOAT = ['surface', 'terraceSurface', 'priceDay', 'priceWeek', 'priceMonth', 'price'] as const
const BOOL = ['available', 'hasTerrace', 'hasBalcony', 'petsAllowed', 'partiesAllowed'] as const

function pick(d: Record<string, unknown>) {
  const out: Record<string, unknown> = {}
  for (const f of STR) if (f in d) out[f] = d[f] === '' ? null : d[f]
  for (const f of NUM) if (f in d) out[f] = d[f] === '' || d[f] == null ? null : parseInt(String(d[f]), 10)
  for (const f of FLOAT) if (f in d) out[f] = d[f] === '' || d[f] == null ? null : parseFloat(String(d[f]))
  for (const f of BOOL) if (f in d) out[f] = d[f] === true || d[f] === 'true'
  if ('amenities' in d) out.amenities = d.amenities ?? null
  if ('bedDistribution' in d) out.bedDistribution = d.bedDistribution ?? null
  return out
}

export async function GET(request: Request) {
  try {
    await requireAdmin()
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
    const limit = Math.min(60, parseInt(searchParams.get('limit') || '20', 10))
    const q = searchParams.get('q')?.trim()
    const region = searchParams.get('region')?.trim()

    const where: Record<string, unknown> = { forSale: false }
    if (q) where.OR = [
      { title: { contains: q, mode: 'insensitive' } },
      { city: { contains: q, mode: 'insensitive' } },
      { region: { contains: q, mode: 'insensitive' } },
    ]
    if (region) where.region = { equals: region, mode: 'insensitive' }

    const [rows, total] = await Promise.all([
      prisma.property.findMany({ where, orderBy: { id: 'desc' }, skip: (page - 1) * limit, take: limit }),
      prisma.property.count({ where }),
    ])

    const ids = rows.map((r) => r.id)
    const media = ids.length
      ? await prisma.media.findMany({ where: { propertyId: { in: ids } }, orderBy: { id: 'asc' }, select: { id: true, propertyId: true, url: true } })
      : []
    const thumbByProp = new Map<number, string>()
    for (const m of media) if (m.propertyId && !thumbByProp.has(m.propertyId) && m.url) thumbByProp.set(m.propertyId, m.url)
    const countByProp = new Map<number, number>()
    for (const m of media) if (m.propertyId) countByProp.set(m.propertyId, (countByProp.get(m.propertyId) ?? 0) + 1)

    const villas = rows.map((r) => ({ ...r, thumb: thumbByProp.get(r.id) ?? null, photoCount: countByProp.get(r.id) ?? 0 }))
    return Response.json({ villas, total, page, totalPages: Math.ceil(total / limit) })
  } catch (err) {
    if (isUnauthorized(err)) return unauthorized()
    console.error('[admin/villas GET]', err)
    return serverError('Failed to load villas')
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin()
    const d = await request.json()
    if (!d.title) return Response.json({ error: 'Title is required' }, { status: 400 })
    const villa = await prisma.property.create({ data: { ...pick(d), forSale: false, available: d.available !== false } as never })
    return Response.json({ villa }, { status: 201 })
  } catch (err) {
    if (isUnauthorized(err)) return unauthorized()
    console.error('[admin/villas POST]', err)
    return serverError('Failed to create villa')
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdmin()
    const d = await request.json()
    if (!d.id) return Response.json({ error: 'id required' }, { status: 400 })
    const villa = await prisma.property.update({ where: { id: Number(d.id) }, data: pick(d) as never })
    return Response.json({ villa })
  } catch (err) {
    if (isUnauthorized(err)) return unauthorized()
    console.error('[admin/villas PUT]', err)
    return serverError('Failed to update villa')
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdmin()
    const id = new URL(request.url).searchParams.get('id')
    if (!id) return Response.json({ error: 'id required' }, { status: 400 })
    await prisma.media.deleteMany({ where: { propertyId: Number(id) } })
    await prisma.property.delete({ where: { id: Number(id) } })
    return Response.json({ success: true })
  } catch (err) {
    if (isUnauthorized(err)) return unauthorized()
    console.error('[admin/villas DELETE]', err)
    return serverError('Failed to delete villa')
  }
}
