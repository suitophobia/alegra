import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const alegraPackages = sqliteTable("alegra_packages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  location: text("location").notNull(),
  duration: text("duration").notNull(),
  volunteerFocus: text("volunteer_focus").notNull(),
  priceRange: text("price_range").notNull(),
  isFeatured: integer("is_featured", { mode: "boolean" }).default(false),
  content: text("content").notNull(),
});

export const alegraPosts = sqliteTable("alegra_posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  coverImage: text("cover_image").notNull(),
  author: text("author").default("Alegra Team"),
  publishedAt: integer("published_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  tags: text("tags", { mode: "json" }).$type<string[]>(),
});

export const alegraInquiries = sqliteTable("alegra_inquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  packageName: text("package_name"),
  message: text("message").notNull(),
  numberOfAdults: integer("num_adults").default(2),
  numberOfChildren: integer("num_children").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const insertPackageSchema = createInsertSchema(alegraPackages).omit({ id: true });
export const insertPostSchema = createInsertSchema(alegraPosts).omit({ id: true, publishedAt: true });
export const insertInquirySchema = createInsertSchema(alegraInquiries).omit({ id: true, createdAt: true });

export type Package = typeof alegraPackages.$inferSelect;
export type InsertPackage = z.infer<typeof insertPackageSchema>;

export type Post = typeof alegraPosts.$inferSelect;
export type InsertPost = z.infer<typeof insertPostSchema>;

export type Inquiry = typeof alegraInquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
