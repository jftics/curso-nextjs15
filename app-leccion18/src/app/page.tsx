import Image from "next/image";
import Hero from "./components/hero";
import ProductGrid from "./components/ProductGrid";

export default function Home() {
  return (
    <main>
      {/* Hero con imagen priorizada */}
      <Hero></Hero>

      {/* Grid de productos con lazy loading */}
      <ProductGrid />

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-8">
            Galería de Imágenes
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} className="relative aspect-square">
                <Image
                  src={`https://picsum.photos/400/400?random=${i + 10}`}
                  alt={`Imagen de galería ${i + 1}`}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  //loading="eager" //"lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
