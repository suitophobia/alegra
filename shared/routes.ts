
import { z } from 'zod';
import { insertPackageSchema, insertInquirySchema, insertPostSchema, alegraPackages, alegraPosts, alegraInquiries } from './schema';

export const api = {
  packages: {
    list: {
      method: 'GET' as const,
      path: '/api/packages' as const,
      responses: {
        200: z.array(z.custom<typeof alegraPackages.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/packages/:slug' as const,
      responses: {
        200: z.custom<typeof alegraPackages.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    },
  },
  posts: {
    list: {
      method: 'GET' as const,
      path: '/api/posts' as const,
      responses: {
        200: z.array(z.custom<typeof alegraPosts.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/posts/:slug' as const,
      responses: {
        200: z.custom<typeof alegraPosts.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    },
  },
  inquiries: {
    create: {
      method: 'POST' as const,
      path: '/api/inquiries' as const,
      input: insertInquirySchema,
      responses: {
        201: z.custom<typeof alegraInquiries.$inferSelect>(),
        400: z.object({ message: z.string() }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export { insertInquirySchema, type InsertInquiry, type InsertPackage, type InsertPost, type Package, type Post, type Inquiry } from './schema';
