import { usePosts } from "@/hooks/use-posts";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import type { Post } from "@shared/schema";
import { useSEO } from "@/hooks/use-seo";

function FeaturedPost({ post }: { post: Post }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      data-testid={`article-post-${post.id}`}
      className="mb-20"
    >
      <Link href={`/stories/${post.slug}`}>
        <div className="relative w-full aspect-[16/9] overflow-hidden cursor-pointer">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-2xl">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              {post.tags?.[0] && (
                <Badge variant="secondary" className="text-xs">
                  {post.tags[0]}
                </Badge>
              )}
              <span className="text-xs text-white/70 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {post.publishedAt
                  ? format(new Date(post.publishedAt), "MMM dd, yyyy")
                  : "Draft"}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-white leading-tight mb-3">
              {post.title}
            </h2>
            <p className="text-white/80 leading-relaxed mb-4 line-clamp-2">
              {post.summary}
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white tracking-wide uppercase">
              Read More <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      data-testid={`article-post-${post.id}`}
    >
      <Link href={`/stories/${post.slug}`}>
        <div className="cursor-pointer">
          <div className="aspect-[4/3] overflow-hidden mb-5">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            {post.tags?.[0] && (
              <Badge variant="secondary" className="text-xs">
                {post.tags[0]}
              </Badge>
            )}
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {post.publishedAt
                ? format(new Date(post.publishedAt), "MMM dd, yyyy")
                : "Draft"}
            </span>
          </div>
          <h3 className="font-serif text-xl md:text-2xl font-normal mb-2 leading-tight">
            {post.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
            {post.summary}
          </p>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
            Read More <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export default function Stories() {
  useSEO({
    title: "Impact Stories | Alegra Family Volunteer Travel",
    description: "Travel tips, family stories and reflections on purposeful conservation travel. Read Alegra's Impact Stories blog.",
  });
  const { data: posts, isLoading } = usePosts();

  const allPosts = posts as Post[] | undefined;
  const featured = allPosts?.[0];
  const remaining = allPosts?.slice(1);

  return (
    <div className="min-h-screen">
      <div className="relative w-full h-[60vh] min-h-[400px]">
        <img
          src="/images/stories-hero.jpg"
          alt="Travel stories"
          className="w-full h-full object-cover object-[center_60%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center text-center px-6 pb-12 md:pb-16">
          <p className="text-xs tracking-[0.3em] uppercase font-semibold text-white/70 mb-4">
            Blog
          </p>
          <h1
            className="font-serif text-4xl md:text-6xl font-normal text-white mb-4"
            data-testid="text-stories-heading"
          >
            Impact Stories
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
            Travel tips, family stories, and reflections from our volunteering
            journeys around the world.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        {isLoading ? (
          <div className="space-y-12">
            <div className="w-full bg-muted aspect-[16/9] animate-pulse" />
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i}>
                  <div className="w-full bg-muted aspect-[4/3] animate-pulse mb-4" />
                  <div className="h-6 w-3/4 bg-muted animate-pulse mb-2" />
                  <div className="h-4 w-full bg-muted animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {featured && <FeaturedPost post={featured} />}
            {remaining && remaining.length > 0 && (
              <div className="grid md:grid-cols-2 gap-10">
                {remaining.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
