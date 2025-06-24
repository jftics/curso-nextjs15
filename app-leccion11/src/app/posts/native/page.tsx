import { Post } from "@/app/types/post";

async function getPosts(): Promise<Post[]> {
  const res = await fetch("http://127.0.0.1:8000/posts", {
    //cache: "force-cache",
    next: { revalidate: 10 },
    //cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Error al obtener posts");
  }
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Posts del blog</h1>
      <div className="grid gap-4">
        {posts.slice(0, 5).map((post) => (
          <article key={post.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
