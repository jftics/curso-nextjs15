import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {email, z} from 'zod'
import {prisma} from '@/lib/prisma'

const signupSchema = z.object({
    name: z.string().min(2, "EL nombre debe tener almenos 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6,"La contraseña debe tener almenos 6 caracteres")
})

export async function POST(req: NextRequest) {
    try{
        const body = await req.json()

        const {name, email, password} = signupSchema.parse(body);

        const existingUser = await prisma.user.findUnique({
            where: {email}
        })

        if(existingUser){
            return NextResponse.json(
                {error:"Ya existe un usuario con este email"},
                {status:400}
            )
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user =await prisma.user.create({
            data:{
                name,
                email,
                password: hashedPassword,
                role:"USER"
            },
            select:{
                id: true,
                name:true,
                email:true,
                role:true,
                createdAt:true
            }
        })

        return NextResponse.json(
            {
                message: "Usuario creado corerctamente",
                user
            }
            ,{status:201}
        ) 
        

    }
    catch(error){
        if(error instanceof z.ZodError){
            return NextResponse.json(
                {error: "Datos inválidos", details: error.message},
                {status:400}
            )
        }
        return NextResponse.json(
            {error: "Error interno del servidor"},
            {status:500}
        )
    }
}