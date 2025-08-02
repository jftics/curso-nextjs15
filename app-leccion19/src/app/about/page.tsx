import { Metadata } from "next";

// Definimos los metadatos estáticos
export const metadata: Metadata = {
  title: "Acerca de Nosotros",
  description:
    "Conoce más sobre nuestra empresa de tecnología, nuestro equipo y nuestra misión de transformar el mundo digital.",
  keywords: ["empresa", "tecnología", "desarrollo web", "innovación"],
  authors: [{ name: "Equipo Dev" }],
  creator: "Mi Empresa Jftics",
  publisher: "Mi Empresa Jftics",

  // Open Graph para redes sociales
  openGraph: {
    title: "Acerca de Nosotros - Mi Empresa Jftics",
    description: "Descubre cómo estamos revolucionando el desarrollo web",
    url: "https://miempresa.com/about",
    siteName: "Mi Empresa Jftics",
    images: [
      {
        url: "https://miempresa.com/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "Equipo de Mi Empresa Jftics",
      },
    ],
    locale: "es_BO",
    type: "website", //'website' | 'article' | 'profile' | 'video.movie'
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "Acerca de Nosotros - Mi Empresa Jftics",
    description: "Conoce a nuestro increíble equipo de desarrollo",
    images: ["https://miempresa.com/twitter-about.jpg"],
    creator: "@miempresaJftics",
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Acerca de Nosotros</h1>
      <p className="text-lg text-gray-700">
        Somos una empresa apasionada por la tecnología y el desarrollo web.
        Nuestro equipo está comprometido con crear soluciones innovadoras que
        marquen la diferencia.
      </p>
    </div>
  );
}
