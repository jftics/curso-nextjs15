import { NextRequest, NextResponse } from "next/server";
import { users } from "@/app/data/users";

export async function DELETE(
    request: NextRequest,
    {params}: {params:Promise<{id:string}>}
) {
    try{
        const {id}= await params
        const userId = parseInt(id)
        if(isNaN(userId)){
            return NextResponse.json({
                success: false,
                error: 'ID de usuario inválido'
            },{status:400})
        }

        const userIndex = users.findIndex(u=>u.id === userId)
        if(userIndex === -1){
            return NextResponse.json({
                success: false,
                error: 'Usuario no encontrado'
            },{status:404})
        }

        const deletedUser = users[userIndex]
        users.splice(userIndex, 1)

        return NextResponse.json({
            success: true,
            data: deletedUser,
            message: 'Usuario eliminado exitosamente'
        },{status:200})

    }
    catch(error){
        console.log(error)
        return NextResponse.json({
        success: false,
        error: 'Error al eliminar usuario'
        }, { status: 500 })
    }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const userId = parseInt(id)
    
    // Validar que el ID sea un número válido
    if (isNaN(userId)) {
      return NextResponse.json({
        success: false,
        error: 'ID de usuario inválido'
      }, { status: 400 })
    }
    
    const user = users.find(u => u.id === userId)
    
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Usuario no encontrado'
      }, { status: 404 })
    }
    
    return NextResponse.json({
      success: true,
      data: user
    }, { status: 200 })
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      success: false,
      error: 'Error al obtener usuario'
    }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const userId = parseInt(id)
    const body = await request.json()
    
    if (isNaN(userId)) {
      return NextResponse.json({
        success: false,
        error: 'ID de usuario inválido'
      }, { status: 400 })
    }
    
    const userIndex = users.findIndex(u => u.id === userId)
    
    if (userIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Usuario no encontrado'
      }, { status: 404 })
    }
    
    // Actualizar solo los campos proporcionados
    const updatedUser = {
      ...users[userIndex],
      ...(body.name && { name: body.name }),
      ...(body.email && { email: body.email }),
      ...(body.age && { age: body.age })
    }
    
    users[userIndex] = updatedUser
    
    return NextResponse.json({
      success: true,
      data: updatedUser,
      message: 'Usuario actualizado exitosamente'
    }, { status: 200 })
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      success: false,
      error: 'Error al actualizar usuario'
    }, { status: 500 })
  }
}