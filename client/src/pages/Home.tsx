import { useState, useEffect, useCallback } from "react";
import { usePackages } from "@/hooks/use-destinations";
import { usePosts } from "@/hooks/use-posts";
import { useSEO } from "@/hooks/use-seo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Package, Post } from "@shared/schema";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function Home() {
  useSEO({
    title: "Alegra | Meaningful Family Volunteer Travel",
    description: "Alegra crafts meaningful volunteer journeys for families — connecting you to trusted wildlife conservation programmes across Africa, Asia and the Americas.",
    ogImage: "/images/alegra-logo.png",
  });
  const { data: packages, isLoading: pkgLoading } = usePackages();
  const { data: posts, isLoading: postsLoading } = usePosts();

  const allPackages = (packages as Package[]) || [];
  const recentPosts = (posts as Post[])?.slice(0, 4) || [];
  const featuredPkg = allPackages.find((p) => p.isFeatured) || allPackages[0];
  const heroSlides = allPackages;

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    if (heroSlides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  const prevSlide = useCallback(() => {
    if (heroSlides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, [heroSlides.length]);

  useEffect(() => {
    if (heroSlides.length === 0) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, heroSlides.length]);

  const regions = [
    { name: "America", img: "/images/continent-america.svg", link: "/journeys?continent=americas" },
    { name: "Africa", img: "/images/continent-africa.svg", link: "/journeys?continent=africa" },
    { name: "Asia", img: "/images/continent-asia.svg", link: "/journeys?continent=asia" },
  ];

  return (
    <div className="min-h-screen relative">
      {/* SECTION 1: Fixed Hero Image with Business Info */}
      <section className="px-4 pt-4 md:px-6 md:pt-6" data-testid="section-hero">
        <div className="relative h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/hero-elephants.jpg"
              alt="Family wildlife volunteering"
              className="w-full h-full object-cover"
              data-testid="img-hero-fixed"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/75" />
          </div>

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-6 pt-12">
          <p
            className="text-xs tracking-[0.3em] uppercase font-medium text-white/70 mb-5"
            data-testid="text-hero-tag"
          >
            Family Volunteer Vacations
          </p>
          <h1
            className="font-serif text-2xl md:text-4xl lg:text-5xl font-normal mb-6 leading-[1.1] max-w-4xl"
            data-testid="text-hero-heading"
          >
            Meaningful Family Travel,
            <br />
            <span className="italic">Rooted in Conservation</span>
          </h1>
          <p
            className="text-base md:text-lg text-white/85 mb-10 max-w-2xl leading-relaxed"
            data-testid="text-hero-sub"
          >
            Thoughtfully curated volunteer-centered journeys that enable families to explore deeply, give back meaningfully, and grow together.
          </p>
          <Link href="/journeys">
            <Button
              variant="outline"
              className="btn-alegra px-10 py-6"
              data-testid="link-hero-explore"
            >
              Explore Journeys
            </Button>
          </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: Continent Category Row — Rojo Cangrejo style */}
      <motion.section
        className="py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={staggerContainer}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-6 md:gap-10">
            {regions.map((region, i) => (
              <motion.div key={region.name} variants={fadeUp}>
                <Link
                  href={region.link}
                  className="flex flex-col items-center cursor-pointer"
                  data-testid={`link-region-${i}`}
                >
                  <div className="w-full flex items-center justify-center mb-8 md:mb-10 h-32 md:h-44" data-testid={`img-region-${i}`}>
                    <img
                      src={region.img}
                      alt={`${region.name} continent outline`}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                  <div className="flex items-center w-full mb-4">
                    <div className="flex-1 h-px bg-border" />
                    <div className="mx-3">
                      <svg width="12" height="12" viewBox="0 0 12 12" className="text-foreground">
                        <rect x="6" y="0" width="7" height="7" rx="1" transform="rotate(45 6 0)" fill="currentColor" />
                      </svg>
                    </div>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <span className="text-sm md:text-base tracking-[0.15em] uppercase font-medium text-center">
                    {region.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 3: Journey Image Slider */}
      <section className="relative h-[80vh] min-h-[500px] overflow-hidden" data-testid="section-journey-slider">
        {pkgLoading || heroSlides.length === 0 ? (
          <div className="w-full h-full bg-muted animate-pulse" />
        ) : (
          <>
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                style={{ opacity: index === currentSlide ? 1 : 0, zIndex: index === currentSlide ? 1 : 0 }}
              >
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  data-testid={`img-hero-slide-${index}`}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60" />
              </div>
            ))}

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-6">
              <p className="text-xs tracking-[0.3em] uppercase font-semibold text-white/80 mb-4">
                {heroSlides[currentSlide]?.volunteerFocus}
              </p>
              <h2
                className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal mb-4 leading-[1.05] max-w-4xl"
                data-testid="text-slider-heading"
              >
                {heroSlides[currentSlide]?.title}
              </h2>
              <p className="text-lg md:text-xl text-white/85 mb-8 max-w-2xl leading-relaxed">
                {heroSlides[currentSlide]?.description}
              </p>
              <Link
                href={`/journeys/${heroSlides[currentSlide]?.slug}`}
                className="inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase font-semibold text-white border-b-2 border-white/60 pb-1"
                data-testid="link-slider-explore"
              >
                Explore Journey <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-white/70 transition-colors"
              aria-label="Previous slide"
              data-testid="button-slider-prev"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-white/70 transition-colors"
              aria-label="Next slide"
              data-testid="button-slider-next"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-white w-8" : "bg-white/40"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  data-testid={`button-slider-dot-${index}`}
                />
              ))}
            </div>

            <div
              className="absolute bottom-8 right-8 z-20 text-white/60 text-sm font-mono tracking-wider"
              data-testid="text-slider-counter"
            >
              {currentSlide + 1} | {heroSlides.length}
            </div>
          </>
        )}
      </section>

      {/* SECTION 4: Featured Journey Spotlight */}
      <motion.section
        className="py-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
      >
        {pkgLoading ? (
          <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="bg-muted aspect-[4/3] animate-pulse" />
              <div className="bg-muted/50 p-12 space-y-4 animate-pulse">
                <div className="h-4 w-24 bg-muted rounded" />
                <div className="h-10 w-3/4 bg-muted rounded" />
                <div className="h-20 w-full bg-muted rounded" />
              </div>
            </div>
          </div>
        ) : featuredPkg ? (
          <div className="grid md:grid-cols-2">
            <div className="relative overflow-hidden aspect-[4/3] md:aspect-auto md:min-h-[550px]">
              <img
                src={featuredPkg.imageUrl}
                alt={featuredPkg.title}
                className="w-full h-full object-cover"
                data-testid={`img-featured-${featuredPkg.id}`}
              />
            </div>
            <div className="flex flex-col justify-center p-10 md:p-16 lg:p-20 bg-card">
              <p className="text-xs tracking-[0.3em] uppercase font-semibold text-muted-foreground mb-4">
                Featured
              </p>
              <h2
                className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal mb-4 leading-tight"
                data-testid="text-featured-heading"
              >
                {featuredPkg.title}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {featuredPkg.description}
              </p>
              <Link href={`/journeys/${featuredPkg.slug}`}>
                <Button
                  className="btn-alegra-dark w-fit px-8 py-5"
                  data-testid={`link-featured-${featuredPkg.id}`}
                >
                  Explore <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        ) : null}
      </motion.section>

      {/* SECTION 5: Latest Stories / Articles */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
          >
            <h2
              className="font-serif text-4xl md:text-5xl font-normal mb-3"
              data-testid="text-stories-heading"
            >
              Latest Stories
            </h2>
            <p className="text-muted-foreground text-lg">
              Fresh from the field
            </p>
            <div className="w-16 h-px bg-accent mx-auto mt-6" />
          </motion.div>

          {postsLoading ? (
            <div className="space-y-8">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-6 flex-wrap">
                  <div className="bg-muted w-2/5 aspect-[4/3] rounded-md animate-pulse" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                    <div className="h-6 w-3/4 bg-muted rounded animate-pulse" />
                    <div className="h-16 w-full bg-muted rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid md:grid-cols-2 gap-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={staggerContainer}
            >
              {recentPosts.slice(0, 2).map((post) => (
                <motion.div key={post.id} variants={fadeUp}>
                  <Link
                    href={`/stories/${post.slug}`}
                    className="flex flex-col sm:flex-row gap-5 cursor-pointer"
                    data-testid={`link-post-${post.id}`}
                  >
                    <div className="w-full sm:w-2/5 shrink-0 overflow-hidden rounded-md aspect-[4/3]">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        data-testid={`img-post-${post.id}`}
                      />
                    </div>
                    <div className="flex flex-col justify-center flex-1">
                      <div className="flex gap-2 mb-3 flex-wrap">
                        {post.tags?.slice(0, 2).map((tag, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-xs no-default-hover-elevate no-default-active-elevate"
                            data-testid={`badge-post-tag-${post.id}-${idx}`}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs tracking-[0.3em] uppercase font-semibold text-muted-foreground mb-2">
                        {post.author}
                      </p>
                      <h3
                        className="font-serif text-xl md:text-2xl font-normal mb-2 leading-tight"
                        data-testid={`text-post-title-${post.id}`}
                      >
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-3">
                        {post.summary}
                      </p>
                      <span className="text-sm font-semibold text-accent inline-flex items-center gap-1">
                        Read More <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* SECTION 6: Newsletter / CTA */}
      <motion.section
        className="pt-14 pb-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeUp}
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2
            className="font-serif text-4xl md:text-5xl font-normal mb-5"
            data-testid="text-cta-heading"
          >
            Begin Your Story
          </h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">
            Let us craft a volunteer journey tailored to your family — one that creates meaningful impact for the natural world and those that call it home.
          </p>
          <Link href="/plan">
            <Button
              size="lg"
              className="btn-alegra-dark px-10 py-6"
              data-testid="button-cta-plan"
            >
              Start Planning Today <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
