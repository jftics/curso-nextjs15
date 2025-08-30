import { NextAuthOptions } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import {prisma} from '@/lib/prisma'
import bcrypt from "bcryptjs";
import {z} from "zod"

const credentialsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const authOptions : NextAuthOptions={
    providers:[
        CredentialsProvider({
            name:"credentials",
            credentials:{
                email:{label:"Email", type:"email"},
                password:{label:"Password", type:"password"}
            },
            async authorize(credentials){
                try{
                    const {email, password} = credentialsSchema.parse(credentials)

                    const user = await prisma.user.findUnique({
                        where:{email}
                    })

                    if(!user || !user.password){
                        return null
                    }
                    const isValidPassword = await bcrypt.compare(password, user.password)
                    if(!isValidPassword){
                        return null
                    }
                    return{
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role
                    }
                }catch(error){
                    console.log(error)
                    return null
                }
            }
        })
    ],
    session:{
        strategy:"jwt",
        maxAge:30 * 24 * 60 * 60 //30 dias por defecto
        //maxAge:60
    },
    callbacks:{
        async jwt ({token, user}){
            if(user){
                token.role = user.role
            }
            return token
        },
        async session({session,token}){
            if(token){
                session.user.id=token.sub!
                session.user.role = token.role as string
            }
            return session
        }
    },
    pages:{
        signIn:"/auth/signin"
    }
}