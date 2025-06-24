"use client";

import useSWR from "swr";
import { Post } from "@/app/types/post";
import { fetcher } from "@/app/lib/fetcher";
export default function PostsWithSWR() {
  const {
    data: posts,
    error,
    isLoading,
    mutate,
  } = useSWR<Post[]>("http://127.0.0.1:8000/posts", fetcher, {
    refreshInterval: 10000,
    revalidateOnFocus: true,
    dedupingInterval: 10000,
  });

  if (error) {
    return (
      <div className="text-red-500 p-4 border border-red-200 rounded">
        Error al cargar posts: {error.message}
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse border p-4 rounded-lg">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Fetching con SWR</h2>
        <button
          onClick={() => mutate()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refrescar
        </button>
      </div>
      <div className="grid gap-4">
        {posts?.slice(0, 8).map((post) => (
          <article
            key={post.id}
            className="border p-4 rounded-lg hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-600 text-sm">{post.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
