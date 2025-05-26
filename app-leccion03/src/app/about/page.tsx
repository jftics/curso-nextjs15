export default function AboutPage(){
    return(
        <main className="container mx-auto py-10 px-4">
             <h1 className="text-4xl font-bold mb-6">Acerca de</h1>
            <p className="text-lg mb-4">
                Esta página de ejemplo muestra cómo funciona el sistema de rutas en Next.js 15.
            </p>
            <p className="text-lg">
                La ruta de esta página está definida por la estructura de carpetas:
                <code className="bg-gray-100 px-2 py-1 rounded">app/about/page.tsx</code>
            </p>
        </main>
    )
}