'use client'
import { useEffect } from 'react'
import { X } from 'lucide-react'

/* Small shared kit for the back-office. Dark, gold-accented, matches the site. */

export const F = 'var(--font-tenor)'
export const SERIF = 'var(--font-cormorant)'

export function PageHead({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', marginBottom: 30 }}>
      <div>
        <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 32, color: '#f5eedd', margin: 0 }}>{title}</h1>
        {subtitle && <p style={{ fontFamily: F, fontSize: 13, color: '#8a8a7c', margin: '6px 0 0' }}>{subtitle}</p>}
      </div>
      {actions && <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>{actions}</div>}
    </div>
  )
}

export function Btn({
  children, onClick, variant = 'primary', type = 'button', disabled, small, as, href,
}: {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'ghost' | 'danger'
  type?: 'button' | 'submit'
  disabled?: boolean
  small?: boolean
  as?: 'a'
  href?: string
}) {
  const base: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    fontFamily: F, fontSize: small ? 11 : 12, letterSpacing: '0.06em',
    padding: small ? '7px 12px' : '11px 18px', borderRadius: 8, cursor: disabled ? 'not-allowed' : 'pointer',
    border: '1px solid transparent', textDecoration: 'none', whiteSpace: 'nowrap',
    opacity: disabled ? 0.5 : 1, transition: 'opacity 0.2s ease, background 0.2s ease',
  }
  const styles: Record<string, React.CSSProperties> = {
    primary: { ...base, background: 'linear-gradient(135deg, #d4b472, #b8974a)', color: '#06090f', fontWeight: 600 },
    ghost: { ...base, background: 'transparent', color: '#c9c9bb', borderColor: 'rgba(184,151,74,0.3)' },
    danger: { ...base, background: 'rgba(196,94,94,0.12)', color: '#e08080', borderColor: 'rgba(196,94,94,0.3)' },
  }
  if (as === 'a') return <a href={href} style={styles[variant]}>{children}</a>
  return <button type={type} onClick={onClick} disabled={disabled} style={styles[variant]}>{children}</button>
}

export function Stat({ label, value, accent }: { label: string; value: React.ReactNode; accent?: string }) {
  return (
    <div style={{ flex: '1 1 180px', border: '1px solid rgba(184,151,74,0.14)', borderRadius: 12, padding: '22px 24px', background: 'rgba(255,255,255,0.015)' }}>
      <div style={{ fontFamily: F, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a8a7c', marginBottom: 12 }}>{label}</div>
      <div style={{ fontFamily: SERIF, fontSize: 40, fontWeight: 300, color: accent || '#f5eedd', lineHeight: 1 }}>{value}</div>
    </div>
  )
}

export const inputStyle: React.CSSProperties = {
  width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(184,151,74,0.22)',
  borderRadius: 8, padding: '10px 12px', fontFamily: F, fontSize: 13, color: '#f5eedd', outline: 'none',
}
export const labelStyle: React.CSSProperties = {
  display: 'block', fontFamily: F, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
  color: '#8a8a7c', marginBottom: 7,
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'block', marginBottom: 16 }}>
      <span style={labelStyle}>{label}</span>
      {children}
    </label>
  )
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} style={{ ...inputStyle, ...props.style }} />
}
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7, ...props.style }} />
}
export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} style={{ ...inputStyle, appearance: 'none', ...props.style }} />
}

export function Badge({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: 'neutral' | 'green' | 'gold' | 'red' }) {
  const tones: Record<string, React.CSSProperties> = {
    neutral: { background: 'rgba(245,238,221,0.06)', color: '#b9b9ab' },
    green: { background: 'rgba(74,140,90,0.15)', color: '#8fce9f' },
    gold: { background: 'rgba(184,151,74,0.15)', color: '#d4b472' },
    red: { background: 'rgba(196,94,94,0.15)', color: '#e0a0a0' },
  }
  return (
    <span style={{ ...tones[tone], fontFamily: F, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 9px', borderRadius: 5, whiteSpace: 'nowrap' }}>
      {children}
    </span>
  )
}

export function Modal({ open, onClose, title, children, wide }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; wide?: boolean }) {
  useEffect(() => {
    if (!open) return
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', h); document.body.style.overflow = '' }
  }, [open, onClose])
  if (!open) return null
  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(3,5,9,0.78)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '48px 20px', overflowY: 'auto' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: '100%', maxWidth: wide ? 880 : 560, background: '#0b0f17', border: '1px solid rgba(184,151,74,0.2)', borderRadius: 14, padding: '26px 28px 30px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 24, color: '#f5eedd', margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8a8a7c', padding: 4 }} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', fontFamily: F, fontSize: 13 }
export const thStyle: React.CSSProperties = {
  textAlign: 'left', padding: '12px 14px', fontFamily: F, fontSize: 10, letterSpacing: '0.14em',
  textTransform: 'uppercase', color: '#8a8a7c', borderBottom: '1px solid rgba(184,151,74,0.15)', whiteSpace: 'nowrap',
}
export const tdStyle: React.CSSProperties = { padding: '13px 14px', color: '#d4d4c6', borderBottom: '1px solid rgba(255,255,255,0.04)', verticalAlign: 'middle' }
