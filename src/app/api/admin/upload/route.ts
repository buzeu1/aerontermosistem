import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { v2 as cloudinary } from 'cloudinary'
import { connectDB } from '@/lib/mongodb'
import Imagine from '@/models/Imagine'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

async function verificaAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_auth')
  return token?.value === process.env.ADMIN_PASSWORD
}

export async function POST(req: NextRequest) {
  if (!(await verificaAuth())) {
    return NextResponse.json({ eroare: 'Neautorizat' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const fisier = formData.get('fisier') as File
    const titlu = formData.get('titlu') as string
    const ordine = Number(formData.get('ordine')) || 0

    if (!fisier) {
      return NextResponse.json({ eroare: 'Niciun fisier' }, { status: 400 })
    }

    // Convertim fisierul in buffer
    const bytes = await fisier.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Uploadam pe Cloudinary
    const rezultat = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'aerontermosistem', resource_type: 'image' },
        (err, result) => {
          if (err || !result) reject(err)
          else resolve(result as { secure_url: string })
        }
      ).end(buffer)
    })

    // Salvam URL-ul in MongoDB
    await connectDB()
    const imagineSalvata = await Imagine.create({
      titlu: titlu || fisier.name,
      url: rezultat.secure_url,
      altText: titlu || 'Lucrare AERON TERMOSISTEM',
      ordine,
    })

    return NextResponse.json({ succes: true, imagine: imagineSalvata }, { status: 201 })
  } catch (error) {
    console.error('Eroare upload:', error)
    return NextResponse.json({ eroare: 'Eroare la upload' }, { status: 500 })
  }
}
