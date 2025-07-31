import Image from "next/image";

export default function Hero() {
  return (
    // <div>
    //   <Image
    //     src="/images/hero-large.jpg"
    //     alt="Imagen principal de nuestra aplicación"
    //     width={400}
    //     height={300}
    //     sizes="100vw"
    //   />
    // </div>
    <section className="relative h-screen w-screen overflow-hidden">
      <Image
        src="/images/hero-large.jpg"
        alt="Imagen principal de nuestra aplicación"
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyy6PyLqg654E/K/wARd8/RDJAJ/9k="
      ></Image>

      {/* Contenido superpuesto */}
      <div className="absolute inset-0 bg-black opacity-40 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Optimización Perfecta
          </h1>
          <p className="text-xl md:text-2xl">Con Next.js 15 y React 19</p>
        </div>
      </div>
    </section>
  );
}
