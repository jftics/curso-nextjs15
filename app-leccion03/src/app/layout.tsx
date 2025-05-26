import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children
}: {children: React.ReactNode}){
  return(
    <html lang="es">
      <body>
        <header className="bg-gray-800 text-white">
          <nav className="container mx-auto p-4">
            <ul className="flex space-x-6">
              <li><Link href="/" className="hover:underline">Inicio</Link></li>
              <li><Link href="/about" className="hover:underline">Acerca de</Link></li>
              <li><Link href="/blog" className="hover:underline">Blog</Link></li>
            </ul>
          </nav>

        </header>
        {children}
      </body>

    </html>

  )
}