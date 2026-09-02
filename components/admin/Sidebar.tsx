'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Home, Newspaper, Ticket, MessageSquare,
  Contact, ShieldUser, ExternalLink, LogOut,
} from 'lucide-react'

type NavItem = { label: string; href: string; icon: typeof Home; exact?: boolean }
type NavGroup = { label: string; items: NavItem[] }

const NAV: NavGroup[] = [
  { label: 'Main', items: [
    { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard, exact: true },
  ]},
  { label: 'Content', items: [
    { label: 'Villas', href: '/admin/dashboard/villas', icon: Home },
    { label: 'Journal', href: '/admin/dashboard/blog', icon: Newspaper },
    { label: 'Events', href: '/admin/dashboard/events', icon: Ticket },
  ]},
  { label: 'Inbox', items: [
    { label: 'Messages', href: '/admin/dashboard/messages', icon: MessageSquare },
    { label: 'Clients', href: '/admin/dashboard/clients', icon: Contact },
  ]},
  { label: 'Administration', items: [
    { label: 'Users', href: '/admin/dashboard/users', icon: ShieldUser },
  ]},
]

function active(pathname: string, item: NavItem) {
  return item.exact ? pathname === item.href : pathname.startsWith(item.href)
}

export function Sidebar({
  user, onLogout,
}: {
  user: { name: string | null; email: string } | null
  onLogout: () => void
}) {
  const pathname = usePathname() || ''

  return (
    <aside style={{
      width: 248, flexShrink: 0, height: '100vh', position: 'sticky', top: 0,
      display: 'flex', flexDirection: 'column',
      background: '#080b12', borderRight: '1px solid rgba(184,151,74,0.1)',
    }}>
      <Link href="/" style={{ textDecoration: 'none', display: 'block', padding: '26px 24px 22px' }}>
        <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, fontWeight: 400, letterSpacing: '0.16em', color: '#f5eedd' }}>SYRAMA</div>
        <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.3em', color: '#8f8f7f', marginTop: 3 }}>ADMINISTRATION</div>
      </Link>

      <nav style={{ flex: 1, overflowY: 'auto', padding: '4px 14px' }}>
        {NAV.map((group) => (
          <div key={group.label} style={{ marginBottom: 22 }}>
            <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#5a5a52', padding: '0 10px', marginBottom: 8 }}>
              {group.label}
            </div>
            {group.items.map((item) => {
              const a = active(pathname, item)
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 11, padding: '9px 12px', borderRadius: 7, marginBottom: 2,
                    fontFamily: 'var(--font-tenor)', fontSize: 13, color: a ? '#f5eedd' : '#8f8f7f',
                    background: a ? 'linear-gradient(135deg, rgba(184,151,74,0.16), rgba(184,151,74,0.05))' : 'transparent',
                    border: a ? '1px solid rgba(184,151,74,0.25)' : '1px solid transparent',
                    textDecoration: 'none', transition: 'background 0.2s ease, color 0.2s ease',
                  }}
                  onMouseEnter={(e) => { if (!a) { e.currentTarget.style.background = 'rgba(245,238,221,0.04)'; e.currentTarget.style.color = '#d8d8cc' } }}
                  onMouseLeave={(e) => { if (!a) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8f8f7f' } }}
                >
                  <Icon size={16} strokeWidth={1.75} color={a ? '#d4b472' : '#75756a'} style={{ flexShrink: 0 }} />
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      <div style={{ borderTop: '1px solid rgba(184,151,74,0.1)', padding: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', marginBottom: 6 }}>
          <div style={{
            width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #d4b472, #b8974a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-tenor)', fontSize: 12, fontWeight: 700, color: '#06090f',
          }}>
            {(user?.name || user?.email || '?').charAt(0).toUpperCase()}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 12.5, color: '#f5eedd', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name || 'Admin'}</div>
            <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 11, color: '#6b6b60', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email || ''}</div>
          </div>
        </div>
        <Link href="/" style={rowStyle}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(245,238,221,0.04)'; e.currentTarget.style.color = '#d8d8cc' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8f8f7f' }}>
          <ExternalLink size={16} strokeWidth={1.75} color="#75756a" /> Back to site
        </Link>
        <button onClick={onLogout} style={{ ...rowStyle, width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(196,94,94,0.08)'; e.currentTarget.style.color = '#e08080' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8f8f7f' }}>
          <LogOut size={16} strokeWidth={1.75} /> Logout
        </button>
      </div>
    </aside>
  )
}

const rowStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 11, padding: '9px 12px', borderRadius: 7,
  fontFamily: 'var(--font-tenor)', fontSize: 13, color: '#8f8f7f', textDecoration: 'none',
  transition: 'background 0.2s ease, color 0.2s ease',
}
