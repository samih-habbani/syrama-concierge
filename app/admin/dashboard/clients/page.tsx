'use client'
import { useCallback, useEffect, useState } from 'react'
import { PageHead, Btn, Modal, Field, Input, Textarea, F, tableStyle, thStyle, tdStyle } from '@/components/admin/ui'

type Client = {
  id: number; fullName: string; email: string | null; phone: string | null
  city: string | null; country: string | null; region: string | null; address: string | null; notes: string | null
}
const EMPTY: Partial<Client> = { fullName: '', email: '', phone: '', city: '', country: '', region: '', address: '', notes: '' }

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [q, setQ] = useState('')
  const [editing, setEditing] = useState<Partial<Client> | null>(null)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')

  const load = useCallback(() => {
    fetch(`/api/admin/clients?q=${encodeURIComponent(q)}`)
      .then((r) => r.json())
      .then((d) => setClients(d.clients || []))
  }, [q])

  useEffect(() => { const t = setTimeout(load, 250); return () => clearTimeout(t) }, [load])

  async function save() {
    if (!editing?.fullName) { setErr('Name is required'); return }
    setSaving(true); setErr('')
    const res = await fetch('/api/admin/clients', {
      method: editing.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    })
    setSaving(false)
    if (!res.ok) { setErr((await res.json().catch(() => ({}))).error || 'Save failed'); return }
    setEditing(null); load()
  }

  async function remove(id: number) {
    if (!confirm('Delete this client?')) return
    const res = await fetch(`/api/admin/clients?id=${id}`, { method: 'DELETE' })
    if (!res.ok) { alert((await res.json().catch(() => ({}))).error || 'Delete failed'); return }
    load()
  }

  const set = (k: keyof Client) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setEditing((c) => ({ ...c, [k]: e.target.value }))

  return (
    <div>
      <PageHead title="Clients" subtitle="Your client directory." actions={<Btn onClick={() => { setEditing({ ...EMPTY }); setErr('') }}>+ Add client</Btn>} />

      <Input placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} style={{ maxWidth: 320, marginBottom: 20 }} />

      <div style={{ border: '1px solid rgba(184,151,74,0.12)', borderRadius: 12, overflow: 'hidden' }}>
        <table style={tableStyle}>
          <thead><tr>
            <th style={thStyle}>Name</th><th style={thStyle}>Contact</th><th style={thStyle}>Location</th><th style={thStyle}></th>
          </tr></thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id}>
                <td style={{ ...tdStyle, color: '#f5eedd' }}>{c.fullName}</td>
                <td style={tdStyle}>
                  <div>{c.email || '—'}</div>
                  <div style={{ fontSize: 11, color: '#8a8a7c' }}>{c.phone || ''}</div>
                </td>
                <td style={{ ...tdStyle, fontSize: 12, color: '#8a8a7c' }}>{[c.city, c.country || c.region].filter(Boolean).join(', ') || '—'}</td>
                <td style={{ ...tdStyle, textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <Btn small variant="ghost" onClick={() => { setEditing(c); setErr('') }}>Edit</Btn>{' '}
                  <Btn small variant="danger" onClick={() => remove(c.id)}>Delete</Btn>
                </td>
              </tr>
            ))}
            {clients.length === 0 && <tr><td style={{ ...tdStyle, textAlign: 'center', color: '#8a8a7c', padding: 30 }} colSpan={4}>No clients.</td></tr>}
          </tbody>
        </table>
      </div>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? 'Edit client' : 'New client'}>
        {editing && (
          <div>
            <Field label="Full name"><Input value={editing.fullName || ''} onChange={set('fullName')} /></Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Field label="Email"><Input type="email" value={editing.email || ''} onChange={set('email')} /></Field>
              <Field label="Phone"><Input value={editing.phone || ''} onChange={set('phone')} /></Field>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
              <Field label="City"><Input value={editing.city || ''} onChange={set('city')} /></Field>
              <Field label="Country"><Input value={editing.country || ''} onChange={set('country')} /></Field>
              <Field label="Region"><Input value={editing.region || ''} onChange={set('region')} /></Field>
            </div>
            <Field label="Address"><Input value={editing.address || ''} onChange={set('address')} /></Field>
            <Field label="Notes"><Textarea rows={3} value={editing.notes || ''} onChange={set('notes')} /></Field>
            {err && <p style={{ fontFamily: F, fontSize: 12, color: '#e08080' }}>{err}</p>}
            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              <Btn onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save'}</Btn>
              <Btn variant="ghost" onClick={() => setEditing(null)}>Cancel</Btn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
