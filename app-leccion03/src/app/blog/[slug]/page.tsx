import Link from 'next/link'
export default function PostPage({params}:{params: {slug:string}}){
    // En una aplicación real, estos datos vendrían de una API o base de datos
  const posts = {
    'primer-post': {
      title: 'Mi primer post',
      content: 'Esta es una introducción completa a Next.js 15 y sus características principales...'
    },
    'segundo-post': {
      title: 'Componentes de servidor',
      content: 'Los Server Components en React 19 permiten ejecutar lógica en el servidor, reduciendo el JavaScript enviado al cliente...'
    },
    'tercer-post': {
      title: 'Optimización',
      content: 'Existen múltiples técnicas para optimizar tu aplicación Next.js, incluyendo lazy loading, optimización de imágenes, y más...'
    }
  }

  const post = posts[params.slug as keyof typeof posts]
  if(!post){
    return(
        <main className="container mx-auto py-10 px-4">
            <h1 className="text-4xl font-bold mb-6">Post no encontrado</h1>
             <p>Lo sentimos, el post que buscas no existe.</p>
        </main>
    )
  }

  return(
    <main className="container mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-6"> {post.title}</h1>
        <p className="text-lg">{post.content}</p>
        <div className="mt-6">
            <Link className="text-blue-600 hover:underline" href='/blog'>  ← Volver al blog</Link>
        </div>
    </main>
  )
}