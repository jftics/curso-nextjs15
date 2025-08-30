import {withAuth} from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req){
        const token = req.nextauth.token
        const isAuth = !!token
        const isAuthPage = req.nextUrl.pathname.startsWith("/auth")
        const isAdminPage = req.nextUrl.pathname.startsWith("/admin")
        const isDashboard = req.nextUrl.pathname.startsWith("/dashboard")

        // Redirigir usuarios autenticados desde páginas de auth
        if(isAuthPage && isAuth){
            return NextResponse.redirect(new URL("/dashboard", req.url))
        }
        // Redirigir usuarios no autenticados desde páginas protegidas
        if((isDashboard || isAdminPage) && !isAuth){
            return NextResponse.redirect(new URL(`/auth/signin?callbackURL=${req.nextUrl.pathname}`, req.url))
        }
        // Verificar permisos de admin
        if (isAdminPage && token?.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/dashboard", req.url))
        }

        return NextResponse.next()

    },{
        callbacks:{
            authorized:()=>true  // Manejar autorización en el middleware
        }
    }
)

export const config ={
    matcher:["/dashboard/:path*","/admin/:path*", "/auth/:path*"]
}
