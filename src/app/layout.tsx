import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AERON TERMOSISTEM SRL - Construcții, Renovări & Finisaje',
  description:
    'Servicii complete de construcții, renovări și amenajări în Roman, Județul Neamț. Garduri, acoperișuri, pavaje, finisaje premium.',
  keywords: 'constructii, renovari, finisaje, Roman, Neamt, gard, acoperis, pavaj',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  )
}
