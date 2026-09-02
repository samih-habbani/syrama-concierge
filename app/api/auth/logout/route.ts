import { cookies } from 'next/headers'

export async function POST() {
  const store = await cookies()
  store.delete('userId')
  return Response.json({ success: true })
}
