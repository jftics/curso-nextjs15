import Image from "next/image";

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Producto Premium",
    image: "/images/product-1.jpg",
    price: "$299",
  },
  {
    id: 2,
    name: "Producto Estándar",
    image: "/images/product-2.jpg",
    price: "$199",
  },
  {
    id: 3,
    name: "Producto Básico",
    image: "https://picsum.photos/800/600?random=3",
    price: "$99",
  },
  {
    id: 4,
    name: "Producto Premium Plus",
    image: "https://picsum.photos/800/600?random=4",
    price: "$399",
  },
];

export default function ProductGrid() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Nuestros Productos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={product.image}
                  alt={`Imagen de ${product.name}`}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                  sizes="(max-width:678px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyy6PyLqg654E/K/wARd8/RDJAJ/9k="
                ></Image>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
