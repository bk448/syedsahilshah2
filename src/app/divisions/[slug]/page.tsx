import Link from "next/link";
import { notFound } from "next/navigation";
import { divisions, getDivision } from "@/data/divisions";
import { getService } from "@/data/services";
import { getForm } from "@/data/forms";
import { CtaBand, FaqList, LinkCards, PageHero, SideCta } from "@/components/Blocks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon, divisionIcon, themeIcon } from "@/components/Icons";
import { serviceCover } from "@/components/CardCover";
import { pageMeta, withFirm } from "@/lib/seo";

type P = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => divisions.map((d) => ({ slug: d.slug }));

export async function generateMetadata({ params }: P) {
  const d = getDivision((await params).slug);
  if (!d) return {};
  return pageMeta({ title: withFirm(`US Tax Help for ${d.name}`), description: d.short, path: `/divisions/${d.slug}/` });
}

export default async function DivisionPage({ params }: P) {
  const d = getDivision((await params).slug);
  if (!d) notFound();
  const svcs = d.services.map(getService).filter(Boolean) as NonNullable<ReturnType<typeof getService>>[];
  const fms = d.forms.map(getForm).filter(Boolean) as NonNullable<ReturnType<typeof getForm>>[];

  return (
    <>
      <div className="wrap"><Breadcrumbs items={[{ label: "Who we help", href: "/divisions/" }, { label: d.name }]} /></div>
      <PageHero art="people" eyebrow="Who we help" title={d.name} lead={d.short} />
      <div className="wrap with-side">
        <article>
          <section className="block">
            <h2 className="h-icon"><span className="h-icon-badge"><Icon name={divisionIcon[d.slug]} /></span>Who this is for</h2>
            <p>{d.whoFor}</p>
            <ul className="ticks reveal-stagger">{d.situations.map((s) => <li key={s}>{s}</li>)}</ul>
          </section>

          <section className="block">
            <h2>Services for {d.name.toLowerCase()}</h2>
            <LinkCards cols={2} items={svcs.map((s) => ({ href: `/services/${s.slug}/`, title: s.name, text: s.summary, cover: serviceCover(s) }))} />
          </section>

          <section className="block">
            <h2>Forms you'll commonly file</h2>
            <ul className="form-list">
              {fms.map((f) => (
                <li key={f.slug}>
                  <Link href={`/forms/${f.slug}/`}><span className="form-num">{f.number}</span><span className="form-name">{f.name}</span></Link>
                </li>
              ))}
            </ul>
          </section>

          <FaqList faqs={d.faqs} />
        </article>
        <SideCta />
      </div>
      <CtaBand title={`Talk to a specialist in ${d.name.toLowerCase()}`} />
    </>
  );
}
