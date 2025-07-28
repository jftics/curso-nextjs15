'use server'

import {z} from "zod"
import { revalidatePath } from "next/cache"

// Esquema de validación para el servidor
const createUserSchema = z.object({
    name: z.string().min(2,"El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    role: z.enum(['user','admin'],{
        errorMap: ()=>({message:"El rol debe ser user o admin'"})
    })
})

// Simulamos una base de datos en memoria
export interface User{
    id: number,
    name:string,
    email: string; 
    role: string; 
    createdAt: Date
}
const users : User[]=[
    {id: 1, name: 'Juan Pérez', email: 'juan@ejemplo.com', role: 'user', createdAt: new Date() },
    {id: 2, name: 'María García', email: 'maria@ejemplo.com', role: 'admin', createdAt: new Date() }
]

let nextId = 3

// Tipo para el resultado de las acciones
type ActionResult= {
    success: boolean,
    message: string,
    data?: User
}

export async function createUser(formData: FormData):Promise<ActionResult> {
    try{
        // Extraer datos del FormData
        const rawData = {
            name: formData.get('name'),
            email: formData.get('email'),
            role: formData.get('role')
        }
        // Validar con Zod
        const validatedData = createUserSchema.parse(rawData)

        // Simular verificación de email único
        const existingUser = users.find(user=>user.email === validatedData.email)
        if(existingUser){
            await new Promise(resolve => setTimeout(resolve, 4000))
            return{
                success:false,
                message: "El email ya está registrado"
            }
        }

        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Crear nuevo usuario
        nextId= nextId +1
        const newUser = {
            id: nextId,
            ...validatedData,
            createdAt: new Date()
        }
        users.push(newUser)
        console.log("users", users)

        // Revalidar la página para mostrar los cambios
        revalidatePath('/')
        return{
            success:true,
            message:'Usuario creado exitosamente',
            data: newUser
        }


    }
    catch(error){
        if(error instanceof z.ZodError){
            return{
                success:false,
                message: error.errors.map(e=>e.message).join(",")
            }
        }
        return{
                success:false,
                message: "Error interno del servidor"
            }
    }
}

// Server Action para obtener usuarios
export async function getUsers() {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 2000))
  return users
}
