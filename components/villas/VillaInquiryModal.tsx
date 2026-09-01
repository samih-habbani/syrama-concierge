'use client'

import { useState, useRef } from 'react'
import { useModalA11y } from '@/lib/useModalA11y'

interface VillaInquiryModalProps {
  propertyId: number
  propertyTitle: string
  isOpen: boolean
  onClose: () => void
}

const todayISO = () => new Date().toISOString().split('T')[0]

export default function VillaInquiryModal({ propertyId, propertyTitle, isOpen, onClose }: VillaInquiryModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    notes: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useModalA11y(isOpen, onClose, modalRef)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      const response = await fetch('/api/villa-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, propertyId, propertyTitle }),
      })
      if (!response.ok) {
        const data = await response.json()
        setError(data.error || 'Failed to send inquiry')
        return
      }
      setSuccess(true)
      setFormData({ fullName: '', email: '', phone: '', checkIn: '', checkOut: '', guests: '', notes: '' })
      setTimeout(() => { onClose(); setSuccess(false) }, 2000)
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
      className="fixed inset-0 flex items-center justify-center z-50 p-4 transition-opacity duration-300"
      style={{
        background: 'rgba(6, 9, 15, 0.3)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.3s ease-out',
      }}
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .villa-modal-content { animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .villa-modal-content input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.7) sepia(1) saturate(3) hue-rotate(10deg); opacity: 0.7; cursor: pointer; }
      `}</style>

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="villa-inquiry-title"
        className="villa-modal-content bg-gradient-to-b from-[#0f1419] to-[#06090f] max-w-md w-full max-h-[90vh] overflow-y-auto rounded-lg border border-[#b8974a]/20 p-6 sm:p-12 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {success ? (
          <div className="text-center py-12" role="status">
            <div className="text-[#b8974a] mb-4 text-4xl" aria-hidden="true">✓</div>
            <h3 id="villa-inquiry-title" className="text-xl text-white mb-2" style={{ fontFamily: 'var(--font-tenor)' }}>
              Request Received
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Thank you for your interest. Our team will contact you shortly to arrange your stay.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 id="villa-inquiry-title" className="text-[#b8974a] text-sm tracking-widest uppercase mb-2">Stay Request</h2>
              <h3 className="text-2xl text-white" style={{ fontFamily: 'var(--font-tenor)' }}>
                {propertyTitle}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-300 px-4 py-3 text-sm rounded-lg">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="villa-fullName" className="text-gray-500 text-xs tracking-widest uppercase block mb-3">Full Name *</label>
                  <input id="villa-fullName" type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                    className="w-full bg-[#06090f]/80 border border-[#b8974a]/25 hover:border-[#b8974a]/50 focus:border-[#b8974a] rounded-lg px-4 py-3 text-[#f5eedd] focus:outline-none transition text-sm placeholder-gray-500"
                    placeholder="Your name" required />
                </div>
                <div>
                  <label htmlFor="villa-phone" className="text-gray-500 text-xs tracking-widest uppercase block mb-3">Phone *</label>
                  <input id="villa-phone" type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    className="w-full bg-[#06090f]/80 border border-[#b8974a]/25 hover:border-[#b8974a]/50 focus:border-[#b8974a] rounded-lg px-4 py-3 text-[#f5eedd] focus:outline-none transition text-sm placeholder-gray-500"
                    placeholder="+971..." required />
                </div>
              </div>

              <div>
                <label htmlFor="villa-email" className="text-gray-500 text-xs tracking-widest uppercase block mb-3">Email *</label>
                <input id="villa-email" type="email" name="email" value={formData.email} onChange={handleChange}
                  className="w-full bg-[#06090f]/80 border border-[#b8974a]/25 hover:border-[#b8974a]/50 focus:border-[#b8974a] rounded-lg px-4 py-3 text-[#f5eedd] focus:outline-none transition text-sm placeholder-gray-500"
                  placeholder="your@email.com" required />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="villa-checkIn" className="text-gray-500 text-xs tracking-widest uppercase block mb-3">Check-in *</label>
                  <input id="villa-checkIn" type="date" name="checkIn" value={formData.checkIn} min={todayISO()} onChange={handleChange}
                    className="w-full bg-white/5 border border-[#b8974a]/25 hover:border-[#b8974a]/50 focus:border-[#b8974a] rounded-lg px-3 py-3 text-[#f5eedd] focus:outline-none transition text-sm" style={{ colorScheme: 'dark' }} required />
                </div>
                <div>
                  <label htmlFor="villa-checkOut" className="text-gray-500 text-xs tracking-widest uppercase block mb-3">Check-out</label>
                  <input id="villa-checkOut" type="date" name="checkOut" value={formData.checkOut} min={formData.checkIn || todayISO()} onChange={handleChange}
                    className="w-full bg-white/5 border border-[#b8974a]/25 hover:border-[#b8974a]/50 focus:border-[#b8974a] rounded-lg px-3 py-3 text-[#f5eedd] focus:outline-none transition text-sm" style={{ colorScheme: 'dark' }} />
                </div>
                <div>
                  <label htmlFor="villa-guests" className="text-gray-500 text-xs tracking-widest uppercase block mb-3">Guests *</label>
                  <input id="villa-guests" type="number" name="guests" value={formData.guests} min="1" onChange={handleChange}
                    className="w-full bg-white/5 border border-[#b8974a]/25 hover:border-[#b8974a]/50 focus:border-[#b8974a] rounded-lg px-3 py-3 text-[#f5eedd] focus:outline-none transition text-sm" required />
                </div>
              </div>

              <div>
                <label htmlFor="villa-notes" className="text-gray-500 text-xs tracking-widest uppercase block mb-3">Notes</label>
                <textarea id="villa-notes" name="notes" value={formData.notes} onChange={handleChange} rows={3}
                  className="w-full bg-[#06090f]/80 border border-[#b8974a]/25 hover:border-[#b8974a]/50 focus:border-[#b8974a] rounded-lg px-4 py-3 text-[#f5eedd] focus:outline-none transition text-sm placeholder-gray-500 resize-none"
                  placeholder="Occasion, staff requests, transfers…" />
              </div>

              <div className="flex gap-3 pt-6 border-t border-[#b8974a]/10">
                <button type="submit" disabled={isLoading}
                  className="flex-1 bg-[#b8974a] text-[#06090f] rounded-lg px-6 py-3 transition font-medium text-sm tracking-wider uppercase hover:bg-[#d4af7a] disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoading ? 'Sending...' : 'Request Stay'}
                </button>
                <button type="button" onClick={onClose}
                  className="flex-1 text-gray-400 hover:text-gray-300 border border-gray-600 hover:border-gray-500 rounded-lg px-6 py-3 transition text-sm tracking-wider uppercase">
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
