import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Heart, Globe, Shield, Sparkles, Sprout } from "lucide-react";
import { useSEO } from "@/hooks/use-seo";

export default function Mission() {
  useSEO({
    title: "Our Mission | Alegra Family Volunteer Travel",
    description: "Alegra exists to make conservation-centred family travel accessible, seamless, and transformative — connecting families to trusted volunteer programmes rooted in purpose.",
  });
  return (
    <div className="min-h-screen">
      <div className="relative w-full h-[60vh] min-h-[400px]">
        <img
          src="/images/about-hero.jpg"
          alt="Child with binoculars on safari"
          className="w-full h-full object-cover object-[center_60%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center text-center px-6 pb-12 md:pb-16">
          <p className="text-xs tracking-[0.3em] uppercase font-semibold text-white/70 mb-4">
            About Us
          </p>
          <h1
            className="font-serif text-4xl md:text-6xl font-normal text-white mb-4"
            data-testid="text-mission-heading"
          >
            Vision
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
            To raise a generation of globally conscious families who see travel not just as leisure, but as an opportunity for impact, growth, and stewardship.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-center mb-6">
            Our Mission
          </h2>
          <p className="text-xl md:text-2xl leading-relaxed text-center">
            To make conservation-centered family travel accessible, seamless, and transformative by connecting families to trusted volunteer programs and designing curated travel experiences rooted in purpose.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-muted-foreground leading-relaxed text-lg mb-12 max-w-3xl mx-auto"
        >
          <p>We believe children are not just the future — they are capable of impact now.</p>
          <p>We believe family time should shape character, not just create memories.</p>
          <p>
            We believe a love of wildlife should grow into stewardship.
            <br />Curiosity into conservation.
            <br />Wonder into action.
          </p>
          <p>
            Alegra was born from two boys who see magic in the natural world — and from a mother determined to nurture that magic into something meaningful.
          </p>
          <p>
            We exist to help families explore differently.
            <br />To serve with intention.
            <br />To protect what inspires us.
            <br />To travel not just to see the world — but to care for it.
          </p>
          <p>
            Because joy is greatest when it is shared.
            <br />And impact is strongest when it begins at home.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs tracking-[0.3em] uppercase font-semibold text-accent mb-3">
            Our Values
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-normal">
            What Guides Us
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              icon: Heart,
              title: "Connection",
              desc: "We believe meaningful travel strengthens connection — to nature, to local communities, and to one another as families. Every Alegra journey is designed to deepen relationships and foster a sense of belonging in the natural world.",
            },
            {
              icon: Shield,
              title: "Stewardship",
              desc: "We believe exposure leads to responsibility. By engaging directly with wildlife and conservation efforts, families move from awareness to action, developing a lasting commitment to protecting what they experience.",
            },
            {
              icon: Sprout,
              title: "Growth",
              desc: "We believe travel should shape character, not just create memories. Alegra experiences are designed to expand perspective, cultivate empathy, and inspire both children and parents to see their capacity for impact.",
            },
          ].map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
              data-testid={`card-guide-${i}`}
            >
              <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center text-primary mx-auto mb-5">
                <v.icon className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-normal mb-3">{v.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-14 items-center"
        >
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src="/images/founder-family.jpg"
              alt="Founder family"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase font-semibold text-accent mb-3">
              Founder Spotlight
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-normal mb-6">
              A journey born from love
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Alegra was born from two names — Alex and Gray — and from a deeper intention: to raise children who understand the meaningful impact they can have on the world.
              </p>
              <p>
                The first three letters of each of my sons' names form Alegra. The name also echoes the Latin root meaning joy, cheer, and happiness — the spirit we hope families bring to the world and to one another through purposeful travel.
              </p>
              <p>
                Both of my boys have always been deeply drawn to wildlife and the natural world. Alegra was created to nurture that love — not just as admiration, but as action. To cultivate curiosity into conservation. To guide wonder into stewardship.
              </p>
              <p>
                Alegra exists to help families travel differently — to serve, to protect, to explore, and to raise the next generation to be thoughtful, engaged stewards of our planet.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-card border-t border-b py-20"
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-normal mb-6">
            Ready to make a difference?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Start planning your family's transformative volunteering journey
            today. We'll help you find the perfect experience.
          </p>
          <Link href="/plan">
            <Button className="btn-alegra-dark px-8 py-5" data-testid="button-mission-plan">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
