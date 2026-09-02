'use client'
import { useEffect, useState } from 'react'
import { PageHead, Btn, Badge, Modal, Field, Input, Textarea, Select, F, tableStyle, thStyle, tdStyle } from '@/components/admin/ui'
import { EVENT_CATEGORIES } from '@/lib/event-service'

type Ev = {
  id: number; name: string; subtitle: string | null; location: string | null; country: string | null
  month: string | null; category: string; description: string | null; highlight: string | null
  image: string; sortOrder: number; published: boolean
}
const EMPTY: Partial<Ev> = { name: '', subtitle: '', location: '', country: '', month: '', category: 'Motorsport', description: '', highlight: '', image: '', sortOrder: 0, published: true }

export default function EventsPage() {
  const [events, setEvents] = useState<Ev[]>([])
  const [editing, setEditing] = useState<Partial<Ev> | null>(null)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')

  const load = () => fetch('/api/admin/events').then((r) => r.json()).then((d) => setEvents(d.events || []))
  useEffect(() => { load() }, [])

  async function save() {
    if (!editing?.name || !editing.category || !editing.image) { setErr('Name, category and image URL are required'); return }
    setSaving(true); setErr('')
    const res = await fetch('/api/admin/events', {
      method: editing.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    })
    setSaving(false)
    if (!res.ok) { setErr((await res.json().catch(() => ({}))).error || 'Save failed'); return }
    setEditing(null); load()
  }
  async function remove(id: number) {
    if (!confirm('Delete this event?')) return
    await fetch(`/api/admin/events?id=${id}`, { method: 'DELETE' }); load()
  }
  async function togglePub(e: Ev) {
    await fetch('/api/admin/events', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: e.id, published: !e.published }) })
    load()
  }

  const set = (k: keyof Ev) => (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setEditing((c) => ({ ...c, [k]: ev.target.value }))

  return (
    <div>
      <PageHead title="Events" subtitle="The prestigious events shown on /events." actions={<Btn onClick={() => { setEditing({ ...EMPTY, sortOrder: events.length }); setErr('') }}>+ Add event</Btn>} />

      <div style={{ border: '1px solid rgba(184,151,74,0.12)', borderRadius: 12, overflow: 'hidden' }}>
        <table style={tableStyle}>
          <thead><tr>
            <th style={thStyle}>#</th><th style={thStyle}>Event</th><th style={thStyle}>Category</th><th style={thStyle}>When</th><th style={thStyle}>Status</th><th style={thStyle}></th>
          </tr></thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id}>
                <td style={{ ...tdStyle, color: '#8a8a7c', width: 40 }}>{e.sortOrder}</td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {e.image && <img src={e.image} alt="" style={{ width: 44, height: 32, objectFit: 'cover', borderRadius: 4, flexShrink: 0 }} />}
                    <div>
                      <div style={{ color: '#f5eedd' }}>{e.name}</div>
                      <div style={{ fontSize: 11, color: '#8a8a7c' }}>{[e.location, e.country].filter(Boolean).join(' · ')}</div>
                    </div>
                  </div>
                </td>
                <td style={{ ...tdStyle, fontSize: 12 }}>{e.category}</td>
                <td style={{ ...tdStyle, fontSize: 12, color: '#8a8a7c' }}>{e.month || '—'}</td>
                <td style={tdStyle}>
                  <button onClick={() => togglePub(e)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <Badge tone={e.published ? 'green' : 'neutral'}>{e.published ? 'Published' : 'Hidden'}</Badge>
                  </button>
                </td>
                <td style={{ ...tdStyle, textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <Btn small variant="ghost" onClick={() => { setEditing(e); setErr('') }}>Edit</Btn>{' '}
                  <Btn small variant="danger" onClick={() => remove(e.id)}>Delete</Btn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? 'Edit event' : 'New event'} wide>
        {editing && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Field label="Name"><Input value={editing.name || ''} onChange={set('name')} /></Field>
              <Field label="Subtitle"><Input value={editing.subtitle || ''} onChange={set('subtitle')} /></Field>
              <Field label="Location"><Input value={editing.location || ''} onChange={set('location')} /></Field>
              <Field label="Country"><Input value={editing.country || ''} onChange={set('country')} /></Field>
              <Field label="Month(s)"><Input value={editing.month || ''} onChange={set('month')} placeholder="May · June" /></Field>
              <Field label="Category">
                <Select value={editing.category} onChange={set('category')}>
                  {EVENT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </Select>
              </Field>
            </div>
            <Field label="Description"><Textarea rows={3} value={editing.description || ''} onChange={set('description')} /></Field>
            <Field label="Highlight (small gold line)"><Input value={editing.highlight || ''} onChange={set('highlight')} placeholder="Paddock Club · Superyacht hospitality" /></Field>
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 14 }}>
              <Field label="Image URL"><Input value={editing.image || ''} onChange={set('image')} placeholder="https://…" /></Field>
              <Field label="Sort order"><Input type="number" value={editing.sortOrder ?? 0} onChange={set('sortOrder')} /></Field>
            </div>
            {editing.image && <img src={editing.image} alt="" style={{ width: '100%', maxHeight: 180, objectFit: 'cover', borderRadius: 8, marginBottom: 14 }} />}
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: F, fontSize: 13, color: '#d4d4c6', marginBottom: 14 }}>
              <input type="checkbox" checked={editing.published !== false} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} />
              Published
            </label>
            {err && <p style={{ fontFamily: F, fontSize: 12, color: '#e08080' }}>{err}</p>}
            <div style={{ display: 'flex', gap: 10 }}>
              <Btn onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save'}</Btn>
              <Btn variant="ghost" onClick={() => setEditing(null)}>Cancel</Btn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
