import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest){
    console.log(`metodo: ${request.method}, url: ${request.nextUrl.pathname}`)

    const response = NextResponse.next()

    // CORS - Permitir peticiones desde cualquier origen (configurable)
    response.headers.set('Access-Control-Allow-Origin','*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    // Manejo de preflight requests (OPTIONS)
    if(request.method ==='OPTIONS'){
        return new Response(null, {status:200, headers: request.headers})
    }

    // Ejemplo de autenticación simple (en producción usar JWT o similar)
    if(request.nextUrl.pathname.startsWith('/api/users') && request.method !== 'GET'){
        const authHeader = request.headers.get('authorization')
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return NextResponse.json({
                success: false,
                error: 'Token de autorización requerido'
            },{status:401}) //no autorizado
        }

        // Validar token (simplificado para el ejemplo)
        const token = authHeader.replace('Bearer ','')
        if(token !== 'mi-token-secreto'){
            return NextResponse.json({
                success: false,
                error: 'Token inválido'
            },{status: 403})
        }

        return response

    }
    

}

// Configurar en qué rutas se aplica el middleware
export const config= {
    matcher: [
        '/api/:path*'
    ]
}