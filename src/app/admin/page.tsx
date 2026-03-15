'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface IImagine {
  _id: string
  url: string
  titlu: string
  altText: string
  ordine: number
}

export default function AdminPanel() {
  const [imagini, setImagini] = useState<IImagine[]>([])
  const [titlu, setTitlu] = useState('')
  const [ordine, setOrdine] = useState(0)
  const [fisier, setFisier] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [mesaj, setMesaj] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    fetchImagini()
  }, [])

  async function fetchImagini() {
    const res = await fetch('/api/imagini')
    if (res.status === 401) {
      router.push('/admin/login')
      return
    }
    const data = await res.json()
    if (Array.isArray(data)) setImagini(data)
  }

  function handleFisier(f: File) {
    setFisier(f)
    setPreview(URL.createObjectURL(f))
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    if (!fisier) return

    setLoading(true)
    setMesaj('')

    const formData = new FormData()
    formData.append('fisier', fisier)
    formData.append('titlu', titlu)
    formData.append('ordine', String(ordine))

    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
    })

    if (res.status === 401) {
      router.push('/admin/login')
      return
    }

    const data = await res.json()
    if (res.ok) {
      setMesaj('Imaginea a fost adaugata!')
      setFisier(null)
      setPreview(null)
      setTitlu('')
      setOrdine(0)
      if (inputRef.current) inputRef.current.value = ''
      fetchImagini()
    } else {
      setMesaj('Eroare: ' + (data.eroare || 'necunoscuta'))
    }
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Stergi aceasta imagine?')) return

    const res = await fetch(`/api/imagini/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setImagini(imagini.filter((img) => img._id !== id))
    } else if (res.status === 401) {
      router.push('/admin/login')
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/login', { method: 'DELETE' })
    router.push('/admin/login')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a1a', color: '#fff', padding: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.6rem' }}>Admin — Galerie</h1>
          <button onClick={handleLogout} style={btnStyle('#555')}>Iesi</button>
        </div>

        {/* Form upload */}
        <div style={{ background: '#2a2a2a', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Adauga imagine noua</h2>
          <form onSubmit={handleUpload}>

            {/* Drop zone */}
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault()
                const f = e.dataTransfer.files[0]
                if (f) handleFisier(f)
              }}
              style={{
                border: '2px dashed #555',
                borderRadius: '8px',
                padding: '2rem',
                textAlign: 'center',
                cursor: 'pointer',
                marginBottom: '1rem',
                background: '#333',
              }}
            >
              {preview ? (
                <img src={preview} alt="preview" style={{ maxHeight: '200px', borderRadius: '8px' }} />
              ) : (
                <p style={{ color: '#aaa' }}>Click sau trage poza aici</p>
              )}
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => { if (e.target.files?.[0]) handleFisier(e.target.files[0]) }}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: '0.75rem', marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Titlu (ex: Fatada casa)"
                value={titlu}
                onChange={(e) => setTitlu(e.target.value)}
                style={inputStyle}
              />
              <input
                type="number"
                placeholder="Ordine"
                value={ordine}
                onChange={(e) => setOrdine(Number(e.target.value))}
                style={inputStyle}
              />
            </div>

            {mesaj && (
              <p style={{ color: mesaj.includes('Eroare') ? '#ff6b6b' : '#51cf66', marginBottom: '0.75rem' }}>
                {mesaj}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !fisier}
              style={btnStyle('#e63946', loading || !fisier)}
            >
              {loading ? 'Se incarca...' : 'Adauga imagine'}
            </button>
          </form>
        </div>

        {/* Lista imagini */}
        <h2 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
          Imagini in galerie ({imagini.length})
        </h2>
        {imagini.length === 0 ? (
          <p style={{ color: '#aaa' }}>Nu sunt imagini inca.</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1rem',
          }}>
            {imagini.map((img) => (
              <div key={img._id} style={{ background: '#2a2a2a', borderRadius: '8px', overflow: 'hidden' }}>
                <img src={img.url} alt={img.altText} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                <div style={{ padding: '0.5rem' }}>
                  <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: '#ccc' }}>{img.titlu}</p>
                  <button
                    onClick={() => handleDelete(img._id)}
                    style={btnStyle('#c0392b')}
                  >
                    Sterge
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  padding: '0.65rem',
  borderRadius: '6px',
  border: '1px solid #444',
  background: '#333',
  color: '#fff',
  fontSize: '0.95rem',
  width: '100%',
  boxSizing: 'border-box',
}

function btnStyle(bg: string, disabled = false): React.CSSProperties {
  return {
    padding: '0.6rem 1.2rem',
    background: bg,
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    fontSize: '0.9rem',
  }
}
