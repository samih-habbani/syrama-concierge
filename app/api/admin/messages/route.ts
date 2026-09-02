import { prisma } from '@/lib/prisma'
import { requireAdmin, isUnauthorized, unauthorized, serverError } from '@/lib/admin-auth'

export async function GET(request: Request) {
  try {
    await requireAdmin()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const q = searchParams.get('q')?.trim()

    const where: Record<string, unknown> = {}
    if (status && status !== 'all') where.status = status
    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
        { subject: { contains: q, mode: 'insensitive' } },
        { message: { contains: q, mode: 'insensitive' } },
      ]
    }

    const messages = await prisma.message.findMany({ where, orderBy: { createdAt: 'desc' }, take: 500 })
    return Response.json({ messages })
  } catch (err) {
    if (isUnauthorized(err)) return unauthorized()
    console.error('[admin/messages GET]', err)
    return serverError('Failed to load messages')
  }
}

export async function PATCH(request: Request) {
  try {
    await requireAdmin()
    const { id, status } = await request.json()
    if (!id || !['unread', 'read', 'archived'].includes(status)) {
      return Response.json({ error: 'Invalid payload' }, { status: 400 })
    }
    const updated = await prisma.message.update({ where: { id: Number(id) }, data: { status } })
    return Response.json({ message: updated })
  } catch (err) {
    if (isUnauthorized(err)) return unauthorized()
    console.error('[admin/messages PATCH]', err)
    return serverError('Failed to update message')
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdmin()
    const id = new URL(request.url).searchParams.get('id')
    if (!id) return Response.json({ error: 'id required' }, { status: 400 })
    await prisma.message.delete({ where: { id: Number(id) } })
    return Response.json({ success: true })
  } catch (err) {
    if (isUnauthorized(err)) return unauthorized()
    console.error('[admin/messages DELETE]', err)
    return serverError('Failed to delete message')
  }
}
