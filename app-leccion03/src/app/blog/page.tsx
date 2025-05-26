import Link from 'next/link'
export default function BlogPage(){
    const posts = [
        { id: 1, slug:'primer-post', title: 'Mi primer post', excerpt:'Esta es una introduccion a Next.js 15'},
        { id: 2, slug: 'segundo-post', title: 'Componentes de servidor', excerpt: 'Aprende sobre Server Components en React 19' },
        { id: 3, slug: 'tercer-post', title: 'Optimización', excerpt: 'Técnicas para optimizar tu aplicación Next.js' },
    ]

    return(
        <main className="container mx-auto py-10 px-4">
            <h1 className="text-4xl font-bold mb-6">Blog</h1>
            <div className="grid gap-6">
                {posts.map(post =>(
                    <article key={post.id} className="border p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                        <p className="mb-4">{post.excerpt}</p>
                        <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                            Leer más →
                        </Link>
                    </article>
                ))}
            </div>
        </main>
    )
}