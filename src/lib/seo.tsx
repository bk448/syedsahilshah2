import type { Metadata } from "next";
import { site } from "@/data/site";

export const abs = (path: string) => `${site.url}${path}`;

export function pageMeta({
  title,
  description,
  path,
  noindex = false,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  type?: "website" | "article";
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: abs(path) },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: { title, description, url: abs(path), siteName: site.name, type, locale: "en_US" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export const withFirm = (t: string) => `${t} | ${site.name}`;

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be raw JSON; content comes from our own data files.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": ["Organization", "AccountingService"],
  "@id": abs("/#organization"),
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postcode,
    addressCountry: site.address.country,
  },
  areaServed: "Worldwide",
  knowsAbout: ["US expat taxes", "FBAR", "FATCA", "Streamlined Filing Compliance Procedures", "PFIC", "Form 5471"],
});

export const serviceLd = (name: string, description: string, path: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url: abs(path),
  serviceType: "Tax preparation",
  areaServed: "Worldwide",
  provider: { "@id": abs("/#organization") },
});

export const faqLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});
