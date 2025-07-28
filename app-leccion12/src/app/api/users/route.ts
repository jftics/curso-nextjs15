import { NextRequest, NextResponse } from "next/server";
import { User} from "@/app/types/user";
import { users } from "@/app/data/users";


// Método GET - Obtener todos los usuarios
export async function GET(request: NextRequest) {
    try{
        // Podemos obtener parámetros de consulta
        const {searchParams}= new URL(request.url)
        const limit =searchParams.get('limit')

        // Aplicar límite si se proporciona
        const result = limit? users.slice(0,parseInt(limit)): users

        return NextResponse.json({
            success: true,
            data: result,
            total: result.length
        },{status:200})
    }
    catch(error){
        console.log(error)
         return NextResponse.json({
            success: false,
            error: 'Error al obtener usuarios'
        },{status:500})
    }
}

export async function POST(request:NextRequest) {
    try {
        
        // Obtenemos los datos del cuerpo de la petición
        const body = await request.json()
        // Validación básica
        if(!body.name || !body.email || !body.age){
            return NextResponse.json({
                success: false,
                error:'Faltan campos obligatorios: name, email, age'
            },{status:400}) //solicitud incorrecta
        }
        // Verificar si el email ya existe
        const existingUser = users.find(user=> user.email === body.email)
        if(existingUser){
            return NextResponse.json({
                success: false,
                error:'El email ya está registrado'
            },{status:409}) // la peticion del cliente no es compatible con la informacion que ya existe
        }

        // Crear nuevo usuario
        const newUser: User= {
            id: Math.max(...users.map(u=>u.id)) + 1,
            name: body.name,
            email: body.email,
            age: body.age
        }

        users.push(newUser)

        return NextResponse.json({
            success: true,
            data: newUser,
            massage:'Usuario creado exitosamente'
        },{status:201})// recurso creado

    } catch (error) {
        console.log(error)
        return NextResponse.json({
        success: false,
        error: 'Error al crear usuario'
        }, { status: 500 })
    }
    
}