import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Mesaj from '@/models/Mesaj'

// POST /api/contact - primeste mesajul din formular si il salveaza in MongoDB
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validare simpla
    const { nume, email, telefon, mesaj } = body
    if (!nume || !email || !telefon || !mesaj) {
      return NextResponse.json(
        { eroare: 'Toate campurile sunt obligatorii' },
        { status: 400 }
      )
    }

    // Conectare la MongoDB
    await connectDB()

    // Salvam mesajul
    const mesajNou = await Mesaj.create({ nume, email, telefon, mesaj })

    return NextResponse.json(
      { succes: true, id: mesajNou._id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Eroare la salvarea mesajului:', error)
    return NextResponse.json(
      { eroare: 'A aparut o eroare. Incearca din nou.' },
      { status: 500 }
    )
  }
}

// GET /api/contact - returneaza toate mesajele (doar pentru admin)
export async function GET() {
  try {
    await connectDB()
    const mesaje = await Mesaj.find().sort({ dataTrimiteri: -1 })
    return NextResponse.json(mesaje)
  } catch (error) {
    console.error('Eroare la citirea mesajelor:', error)
    return NextResponse.json({ eroare: 'Eroare server' }, { status: 500 })
  }
}
