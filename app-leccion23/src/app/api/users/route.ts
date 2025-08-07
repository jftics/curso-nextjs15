import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

//GET: obtener todos los usuarios
export async function GET() {
    const users = await prisma.user.findMany();
    return NextResponse.json(users)
}

//Post crear un nuevo usuario
export async function POST(request: Request) {
    const body = await request.json();
    const {name, email} = body;

    try{
        const newUser = await prisma.user.create({data:{name, email}});
        return NextResponse.json(newUser, {status:201});
    }
    catch(error){
        return NextResponse.json({error: 'Email ya existe'},{status:400});
    }

}