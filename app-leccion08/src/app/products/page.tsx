// Este componente usa ISR (Incremental Static Regeneration)

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  inStock: boolean;
  lastUpdated: string;
  image: string;
}

// Simulamos una API externa de productos que cambia ocasionalmente
async function getProducts(): Promise<Product[]> {
  // Simulamos latencia de API externa
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Simulamos datos que pueden cambiar (precios, stock, etc.)
  const baseProducts: Omit<Product, "price" | "inStock" | "lastUpdated">[] = [
    {
      id: 1,
      name: "Laptop Pro 2024",
      description: "Laptop de alta gama con procesador último modelo",
      category: "Electrónicos",
      image: "laptop-pro.jpg",
    },
    {
      id: 2,
      name: "Mouse Ergonómico",
      description: "Mouse diseñado para uso profesional prolongado",
      category: "Accesorios",
      image: "mouse-ergo.jpg",
    },
    {
      id: 3,
      name: "Teclado Mecánico RGB",
      description: "Teclado mecánico con iluminación personalizable",
      category: "Accesorios",
      image: "keyboard-rgb.jpg",
    },
    {
      id: 4,
      name: "Monitor 4K 27 pulgadas",
      description: "Monitor profesional de alta resolución",
      category: "Electrónicos",
      image: "monitor-4k.jpg",
    },
  ];

  // Simulamos variación en precios y stock
  const products: Product[] = baseProducts.map((product) => ({
    ...product,
    price: Math.floor(Math.random() * 1000) + 100,
    inStock: Math.random() > 0.2, // 80% probabilidad de estar en stock
    lastUpdated: new Date().toISOString(),
  }));

  return products;
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
        <div className="text-4xl">🖥️</div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {product.name}
          </h3>
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              product.inStock
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {product.inStock ? "En Stock" : "Agotado"}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-bold text-blue-600">
            $ {product.price.toLocaleString()}
          </span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
        <button
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            product.inStock
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!product.inStock}
        >
          {product.inStock ? "Agregar al Carrito" : "No disponible"}
        </button>
        <p className="text-xs text-gray-400 mt-2">
          Actualizado: {new Date(product.lastUpdated).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

// Componente principal de la página de productos

export default async function ProductsPage() {
  const products = await getProducts();
  const inStockCount = products.filter((p) => p.inStock).length;
  const categories = [...new Set(products.map((p) => p.category))];
  const buildTime = new Date().toDateString();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Catálogo de Productos
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra selección de productos tecnológicos. Los precios y
            disponibilidad se actualizan automáticamente.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-blue-600">
              {products.length}
            </div>
            <div className="text-sm text-gray-600">Total Productos</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-green-600">
              {inStockCount}
            </div>
            <div className="text-sm text-gray-600">En Stock</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
            <div className="text-2xl font-bold text-purple-600">
              {categories.length}
            </div>
            <div className="text-sm text-gray-600">Categorías</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product}></ProductCard>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-purple-50 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-900 mb-3">
            🔄 Incremental Static Regeneration (ISR)
          </h3>
          <div className="text-sm text-purple-800 space-y-2">
            <p>
              <strong>Cómo funciona esta página:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Se genera estáticamente en el build para máxima velocidad</li>
              <li>Se revalida automáticamente cada 60 segundos</li>
              <li>Los precios y stock se actualizan sin rebuilds</li>
              <li>Los usuarios siempre ven la versión más rápida disponible</li>
            </ul>
            <p className="mt-3">
              <strong>Página generada:</strong> {buildTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Configuración de ISR: revalida cada 10 segundos
export const revalidate = 10;
