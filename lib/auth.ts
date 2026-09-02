import { prisma } from './prisma'
import crypto from 'crypto'

// Same scheme as syrama-yachting so the shared `user` table works for both
// back-offices (pbkdf2, fixed salt — kept identical on purpose).
export async function hashPassword(password: string): Promise<string> {
  return crypto.pbkdf2Sync(password, 'salt', 1000, 64, 'sha512').toString('hex')
}

export function verifyPassword(password: string, hash: string): boolean {
  const hashed = crypto.pbkdf2Sync(password, 'salt', 1000, 64, 'sha512').toString('hex')
  return hashed === hash
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } })
}

export async function createUser(email: string, password: string, name?: string) {
  return prisma.user.create({
    data: { email, password: await hashPassword(password), name },
  })
}

export async function verifyUser(email: string, password: string) {
  const user = await getUserByEmail(email)
  if (!user) return null
  if (!verifyPassword(password, user.password)) return null
  return user
}
