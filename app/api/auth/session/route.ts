import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const store = await cookies()
    const userId = store.get('userId')?.value
    if (!userId) return Response.json({ isAuthenticated: false })

    // The cookie alone proves the session — a DB hiccup fetching the
    // profile must not log the user out.
    let user = null
    try {
      user = await prisma.user.findUnique({
        where: { id: parseInt(userId, 10) },
        select: { id: true, email: true, name: true },
      })
    } catch (e) {
      console.error('Session profile lookup error:', e)
    }
    return Response.json({ isAuthenticated: true, userId, user })
  } catch (error) {
    console.error('Session check error:', error)
    return Response.json({ isAuthenticated: false })
  }
}
