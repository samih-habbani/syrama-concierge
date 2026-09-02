'use client'
import { useCallback, useEffect, useState } from 'react'
import { PageHead, Btn, Badge, Modal, F, tableStyle, thStyle, tdStyle, Input, Select } from '@/components/admin/ui'

type Msg = {
  id: number; name: string | null; firstName: string | null; lastName: string | null
  email: string; phone: string | null; subject: string; message: string
  destination: string | null; preferredDate: string | null; numberOfGuests: number | null
  status: string; createdAt: string
}

const STATUS_TONE: Record<string, 'gold' | 'neutral' | 'green'> = { unread: 'gold', read: 'neutral', archived: 'green' }

export default function MessagesPage() {
  const [messages, setMessages] = useState<Msg[]>([])
  const [status, setStatus] = useState('all')
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState<Msg | null>(null)

  const load = useCallback(() => {
    setLoading(true)
    const p = new URLSearchParams()
    if (status !== 'all') p.set('status', status)
    if (q) p.set('q', q)
    fetch(`/api/admin/messages?${p}`)
      .then((r) => r.json())
      .then((d) => setMessages(d.messages || []))
      .finally(() => setLoading(false))
  }, [status, q])

  useEffect(() => {
    const t = setTimeout(load, 250)
    return () => clearTimeout(t)
  }, [load])

  async function setMsgStatus(id: number, s: string) {
    await fetch('/api/admin/messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: s }),
    })
    setMessages((m) => m.map((x) => (x.id === id ? { ...x, status: s } : x)))
    setOpen((o) => (o && o.id === id ? { ...o, status: s } : o))
  }

  async function remove(id: number) {
    if (!confirm('Delete this message permanently?')) return
    await fetch(`/api/admin/messages?id=${id}`, { method: 'DELETE' })
    setMessages((m) => m.filter((x) => x.id !== id))
    setOpen(null)
  }

  function openMsg(m: Msg) {
    setOpen(m)
    if (m.status === 'unread') setMsgStatus(m.id, 'read')
  }

  return (
    <div>
      <PageHead title="Messages" subtitle="Contact requests, jet & villa enquiries and newsletter sign-ups." />

      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <Input placeholder="Search name, email, subject…" value={q} onChange={(e) => setQ(e.target.value)} style={{ maxWidth: 320 }} />
        <Select value={status} onChange={(e) => setStatus(e.target.value)} style={{ maxWidth: 180 }}>
          <option value="all">All statuses</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
          <option value="archived">Archived</option>
        </Select>
      </div>

      <div style={{ border: '1px solid rgba(184,151,74,0.12)', borderRadius: 12, overflow: 'hidden' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>From</th>
              <th style={thStyle}>Subject</th>
              <th style={thStyle}>Received</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}></th>
            </tr>
          </thead>
          <tbody>
            {messages.map((m) => (
              <tr key={m.id} style={{ cursor: 'pointer', background: m.status === 'unread' ? 'rgba(184,151,74,0.04)' : undefined }} onClick={() => openMsg(m)}>
                <td style={tdStyle}>
                  <div style={{ color: '#f5eedd' }}>{m.name || `${m.firstName ?? ''} ${m.lastName ?? ''}`.trim() || '—'}</div>
                  <div style={{ fontSize: 11, color: '#8a8a7c' }}>{m.email}</div>
                </td>
                <td style={{ ...tdStyle, maxWidth: 320 }}>
                  <div style={{ color: '#d4d4c6' }}>{m.subject}</div>
                  <div style={{ fontSize: 11, color: '#8a8a7c', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.message}</div>
                </td>
                <td style={{ ...tdStyle, whiteSpace: 'nowrap', fontSize: 12, color: '#8a8a7c' }}>
                  {new Date(m.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
                <td style={tdStyle}><Badge tone={STATUS_TONE[m.status] || 'neutral'}>{m.status}</Badge></td>
                <td style={{ ...tdStyle, textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                  <Btn small variant="ghost" onClick={() => setMsgStatus(m.id, m.status === 'archived' ? 'read' : 'archived')}>
                    {m.status === 'archived' ? 'Unarchive' : 'Archive'}
                  </Btn>
                </td>
              </tr>
            ))}
            {!loading && messages.length === 0 && (
              <tr><td style={{ ...tdStyle, textAlign: 'center', color: '#8a8a7c', padding: 30 }} colSpan={5}>No messages.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={!!open} onClose={() => setOpen(null)} title={open?.subject || ''}>
        {open && (
          <div style={{ fontFamily: F, fontSize: 13, color: '#d4d4c6', lineHeight: 1.7 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', rowGap: 8, marginBottom: 18, fontSize: 12.5 }}>
              <span style={{ color: '#8a8a7c' }}>Name</span><span>{open.name || `${open.firstName ?? ''} ${open.lastName ?? ''}`.trim() || '—'}</span>
              <span style={{ color: '#8a8a7c' }}>Email</span><a href={`mailto:${open.email}`} style={{ color: '#d4b472' }}>{open.email}</a>
              {open.phone && (<><span style={{ color: '#8a8a7c' }}>Phone</span><a href={`tel:${open.phone}`} style={{ color: '#d4b472' }}>{open.phone}</a></>)}
              {open.destination && (<><span style={{ color: '#8a8a7c' }}>Destination</span><span>{open.destination}</span></>)}
              {open.preferredDate && (<><span style={{ color: '#8a8a7c' }}>Preferred date</span><span>{open.preferredDate}</span></>)}
              {open.numberOfGuests != null && (<><span style={{ color: '#8a8a7c' }}>Guests</span><span>{open.numberOfGuests}</span></>)}
              <span style={{ color: '#8a8a7c' }}>Received</span><span>{new Date(open.createdAt).toLocaleString('en-GB')}</span>
            </div>
            <div style={{ whiteSpace: 'pre-wrap', padding: '16px 18px', border: '1px solid rgba(184,151,74,0.15)', borderRadius: 8, background: 'rgba(255,255,255,0.02)' }}>
              {open.message}
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
              <Btn as="a" href={`mailto:${open.email}?subject=Re: ${encodeURIComponent(open.subject)}`}>Reply by email</Btn>
              <Btn variant="ghost" onClick={() => setMsgStatus(open.id, open.status === 'archived' ? 'read' : 'archived')}>
                {open.status === 'archived' ? 'Unarchive' : 'Archive'}
              </Btn>
              <Btn variant="danger" onClick={() => remove(open.id)}>Delete</Btn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
