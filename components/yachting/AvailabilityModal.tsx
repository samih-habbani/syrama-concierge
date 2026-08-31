'use client'

import { useState, useEffect, useRef } from 'react'
import { useModalA11y } from '@/lib/useModalA11y'

interface AvailabilityModalProps {
  isOpen: boolean
  onClose: () => void
  yacht: {
    model: string
    builder?: string | null
    length?: number | null
    imageUrl?: string | null
  }
}

const WHATSAPP_NUMBER = '971505548034'

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

export default function AvailabilityModal({ isOpen, onClose, yacht }: AvailabilityModalProps) {
  const [guests, setGuests] = useState('')
  const [city, setCity] = useState('')
  const [date, setDate] = useState(todayISO)
  const modalRef = useRef<HTMLDivElement>(null)

  useModalA11y(isOpen, onClose, modalRef)

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

  if (!isOpen) return null

  const yachtLabel = [yacht.model, yacht.builder ? `by ${yacht.builder}` : null, yacht.length ? `${yacht.length}m` : null]
    .filter(Boolean)
    .join(' — ')

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = '#d4b472' }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = 'rgba(184,151,74,0.25)' }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const lines = [
      `Hello Syrama! I'd like to check availability for the *${yacht.model}*${yacht.builder ? ` (${yacht.builder})` : ''}${yacht.length ? `, ${yacht.length}m` : ''}.`,
      '',
      `City: ${city}`,
      `Date: ${date}`,
      `Guests: ${guests}`,
    ]
    if (yacht.imageUrl) {
      const absoluteImageUrl = typeof window !== 'undefined'
        ? new URL(yacht.imageUrl, window.location.origin).toString()
        : yacht.imageUrl
      lines.push('', absoluteImageUrl)
    }
    const text = encodeURIComponent(lines.join('\n'))
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer')
    onClose()
  }

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
        animation: 'availFadeIn 0.25s ease-out',
      }}
    >
      <style>{`
        @keyframes availFadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes availSlideUp { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
        .avail-modal { animation: availSlideUp 0.35s cubic-bezier(0.25, 0.1, 0, 1) }
        .avail-modal input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.7) sepia(1) saturate(3) hue-rotate(10deg); opacity: 0.7; cursor: pointer }
        .avail-modal input::placeholder { color: #5a5a50 }
      `}</style>

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="availability-modal-title"
        className="avail-modal"
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 440,
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'linear-gradient(to bottom, #0f1419, #06090f)',
          border: '1px solid rgba(184,151,74,0.25)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute', top: 14, right: 14, zIndex: 2,
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

        <div style={{ padding: 'clamp(24px, 5vw, 40px)' }}>
          {yacht.imageUrl && (
            <div style={{ width: '100%', height: 160, overflow: 'hidden', marginBottom: 24 }}>
              <img src={yacht.imageUrl} alt={yacht.model} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75)' }} />
            </div>
          )}

          <div style={{ marginBottom: 28, paddingRight: 32 }}>
            <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8974a', marginBottom: 8 }}>
              Check Availability
            </div>
            <div id="availability-modal-title" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 26, color: '#f5eedd', lineHeight: 1.15 }}>
              {yachtLabel}
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label htmlFor="availability-guests" style={labelStyle}>Number of Guests *</label>
              <input id="availability-guests" type="number" min="1" value={guests} onChange={e => setGuests(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} placeholder="8" style={fieldStyle} required />
            </div>
            <div>
              <label htmlFor="availability-city" style={labelStyle}>City *</label>
              <input id="availability-city" type="text" value={city} onChange={e => setCity(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} placeholder="e.g. Dubai" style={fieldStyle} required />
            </div>
            <div>
              <label htmlFor="availability-date" style={labelStyle}>Date *</label>
              <input id="availability-date" type="date" value={date} min={todayISO()} onChange={e => setDate(e.target.value)} onFocus={handleFocus} onBlur={handleBlur} style={{ ...fieldStyle, colorScheme: 'dark' }} required />
            </div>

            <button
              type="submit"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                width: '100%', marginTop: 4,
                fontFamily: 'var(--font-tenor)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
                color: '#06090f', background: '#25D366', border: 'none', padding: '14px 16px', cursor: 'pointer',
                transition: 'background 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1ebe5a' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#25D366' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m0 1.67c2.2 0 4.26.86 5.82 2.42a8.2 8.2 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.19-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.55 3.7-8.24 8.25-8.24m-4.53 4.7c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.35.99 2.51c.12.16 1.7 2.6 4.13 3.63.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42h-.47Z" />
              </svg>
              Check on WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
