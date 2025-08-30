"use client"

import { useSession } from "next-auth/react"

export function useAuth(){
    const {data: session, status} = useSession();

    const hasRole=(role:string)=>{
        return session?.user.role ===role
    }

    const hasAnyRole = (roles:string[])=>{
        return session?.user.role && roles.includes(session.user.role)
    }

    return {
        session,
        status,
        isAuthenticated: !!session, 
        isLoading: status==="loading", 
        user: session?.user, 
        hasRole, 
        hasAnyRole
    }
}
