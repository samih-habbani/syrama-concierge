'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { F, SERIF, inputStyle, labelStyle } from '@/components/admin/ui'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        setError(d.error || 'Login failed')
        return
      }
      router.push('/admin/dashboard')
      router.refresh()
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <form onSubmit={submit} style={{ width: '100%', maxWidth: 380 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontFamily: SERIF, fontSize: 26, letterSpacing: '0.18em', color: '#f5eedd' }}>SYRAMA</div>
          <div style={{ fontFamily: F, fontSize: 9, letterSpacing: '0.3em', color: '#8f8f7f', marginTop: 4 }}>ADMINISTRATION</div>
        </div>

        <label style={{ display: 'block', marginBottom: 16 }}>
          <span style={labelStyle}>Email</span>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} autoComplete="email" />
        </label>
        <label style={{ display: 'block', marginBottom: 22 }}>
          <span style={labelStyle}>Password</span>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} autoComplete="current-password" />
        </label>

        {error && <div style={{ fontFamily: F, fontSize: 12, color: '#e08080', marginBottom: 16 }}>{error}</div>}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%', padding: '13px', borderRadius: 8, border: 'none', cursor: 'pointer',
            fontFamily: F, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600,
            color: '#06090f', background: 'linear-gradient(135deg, #d4b472, #b8974a)', opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
