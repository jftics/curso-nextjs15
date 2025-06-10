
import { Metadata } from "next"
import Link from "next/link"
import './globals.css'

export const metadata:Metadata = {
  title: "Layouts y templates",
  description:"Demo Layouts y Templates"
}
interface RootLayoutProps{
  children: React.ReactNode
}

export default function RootLayout({children}:RootLayoutProps){
  return(

      <html lang="es">
        <body>
          <header className="bg-blue-600 text-white p-4">
            <nav className="container mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold"> Mi Aplicacion</h1>
              <div className="flex gap-4">
                <Link href="/" className="hover:underline">Inicio</Link>
                <span>|</span>
                <Link href="/about" className="hover:underline">Acerca de</Link>
                <span>|</span>
                <Link href="/dashboard" className="hover:underline">Dashboard</Link>
              </div>
            </nav>
          </header>
          <main className="min-h-screen">
            {children}
          </main>
        </body>
      </html>

  )
}