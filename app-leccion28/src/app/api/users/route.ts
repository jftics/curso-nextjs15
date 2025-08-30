import { NextRequest, NextResponse } from 'next/server'

// Simulamos una base de datos en memoria
const users = [
  { id: 1, name: 'Juan', email: 'juan@example.com' },
  { id: 2, name: 'María', email: 'maria@example.com' }
]

export async function GET() {
  return NextResponse.json({ users, success: true })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }
    
    const newUser = {
      id: users.length + 1,
      name: body.name,
      email: body.email
    }
    
    users.push(newUser)
    
    return NextResponse.json({ user: newUser, success: true }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON' },
      { status: 400 }
    )
  }
}