import Link from "next/link";
import { notFound } from "next/navigation";
import { countries, getCountry, inName } from "@/data/countries";
import { getService } from "@/data/services";
import { CtaBand, PageHero, ReviewedNote, SideCta } from "@/components/Blocks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMeta } from "@/lib/seo";
import { site } from "@/data/site";

type P = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => countries.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: P) {
  const c = getCountry((await params).slug);
  if (!c) return {};
  // Targets "US taxes in [country]" in title, H1 and meta description.
  return pageMeta({
    title: `US Taxes in ${inName(c)}: A Guide for Americans | ${site.name}`,
    description: `US taxes in ${inName(c)} explained: ${c.treaty.inForce ? "the tax treaty" : "no tax treaty"}, local pensions, ${c.name} vs US filing deadlines, and common PFIC traps.`,
    path: `/countries/${c.slug}/`,
  });
}

export default async function CountryPage({ params }: P) {
  const c = getCountry((await params).slug);
  if (!c) notFound();
  const svcs = c.services.map(getService).filter(Boolean) as NonNullable<ReturnType<typeof getService>>[];
  if (!c.totalization && !c.services.includes("self-employment-tax-totalization")) {
    const t = getService("self-employment-tax-totalization");
    if (t) svcs.push(t);
  }

  return (
    <>
      <div className="wrap">
        <Breadcrumbs items={[{ label: "Countries", href: "/countries/" }, { label: c.region, href: "/countries/" }, { label: c.name }]} />
      </div>
      <PageHero art="globe" eyebrow={`Country guide · ${c.region}`} title={`US taxes in ${inName(c)}`} lead={`What Americans living in ${inName(c)} need to know about filing US taxes alongside local returns.`}>
        <ul className="status-row anim-up d3">
          <li className={c.treaty.inForce ? "ok" : "no"}>{c.treaty.inForce ? "Income tax treaty in force" : "No income tax treaty"}</li>
          <li className={c.totalization ? "ok" : "no"}>{c.totalization ? "Totalization agreement" : "No totalization agreement"}</li>
        </ul>
      </PageHero>
      <div className="wrap with-side">
        <article>
          <section className="block">
            <h2>Treaty position</h2>
            <p>{c.treaty.summary}</p>
            {!c.totalization && (
              <p className="callout">
                Without a totalization agreement, self-employed Americans in {inName(c)} may pay US self-employment tax as well as local social security.{" "}
                <Link href="/services/self-employment-tax-totalization/">Self-employment tax & totalization →</Link>
              </p>
            )}
          </section>

          <section className="block">
            <h2>Local pensions and retirement accounts</h2>
            <ul>{c.pensions.map((p) => <li key={p}>{p}</li>)}</ul>
          </section>

          <section className="block">
            <h2>{c.name} vs US filing deadlines</h2>
            <table className="table">
              <thead><tr><th scope="col"></th><th scope="col">{c.name}</th><th scope="col">United States</th></tr></thead>
              <tbody>
                <tr><th scope="row">Tax year</th><td>{c.localTaxYear}</td><td>Calendar year</td></tr>
                <tr><th scope="row">Return due</th><td>{c.localDeadline}</td><td>June 15 for Americans abroad (Oct 15 with extension). Tax due April 15.</td></tr>
                <tr><th scope="row">FBAR</th><td>—</td><td>April 15, automatic extension to Oct 15</td></tr>
              </tbody>
            </table>
            <p className="muted">See every date in the <Link href="/resources/deadlines/">deadlines calendar</Link>.</p>
          </section>

          <section className="block">
            <h2>Common PFIC traps in {inName(c)}</h2>
            <ul className="warn-list reveal-stagger">{c.pficTraps.map((p) => <li key={p}>{p}</li>)}</ul>
            <p><Link href="/services/pfic-reporting/">PFIC reporting →</Link> · <Link href="/forms/8621/">Form 8621 →</Link></p>
          </section>

          {c.otherNotes.length > 0 && (
            <section className="block">
              <h2>Other things to watch</h2>
              <ul>{c.otherNotes.map((p) => <li key={p}>{p}</li>)}</ul>
            </section>
          )}

          <section className="block">
            <h2>Services for Americans in {inName(c)}</h2>
            <ul className="pill-list">{svcs.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}/`}>{s.name}</Link></li>)}</ul>
          </section>
          <ReviewedNote />
        </article>
        <SideCta />
      </div>
      <CtaBand title={`Living in ${inName(c)}? Talk to a specialist`} primary={{ href: `/contact/book-a-consultation/?country=${encodeURIComponent(c.name)}`, label: "Book a Consultation" }} />
    </>
  );
}
