import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Imagine from '@/models/Imagine'

// GET /api/imagini - returneaza toate imaginile active din galerie
export async function GET() {
  try {
    await connectDB()
    const imagini = await Imagine.find({ activa: true }).sort({ ordine: 1 })
    return NextResponse.json(imagini)
  } catch (error) {
    console.error('Eroare la citirea imaginilor:', error)
    return NextResponse.json({ eroare: 'Eroare server' }, { status: 500 })
  }
}

// POST /api/imagini - adauga o imagine noua in galerie
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { titlu, url, altText, ordine } = body

    if (!titlu || !url) {
      return NextResponse.json(
        { eroare: 'Titlul si URL-ul sunt obligatorii' },
        { status: 400 }
      )
    }

    await connectDB()
    const imagineNoua = await Imagine.create({ titlu, url, altText, ordine })

    return NextResponse.json(
      { succes: true, imagine: imagineNoua },
      { status: 201 }
    )
  } catch (error) {
    console.error('Eroare la adaugarea imaginii:', error)
    return NextResponse.json({ eroare: 'Eroare server' }, { status: 500 })
  }
}
