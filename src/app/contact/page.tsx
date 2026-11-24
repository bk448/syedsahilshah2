import Link from "next/link";
import { site } from "@/data/site";
import { PageHero } from "@/components/Blocks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LeadForm } from "@/components/LeadForm";
import { CardCover } from "@/components/CardCover";
import { pageMeta, withFirm } from "@/lib/seo";

export const metadata = pageMeta({
  title: withFirm("Contact Us"),
  description: `Contact ${site.name}: book a consultation, request a fixed-fee quote, or send us a question.`,
  path: "/contact/",
});

export default function Contact() {
  return (
    <>
      <div className="wrap"><Breadcrumbs items={[{ label: "Contact" }]} /></div>
      <PageHero art="chat" eyebrow="Contact" title="Talk to a US expat tax specialist" lead="Choose the quickest route for you — or send a message and we'll reply within one business day." />
      <div className="wrap section-tight">
        <ul className="cards cols-2 contact-choices reveal-stagger">
          <li>
            <Link className="card card-strong has-cover" href="/contact/book-a-consultation/" data-cta="book">
              <CardCover cover={{ kind: "icon", icon: "calendar", tone: "teal", seed: "book" }} />
              <span className="card-title">Book a Consultation</span>
              <span className="card-text">A free 15-minute fit call at a time that suits your time zone.</span>
              <span className="card-arrow" aria-hidden>→</span>
            </Link>
          </li>
          <li>
            <Link className="card card-strong has-cover" href="/contact/request-a-quote/" data-cta="quote">
              <CardCover cover={{ kind: "icon", icon: "doc", tone: "navy", seed: "quote" }} />
              <span className="card-title">Request a Quote</span>
              <span className="card-text">Tell us your situation and get a fixed-fee quote by email.</span>
              <span className="card-arrow" aria-hidden>→</span>
            </Link>
          </li>
        </ul>

        <div className="two-col">
          <div>
            <h2>Send a message</h2>
            <LeadForm kind="contact" />
          </div>
          <div className="contact-details">
            <h2>Office</h2>
            <address>
              {site.name}<br />
              {site.address.street}<br />
              {site.address.city}, {site.address.region} {site.address.postcode}
            </address>
            <p><a href={`mailto:${site.email}`}>{site.email}</a><br /><a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}>{site.phone}</a></p>
            <p className="muted">{site.hours}</p>
            <h2>Existing clients</h2>
            <p>Upload documents and message your preparer through the <a href={site.clientPortalUrl} target="_blank" rel="noopener noreferrer">Client Portal ↗</a>.</p>
          </div>
        </div>
      </div>
    </>
  );
}
