import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'
import { requireAdmin, isUnauthorized, unauthorized, serverError } from '@/lib/admin-auth'

export async function GET() {
  try {
    await requireAdmin()
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    })
    return Response.json({ users })
  } catch (err) {
    if (isUnauthorized(err)) return unauthorized()
    console.error('[admin/users GET]', err)
    return serverError('Failed to load users')
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin()
    const { email, name, password } = await request.json()
    if (!email || !password) return Response.json({ error: 'Email and password are required' }, { status: 400 })
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return Response.json({ error: 'A user with this email already exists' }, { status: 409 })
    const user = await prisma.user.create({
      data: { email, name: name || null, password: await hashPassword(password) },
      select: { id: true, email: true, name: true, createdAt: true },
    })
    return Response.json({ user }, { status: 201 })
  } catch (err) {
    if (isUnauthorized(err)) return unauthorized()
    console.error('[admin/users POST]', err)
    return serverError('Failed to create user')
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdmin()
    const { id, email, name, password } = await request.json()
    if (!id) return Response.json({ error: 'id required' }, { status: 400 })
    const data: Record<string, unknown> = {}
    if (email) data.email = email
    if (name !== undefined) data.name = name || null
    if (password) data.password = await hashPassword(password)
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: data as never,
      select: { id: true, email: true, name: true, createdAt: true },
    })
    return Response.json({ user })
  } catch (err) {
    if (isUnauthorized(err)) return unauthorized()
    console.error('[admin/users PUT]', err)
    return serverError('Failed to update user')
  }
}

export async function DELETE(request: Request) {
  try {
    const me = await requireAdmin()
    const id = new URL(request.url).searchParams.get('id')
    if (!id) return Response.json({ error: 'id required' }, { status: 400 })
    if (Number(id) === me) return Response.json({ error: 'You cannot delete your own account' }, { status: 400 })
    const count = await prisma.user.count()
    if (count <= 1) return Response.json({ error: 'Cannot delete the last user' }, { status: 400 })
    await prisma.user.delete({ where: { id: Number(id) } })
    return Response.json({ success: true })
  } catch (err) {
    if (isUnauthorized(err)) return unauthorized()
    console.error('[admin/users DELETE]', err)
    return serverError('Failed to delete user')
  }
}
