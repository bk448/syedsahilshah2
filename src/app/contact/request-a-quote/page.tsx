import Link from "next/link";
import { PageHero } from "@/components/Blocks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LeadForm } from "@/components/LeadForm";
import { pageMeta, withFirm } from "@/lib/seo";

export const metadata = pageMeta({
  title: withFirm("Request a Quote"),
  description: "Get a fixed-fee quote for your US expat tax return, FBAR, Streamlined filing or business reporting within one business day.",
  path: "/contact/request-a-quote/",
});

export default function Quote() {
  return (
    <>
      <div className="wrap"><Breadcrumbs items={[{ label: "Contact", href: "/contact/" }, { label: "Request a Quote" }]} /></div>
      <PageHero art="chart" eyebrow="Request a quote" title="Get a fixed-fee quote" lead="A few details about your situation and we'll email a quote within one business day." />
      <div className="wrap with-side">
        <LeadForm kind="quote" />
        <aside className="side-cta glass" aria-label="Pricing">
          <p className="side-title">Typical fees</p>
          <ul className="plain">
            <li>Expat return — from $650</li>
            <li>Streamlined catch-up — from $2,400</li>
            <li>Form 5471 — from $1,200 per entity</li>
          </ul>
          <Link href="/pricing/">See full pricing →</Link>
        </aside>
      </div>
    </>
  );
}
