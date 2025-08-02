import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://miempresa.com"),
  title: {
    template: "%s | Mi Empresa Jftics",
    default: "Mi Empresa Jftics - Desarrollo Web Innovador",
  },
  description:
    "Empresa líder en desarrollo web con Next.js y React. Creamos aplicaciones modernas, rápidas y escalables.",
  applicationName: "Mi Empresa Tech",
  referrer: "origin-when-cross-origin",
  keywords: ["Next.js", "React", "desarrollo web", "TypeScript", "frontend"],
  authors: [{ name: "Equipo Dev", url: "https://miempresa.com" }],
  creator: "Mi Empresa Tech",

  // Configuración de Open Graph base
  openGraph: {
    type: "website", //article//video.movie//'music.song
    locale: "es_ES",
    url: "https://miempresa.com",
    siteName: "Mi Empresa Tech",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Mi Empresa Jftics - Desarrollo Web",
      },
    ],
  },

  // Configuración de Twitter base
  twitter: {
    card: "summary_large_image", //summary
    site: "@miempresatech",
    creator: "@miempresatech",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
