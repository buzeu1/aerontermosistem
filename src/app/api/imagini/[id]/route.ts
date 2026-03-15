import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { connectDB } from '@/lib/mongodb'
import Imagine from '@/models/Imagine'

async function verificaAuth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_auth')
  return token?.value === process.env.ADMIN_PASSWORD
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verificaAuth())) {
    return NextResponse.json({ eroare: 'Neautorizat' }, { status: 401 })
  }

  try {
    const { id } = await params
    await connectDB()
    await Imagine.findByIdAndDelete(id)
    return NextResponse.json({ succes: true })
  } catch (error) {
    console.error('Eroare stergere:', error)
    return NextResponse.json({ eroare: 'Eroare server' }, { status: 500 })
  }
}
