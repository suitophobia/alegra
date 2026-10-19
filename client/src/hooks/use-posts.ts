import { useQuery } from "@tanstack/react-query";
import type { Post } from "@shared/schema";

async function loadPosts(): Promise<Post[]> {
  const res = await fetch("/data/posts.json");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export function usePosts() {
  return useQuery({
    queryKey: ["/data/posts.json"],
    queryFn: loadPosts,
  });
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: ["/data/posts.json", slug],
    queryFn: async () => {
      const posts = await loadPosts();
      return posts.find((post) => post.slug === slug) ?? null;
    },
    enabled: !!slug,
  });
}
