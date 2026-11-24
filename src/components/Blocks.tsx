import Link from "next/link";
import type { FAQ } from "@/data/types";
import { JsonLd, faqLd } from "@/lib/seo";
import { site } from "@/data/site";
import { Icon } from "./Icons";
import { HeroDecor, type ArtKind } from "./Art";
import { CardCover, type Cover } from "./CardCover";
import { SplitText } from "./SplitText";

export function CtaBand({
  title = "Not sure what you need?",
  text = "Book a free 15-minute fit call. We'll tell you exactly which returns and forms apply — then send a fixed-fee quote.",
  primary = { href: "/contact/book-a-consultation/", label: "Book a Consultation" },
  secondary = { href: "/contact/request-a-quote/", label: "Request a Quote" },
}: {
  title?: string;
  text?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string } | null;
}) {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <span className="blob b3" aria-hidden="true" />
      <span className="blob b4" aria-hidden="true" />
      <div className="wrap cta-inner glass-dark reveal">
        <div>
          <SplitText id="cta-title" text={title} />
          <p>{text}</p>
        </div>
        <div className="cta-actions">
          <Link className="btn btn-primary" href={primary.href} data-cta="book">{primary.label}</Link>
          {secondary && <Link className="btn btn-ghost-light" href={secondary.href} data-cta="quote">{secondary.label}</Link>}
        </div>
      </div>
    </section>
  );
}

export function FaqList({ faqs, schema = true, heading = "Frequently asked questions" }: { faqs: FAQ[]; schema?: boolean; heading?: string }) {
  if (!faqs.length) return null;
  return (
    <section className="block" aria-labelledby="faq-h">
      <SplitText id="faq-h" text={heading} />
      <div className="faq reveal-stagger">
        {faqs.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
      {schema && <JsonLd data={faqLd(faqs)} />}
    </section>
  );
}

export function LinkCards({ items, cols = 3 }: { items: { href: string; title: string; text?: string; tag?: string; icon?: string; cover?: Cover }[]; cols?: 2 | 3 | 4 }) {
  return (
    <ul className={`cards cols-${cols} reveal-stagger`}>
      {items.map((i) => (
        <li key={i.href}>
          <Link href={i.href} className={i.cover ? "card has-cover" : "card"}>
            {i.cover && <CardCover cover={i.cover} />}
            {i.icon && !i.cover && <span className="card-icon"><Icon name={i.icon} size={22} /></span>}
            {i.tag && <span className="card-tag">{i.tag}</span>}
            <span className="card-title">{i.title}</span>
            {i.text && <span className="card-text">{i.text}</span>}
            <span className="card-arrow" aria-hidden>→</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function PageHero({ eyebrow, title, lead, children, art = "docs" }: { eyebrow?: string; title: string; lead?: string; children?: React.ReactNode; art?: ArtKind | null }) {
  return (
    <header className="page-hero">
      {art && <HeroDecor kind={art} />}
      <div className="wrap page-hero-inner">
        {eyebrow && <p className="eyebrow anim-up">{eyebrow}</p>}
        <SplitText as="h1" text={title} />
        {lead && <p className="lead anim-up d2">{lead}</p>}
        {children}
      </div>
    </header>
  );
}

export function ReviewedNote() {
  const d = new Date(site.lastReviewed).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  return (
    <p className="reviewed">
      Last reviewed {d} by a credentialed preparer (placeholder: Name, EA). Rules change every tax year — confirm before you act.
    </p>
  );
}

export function SideCta() {
  return (
    <aside className="side-cta glass" aria-label="Get help">
      <span className="side-icon"><Icon name="shield" size={26} /></span>
      <p className="side-title">Need this handled?</p>
      <p>Fixed fees, credentialed preparers, and a reply within one business day.</p>
      <Link className="btn btn-primary btn-block" href="/contact/book-a-consultation/" data-cta="book">Book a Consultation</Link>
      <Link className="btn btn-outline btn-block" href="/contact/request-a-quote/" data-cta="quote">Request a Quote</Link>
    </aside>
  );
}
