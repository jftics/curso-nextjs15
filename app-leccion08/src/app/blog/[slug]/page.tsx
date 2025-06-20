// Este es un Server Component que usa SSG

interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  slug: string;
}

// Simulamos una base de datos de posts
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Introducción a Next.js 15",
    content: "Next.js 15 trae muchas mejoras...",
    author: "Juan Developer",
    publishedAt: "2024-12-01",
    slug: "introduccion-nextjs-15",
  },
  {
    id: 2,
    title: "React Server Components",
    content: "Los Server Components revolucionan...",
    author: "María Frontend",
    publishedAt: "2024-12-02",
    slug: "react-server-components",
  },
];

async function getBlogPost(slug: string) {
  // Simulamos una consulta a base de datos
  const post = blogPosts.find((post) => post.slug === slug);

  // Simulamos latencia de red
  await new Promise((resolve) => setTimeout(resolve, 100));

  return post || null;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = await getBlogPost(resolvedParams.slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Post no encontrado</h1>
        <p className="mt-4">
          El post que buscas no existe o ha sido eliminado.
        </p>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex items-center text-gray-600 space-x-4">
          <span>Por {post.author}</span>
          <span>•</span>
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </header>
      <div className="prose max-w-none">
        <p className="text-lg leading-relaxed text-gray-700">{post.content}</p>
      </div>
      {/* Nota: Este componente se renderiza en el servidor */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          ℹ️ Este contenido se generó estáticamente en tiempo de build (SSG) y
          se sirve desde un CDN para máxima velocidad.
        </p>
      </div>
    </article>
  );
}
