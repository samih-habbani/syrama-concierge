import { prisma } from '@/lib/prisma'
import { requireAdmin, isUnauthorized, unauthorized, serverError } from '@/lib/admin-auth'

export async function GET() {
  try {
    await requireAdmin()
    const [villas, messagesUnread, messagesTotal, events, blogPosts, clients, users] = await Promise.all([
      prisma.property.count({ where: { forSale: false } }),
      prisma.message.count({ where: { status: 'unread' } }),
      prisma.message.count(),
      prisma.event.count(),
      prisma.blogPost.count(),
      prisma.client.count(),
      prisma.user.count(),
    ])
    return Response.json({ villas, messagesUnread, messagesTotal, events, blogPosts, clients, users })
  } catch (err) {
    if (isUnauthorized(err)) return unauthorized()
    console.error('[admin/overview]', err)
    return serverError('Failed to load overview')
  }
}
