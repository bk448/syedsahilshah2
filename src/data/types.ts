// Shared content model. Every templated page type is filled from fields like these,
// so adding a page = adding an entry (or a CMS record with the same shape).

export type FAQ = { q: string; a: string };

export type Division = {
  slug: string;
  name: string;
  short: string; // card blurb
  whoFor: string;
  situations: string[];
  services: string[]; // service slugs
  forms: string[]; // form slugs
  faqs: FAQ[];
};

export type ServiceTheme = { slug: string; name: string; intro: string };

export type Service = {
  slug: string;
  theme: string; // ServiceTheme slug
  name: string;
  summary: string;
  covers: string[];
  whoNeedsIt: string[];
  divisions: string[]; // division slugs
  forms: string[]; // form slugs
  process: string[];
  turnaround: string;
  documents: string[];
  priceFrom?: string;
  faqs: FAQ[];
};

export type FormTheme = { slug: string; name: string };

export type TaxForm = {
  slug: string; // URL slug, e.g. "5471"
  number: string; // display, e.g. "Form 5471"
  name: string;
  theme: string; // FormTheme slug
  whatItReports: string;
  whoMustFile: string;
  threshold: string;
  dueDate: string;
  extensions: string;
  penalties: string;
  services: string[]; // service slugs (Form <-> Service counterpart links)
  relatedForms: string[];
  irsUrl: string;
};

export type Country = {
  slug: string;
  name: string;
  inName?: string; // phrasing after "in", e.g. "the UK"
  region: string;
  treaty: { inForce: boolean; summary: string };
  totalization: boolean;
  localTaxYear: string;
  localDeadline: string;
  pensions: string[];
  pficTraps: string[];
  otherNotes: string[];
  services: string[]; // service slugs
};

export type Deadline = {
  date: string; // ISO yyyy-mm-dd
  title: string;
  detail: string;
  situations: string[]; // division slugs, or "all"
  countries: string[]; // country slugs, or "all"
  link?: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  reviewer: string;
  tags: string[];
  body: { h?: string; p: string }[];
};
