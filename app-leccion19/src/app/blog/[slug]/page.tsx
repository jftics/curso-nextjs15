import { Metadata } from "next";
import { cache } from "react";

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
    content:
      "Next.js 15 trae muchas mejoras en rendimiento, nuevas características de React Server Components, y optimizaciones en el sistema de routing que permiten crear aplicaciones más rápidas y eficientes.",
    author: "Juan Developer",
    publishedAt: "2024-12-01",
    slug: "introduccion-nextjs-15",
  },
  {
    id: 2,
    title: "React Server Components",
    content:
      "Los Server Components revolucionan la forma en que construimos aplicaciones React, permitiendo renderizado en el servidor con mejor rendimiento y experiencia de usuario.",
    author: "María Frontend",
    publishedAt: "2024-12-02",
    slug: "react-server-components",
  },
];

const getBlogPost = cache(async (slug: string): Promise<BlogPost | null> => {
  // Simulamos una consulta a base de datos
  const post = blogPosts.find((post) => post.slug === slug);

  // Simulamos latencia de red
  await new Promise((resolve) => setTimeout(resolve, 100));

  return post || null;
});

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post no encontrado | Mi Blog Tech",
      description: "El artículo que buscas no existe o ha sido eliminado.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description =
    post.content.length > 155
      ? post.content.substring(0, 155).trim() + "..."
      : post.content;

  const openGraphDescription =
    post.content.length > 200
      ? post.content.substring(0, 200).trim() + "..."
      : post.content;

  const metadata: Metadata = {
    title: `${post.title} | Mi Blog Tech`,
    description,
    keywords: [
      post.author,
      post.slug,
      "blog",
      "artículo",
      "tecnología",
      "desarrollo",
    ],
    authors: [{ name: post.author }],

    openGraph: {
      title: post.title,
      description: openGraphDescription,
      siteName: "Mi Blog Tech",
      locale: "es_ES",
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: openGraphDescription,
      creator: `@${post.author.toLowerCase().replace(/\s+/g, "")}`,
    },

    other: {
      "article:author": post.author,
      "article:published_time": post.publishedAt,
      "article:section": post.slug,
    },
  };
  return metadata;
}

export default async function BlogPostPage({ params }: Props) {
  try {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">Post no encontrado</h1>
          <p>El artículo que buscas no existe.</p>
        </div>
      );
    }

    return (
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8">
          <span className="text-blue-600 font-medium capitalize">
            {post.slug.replace(/-/g, " ")}
          </span>
          <h1 className="text-4xl font-bold mt-2 mb-4">{post.title}</h1>
          <div className="flex items-center text-gray-600">
            <span>Por {post.author}</span>
            <span className="mx-2">•</span>
            <span>
              {new Date(post.publishedAt).toLocaleDateString("es-ES")}
            </span>
          </div>
        </header>

        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed">{post.content}</p>
        </div>
      </article>
    );
  } catch (err) {
    console.error("💥 Error renderizando:", err);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p>Ha ocurrido un error al cargar el artículo.</p>
      </div>
    );
  }
}
