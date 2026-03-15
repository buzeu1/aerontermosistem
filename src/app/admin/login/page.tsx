'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginAdmin() {
  const [parola, setParola] = useState('')
  const [eroare, setEroare] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setEroare('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ parola }),
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      setEroare('Parola gresita!')
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#1a1a1a',
    }}>
      <div style={{
        background: '#2a2a2a',
        padding: '2rem',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '360px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}>
        <h1 style={{ color: '#fff', marginBottom: '1.5rem', textAlign: 'center', fontSize: '1.4rem' }}>
          Admin Panel
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Parola admin"
            value={parola}
            onChange={(e) => setParola(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid #444',
              background: '#333',
              color: '#fff',
              fontSize: '1rem',
              marginBottom: '1rem',
              boxSizing: 'border-box',
            }}
          />
          {eroare && (
            <p style={{ color: '#ff6b6b', marginBottom: '1rem', textAlign: 'center' }}>{eroare}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#e63946',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Se verifica...' : 'Intra'}
          </button>
        </form>
      </div>
    </div>
  )
}
