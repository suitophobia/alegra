import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function usePackages() {
  return useQuery({
    queryKey: [api.packages.list.path],
    queryFn: async () => {
      const res = await fetch(api.packages.list.path);
      if (!res.ok) throw new Error("Failed to fetch packages");
      return res.json();
    },
  });
}

export function usePackage(slug: string) {
  return useQuery({
    queryKey: [api.packages.get.path, slug],
    queryFn: async () => {
      const url = buildUrl(api.packages.get.path, { slug });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch package");
      return res.json();
    },
    enabled: !!slug,
  });
}
