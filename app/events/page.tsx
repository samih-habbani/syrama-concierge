import { Navbar } from '@/components/sections/Navbar'
import { ContactForm } from '@/components/shared/ContactForm'
import { SiteFooter } from '@/components/shared/SiteFooter'
import { EventsExplorer } from '@/components/events/EventsExplorer'
import { getEvents } from '@/lib/event-service'

export const revalidate = 3600

const SERVICES = [
  { label: 'VIP access & tickets', desc: 'The most sought-after passes — from paddock clubs to royal enclosures.' },
  { label: 'Private transfers', desc: 'Helicopter, superyacht, or armoured car — from Dubai or onsite.' },
  { label: 'Accommodation', desc: 'The finest suites, private villas and historic palazzos, reserved in advance.' },
  { label: 'On-site concierge', desc: 'A dedicated Syrama concierge accompanies your party throughout.' },
  { label: 'Private security', desc: 'Discreet executive protection for principals and families.' },
  { label: 'Hospitality & dining', desc: 'Exclusive tables, private chefs, and invitation-only soirées.' },
]

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <div style={{ background: '#06090f', minHeight: '100vh' }}>
      <Navbar />
      <main id="main-content">

        {/* Hero */}
        <div style={{ position: 'relative', height: '80vh', overflow: 'hidden' }}>
          <img src="/assets/iconic-events.webp" alt="" aria-hidden="true" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.28)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,9,15,0.2) 0%, rgba(6,9,15,0.85) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(32px,6vw,96px)', paddingBottom: 'clamp(48px,7vw,100px)', paddingTop: 120 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
                <div style={{ width: 48, height: 1, background: '#b8974a' }} />
                <span style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#b8974a' }}>Iconic Events</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(52px,8vw,110px)', lineHeight: 0.95, color: '#f5eedd', margin: '0 0 28px', maxWidth: 800 }}>
                The world&rsquo;s<br /><em style={{ fontStyle: 'italic', color: '#d4b472' }}>greatest stages.</em>
              </h1>
              <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 13, lineHeight: 2, color: '#9a9a8c', maxWidth: 520 }}>
                Monaco. Cannes. Wimbledon. Art Basel. We secure access,<br />arrange everything, and accompany you every step.
              </p>
            </div>
          </div>
        </div>

        {/* Filter + grid (interactive) */}
        <EventsExplorer events={events} />

        {/* Services */}
        <div style={{ padding: '100px clamp(32px,6vw,96px)', borderTop: '1px solid rgba(184,151,74,0.1)', borderBottom: '1px solid rgba(184,151,74,0.1)' }}>
          <div className="hp-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, marginBottom: 72 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <div style={{ width: 40, height: 1, background: '#b8974a' }} />
                <span style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8974a' }}>Full orchestration</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(38px,5vw,68px)', lineHeight: 1.0, color: '#f5eedd', margin: 0 }}>We handle<br /><em style={{ color: '#d4b472' }}>every detail.</em></h2>
            </div>
            <div style={{ paddingTop: 16 }}>
              <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 13, lineHeight: 2, color: '#8a8a7c', margin: '0 0 24px' }}>An iconic event is only as extraordinary as the experience surrounding it. We go beyond the ticket — building an entire journey that places you exactly where you want to be, without a single logistical thought.</p>
            </div>
          </div>
          <div className="hp-events-cats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
            {SERVICES.map((s, i) => (
              <div key={s.label} style={{ padding: '36px 32px', borderTop: '1px solid rgba(184,151,74,0.12)', borderLeft: i % 3 !== 0 ? '1px solid rgba(184,151,74,0.08)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 4, height: 4, background: '#b8974a', borderRadius: '50%', flexShrink: 0 }} />
                  <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#f5eedd' }}>{s.label}</div>
                </div>
                <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 12, lineHeight: 1.8, color: '#9a9a8c', margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enquiry form — same form as the homepage */}
        <div id="enquiry" style={{ padding: '110px clamp(32px,6vw,96px)', scrollMarginTop: 90 }}>
          <div className="hp-2col" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 6vw, 96px)', alignItems: 'start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
                <div style={{ width: 40, height: 1, background: '#b8974a' }} />
                <span style={{ fontFamily: 'var(--font-tenor)', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#b8974a' }}>Plan your event</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, fontSize: 'clamp(34px,4.5vw,58px)', lineHeight: 1.05, color: '#f5eedd', margin: '0 0 24px' }}>
                Tell us where you<br /><em style={{ fontStyle: 'italic', color: '#d4b472' }}>want to be.</em>
              </h2>
              <p style={{ fontFamily: 'var(--font-tenor)', fontSize: 13, lineHeight: 2, color: '#8a8a7c', maxWidth: 420 }}>
                A dedicated advisor replies within 2 hours with access, logistics and a full plan — no intermediaries.
              </p>
            </div>
            <ContactForm defaultRequestType="Private Event" />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
