
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed the database on startup
  await storage.seed();

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://alegra.travel/</loc><priority>1.0</priority></url>
  <url><loc>https://alegra.travel/journeys</loc><priority>0.9</priority></url>
  <url><loc>https://alegra.travel/journeys/zimbabwe-wildlife-safari-stables</loc><priority>0.9</priority></url>
  <url><loc>https://alegra.travel/journeys/zimbabwe-imire-rhino-elephant</loc><priority>0.9</priority></url>
  <url><loc>https://alegra.travel/journeys/namibia-desert-elephant</loc><priority>0.9</priority></url>
  <url><loc>https://alegra.travel/journeys/sri-lanka-sea-turtle</loc><priority>0.9</priority></url>
  <url><loc>https://alegra.travel/journeys/sri-lanka-elephant-conservation</loc><priority>0.9</priority></url>
  <url><loc>https://alegra.travel/journeys/borneo-orangutan-rainforest</loc><priority>0.9</priority></url>
  <url><loc>https://alegra.travel/journeys/costa-rica-sea-turtle</loc><priority>0.9</priority></url>
  <url><loc>https://alegra.travel/journeys/costa-rica-sloth-wildlife</loc><priority>0.9</priority></url>
  <url><loc>https://alegra.travel/journeys/peru-amazon-wildlife</loc><priority>0.9</priority></url>
  <url><loc>https://alegra.travel/stories</loc><priority>0.8</priority></url>
  <url><loc>https://alegra.travel/stories/why-voluntourism-best-family</loc><priority>0.7</priority></url>
  <url><loc>https://alegra.travel/stories/safety-volunteer-trip-kids</loc><priority>0.7</priority></url>
  <url><loc>https://alegra.travel/mission</loc><priority>0.8</priority></url>
  <url><loc>https://alegra.travel/plan</loc><priority>0.8</priority></url>
</urlset>`;

  app.get('/api/packages', async (req, res) => {
    const packages = await storage.getPackages();
    res.json(packages);
  });

  app.get('/sitemap.xml', (_req, res) => {
    res.type("application/xml").send(sitemapXml);
  });

  app.get('/sitemap-index.xml', (_req, res) => {
    res.type("application/xml").send(`<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://alegra.travel/sitemap.xml</loc>
  </sitemap>
</sitemapindex>`);
  });

  app.get('/robots.txt', (_req, res) => {
    res.type("text/plain").send("User-agent: *\nAllow: /\nSitemap: https://alegra.travel/sitemap.xml\nSitemap: https://alegra.travel/sitemap-index.xml\n");
  });

  app.get('/api/packages/:slug', async (req, res) => {
    const pkg = await storage.getPackage(req.params.slug);
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json(pkg);
  });

  app.get('/api/posts', async (req, res) => {
    const posts = await storage.getPosts();
    res.json(posts);
  });

  app.get('/api/posts/:slug', async (req, res) => {
    const post = await storage.getPost(req.params.slug);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  });

  app.post('/api/inquiries', async (req, res) => {
    try {
      const data = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(data);
      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid input", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  return httpServer;
}
