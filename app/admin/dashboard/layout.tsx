'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/admin/Sidebar'

type SessionUser = { name: string | null; email: string }

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<SessionUser | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/auth/session')
        const data = await res.json()
        if (!data.isAuthenticated) {
          router.replace('/admin/login')
          return
        }
        setUser(data.user ?? null)
      } catch {
        router.replace('/admin/login')
      } finally {
        setLoading(false)
      }
    })()
  }, [router])

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.replace('/admin/login')
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-cormorant)', color: '#b8974a', fontSize: 18 }}>
        Loading…
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#06090f' }}>
      <Sidebar user={user} onLogout={logout} />
      <main style={{ flex: 1, minWidth: 0, padding: '36px 44px 60px' }}>{children}</main>
    </div>
  )
}
