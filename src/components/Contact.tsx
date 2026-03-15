'use client'

import { useState, useRef } from 'react'

interface FormData {
  nume: string
  email: string
  telefon: string
  mesaj: string
}

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [succes, setSucces] = useState(false)
  const [eroare, setEroare] = useState('')
  const [countdown, setCountdown] = useState(10)
  const formRef = useRef<HTMLFormElement>(null)

  const inchideModal = () => {
    setSucces(false)
    setCountdown(10)
    document.body.style.overflow = 'auto'
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setEroare('')

    const formData = new FormData(e.currentTarget)
    const date: FormData = {
      nume: formData.get('nume') as string,
      email: formData.get('email') as string,
      telefon: formData.get('telefon') as string,
      mesaj: formData.get('mesaj') as string,
    }

    try {
      const raspuns = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(date),
      })

      const rezultat = await raspuns.json()

      if (raspuns.ok && rezultat.succes) {
        setSucces(true)
        formRef.current?.reset()
        document.body.style.overflow = 'hidden'

        // Countdown 10 secunde
        let sec = 10
        const interval = setInterval(() => {
          sec--
          setCountdown(sec)
          if (sec <= 0) {
            clearInterval(interval)
            inchideModal()
          }
        }, 1000)
      } else {
        setEroare(rezultat.eroare || 'A apărut o eroare. Încearcă din nou.')
      }
    } catch {
      setEroare('Eroare de conexiune. Verifică internetul și încearcă din nou.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="contact" id="contact">
        <h2>CONTACTEAZĂ-NE</h2>
        <div className="contact-container">
          {/* Info contact */}
          <div className="contact-info">
            <div className="contact-item">
              <h3>📍 Adresă</h3>
              <p>Roman, Județul Neamț, România</p>
            </div>
            <div className="contact-item">
              <h3>📞 Telefon</h3>
              <p>+40 720 040 477</p>
            </div>
            <div className="contact-item">
              <h3>✉️ Email</h3>
              <p>aerontermosistem@gmail.com</p>
            </div>
          </div>

          {/* Formular */}
          <div className="contact-form">
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="nume"
                  placeholder="Nume complet *"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  name="telefon"
                  placeholder="Telefon *"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="mesaj"
                  placeholder="Mesajul dumneavoastră *"
                  required
                />
              </div>

              {eroare && (
                <div className="form-message error" style={{ display: 'block' }}>
                  {eroare}
                </div>
              )}

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Se trimite...' : 'TRIMITE MESAJ'}
              </button>
            </form>
            <p
              style={{
                color: '#aaa',
                fontSize: '0.9rem',
                marginTop: '15px',
                textAlign: 'center',
              }}
            >
              📧 Vei primi răspuns în maxim 24 ore
            </p>
          </div>
        </div>
      </section>

      {/* Modal Multumim */}
      {succes && (
        <div className="thank-you-modal active">
          <div className="thank-you-content">
            <div className="success-icon">✅</div>
            <h2>Mulțumim!</h2>
            <p>
              Mesajul dumneavoastră a fost trimis cu{' '}
              <span className="highlight">succes</span>.
            </p>
            <p>
              Echipa <span className="highlight">AERON TERMOSISTEM</span> a
              primit solicitarea și vă vom contacta în cel mai scurt timp
              posibil.
            </p>

            <div className="info-box">
              <h3>📞 Ce urmează?</h3>
              <p>✓ Veți primi un răspuns în maxim <strong>24 de ore</strong></p>
              <p>✓ Un specialist vă va contacta telefonic</p>
              <p>✓ Vă vom oferi o consultație gratuită</p>
              <p>✓ Primiți o ofertă personalizată</p>
            </div>

            <p style={{ fontSize: '1rem', color: '#aaa' }}>
              Verificați și folderul SPAM dacă nu primiți răspuns în inbox.
            </p>

            <button className="close-modal-btn" onClick={inchideModal}>
              ← ÎNAPOI LA PAGINA PRINCIPALĂ
            </button>

            <div className="countdown">
              Închidere automată în {countdown} secunde...
            </div>
          </div>
        </div>
      )}
    </>
  )
}
