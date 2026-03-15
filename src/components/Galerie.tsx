'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

// Imaginile locale (din /public/images/)
// Cand adaugi poze in MongoDB, acestea vor fi incarcate automat
const imaginiLocale = Array.from({ length: 18 }, (_, i) => ({
  _id: String(i),
  url: `/images/lucrare${i + 1}.jpg`,
  altText: `Lucrare ${i + 1} - AERON TERMOSISTEM`,
  titlu: `Lucrare ${i + 1}`,
}))

interface IImagine {
  _id: string
  url: string
  altText: string
  titlu: string
}

export default function Galerie() {
  const [imagini, setImagini] = useState<IImagine[]>(imaginiLocale)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Incarca imaginile din MongoDB (daca exista)
  useEffect(() => {
    const fetchImagini = async () => {
      try {
        const res = await fetch('/api/imagini')
        const data = await res.json()
        // Daca MongoDB are imagini, le folosim pe alea; altfel ramanem cu cele locale
        if (Array.isArray(data) && data.length > 0) {
          setImagini(data)
        }
      } catch {
        // Daca nu e MongoDB configurat inca, folosim imaginile locale
        console.log('Folosind imagini locale')
      }
    }
    fetchImagini()
  }, [])

  const deschideLightbox = (index: number) => {
    setLightboxIndex(index)
    document.body.style.overflow = 'hidden'
  }

  const inchideLightbox = () => {
    setLightboxIndex(null)
    document.body.style.overflow = 'auto'
  }

  const schimbaImagine = useCallback(
    (directie: number) => {
      if (lightboxIndex === null) return
      let nou = lightboxIndex + directie
      if (nou < 0) nou = imagini.length - 1
      if (nou >= imagini.length) nou = 0
      setLightboxIndex(nou)
    },
    [lightboxIndex, imagini.length]
  )

  // Taste keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') inchideLightbox()
      if (e.key === 'ArrowLeft') schimbaImagine(-1)
      if (e.key === 'ArrowRight') schimbaImagine(1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [schimbaImagine])

  return (
    <>
      <section className="gallery" id="gallery">
        <h2>GALERIA NOASTRĂ</h2>
        <p className="gallery-intro">
          Descoperă câteva dintre proiectele noastre finalizate
        </p>
        <div className="gallery-grid">
          {imagini.map((imagine, index) => (
            <div
              className="gallery-item"
              key={imagine._id}
              onClick={() => deschideLightbox(index)}
            >
              <img src={imagine.url} alt={imagine.altText} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="lightbox active"
          onClick={(e) => {
            if (e.target === e.currentTarget) inchideLightbox()
          }}
        >
          <button className="lightbox-close" onClick={inchideLightbox}>
            ×
          </button>
          <button
            className="lightbox-nav prev"
            onClick={() => schimbaImagine(-1)}
          >
            ‹
          </button>
          <div className="lightbox-content">
            <img
              src={imagini[lightboxIndex].url}
              alt={imagini[lightboxIndex].altText}
            />
          </div>
          <button
            className="lightbox-nav next"
            onClick={() => schimbaImagine(1)}
          >
            ›
          </button>
          <div className="lightbox-counter">
            {lightboxIndex + 1} / {imagini.length}
          </div>
        </div>
      )}
    </>
  )
}
