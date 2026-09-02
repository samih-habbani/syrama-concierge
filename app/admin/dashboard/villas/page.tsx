'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { PageHead, Btn, Badge, Modal, Field, Input, Textarea, Select, F, tableStyle, thStyle, tdStyle } from '@/components/admin/ui'

type Villa = {
  id: number; title: string | null; city: string | null; region: string | null; type: string | null
  bedrooms: number | null; bathrooms: number | null; beds: number | null; maxGuests: number | null
  surface: number | null; surfaceUnit: string | null
  priceDay: number | null; priceWeek: number | null; priceMonth: number | null; currency: string | null
  available: boolean | null; description: string | null; mapIframeSrc: string | null; reference: string | null
  checkInFrom: string | null; checkOutBefore: string | null
  thumb?: string | null; photoCount?: number
}
const EMPTY: Partial<Villa> = { title: '', city: '', region: '', type: 'Villa', currency: '€', surfaceUnit: 'm²', available: true }
const imgUrl = (u: string) => (u.startsWith('http') ? u : `/uploads/yachts/${u}`)

export default function VillasPage() {
  const [villas, setVillas] = useState<Villa[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [q, setQ] = useState('')
  const [editing, setEditing] = useState<Partial<Villa> | null>(null)
  const [photosFor, setPhotosFor] = useState<Villa | null>(null)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')

  const load = useCallback(() => {
    const p = new URLSearchParams({ page: String(page), limit: '20' })
    if (q) p.set('q', q)
    fetch(`/api/admin/villas?${p}`)
      .then((r) => r.json())
      .then((d) => { setVillas(d.villas || []); setTotalPages(d.totalPages || 1) })
  }, [page, q])

  useEffect(() => { const t = setTimeout(load, 250); return () => clearTimeout(t) }, [load])

  async function save() {
    if (!editing?.title) { setErr('Title is required'); return }
    setSaving(true); setErr('')
    const res = await fetch('/api/admin/villas', {
      method: editing.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    })
    setSaving(false)
    if (!res.ok) { setErr((await res.json().catch(() => ({}))).error || 'Save failed'); return }
    const { villa } = await res.json()
    setEditing(null)
    load()
    if (!editing.id && villa) setPhotosFor(villa) // jump straight to photos for a new villa
  }
  async function remove(id: number) {
    if (!confirm('Delete this villa and all its photos?')) return
    await fetch(`/api/admin/villas?id=${id}`, { method: 'DELETE' }); load()
  }

  const set = (k: keyof Villa) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setEditing((c) => ({ ...c, [k]: e.target.value }))

  return (
    <div>
      <PageHead title="Villas" subtitle="Rental villas & residences (property table, shared with syrama-yachting)." actions={<Btn onClick={() => { setEditing({ ...EMPTY }); setErr('') }}>+ Add villa</Btn>} />

      <Input placeholder="Search title, city, region…" value={q} onChange={(e) => { setQ(e.target.value); setPage(1) }} style={{ maxWidth: 340, marginBottom: 20 }} />

      <div style={{ border: '1px solid rgba(184,151,74,0.12)', borderRadius: 12, overflow: 'hidden' }}>
        <table style={tableStyle}>
          <thead><tr>
            <th style={thStyle}>Villa</th><th style={thStyle}>Location</th><th style={thStyle}>Beds / Guests</th><th style={thStyle}>Week</th><th style={thStyle}>Photos</th><th style={thStyle}>Status</th><th style={thStyle}></th>
          </tr></thead>
          <tbody>
            {villas.map((v) => (
              <tr key={v.id}>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {v.thumb
                      ? <img src={imgUrl(v.thumb)} alt="" style={{ width: 48, height: 34, objectFit: 'cover', borderRadius: 4, flexShrink: 0 }} />
                      : <div style={{ width: 48, height: 34, borderRadius: 4, background: 'rgba(255,255,255,0.05)', flexShrink: 0 }} />}
                    <div style={{ color: '#f5eedd', maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.title || `#${v.id}`}</div>
                  </div>
                </td>
                <td style={{ ...tdStyle, fontSize: 12, color: '#8a8a7c' }}>{[v.city, v.region].filter(Boolean).join(', ') || '—'}</td>
                <td style={{ ...tdStyle, fontSize: 12 }}>{v.bedrooms ?? '—'} bd · {v.maxGuests ?? '—'} pax</td>
                <td style={{ ...tdStyle, fontSize: 12 }}>{v.priceWeek ? `${v.currency || '€'}${v.priceWeek.toLocaleString('en-US')}` : '—'}</td>
                <td style={tdStyle}>
                  <Btn small variant="ghost" onClick={() => setPhotosFor(v)}>{v.photoCount || 0} photos</Btn>
                </td>
                <td style={tdStyle}><Badge tone={v.available === false ? 'red' : 'green'}>{v.available === false ? 'Unavailable' : 'Available'}</Badge></td>
                <td style={{ ...tdStyle, textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <Btn small variant="ghost" onClick={() => { setEditing(v); setErr('') }}>Edit</Btn>{' '}
                  <Btn small variant="danger" onClick={() => remove(v.id)}>Delete</Btn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div style={{ display: 'flex', gap: 10, marginTop: 16, alignItems: 'center', fontFamily: F, fontSize: 12, color: '#8a8a7c' }}>
          <Btn small variant="ghost" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>Prev</Btn>
          Page {page} / {totalPages}
          <Btn small variant="ghost" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>Next</Btn>
        </div>
      )}

      {/* Edit / create */}
      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? 'Edit villa' : 'New villa'} wide>
        {editing && (
          <div>
            <Field label="Title"><Input value={editing.title || ''} onChange={set('title')} /></Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
              <Field label="City"><Input value={editing.city || ''} onChange={set('city')} /></Field>
              <Field label="Region"><Input value={editing.region || ''} onChange={set('region')} placeholder="French Riviera" /></Field>
              <Field label="Type"><Input value={editing.type || ''} onChange={set('type')} placeholder="Villa" /></Field>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
              <Field label="Bedrooms"><Input type="number" value={editing.bedrooms ?? ''} onChange={set('bedrooms')} /></Field>
              <Field label="Bathrooms"><Input type="number" value={editing.bathrooms ?? ''} onChange={set('bathrooms')} /></Field>
              <Field label="Beds"><Input type="number" value={editing.beds ?? ''} onChange={set('beds')} /></Field>
              <Field label="Max guests"><Input type="number" value={editing.maxGuests ?? ''} onChange={set('maxGuests')} /></Field>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Field label="Surface"><Input type="number" value={editing.surface ?? ''} onChange={set('surface')} /></Field>
              <Field label="Surface unit"><Input value={editing.surfaceUnit || ''} onChange={set('surfaceUnit')} /></Field>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
              <Field label="Price / day"><Input type="number" value={editing.priceDay ?? ''} onChange={set('priceDay')} /></Field>
              <Field label="Price / week"><Input type="number" value={editing.priceWeek ?? ''} onChange={set('priceWeek')} /></Field>
              <Field label="Price / month"><Input type="number" value={editing.priceMonth ?? ''} onChange={set('priceMonth')} /></Field>
              <Field label="Currency"><Input value={editing.currency || ''} onChange={set('currency')} /></Field>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Field label="Check-in from"><Input value={editing.checkInFrom || ''} onChange={set('checkInFrom')} placeholder="16:00" /></Field>
              <Field label="Check-out before"><Input value={editing.checkOutBefore || ''} onChange={set('checkOutBefore')} placeholder="10:00" /></Field>
            </div>
            <Field label="Description (HTML allowed)"><Textarea rows={5} value={editing.description || ''} onChange={set('description')} /></Field>
            <Field label="Google Maps iframe src"><Input value={editing.mapIframeSrc || ''} onChange={set('mapIframeSrc')} placeholder="https://www.google.com/maps/embed?…" /></Field>
            <Field label="Reference"><Input value={editing.reference || ''} onChange={set('reference')} /></Field>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: F, fontSize: 13, color: '#d4d4c6', margin: '4px 0 16px' }}>
              <input type="checkbox" checked={editing.available !== false} onChange={(e) => setEditing({ ...editing, available: e.target.checked })} />
              Available (shown on the site)
            </label>
            {err && <p style={{ fontFamily: F, fontSize: 12, color: '#e08080' }}>{err}</p>}
            <div style={{ display: 'flex', gap: 10 }}>
              <Btn onClick={save} disabled={saving}>{saving ? 'Saving…' : editing.id ? 'Save' : 'Create & add photos'}</Btn>
              <Btn variant="ghost" onClick={() => setEditing(null)}>Cancel</Btn>
            </div>
          </div>
        )}
      </Modal>

      {/* Photos */}
      {photosFor && <VillaPhotos villa={photosFor} onClose={() => { setPhotosFor(null); load() }} />}
    </div>
  )
}

function VillaPhotos({ villa, onClose }: { villa: Villa; onClose: () => void }) {
  const [media, setMedia] = useState<{ id: number; url: string; alt: string | null }[]>([])
  const [busy, setBusy] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const load = useCallback(() => {
    fetch(`/api/admin/villas/media?propertyId=${villa.id}`).then((r) => r.json()).then((d) => setMedia(d.media || []))
  }, [villa.id])
  useEffect(() => { load() }, [load])

  async function upload(files: FileList | null) {
    if (!files?.length) return
    setBusy(true)
    for (const file of Array.from(files)) {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('propertyId', String(villa.id))
      await fetch('/api/admin/villas/media', { method: 'POST', body: fd })
    }
    setBusy(false)
    if (fileRef.current) fileRef.current.value = ''
    load()
  }
  async function addUrl() {
    if (!urlInput.trim()) return
    setBusy(true)
    const fd = new FormData()
    fd.append('url', urlInput.trim())
    fd.append('propertyId', String(villa.id))
    await fetch('/api/admin/villas/media', { method: 'POST', body: fd })
    setBusy(false); setUrlInput(''); load()
  }
  async function del(id: number) {
    await fetch(`/api/admin/villas/media?id=${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <Modal open onClose={onClose} title={`Photos — ${villa.title || `#${villa.id}`}`} wide>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
        <input ref={fileRef} type="file" accept="image/*" multiple onChange={(e) => upload(e.target.files)} style={{ display: 'none' }} />
        <Btn onClick={() => fileRef.current?.click()} disabled={busy}>{busy ? 'Uploading…' : 'Upload files'}</Btn>
        <div style={{ display: 'flex', gap: 8, flex: '1 1 320px' }}>
          <Input placeholder="…or paste an image URL" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} />
          <Btn variant="ghost" onClick={addUrl} disabled={busy || !urlInput.trim()}>Add</Btn>
        </div>
      </div>
      <p style={{ fontFamily: F, fontSize: 11, color: '#8a8a7c', margin: '0 0 16px' }}>
        Uploaded files land in <code>/public/uploads/yachts</code>. On Vercel they only persist for the current deployment — for production, commit the images or paste hosted URLs.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
        {media.map((m) => (
          <div key={m.id} style={{ position: 'relative', border: '1px solid rgba(184,151,74,0.15)', borderRadius: 8, overflow: 'hidden' }}>
            <img src={imgUrl(m.url)} alt={m.alt || ''} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
            <button onClick={() => del(m.id)} style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(6,9,15,0.8)', color: '#e08080', border: 'none', borderRadius: 5, padding: '4px 8px', fontFamily: F, fontSize: 10, cursor: 'pointer' }}>
              Delete
            </button>
          </div>
        ))}
        {media.length === 0 && <p style={{ fontFamily: F, fontSize: 13, color: '#8a8a7c' }}>No photos yet.</p>}
      </div>
      <div style={{ marginTop: 22 }}><Btn variant="ghost" onClick={onClose}>Done</Btn></div>
    </Modal>
  )
}
