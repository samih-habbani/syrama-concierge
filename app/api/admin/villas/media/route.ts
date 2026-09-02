import { prisma } from '@/lib/prisma'
import { requireAdmin, isUnauthorized, unauthorized, serverError } from '@/lib/admin-auth'
import fs from 'fs/promises'
import path from 'path'

// Villa images live in /public/uploads/yachts (same folder the public villa
// pages already read from). NOTE: writes here do not persist on Vercel's
// serverless filesystem — works in local dev; for production, images should
// be committed or moved to blob storage.
const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads/yachts')

export async function GET(request: Request) {
  try {
    await requireAdmin()
    const propertyId = new URL(request.url).searchParams.get('propertyId')
    if (!propertyId) return Response.json({ error: 'propertyId required' }, { status: 400 })
    const media = await prisma.media.findMany({
      where: { propertyId: Number(propertyId) },
      select: { id: true, url: true, alt: true },
      orderBy: { id: 'asc' },
    })
    return Response.json({ media })
  } catch (err) {
    if (isUnauthorized(err)) return unauthorized()
    console.error('[admin/villas/media GET]', err)
    return serverError('Failed to load photos')
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin()
    const form = await request.formData()
    const file = form.get('file') as File | null
    const propertyId = form.get('propertyId') as string | null
    const alt = (form.get('alt') as string) || ''
    const externalUrl = (form.get('url') as string) || ''

    if (!propertyId) return Response.json({ error: 'propertyId required' }, { status: 400 })

    let url: string
    if (externalUrl) {
      url = externalUrl
    } else if (file) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '-')
      const filename = `villa-${propertyId}-${Date.now()}-${safe}`
      await fs.mkdir(UPLOAD_DIR, { recursive: true })
      await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer)
      url = filename // public villa pages prefix with /uploads/yachts/
    } else {
      return Response.json({ error: 'A file or an image URL is required' }, { status: 400 })
    }

    const media = await prisma.media.create({
      data: { propertyId: Number(propertyId), url, alt: alt || file?.name || null },
    })
    return Response.json({ media }, { status: 201 })
  } catch (err) {
    if (isUnauthorized(err)) return unauthorized()
    console.error('[admin/villas/media POST]', err)
    return serverError('Failed to upload photo')
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdmin()
    const id = new URL(request.url).searchParams.get('id')
    if (!id) return Response.json({ error: 'id required' }, { status: 400 })
    const media = await prisma.media.findUnique({ where: { id: Number(id) } })
    if (media?.url && !media.url.startsWith('http')) {
      const filename = media.url.split('/').pop()
      if (filename) await fs.unlink(path.join(UPLOAD_DIR, filename)).catch(() => {})
    }
    await prisma.media.delete({ where: { id: Number(id) } })
    return Response.json({ success: true })
  } catch (err) {
    if (isUnauthorized(err)) return unauthorized()
    console.error('[admin/villas/media DELETE]', err)
    return serverError('Failed to delete photo')
  }
}
