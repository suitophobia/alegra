import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  ogImage?: string;
  ogType?: "website" | "article";
}

function setMeta(selector: string, attr: string, value: string) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    const [attrName, attrValue] = selector.replace("meta[", "").replace("]", "").split("=");
    el.setAttribute(attrName, attrValue.replace(/"/g, ""));
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

export function useSEO({ title, description, ogImage, ogType = "website" }: SEOProps) {
  useEffect(() => {
    document.title = title;
    if (description) {
      setMeta('meta[name="description"]', "content", description);
    }
    setMeta('meta[property="og:title"]', "content", title);
    if (description) {
      setMeta('meta[property="og:description"]', "content", description);
    }
    setMeta('meta[property="og:type"]', "content", ogType);
    if (ogImage) {
      setMeta('meta[property="og:image"]', "content", ogImage);
    }
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", title);
    if (description) {
      setMeta('meta[name="twitter:description"]', "content", description);
    }
  }, [title, description, ogImage, ogType]);
}
