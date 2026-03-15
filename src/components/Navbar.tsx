'use client'

import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <ul>
        <li>
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home') }}>
            ACASĂ
          </a>
        </li>
        <li>
          <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services') }}>
            SERVICII
          </a>
        </li>
        <li>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about') }}>
            DESPRE NOI
          </a>
        </li>
        <li>
          <a href="#gallery" onClick={(e) => { e.preventDefault(); scrollTo('gallery') }}>
            GALERIE
          </a>
        </li>
        <li>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact') }}>
            CONTACT
          </a>
        </li>
      </ul>
    </nav>
  )
}
