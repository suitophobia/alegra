
import { pgTable, text, serial, boolean, timestamp, integer, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";

// Using unique table names for Alegra to avoid migration conflicts with previous schema
export const alegraPackages = pgTable("alegra_packages", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  location: text("location").notNull(),
  duration: text("duration").notNull(),
  volunteerFocus: text("volunteer_focus").notNull(),
  priceRange: text("price_range").notNull(),
  isFeatured: boolean("is_featured").default(false),
  content: text("content").notNull(),
});

export const alegraPosts = pgTable("alegra_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  coverImage: text("cover_image").notNull(),
  author: text("author").default("Alegra Team"),
  publishedAt: timestamp("published_at").defaultNow(),
  tags: text("tags").array(),
});

export const alegraInquiries = pgTable("alegra_inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  packageName: text("package_name"),
  message: text("message").notNull(),
  numberOfAdults: integer("num_adults").default(2),
  numberOfChildren: integer("num_children").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Original users table preserved for internal consistency
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
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
