import { usePost } from "@/hooks/use-posts";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useSEO } from "@/hooks/use-seo";

function renderContent(content: string) {
  const blocks = content.split(/\n\n+/);

  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    const numberedHeading = trimmed.match(/^(\d+)\.\s+(.+)$/);
    if (numberedHeading) {
      return (
        <div key={i} className="mt-10 mb-3">
          <span className="text-xs tracking-[0.25em] uppercase text-sage font-semibold">
            0{numberedHeading[1]}
          </span>
          <h2 className="font-serif text-2xl font-normal mt-1 text-foreground">
            {numberedHeading[2]}
          </h2>
        </div>
      );
    }

    const standaloneHeadings = [
      "The Bottom Line",
      "Choosing the Right Program",
      "Family travel is about discovery",
    ];
    const isStandaloneHeading =
      standaloneHeadings.some((h) => trimmed.startsWith(h)) ||
      (trimmed.length < 60 && !trimmed.includes(".") && !trimmed.includes(",") && i > 0);

    if (isStandaloneHeading) {
      return (
        <h3
          key={i}
          className="font-serif text-xl font-normal mt-10 mb-3 text-foreground"
        >
          {trimmed}
        </h3>
      );
    }

    const lines = trimmed.split("\n").filter((l) => l.trim());
    if (lines.length > 1 && lines.every((l) => l.trim().length < 80 && !l.includes("."))) {
      return (
        <ul key={i} className="space-y-2 my-4 pl-0">
          {lines.map((line, j) => (
            <li key={j} className="flex items-start gap-3 text-muted-foreground">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              <span>{line.trim()}</span>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p key={i} className="text-muted-foreground leading-relaxed text-lg">
        {trimmed}
      </p>
    );
  });
}

export default function StoryDetail() {
  const [, params] = useRoute("/stories/:slug");
  const { data: post, isLoading } = usePost(params?.slug || "");
  useSEO({
    title: post ? `${post.title} | Impact Stories | Alegra` : "Impact Story | Alegra",
    description: post?.summary ?? "A family conservation travel story from Alegra.",
    ogImage: post?.coverImage ?? undefined,
    ogType: "article",
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="h-[50vh] bg-muted animate-pulse" />
        <div className="max-w-3xl mx-auto px-6 -mt-8">
          <div className="bg-card rounded-md p-10 space-y-4">
            <div className="h-10 w-3/4 bg-muted rounded animate-pulse" />
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-32 max-w-3xl mx-auto px-6 text-center">
        <h1 className="font-serif text-3xl font-normal mb-4">Story Not Found</h1>
        <Link href="/stories">
          <Button className="btn-alegra-dark px-8 py-5" data-testid="button-back-stories">Back to Stories</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      <div className="relative h-[55vh] min-h-[420px]">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 md:px-14 md:pb-14 text-white max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link
              href="/stories"
              className="inline-flex items-center text-white/70 mb-6 text-xs tracking-widest uppercase hover:text-white transition-colors"
              data-testid="link-back-stories"
            >
              <ArrowLeft className="w-3 h-3 mr-2" /> All Stories
            </Link>

            <div className="flex items-center gap-3 mb-4 flex-wrap">
              {post.tags && post.tags.length > 0 && post.tags.map((tag: string, i: number) => (
                <Badge key={i} className="bg-accent text-accent-foreground text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1
              className="font-serif text-3xl md:text-5xl font-normal leading-tight max-w-3xl"
              data-testid="text-story-title"
            >
              {post.title}
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-12">
        <div className="flex items-center gap-6 text-sm text-muted-foreground mb-10 pb-8 border-b flex-wrap">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="font-medium text-foreground">{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {post.publishedAt
              ? format(new Date(post.publishedAt), "MMMM dd, yyyy")
              : "Draft"}
          </div>
        </div>

        <div className="space-y-5">
          {post.content && renderContent(post.content)}
        </div>

        <div className="mt-16 pt-8 border-t flex flex-col sm:flex-row gap-5 items-center sm:items-start">
          <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl font-serif shrink-0" style={{ backgroundColor: "#7a9e7e22", color: "#7a9e7e" }}>
            {post.author?.charAt(0)}
          </div>
          <div>
            <h3 className="font-serif text-lg font-normal mb-1">
              Written by {post.author}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Sharing stories of families who travel with purpose and make a
              positive impact on communities and wildlife worldwide.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <Link href="/stories">
            <Button className="btn-alegra-dark" data-testid="button-back-stories-bottom">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Stories
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
