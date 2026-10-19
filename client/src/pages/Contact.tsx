import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema, type InsertInquiry } from "@shared/schema";
import { useCreateInquiry } from "@/hooks/use-inquiries";
import { useSEO } from "@/hooks/use-seo";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function PlanJourney() {
  useSEO({
    title: "Plan Your Journey | Alegra Family Volunteer Travel",
    description: "Ready to plan a meaningful family volunteer journey? Get in touch with Alegra and we'll craft a bespoke conservation travel experience for your family.",
  });
  const { mutate, isPending } = useCreateInquiry();

  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      packageName: "",
      numberOfAdults: 1,
      numberOfChildren: 1,
    },
  });

  const onSubmit = (data: InsertInquiry) => {
    mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <div className="min-h-screen">
      <div className="relative w-full h-[50vh] min-h-[350px]">
        <img
          src="/images/hero-safari.jpg"
          alt="Plan your journey"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center text-center px-6 pb-12 md:pb-16">
          <p className="text-xs tracking-[0.3em] uppercase font-semibold text-white/70 mb-4">
            Get Started
          </p>
          <h1
            className="font-serif text-4xl md:text-6xl font-normal text-white mb-4"
            data-testid="text-plan-heading"
          >
            Plan Your Journey
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
            Tell us about your family and the kind of experience you're looking
            for. We'll design a trip tailored just for you.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-5 gap-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <h2 className="font-serif text-2xl font-normal mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-0.5">Email</h3>
                  <p className="text-sm text-muted-foreground">
                    hello@alegra.travel
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-0.5">Phone</h3>
                  <p className="text-sm text-muted-foreground">
                    +27 72 900 3783
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-0.5">Office</h3>
                  <p className="text-sm text-muted-foreground">
                    Balgowan, South Africa
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <Card className="p-8 md:p-10">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            data-testid="input-name"
                            placeholder="Your full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            data-testid="input-email"
                            placeholder="you@example.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="packageName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Interested Journey (Optional)</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger data-testid="select-package">
                              <SelectValue placeholder="Select a journey" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Costa Rica: Turtle & Wildlife Conservation">Costa Rica: Turtle &amp; Wildlife Conservation</SelectItem>
                            <SelectItem value="Costa Rica: Sloth & Wildlife Sanctuary">Costa Rica: Sloth &amp; Wildlife Sanctuary</SelectItem>
                            <SelectItem value="Zimbabwe: Rhino & Elephant Conservation">Zimbabwe: Rhino &amp; Elephant Conservation</SelectItem>
                            <SelectItem value="Zimbabwe: Wildlife Conservation">Zimbabwe: Wildlife Conservation</SelectItem>
                            <SelectItem value="Namibia: Desert Elephant Conservation">Namibia: Desert Elephant Conservation</SelectItem>
                            <SelectItem value="Sri Lanka: Sea Turtle Conservation">Sri Lanka: Sea Turtle Conservation</SelectItem>
                            <SelectItem value="Sri Lanka: Elephant Conservation & Community">Sri Lanka: Elephant Conservation &amp; Community</SelectItem>
                            <SelectItem value="Borneo: Orangutan & Rainforest Conservation">Borneo: Orangutan &amp; Rainforest Conservation</SelectItem>
                            <SelectItem value="Peru: Amazon Wildlife Sanctuary">Peru: Amazon Wildlife Sanctuary</SelectItem>
                            <SelectItem value="Other / Not Sure">Other / Not Sure</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="numberOfAdults"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adults</FormLabel>
                          <FormControl>
                            <Input
                              data-testid="input-adults"
                              type="number"
                              min={1}
                              {...field}
                              value={field.value ?? 1}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value) || 1)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="numberOfChildren"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Children</FormLabel>
                          <FormControl>
                            <Input
                              data-testid="input-children"
                              type="number"
                              min={0}
                              {...field}
                              value={field.value ?? 1}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tell us about your dream trip</FormLabel>
                        <FormControl>
                          <Textarea
                            data-testid="input-message"
                            placeholder="Where would you like to go? What ages are your children? What type of volunteering interests you?"
                            className="min-h-[120px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full mt-2 btn-alegra-dark px-8 py-5"
                    disabled={isPending}
                    data-testid="button-submit-inquiry"
                  >
                    {isPending ? "Sending..." : "Send Inquiry"}
                  </Button>
                </form>
              </Form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
