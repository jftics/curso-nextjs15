import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="bg-blue-600 text-white p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Mi Aplicación</h1>
            <div className="flex gap-4">
              <Link href="/" className="hover:underline">
                Inicio
              </Link>
              <Link href="/posts/native" className="hover:underline">
                Nativa
              </Link>
              <Link href="/posts/swr" className="hover:underline">
                SWR
              </Link>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
