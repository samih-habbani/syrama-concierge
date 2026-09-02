'use client'
import { useEffect, useState } from 'react'
import { PageHead, Btn, Modal, Field, Input, F, tableStyle, thStyle, tdStyle } from '@/components/admin/ui'

type User = { id: number; email: string; name: string | null; createdAt: string }

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [editing, setEditing] = useState<{ id?: number; email: string; name: string; password: string } | null>(null)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')

  const load = () => fetch('/api/admin/users').then((r) => r.json()).then((d) => setUsers(d.users || []))
  useEffect(() => { load() }, [])

  async function save() {
    if (!editing) return
    if (!editing.email || (!editing.id && !editing.password)) { setErr('Email and password are required'); return }
    setSaving(true); setErr('')
    const res = await fetch('/api/admin/users', {
      method: editing.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    })
    setSaving(false)
    if (!res.ok) { setErr((await res.json().catch(() => ({}))).error || 'Save failed'); return }
    setEditing(null); load()
  }

  async function remove(id: number) {
    if (!confirm('Delete this user?')) return
    const res = await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' })
    if (!res.ok) { alert((await res.json().catch(() => ({}))).error || 'Delete failed'); return }
    load()
  }

  return (
    <div>
      <PageHead title="Users" subtitle="Back-office accounts (shared with syrama-yachting)." actions={<Btn onClick={() => { setEditing({ email: '', name: '', password: '' }); setErr('') }}>+ Add user</Btn>} />

      <div style={{ border: '1px solid rgba(184,151,74,0.12)', borderRadius: 12, overflow: 'hidden', maxWidth: 720 }}>
        <table style={tableStyle}>
          <thead><tr><th style={thStyle}>Name</th><th style={thStyle}>Email</th><th style={thStyle}>Since</th><th style={thStyle}></th></tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td style={{ ...tdStyle, color: '#f5eedd' }}>{u.name || '—'}</td>
                <td style={tdStyle}>{u.email}</td>
                <td style={{ ...tdStyle, fontSize: 12, color: '#8a8a7c' }}>{new Date(u.createdAt).toLocaleDateString('en-GB')}</td>
                <td style={{ ...tdStyle, textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <Btn small variant="ghost" onClick={() => { setEditing({ id: u.id, email: u.email, name: u.name || '', password: '' }); setErr('') }}>Edit</Btn>{' '}
                  <Btn small variant="danger" onClick={() => remove(u.id)}>Delete</Btn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? 'Edit user' : 'New user'}>
        {editing && (
          <div>
            <Field label="Name"><Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></Field>
            <Field label="Email"><Input type="email" value={editing.email} onChange={(e) => setEditing({ ...editing, email: e.target.value })} /></Field>
            <Field label={editing.id ? 'New password (leave blank to keep)' : 'Password'}>
              <Input type="password" value={editing.password} onChange={(e) => setEditing({ ...editing, password: e.target.value })} autoComplete="new-password" />
            </Field>
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
