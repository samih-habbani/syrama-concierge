'use client'
import { useState } from 'react'

const REQUEST_TYPES = ['Private Aviation', 'Villa / Residence', 'Yachting', 'Private Event', 'Bespoke Request']

type Props = {
  /** Pre-select the "Type of request" dropdown. */
  defaultRequestType?: string
}

export function ContactForm({ defaultRequestType = '' }: Props) {
  const [focused, setFocused] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    requestType: defaultRequestType, message: '',
  })

  const setField = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Something went wrong. Please try again.')
        return
      }
      setSubmitted(true)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = (name: string) => ({
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${focused === name ? 'var(--or-clair)' : 'rgba(184,151,74,0.2)'}`,
    padding: '14px 0',
    fontFamily: 'var(--font-tenor)',
    fontSize: 14,
    color: 'var(--champagne)',
    outline: 'none',
    letterSpacing: '0.05em',
    transition: 'border-color 0.3s ease',
    cursor: 'none',
  })

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 40px' }}>
        <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 20, color: 'var(--or-clair)', letterSpacing: '0.2em', marginBottom: 16 }}>◈</div>
        <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 32, fontWeight: 300, color: 'var(--champagne)', marginBottom: 16 }}>
          Request received.
        </div>
        <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 13, color: 'var(--gris)', lineHeight: 1.8 }}>
          An advisor will contact you within 2 hours.
        </div>
      </div>
    )
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.3em',
    textTransform: 'uppercase', color: 'var(--gris)',
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div className="hp-form-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <label style={labelStyle}>First Name</label>
          <input
            type="text" required
            value={form.firstName} onChange={setField('firstName')}
            placeholder="Alexander"
            onFocus={() => setFocused('prenom')} onBlur={() => setFocused(null)}
            style={{ ...inputStyle('prenom'), display: 'block', marginTop: 8 }}
          />
        </div>
        <div>
          <label style={labelStyle}>Last Name</label>
          <input
            type="text" required
            value={form.lastName} onChange={setField('lastName')}
            onFocus={() => setFocused('nom')} onBlur={() => setFocused(null)}
            style={{ ...inputStyle('nom'), display: 'block', marginTop: 8 }}
          />
        </div>
      </div>

      <div className="hp-form-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <label style={labelStyle}>Email</label>
          <input
            type="email" required
            value={form.email} onChange={setField('email')}
            placeholder="you@example.com"
            onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
            style={{ ...inputStyle('email'), display: 'block', marginTop: 8 }}
          />
        </div>
        <div>
          <label style={labelStyle}>Phone</label>
          <input
            type="tel"
            value={form.phone} onChange={setField('phone')}
            placeholder="+971 …"
            onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)}
            style={{ ...inputStyle('phone'), display: 'block', marginTop: 8 }}
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Type of request</label>
        <select
          value={form.requestType} onChange={setField('requestType')}
          onFocus={() => setFocused('type')} onBlur={() => setFocused(null)}
          style={{ ...inputStyle('type'), display: 'block', marginTop: 8, appearance: 'none' }}
        >
          <option value="" style={{ background: 'var(--bleu-nuit)' }}>Select...</option>
          {REQUEST_TYPES.map(o => (
            <option key={o} value={o} style={{ background: 'var(--bleu-nuit)' }}>{o}</option>
          ))}
        </select>
      </div>

      <div>
        <label style={labelStyle}>Your request</label>
        <textarea
          rows={4} required
          value={form.message} onChange={setField('message')}
          placeholder="Describe your project..."
          onFocus={() => setFocused('msg')} onBlur={() => setFocused(null)}
          style={{ ...inputStyle('msg'), display: 'block', marginTop: 8, resize: 'none', lineHeight: 1.8 }}
        />
      </div>

      {error && (
        <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 12, color: '#e5a3a3', letterSpacing: '0.03em' }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        data-cursor
        disabled={loading}
        style={{
          background: 'linear-gradient(135deg, var(--or), var(--or-clair))',
          color: 'var(--noir)',
          fontFamily: 'var(--font-tenor)', fontSize: 11, letterSpacing: '0.3em',
          textTransform: 'uppercase', padding: '18px 40px', border: 'none',
          cursor: 'none', alignSelf: 'flex-start',
          opacity: loading ? 0.6 : 1,
          transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
          boxShadow: '0 4px 20px rgba(184,151,74,0.4)',
        }}
        onMouseEnter={e => { if (loading) return; e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(184,151,74,0.6)' }}
        onMouseLeave={e => { if (loading) return; e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(184,151,74,0.4)' }}
      >
        {loading ? 'Sending…' : 'Send request'}
      </button>
    </form>
  )
}
