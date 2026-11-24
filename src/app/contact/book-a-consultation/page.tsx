import { site } from "@/data/site";
import { PageHero } from "@/components/Blocks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LeadForm } from "@/components/LeadForm";
import { pageMeta, withFirm } from "@/lib/seo";

export const metadata = pageMeta({
  title: withFirm("Book a Consultation"),
  description: "Book a free 15-minute call with a US expat tax specialist at a time that works in your time zone.",
  path: "/contact/book-a-consultation/",
});

export default function Book() {
  return (
    <>
      <div className="wrap"><Breadcrumbs items={[{ label: "Contact", href: "/contact/" }, { label: "Book a Consultation" }]} /></div>
      <PageHero art="calendar" eyebrow="Book a consultation" title="Book a free 15-minute fit call" lead="We'll confirm what you need to file, flag anything urgent, and follow up with a fixed-fee quote." />
      <div className="wrap with-side">
        <div>
          {site.bookingEmbedUrl ? (
            <>
              <iframe className="booking-embed" src={site.bookingEmbedUrl} title="Choose a consultation time" loading="lazy" />
              <p className="muted">Prefer not to use the calendar? Fill in the form below and we'll email you times.</p>
              <LeadForm kind="book" />
            </>
          ) : (
            <LeadForm kind="book" />
          )}
        </div>
        <aside className="side-cta glass" aria-label="What to expect">
          <p className="side-title">What to expect</p>
          <ol className="steps compact">
            <li>We confirm a time by email within one business day</li>
            <li>A 15-minute video or phone call</li>
            <li>A written fixed-fee quote</li>
          </ol>
          <p className="muted">Calls available across US, European and Asia-Pacific hours.</p>
        </aside>
      </div>
    </>
  );
}
