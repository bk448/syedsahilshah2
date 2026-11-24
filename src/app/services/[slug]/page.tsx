import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, getServiceTheme, services, servicesByTheme } from "@/data/services";
import { getForm } from "@/data/forms";
import { getDivision } from "@/data/divisions";
import { countries, inName } from "@/data/countries";
import { CtaBand, FaqList, PageHero, ReviewedNote, SideCta } from "@/components/Blocks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, pageMeta, serviceLd, withFirm } from "@/lib/seo";

type P = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: P) {
  const s = getService((await params).slug);
  if (!s) return {};
  return pageMeta({ title: withFirm(s.name), description: s.summary, path: `/services/${s.slug}/` });
}

export default async function ServicePage({ params }: P) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const theme = getServiceTheme(s.theme)!;
  const fms = s.forms.map(getForm).filter(Boolean) as NonNullable<ReturnType<typeof getForm>>[];
  const divs = s.divisions.map(getDivision).filter(Boolean) as NonNullable<ReturnType<typeof getDivision>>[];
  const ctry = countries.filter((c) => c.services.includes(s.slug));
  const siblings = servicesByTheme(s.theme).filter((x) => x.slug !== s.slug);
  const path = `/services/${s.slug}/`;

  return (
    <>
      <div className="wrap">
        <Breadcrumbs items={[{ label: "Services", href: "/services/" }, { label: theme.name, href: `/services/#${theme.slug}` }, { label: s.name }]} />
      </div>
      <PageHero art="shield" eyebrow={theme.name} title={s.name} lead={s.summary}>
        <div className="hero-meta">
          {s.priceFrom && <span>From <strong>{s.priceFrom}</strong></span>}
          <span>Turnaround: <strong>{s.turnaround}</strong></span>
        </div>
      </PageHero>
      <div className="wrap with-side">
        <article>
          <section className="block">
            <h2>What this service covers</h2>
            <ul className="ticks reveal-stagger">{s.covers.map((c) => <li key={c}>{c}</li>)}</ul>
          </section>
          <section className="block">
            <h2>Who needs it</h2>
            <ul>{s.whoNeedsIt.map((c) => <li key={c}>{c}</li>)}</ul>
            {divs.length > 0 && (
              <p className="tags">Typical for:{" "}
                {divs.map((d) => <Link key={d.slug} className="tag" href={`/divisions/${d.slug}/`}>{d.name}</Link>)}
              </p>
            )}
          </section>
          {fms.length > 0 && (
            <section className="block">
              <h2>Forms we file for this</h2>
              <ul className="form-list">
                {fms.map((f) => (
                  <li key={f.slug}><Link href={`/forms/${f.slug}/`}><span className="form-num">{f.number}</span><span className="form-name">{f.name}</span></Link></li>
                ))}
              </ul>
            </section>
          )}
          <section className="block">
            <h2>How it works</h2>
            <ol className="steps reveal-stagger">{s.process.map((p) => <li key={p}>{p}</li>)}</ol>
          </section>
          <section className="block">
            <h2>What you'll need</h2>
            <ul>{s.documents.map((d) => <li key={d}>{d}</li>)}</ul>
          </section>
          <FaqList faqs={s.faqs} />
          {ctry.length > 0 && (
            <section className="block">
              <h2>Country guides</h2>
              <ul className="pill-list">{ctry.map((c) => <li key={c.slug}><Link href={`/countries/${c.slug}/`}>US taxes in {inName(c)}</Link></li>)}</ul>
            </section>
          )}
          {siblings.length > 0 && (
            <section className="block">
              <h2>Related {theme.name.toLowerCase()} services</h2>
              <ul className="pill-list">{siblings.map((x) => <li key={x.slug}><Link href={`/services/${x.slug}/`}>{x.name}</Link></li>)}</ul>
            </section>
          )}
          <ReviewedNote />
        </article>
        <SideCta />
      </div>
      <CtaBand title={`Get help with ${s.name.replace(/ \(.*\)$/, "")}`} />
      <JsonLd data={serviceLd(s.name, s.summary, path)} />
    </>
  );
}
