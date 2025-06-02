import "./globals.css";
import { ReactNode } from 'react'

export default function RootLayout({
  children
}:{children: ReactNode}){
  return(
    <html lang="es">
      <body className="bg-gray-50 min-h-screen">
        <nav className="bg-blue-600 text-white p-4 shadow-lg">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Componentes de Servidor y de Cliente</h1>
          </div>
        </nav>
        <main className="container mx-auto p-6">
          {children}
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
          <p>© 2025 - Construido con Next.js 15</p>
        </footer>
      </body>
    </html>
  )
}