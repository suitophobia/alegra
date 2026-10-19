import { usePackage } from "@/hooks/use-destinations";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Heart, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useSEO } from "@/hooks/use-seo";

export default function JourneyDetail() {
  const [, params] = useRoute("/journeys/:slug");
  const { data: pkg, isLoading } = usePackage(params?.slug || "");
  useSEO({
    title: pkg ? `${pkg.title} | Family Volunteer Travel | Alegra` : "Journey | Alegra",
    description: pkg?.description ?? "A curated family wildlife volunteer journey by Alegra.",
    ogImage: pkg?.imageUrl ?? undefined,
    ogType: "article",
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 max-w-5xl mx-auto px-6">
        <div className="h-96 bg-muted rounded-md animate-pulse mb-8" />
        <div className="h-12 w-2/3 bg-muted rounded animate-pulse mb-4" />
        <div className="space-y-4">
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen pt-32 max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Journey Not Found</h1>
        <Link href="/journeys">
          <Button className="btn-alegra-dark px-8 py-5" data-testid="button-back-journeys">Back to Journeys</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Hero */}
      <div className="relative h-[55vh] min-h-[420px]">
        <img
          src={pkg.imageUrl}
          alt={pkg.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14 text-white max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              href="/journeys"
              className="inline-flex items-center text-white/80 mb-5 text-sm"
              data-testid="link-back-journeys"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> All Journeys
            </Link>
            <p className="text-accent font-semibold text-xs tracking-[0.3em] uppercase mb-3">
              {pkg.volunteerFocus}
            </p>
            <h1
              className="font-serif text-4xl md:text-6xl font-normal mb-3"
              data-testid="text-journey-title"
            >
              {pkg.title}
            </h1>
            <div className="flex items-center gap-4 flex-wrap text-white/80 text-sm" data-testid="text-journey-meta">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {pkg.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {pkg.duration}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid md:grid-cols-[2fr_1fr] gap-10">
          {/* Content */}
          <div className="bg-card rounded-md p-8 md:p-10 border">
            <p className="text-accent font-semibold text-xs tracking-[0.3em] uppercase mb-3">
              Overview
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-normal mb-4">
              About This Journey
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {pkg.description}
            </p>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              {pkg.content}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card rounded-md p-6 border sticky top-28">
              <p className="text-accent font-semibold text-xs tracking-[0.3em] uppercase mb-3">
                Details
              </p>
              <h3 className="font-serif text-2xl font-normal mb-5">Trip Details</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs uppercase font-semibold tracking-[0.25em] text-muted-foreground mb-0.5">
                      Duration
                    </p>
                    <p className="font-medium">{pkg.duration}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs uppercase font-semibold tracking-[0.25em] text-muted-foreground mb-0.5">
                      Focus
                    </p>
                    <p className="font-medium">{pkg.volunteerFocus}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs uppercase font-semibold tracking-[0.25em] text-muted-foreground mb-0.5">
                      Price
                    </p>
                    <p className="font-medium">{pkg.priceRange}</p>
                  </div>
                </div>
              </div>
              <Link href="/plan">
                <Button className="w-full btn-alegra-dark px-8 py-5" data-testid="button-book-journey">
                  Inquire About This Journey
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
