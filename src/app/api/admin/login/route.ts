import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  const { parola } = await req.json()

  if (parola !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ eroare: 'Parola gresita' }, { status: 401 })
  }

  const cookieStore = await cookies()
  cookieStore.set('admin_auth', process.env.ADMIN_PASSWORD!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 24 ore
    path: '/',
  })

  return NextResponse.json({ succes: true })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_auth')
  return NextResponse.json({ succes: true })
}
