'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PageHead, Stat, F } from '@/components/admin/ui'

type Counts = {
  villas: number; messagesUnread: number; messagesTotal: number
  events: number; blogPosts: number; clients: number; users: number
}

export default function OverviewPage() {
  const [c, setC] = useState<Counts | null>(null)
  const [err, setErr] = useState('')

  useEffect(() => {
    fetch('/api/admin/overview')
      .then((r) => r.json())
      .then((d) => (d.error ? setErr(d.error) : setC(d)))
      .catch(() => setErr('Could not load'))
  }, [])

  return (
    <div>
      <PageHead title="Overview" subtitle="Your concierge back-office." />
      {err && <p style={{ fontFamily: F, color: '#e08080' }}>{err}</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
        <Stat label="Villas" value={c?.villas ?? '—'} />
        <Stat label="Unread messages" value={c?.messagesUnread ?? '—'} accent="#d4b472" />
        <Stat label="Journal articles" value={c?.blogPosts ?? '—'} />
        <Stat label="Events" value={c?.events ?? '—'} />
        <Stat label="Clients" value={c?.clients ?? '—'} />
        <Stat label="Users" value={c?.users ?? '—'} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
        {[
          { label: 'Read messages', href: '/admin/dashboard/messages' },
          { label: 'Manage villas', href: '/admin/dashboard/villas' },
          { label: 'Write an article', href: '/admin/dashboard/blog' },
          { label: 'Edit events', href: '/admin/dashboard/events' },
          { label: 'Clients', href: '/admin/dashboard/clients' },
          { label: 'Users', href: '/admin/dashboard/users' },
        ].map((x) => (
          <Link
            key={x.href}
            href={x.href}
            style={{
              fontFamily: F, fontSize: 13, color: '#d4d4c6', textDecoration: 'none',
              border: '1px solid rgba(184,151,74,0.16)', borderRadius: 10, padding: '18px 20px',
              transition: 'border-color 0.2s ease',
            }}
          >
            {x.label} →
          </Link>
        ))}
      </div>
    </div>
  )
}
