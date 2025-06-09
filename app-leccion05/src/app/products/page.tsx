import Link from "next/link";


// Simulamos una lista de productos
const products = [
  { id: 1, name: 'Laptop Gaming', description: 'Potente laptop para gamers' },
  { id: 2, name: 'Smartphone Pro', description: 'El último smartphone con IA' },
  { id: 3, name: 'Auriculares Bluetooth', description: 'Audio de alta calidad' },
];

export default function ProductsPage(){
    return(
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold">nuestro Productos</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {
                    products.map((product =>(
                        <div key={product.id} className="border p-4 rounded hover:shadow-lg transition-shadow">
                            <h1 className="font-semibold">{product.name}</h1>
                            <p className="text-gray-600 mt-2">{product.description}</p>
                            <Link href={`/products/${product.id}`} className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                                Ver detalles
                            </Link>
                        </div>
                    )))
                }
            </div>
        </div>
    )
}