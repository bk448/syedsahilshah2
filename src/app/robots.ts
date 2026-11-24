import type { MetadataRoute } from "next";
import { abs } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    // Thank-you pages stay crawlable so search engines can see their noindex tag.
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: abs("/sitemap.xml"),
  };
}
