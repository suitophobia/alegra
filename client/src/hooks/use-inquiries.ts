import { useMutation } from "@tanstack/react-query";
import type { InsertInquiry } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useCreateInquiry() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertInquiry) => {
      const res = await fetch("https://formsubmit.co/ajax/hello@alegra.travel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          journey: data.packageName || "Not specified",
          adults: data.numberOfAdults,
          children: data.numberOfChildren,
          message: data.message,
          _subject: "New journey inquiry from alegra.travel",
          _template: "table",
          _captcha: "false",
          _replyto: data.email,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send inquiry");
      }

      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Inquiry Sent!",
        description: "We'll get back to you shortly to plan your family's journey.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
