import { useQuery } from "@tanstack/react-query";
import type { Package } from "@shared/schema";

async function loadPackages(): Promise<Package[]> {
  const res = await fetch("/data/packages.json");
  if (!res.ok) throw new Error("Failed to fetch packages");
  return res.json();
}

export function usePackages() {
  return useQuery({
    queryKey: ["/data/packages.json"],
    queryFn: loadPackages,
  });
}

export function usePackage(slug: string) {
  return useQuery({
    queryKey: ["/data/packages.json", slug],
    queryFn: async () => {
      const packages = await loadPackages();
      return packages.find((pkg) => pkg.slug === slug) ?? null;
    },
    enabled: !!slug,
  });
}
