'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

type TripType = 'oneway' | 'roundtrip' | 'multileg'
type Step = 1 | 2 | 3

const AIRCRAFT_TYPES = [
  { id: 'light', label: 'Light Jet', sub: 'Up to 7 pax · 3h range', example: 'Phenom 300 · Citation CJ4' },
  { id: 'midsize', label: 'Midsize Jet', sub: 'Up to 9 pax · 5h range', example: 'Challenger 350 · Citation XLS' },
  { id: 'supermid', label: 'Super Midsize', sub: 'Up to 10 pax · 7h range', example: 'Falcon 2000 · G280' },
  { id: 'heavy', label: 'Heavy Jet', sub: 'Up to 14 pax · 10h range', example: 'Challenger 604 · Falcon 900' },
  { id: 'ultra', label: 'Ultra Long Range', sub: 'Up to 19 pax · 14h range', example: 'G650 · Global 7500' },
  { id: 'vip', label: 'VIP Airliner', sub: 'Up to 50 pax · Global', example: 'BBJ · ACJ · A318 Elite' },
]

const inputStyle: React.CSSProperties = { width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(184,151,74,0.25)', padding: '14px 0', fontFamily: 'var(--font-cormorant)', fontSize: 20, fontWeight: 300, color: '#f5eedd', outline: 'none', transition: 'border-color 0.3s ease' }
const labelStyle: React.CSSProperties = { fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#b8974a', display: 'block', marginBottom: 8 }

export default function JetFinderPage() {
  const [step, setStep] = useState<Step>(1)
  const [tripType, setTripType] = useState<TripType>('oneway')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [passengers, setPassengers] = useState(2)
  const [animals, setAnimals] = useState(0)
  const [aircraft, setAircraft] = useState('')
  const [flexibility, setFlexibility] = useState('exact')
  const [notes, setNotes] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const canProceed1 = from.trim() && to.trim() && date.trim() && (tripType !== 'roundtrip' || returnDate.trim())
  const canProceed2 = aircraft !== ''
  const canProceed3 = name.trim() && (email.trim() || phone.trim())

  async function handleSubmit() {
    if (!canProceed3) return
    setStatus('sending')
    try {
      const res = await fetch('/api/jet-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tripType, from, to, date, returnDate,
          passengers: `${passengers} passenger${passengers > 1 ? 's' : ''}`,
          animals: animals > 0 ? `${animals} pet${animals > 1 ? 's' : ''}` : undefined,
          aircraftType: AIRCRAFT_TYPES.find(a => a.id === aircraft)?.label ?? aircraft,
          flexibility: flexibility === 'exact' ? 'Exact dates' : flexibility === '1day' ? '± 1 day' : '± 3 days',
          notes,
          contact: { name, email, phone },
        }),
      })
      const data = await res.json()
      setStatus(data.ok ? 'sent' : 'error')
    } catch { setStatus('error') }
  }

  return (
    <main style={{ background: '#06090f', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 48px', background: 'rgba(6,9,15,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(184,151,74,0.12)' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, fontWeight: 300, letterSpacing: '0.3em', color: '#f5eedd' }}>SYRAMA</div>
          <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#6a6a5e', marginTop: 2 }}>Dubai · Concierge</div>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <Link href="/#aviation" style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6a6a5e', textDecoration: 'none' }}>← Aviation</Link>
          <Link href="/#contact" style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#06090f', background: '#b8974a', padding: '12px 24px', textDecoration: 'none' }}>Contact Us</Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ position: 'relative', height: '45vh', overflow: 'hidden', flexShrink: 0 }}>
        <img src="/assets/Jet.webp" alt="Private jet" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)', objectPosition: 'center 60%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,9,15,0.4) 0%, rgba(6,9,15,0.8) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 80, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{ width: 40, height: 1, background: '#b8974a' }} />
              <span style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#b8974a' }}>Private Aviation</span>
              <div style={{ width: 40, height: 1, background: '#b8974a' }} />
            </div>
            <h1 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(42px, 6vw, 80px)', lineHeight: 1.0, color: '#f5eedd', margin: '0 0 16px' }}>Jet Finder</h1>
            <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 12, letterSpacing: '0.08em', color: 'rgba(106,106,94,0.8)', maxWidth: 460 }}>Tell us where you're going. We source the right aircraft within the hour.</p>
          </motion.div>
        </div>
      </div>

      {/* Form */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '64px 24px 120px' }}>
        <div style={{ width: '100%', maxWidth: 780 }}>

          {/* Steps */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: 64 }}>
            {([1, 2, 3] as Step[]).map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div onClick={() => step > s && setStep(s)} style={{ width: 32, height: 32, borderRadius: '50%', border: `1px solid ${step >= s ? '#b8974a' : 'rgba(184,151,74,0.2)'}`, background: step === s ? '#b8974a' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-tenor)', fontSize: 10, color: step === s ? '#06090f' : step > s ? '#b8974a' : 'rgba(184,151,74,0.4)', transition: 'all 0.4s ease', cursor: step > s ? 'pointer' : 'default' }}>{step > s ? '✓' : s}</div>
                  <span style={{ fontFamily: 'var(--font-tenor)', fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: step >= s ? '#b8974a' : 'rgba(106,106,94,0.4)', whiteSpace: 'nowrap' }}>{s === 1 ? 'Flight' : s === 2 ? 'Aircraft' : 'Contact'}</span>
                </div>
                {i < 2 && <div style={{ width: 80, height: 1, background: step > s ? '#b8974a' : 'rgba(184,151,74,0.15)', margin: '0 16px', marginBottom: 24, transition: 'background 0.4s ease' }} />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
                {/* Trip type */}
                <div style={{ marginBottom: 48 }}>
                  <div style={labelStyle}>Type of flight</div>
                  <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(184,151,74,0.15)' }}>
                    {([{ id: 'oneway', label: 'One Way' }, { id: 'roundtrip', label: 'Round Trip' }, { id: 'multileg', label: 'Multi-Leg' }] as { id: TripType; label: string }[]).map(t => (
                      <button key={t.id} onClick={() => setTripType(t.id)} style={{ flex: 1, background: 'none', border: 'none', cursor: 'pointer', padding: '16px 0', fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: tripType === t.id ? '#f5eedd' : 'rgba(106,106,94,0.6)', borderBottom: tripType === t.id ? '2px solid #b8974a' : '2px solid transparent', marginBottom: -1, transition: 'all 0.25s ease' }}>{t.label}</button>
                    ))}
                  </div>
                </div>
                {/* From / To */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 0, alignItems: 'end', marginBottom: 48 }}>
                  <div>
                    <label style={labelStyle}>From</label>
                    <input value={from} onChange={e => setFrom(e.target.value)} placeholder="Dubai · DXB" style={inputStyle} onFocus={e => (e.currentTarget.style.borderBottomColor = '#b8974a')} onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(184,151,74,0.25)')} />
                  </div>
                  <div style={{ textAlign: 'center', padding: '0 24px 14px', color: 'rgba(184,151,74,0.4)', fontSize: 18 }}>→</div>
                  <div>
                    <label style={labelStyle}>To</label>
                    <input value={to} onChange={e => setTo(e.target.value)} placeholder="Paris · CDG" style={inputStyle} onFocus={e => (e.currentTarget.style.borderBottomColor = '#b8974a')} onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(184,151,74,0.25)')} />
                  </div>
                </div>
                {/* Dates */}
                <div style={{ display: 'grid', gridTemplateColumns: tripType === 'roundtrip' ? '1fr 1fr' : '1fr', gap: 40, marginBottom: 48 }}>
                  <div>
                    <label style={labelStyle}>Departure date</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ ...inputStyle, colorScheme: 'dark' }} onFocus={e => (e.currentTarget.style.borderBottomColor = '#b8974a')} onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(184,151,74,0.25)')} />
                  </div>
                  {tripType === 'roundtrip' && (
                    <div>
                      <label style={labelStyle}>Return date</label>
                      <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} style={{ ...inputStyle, colorScheme: 'dark' }} onFocus={e => (e.currentTarget.style.borderBottomColor = '#b8974a')} onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(184,151,74,0.25)')} />
                    </div>
                  )}
                </div>
                {/* Passengers + Animals */}
                <div style={{ marginBottom: 64 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
                    <div>
                      <label style={labelStyle}>Passengers</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 0, borderBottom: '1px solid rgba(184,151,74,0.25)', paddingBottom: 14 }}>
                        <button onClick={() => setPassengers(p => Math.max(1, p - 1))} style={{ background: 'none', border: '1px solid rgba(184,151,74,0.25)', color: '#b8974a', width: 36, height: 36, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>−</button>
                        <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 28, fontWeight: 300, color: '#f5eedd', flex: 1, textAlign: 'center' }}>{passengers} <span style={{ fontSize: 14, color: '#6a6a5e' }}>pax</span></span>
                        <button onClick={() => setPassengers(p => Math.min(50, p + 1))} style={{ background: 'none', border: '1px solid rgba(184,151,74,0.25)', color: '#b8974a', width: 36, height: 36, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>+</button>
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Animals</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 0, borderBottom: '1px solid rgba(184,151,74,0.25)', paddingBottom: 14 }}>
                        <button onClick={() => setAnimals(a => Math.max(0, a - 1))} style={{ background: 'none', border: '1px solid rgba(184,151,74,0.25)', color: '#b8974a', width: 36, height: 36, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>−</button>
                        <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 28, fontWeight: 300, color: animals > 0 ? '#f5eedd' : 'rgba(245,238,221,0.25)', flex: 1, textAlign: 'center' }}>{animals} <span style={{ fontSize: 14, color: '#6a6a5e' }}>{animals === 1 ? 'pet' : 'pets'}</span></span>
                        <button onClick={() => setAnimals(a => Math.min(10, a + 1))} style={{ background: 'none', border: '1px solid rgba(184,151,74,0.25)', color: '#b8974a', width: 36, height: 36, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
                <button onClick={() => canProceed1 && setStep(2)} disabled={!canProceed1} style={{ width: '100%', padding: '20px', background: canProceed1 ? '#b8974a' : 'rgba(184,151,74,0.15)', border: 'none', cursor: canProceed1 ? 'pointer' : 'not-allowed', fontFamily: 'var(--font-tenor)', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: canProceed1 ? '#06090f' : 'rgba(184,151,74,0.3)', transition: 'background 0.3s ease' }}>Continue — Choose aircraft →</button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
                <div style={{ marginBottom: 12 }}><div style={labelStyle}>Select your aircraft category</div></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 48 }}>
                  {AIRCRAFT_TYPES.map(a => (
                    <button key={a.id} onClick={() => setAircraft(a.id)} style={{ background: aircraft === a.id ? 'rgba(184,151,74,0.08)' : 'transparent', border: `1px solid ${aircraft === a.id ? '#b8974a' : 'rgba(184,151,74,0.15)'}`, cursor: 'pointer', padding: '20px 24px', textAlign: 'left', transition: 'all 0.25s ease' }}>
                      <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 19, fontWeight: 300, color: aircraft === a.id ? '#f5eedd' : 'rgba(245,238,221,0.6)', marginBottom: 6 }}>{a.label}</div>
                      <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.15em', color: '#b8974a', textTransform: 'uppercase', marginBottom: 4 }}>{a.sub}</div>
                      <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.08em', color: 'rgba(106,106,94,0.7)' }}>{a.example}</div>
                    </button>
                  ))}
                </div>
                <div style={{ marginBottom: 48 }}>
                  <div style={labelStyle}>Date flexibility</div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    {[{ id: 'exact', label: 'Exact dates' }, { id: '1day', label: '± 1 day' }, { id: '3days', label: '± 3 days' }].map(f => (
                      <button key={f.id} onClick={() => setFlexibility(f.id)} style={{ flex: 1, padding: '12px', background: 'transparent', border: `1px solid ${flexibility === f.id ? '#b8974a' : 'rgba(184,151,74,0.15)'}`, cursor: 'pointer', fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: flexibility === f.id ? '#b8974a' : 'rgba(106,106,94,0.6)', transition: 'all 0.25s ease' }}>{f.label}</button>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 48 }}>
                  <label style={labelStyle}>Special requests (optional)</label>
                  <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Catering preferences, ground transport, any specific requirements…" rows={3} style={{ ...inputStyle, resize: 'none', lineHeight: 1.7, fontSize: 16, display: 'block' }} onFocus={e => (e.currentTarget.style.borderBottomColor = '#b8974a')} onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(184,151,74,0.25)')} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <button onClick={() => setStep(1)} style={{ padding: '20px', background: 'transparent', border: '1px solid rgba(184,151,74,0.2)', cursor: 'pointer', fontFamily: 'var(--font-tenor)', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(184,151,74,0.5)' }}>← Back</button>
                  <button onClick={() => canProceed2 && setStep(3)} disabled={!canProceed2} style={{ padding: '20px', background: canProceed2 ? '#b8974a' : 'rgba(184,151,74,0.15)', border: 'none', cursor: canProceed2 ? 'pointer' : 'not-allowed', fontFamily: 'var(--font-tenor)', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: canProceed2 ? '#06090f' : 'rgba(184,151,74,0.3)', transition: 'background 0.3s ease' }}>Continue →</button>
                </div>
              </motion.div>
            )}

            {step === 3 && status !== 'sent' && (
              <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
                <div style={{ border: '1px solid rgba(184,151,74,0.15)', padding: '24px 28px', marginBottom: 48, background: 'rgba(184,151,74,0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 20, height: 1, background: '#b8974a' }} />
                    <span style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#b8974a' }}>Your request summary</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, fontWeight: 300, color: '#f5eedd', marginBottom: 8 }}>{from} <span style={{ color: '#b8974a', fontSize: 16 }}>→</span> {to}</div>
                  <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.12em', color: '#6a6a5e' }}>{date}{returnDate ? ` · Return ${returnDate}` : ''} &nbsp;·&nbsp; {passengers} pax &nbsp;·&nbsp; {AIRCRAFT_TYPES.find(a => a.id === aircraft)?.label}</div>
                </div>
                <div style={{ marginBottom: 40 }}>
                  <label style={labelStyle}>Your name</label>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="First & last name" style={inputStyle} onFocus={e => (e.currentTarget.style.borderBottomColor = '#b8974a')} onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(184,151,74,0.25)')} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 56 }}>
                  <div>
                    <label style={labelStyle}>Email address</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={inputStyle} onFocus={e => (e.currentTarget.style.borderBottomColor = '#b8974a')} onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(184,151,74,0.25)')} />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone / WhatsApp</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+971 50 000 0000" style={inputStyle} onFocus={e => (e.currentTarget.style.borderBottomColor = '#b8974a')} onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(184,151,74,0.25)')} />
                  </div>
                </div>
                <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, lineHeight: 1.8, color: 'rgba(106,106,94,0.5)', textAlign: 'center', margin: '0 0 24px' }}>Our aviation team responds within 1 hour, 24/7.</p>
                {status === 'error' && <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, color: '#c0614a', textAlign: 'center', marginBottom: 16 }}>Something went wrong. Please try again.</div>}
                <button onClick={handleSubmit} disabled={!canProceed3 || status === 'sending'} style={{ width: '100%', padding: '22px', background: canProceed3 ? '#b8974a' : 'rgba(184,151,74,0.15)', border: 'none', cursor: canProceed3 ? 'pointer' : 'not-allowed', fontFamily: 'var(--font-tenor)', fontSize: 11, letterSpacing: '0.35em', textTransform: 'uppercase', color: canProceed3 ? '#06090f' : 'rgba(184,151,74,0.3)', transition: 'background 0.3s ease' }}>{status === 'sending' ? 'Sending…' : 'Send request →'}</button>
                <button onClick={() => setStep(2)} style={{ width: '100%', padding: '14px', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(106,106,94,0.4)', marginTop: 12 }}>← Back</button>
              </motion.div>
            )}

            {status === 'sent' && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{ width: 64, height: 64, border: '1px solid #b8974a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', fontSize: 24, color: '#b8974a' }}>✓</div>
                <h2 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 40, color: '#f5eedd', margin: '0 0 16px' }}>Request received.</h2>
                <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 12, lineHeight: 1.9, color: '#6a6a5e', maxWidth: 420, margin: '0 auto 40px' }}>Our aviation team will reach out within the hour with aircraft options, pricing and availability.</p>
                <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                  <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#06090f', background: '#b8974a', padding: '14px 28px', textDecoration: 'none' }}>Back to home</Link>
                  <a href={`https://wa.me/971505548034`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#b8974a', border: '1px solid rgba(184,151,74,0.3)', padding: '14px 28px', textDecoration: 'none' }}>WhatsApp us</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}
