import { cp, mkdir, readFile } from "fs/promises";
import path from "path";

export async function publishRoutes() {
  const packages = JSON.parse(
    await readFile("client/public/data/packages.json", "utf8"),
  ) as { slug: string }[];
  const posts = JSON.parse(
    await readFile("client/public/data/posts.json", "utf8"),
  ) as { slug: string }[];

  const routes = [
    "journeys",
    "stories",
    "mission",
    "plan",
    ...packages.map((pkg) => `journeys/${pkg.slug}`),
    ...posts.map((post) => `stories/${post.slug}`),
  ];

  const indexPath = path.resolve("dist/public/index.html");
  for (const route of routes) {
    const dir = path.resolve("dist/public", route);
    await mkdir(dir, { recursive: true });
    await cp(indexPath, path.join(dir, "index.html"));
  }
  await cp(indexPath, path.resolve("dist/public/404.html"));
  console.log(`published ${routes.length} static routes`);
}

if (process.argv[1]?.endsWith("pages.ts")) {
  publishRoutes().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
