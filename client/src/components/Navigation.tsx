import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, Instagram, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/journeys", label: "Destinations" },
  { href: "/stories", label: "Stories" },
  { href: "/mission", label: "About Us" },
  { href: "/plan", label: "Contact" },
];

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showSolid = isScrolled || !isHome;

  return (
    <header
      data-testid="navbar"
      className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-500",
        showSolid
          ? "top-0 bg-background/95 backdrop-blur-sm"
          : "top-10 bg-transparent"
      )}
    >
      <div className={cn(
        "hidden md:flex justify-end items-center gap-2 px-6 py-2 mx-10",
        showSolid ? "text-muted-foreground" : "text-white/75"
      )}>
        <a
          href="https://www.instagram.com/alegra_family_travel/"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="link-instagram"
          className="hover:text-foreground transition-colors"
        >
          <Instagram className="w-4 h-4" />
        </a>
        <button
          data-testid="button-search"
          className="hover:text-foreground transition-colors"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>
      <div className={cn(
        "mx-10 border-t border-b transition-colors duration-500",
        showSolid ? "border-border" : "border-white/50"
      )}>
        <div className="px-6">
          <div className="flex items-center justify-between gap-6 flex-wrap h-16">
            <Link href="/" data-testid="link-home-logo" className="cursor-pointer flex items-center gap-3">
              <img
                src={showSolid ? "/images/alegra-logo.png" : "/images/alegra-logo-white.png"}
                alt="Alegra"
                data-testid="img-logo"
                className="h-12 w-auto object-contain"
              />
              <span
                className={cn(
                  "text-2xl tracking-[0.35em] uppercase transition-colors",
                  "font-poiret-bold",
                  showSolid ? "text-foreground" : "text-white"
                )}
              >
                Alegra
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-0 h-full">
              <div className={cn(
                "w-[1.5px] h-full mr-8 -ml-1 transition-colors duration-500",
                showSolid ? "bg-border" : "bg-white/50"
              )} />
              <nav className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} data-testid={`link-nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}>
                    <span
                      className={cn(
                        "text-sm font-medium tracking-[0.18em] uppercase cursor-pointer px-5 py-2 transition-colors",
                        showSolid
                          ? location === link.href
                            ? "text-foreground"
                            : "text-muted-foreground"
                          : location === link.href
                            ? "text-white"
                            : "text-white/75"
                      )}
                    >
                      {link.label}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            <Button
              size="icon"
              variant="ghost"
              data-testid="button-mobile-menu"
              className={cn("md:hidden", !showSolid && "text-white")}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s/g, "-")}`}>
                  <span
                    className={cn(
                      "block py-2.5 px-4 rounded-md text-sm font-medium tracking-[0.12em] uppercase cursor-pointer",
                      location === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-foreground"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
