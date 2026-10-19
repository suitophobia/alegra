import { usePackages } from "@/hooks/use-destinations";
import { Link, useSearch } from "wouter";
import { motion } from "framer-motion";
import type { Package } from "@shared/schema";
import { useSEO } from "@/hooks/use-seo";

const continentSlugs: Record<string, string[]> = {
  americas: ["costa-rica", "peru"],
  africa: ["zimbabwe", "namibia"],
  asia: ["sri-lanka", "borneo"],
};

function JourneyCard({ pkg }: { pkg: Package }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      <Link href={`/journeys/${pkg.slug}`}>
        <div
          data-testid={`card-journey-${pkg.id}`}
          className="relative overflow-hidden cursor-pointer aspect-[4/3]"
        >
          <img
            src={pkg.imageUrl}
            alt={pkg.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8">
            <p className="text-xs tracking-[0.3em] uppercase font-semibold text-white/80 mb-2">
              {pkg.location}
            </p>
            <h3 className="font-serif text-2xl md:text-3xl font-normal text-white leading-tight mb-3">
              {pkg.title}
            </h3>
            <span className="text-sm font-semibold text-white/90 tracking-wide uppercase">
              Explore
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Journeys() {
  useSEO({
    title: "Our Journeys | Family Wildlife Conservation Travel | Alegra",
    description: "Explore Alegra's curated family volunteer journeys across Africa, Asia and the Americas — from rhino conservation in Zimbabwe to sea turtles in Costa Rica.",
  });
  const { data: packages, isLoading } = usePackages();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const continent = params.get("continent");

  const allPackages = ((packages as Package[]) || []).sort((a, b) =>
    a.slug === "zimbabwe-wildlife-safari-stables" ? -1 : b.slug === "zimbabwe-wildlife-safari-stables" ? 1 : 0
  );
  const filteredPackages = continent && continentSlugs[continent]
    ? allPackages.filter((pkg) =>
        continentSlugs[continent].some((keyword) => pkg.slug.includes(keyword))
      )
    : allPackages;

  const continentLabel: Record<string, string> = {
    americas: "The Americas",
    africa: "Africa",
    asia: "Asia",
  };

  return (
    <div className="min-h-screen">
      <div className="relative w-full h-[60vh] min-h-[400px]">
        <img
          src="/images/journeys-hero.jpg"
          alt="Safari landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center text-center px-6 pb-12 md:pb-16">
          <p className="text-xs tracking-[0.3em] uppercase font-semibold text-white/70 mb-4">
            Explore
          </p>
          <h1
            className="font-serif text-4xl md:text-6xl font-normal text-white mb-4"
            data-testid="text-journeys-heading"
          >
            {continent ? continentLabel[continent] || "Our Journeys" : "Our Journeys"}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
            Raising the Next Generation of Environmental Stewards — One Journey at a Time.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        {continent && (
          <div className="mb-10 flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Showing {filteredPackages.length} {filteredPackages.length === 1 ? "journey" : "journeys"} in {continentLabel[continent]}
            </span>
            <Link href="/journeys" className="text-sm text-accent underline underline-offset-4">
              View all journeys
            </Link>
          </div>
        )}
        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-muted aspect-[4/3] animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {filteredPackages.map((pkg) => (
              <JourneyCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
