
interface ProductPageProps{
    params: Promise<{
        id: string
    }>
}

// Simulamos datos de productos
const productData: { [key: string]: { name: string; description: string; price: string } } = {
  '1': { name: 'Laptop Gaming', description: 'Potente laptop para gamers con tarjeta gráfica dedicada', price: '$999' },
  '2': { name: 'Smartphone Pro', description: 'El último smartphone con inteligencia artificial', price: '$699' },
  '3': { name: 'Auriculares Bluetooth', description: 'Audio de alta calidad con cancelación de ruido', price: '$199' },
};

export default async function ProductPage({params}: ProductPageProps){
    const {id} = await params
    const product = productData[id]

    if(!product){
        return(
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold text-red-600">Producto no encontrado</h1>
                <p className="mt-4"> El producto con ID {id} no existe.</p>
            </div>
        )
    }

    return(
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="mt-4 text-xl text-green-600 font-semibold">{product.price}</p>
            <div className="mt-6 p-4 border rounded">
                <h3 className="font-semibold">Descripcion del Producto</h3>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <p className="text-sm text-gray-500 mt-4">ID del producto: {id}</p>

            </div>
        </div>
    )

}