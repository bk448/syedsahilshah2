import type { MetadataRoute } from "next";
import { divisions } from "@/data/divisions";
import { services } from "@/data/services";
import { forms } from "@/data/forms";
import { countries } from "@/data/countries";
import { posts } from "@/data/content";
import { abs } from "@/lib/seo";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(site.lastReviewed);
  const statics = [
    "/", "/about/", "/divisions/", "/services/", "/forms/", "/countries/", "/contact/",
    "/contact/book-a-consultation/", "/contact/request-a-quote/", "/pricing/", "/faqs/",
    "/resources/", "/resources/deadlines/", "/privacy/", "/terms/", "/cookies/", "/accessibility/",
  ];
  return [
    ...statics.map((p) => ({ url: abs(p), lastModified, priority: p === "/" ? 1 : 0.6 })),
    ...divisions.map((d) => ({ url: abs(`/divisions/${d.slug}/`), lastModified, priority: 0.8 })),
    ...services.map((s) => ({ url: abs(`/services/${s.slug}/`), lastModified, priority: 0.8 })),
    ...forms.map((f) => ({ url: abs(`/forms/${f.slug}/`), lastModified, priority: 0.7 })),
    ...countries.map((c) => ({ url: abs(`/countries/${c.slug}/`), lastModified, priority: 0.7 })),
    ...posts.map((p) => ({ url: abs(`/resources/${p.slug}/`), lastModified: new Date(p.date), priority: 0.5 })),
  ];
}
