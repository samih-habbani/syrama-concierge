'use client'

import { useState, useRef, useEffect } from 'react'
import { useModalA11y } from '@/lib/useModalA11y'

interface ReservationModalProps {
  yachtId: number
  yachtModel: string
  isOpen: boolean
  onClose: () => void
}

const todayISO = () => new Date().toISOString().split('T')[0]

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-tenor)',
  fontSize: 9,
  letterSpacing: '0.25em',
  textTransform: 'uppercase',
  color: '#8f8f7f',
  marginBottom: 10,
}

const fieldStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(184,151,74,0.25)',
  borderRadius: 4,
  padding: '12px 14px',
  fontFamily: 'var(--font-tenor)',
  fontSize: 13,
  color: '#f5eedd',
  outline: 'none',
  transition: 'border-color 0.2s ease',
}

export default function ReservationModal({ yachtId, yachtModel, isOpen, onClose }: ReservationModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    numberOfPeople: '',
    location: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useModalA11y(isOpen, onClose, modalRef)

  // Lock page scroll while open (root scroller is <html> here).
  useEffect(() => {
    if (!isOpen) return
    const scrollY = window.scrollY
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo({ top: scrollY, behavior: 'instant' })
    }
  }, [isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = '#d4b472'
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = 'rgba(184,151,74,0.25)'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, yachtId }),
      })
      if (!response.ok) {
        const data = await response.json()
        setError(data.error || 'Failed to create reservation')
        return
      }
      setSuccess(true)
      setFormData({ fullName: '', email: '', phone: '', date: '', numberOfPeople: '', location: '' })
      setTimeout(() => {
        onClose()
        setSuccess(false)
      }, 2200)
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        background: 'rgba(6, 9, 15, 0.55)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        animation: 'resvFadeIn 0.25s ease-out',
      }}
    >
      <style>{`
        @keyframes resvFadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes resvSlideUp { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
        .resv-modal { animation: resvSlideUp 0.35s cubic-bezier(0.25, 0.1, 0, 1) }
        .resv-modal input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.7) sepia(1) saturate(3) hue-rotate(10deg); opacity: 0.7; cursor: pointer }
        .resv-modal input::placeholder { color: #5a5a50 }
      `}</style>

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reservation-modal-title"
        className="resv-modal"
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 460,
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'linear-gradient(to bottom, #0f1419, #06090f)',
          border: '1px solid rgba(184,151,74,0.25)',
          padding: 'clamp(28px, 5vw, 44px)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute', top: 16, right: 16,
            width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(6,9,15,0.6)', border: '1px solid rgba(184,151,74,0.2)', borderRadius: '50%',
            color: '#8f8f7f', cursor: 'pointer',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.4" />
            <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>

        {success ? (
          <div style={{ textAlign: 'center', padding: '48px 8px' }} role="status">
            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 24, color: '#d4b472', marginBottom: 16 }}>◈</div>
            <h3 id="reservation-modal-title" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 28, color: '#f5eedd', marginBottom: 12 }}>
              Request received.
            </h3>
            <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 13, lineHeight: 1.8, color: '#8f8f7f' }}>
              Our team will contact you shortly to plan your charter.
            </p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 28, paddingRight: 32 }}>
              <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8974a', marginBottom: 8 }}>
                Charter Request
              </div>
              <div id="reservation-modal-title" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 28, color: '#f5eedd', lineHeight: 1.15 }}>
                {yachtModel}
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {error && (
                <div style={{ background: 'rgba(220,80,80,0.1)', border: '1px solid rgba(220,80,80,0.4)', color: '#e5a3a3', padding: '10px 14px', fontFamily: 'var(--font-tenor)', fontSize: 12, borderRadius: 4 }}>
                  {error}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label htmlFor="reservation-fullName" style={labelStyle}>Full Name *</label>
                  <input id="reservation-fullName" type="text" name="fullName" value={formData.fullName} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} style={fieldStyle} placeholder="Your name" required />
                </div>
                <div>
                  <label htmlFor="reservation-phone" style={labelStyle}>Phone *</label>
                  <input id="reservation-phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} style={fieldStyle} placeholder="+971..." required />
                </div>
              </div>

              <div>
                <label htmlFor="reservation-email" style={labelStyle}>Email *</label>
                <input id="reservation-email" type="email" name="email" value={formData.email} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} style={fieldStyle} placeholder="your@email.com" required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label htmlFor="reservation-date" style={labelStyle}>Date *</label>
                  <input id="reservation-date" type="date" name="date" value={formData.date} min={todayISO()} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} style={{ ...fieldStyle, colorScheme: 'dark' }} required />
                </div>
                <div>
                  <label htmlFor="reservation-guests" style={labelStyle}>Guests *</label>
                  <input id="reservation-guests" type="number" name="numberOfPeople" value={formData.numberOfPeople} min="1" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} style={fieldStyle} placeholder="8" required />
                </div>
              </div>

              <div>
                <label htmlFor="reservation-location" style={labelStyle}>Location *</label>
                <input id="reservation-location" type="text" name="location" value={formData.location} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} style={fieldStyle} placeholder="e.g. Dubai Marina, French Riviera" required />
              </div>

              <div style={{ display: 'flex', gap: 12, paddingTop: 12, borderTop: '1px solid rgba(184,151,74,0.12)' }}>
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    flex: 1,
                    fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase',
                    color: '#06090f', background: '#b8974a', border: 'none', padding: '14px 16px', cursor: isLoading ? 'wait' : 'pointer',
                    opacity: isLoading ? 0.6 : 1, transition: 'background 0.3s ease',
                  }}
                  onMouseEnter={e => { if (!isLoading) e.currentTarget.style.background = '#d4b472' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#b8974a' }}
                >
                  {isLoading ? 'Sending…' : 'Request Charter'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    flex: 1,
                    fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase',
                    color: '#8f8f7f', background: 'transparent', border: '1px solid rgba(143,143,127,0.4)', padding: '14px 16px', cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
