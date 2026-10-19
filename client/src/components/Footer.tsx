import { Link } from "wouter";

export function Footer() {
  return (
    <footer data-testid="footer" className="bg-gray-100 text-foreground">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/images/alegra-logo.png"
                alt="Alegra"
                className="h-12 w-auto object-contain"
              />
              <span className="text-3xl font-poiret tracking-[0.2em] uppercase text-foreground">Alegra</span>
            </div>
            <p className="text-sm text-foreground/60 max-w-sm leading-relaxed mb-8">
              Alegra helps families travel with purpose by combining conservation volunteer experiences with curated journeys that foster connection with nature, community, and each other.
            </p>
            <p className="text-xs tracking-[0.2em] uppercase text-foreground/40">
              hello@alegra.travel
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-xs tracking-[0.2em] uppercase font-semibold mb-6 text-foreground/50">
              Explore
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/journeys" data-testid="link-footer-journeys">
                  <span className="text-sm text-foreground/70 cursor-pointer">
                    Journeys
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/stories" data-testid="link-footer-stories">
                  <span className="text-sm text-foreground/70 cursor-pointer">
                    Impact Stories
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/mission" data-testid="link-footer-mission">
                  <span className="text-sm text-foreground/70 cursor-pointer">
                    Our Mission
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs tracking-[0.2em] uppercase font-semibold mb-6 text-foreground/50">
              Get Started
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/plan" data-testid="link-footer-plan">
                  <span className="text-sm text-foreground/70 cursor-pointer">
                    Plan Your Journey
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/40 tracking-wider">
            &copy; {new Date().getFullYear()} Alegra. All rights reserved.
          </p>
          <p className="text-xs text-foreground/40 italic">
            Family volunteer-driven travel, reimagined
          </p>
        </div>
      </div>
    </footer>
  );
}
