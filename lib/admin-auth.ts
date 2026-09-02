import { cookies } from 'next/headers'

/**
 * Guard for admin API routes. Throws 'Unauthorized' when the session cookie
 * is missing — routes should catch and return 401.
 */
export async function requireAdmin(): Promise<number> {
  const store = await cookies()
  const userId = store.get('userId')?.value
  if (!userId) throw new Error('Unauthorized')
  return parseInt(userId, 10)
}

export function isUnauthorized(err: unknown): boolean {
  return err instanceof Error && err.message === 'Unauthorized'
}

/** Standard JSON error responses for admin routes. */
export function unauthorized() {
  return Response.json({ error: 'Unauthorized' }, { status: 401 })
}
export function serverError(msg = 'Server error') {
  return Response.json({ error: msg }, { status: 500 })
}
