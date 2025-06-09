interface CategoriesPageProps{
    params: Promise<{
        slug: string[]
    }>
}

export default async function CategoriesPage({ params }: CategoriesPageProps) {
    const { slug}   = await params
    return(
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold">Categorias</h1>
            <p className="mt-4">Ruta actual: /{slug.join('/')}</p>
            <div className="mt-6">
                <h3 className="font-semibold">Segmentos de la ruta:</h3>
                <ul className="list-disc list-inside mt-2">
                    {slug.map((segment, index)=>(
                        <li key={index} className="text-gray-600">
                            Segmento {index +1} : {segment}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    )
}   