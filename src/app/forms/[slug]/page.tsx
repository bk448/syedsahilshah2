import Link from "next/link";
import { notFound } from "next/navigation";
import { forms, getForm, getFormTheme } from "@/data/forms";
import { getService } from "@/data/services";
import { CtaBand, PageHero, ReviewedNote, SideCta } from "@/components/Blocks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CardCover, serviceCover } from "@/components/CardCover";
import { pageMeta } from "@/lib/seo";
import { site } from "@/data/site";

type P = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => forms.map((f) => ({ slug: f.slug }));

export async function generateMetadata({ params }: P) {
  const f = getForm((await params).slug);
  if (!f) return {};
  // Title pattern from the spec: "[Form Number] ([Form Name]) | [Firm Name]"
  return pageMeta({
    title: `${f.number} (${f.name}) | ${site.name}`,
    description: `${f.number}: who must file, filing threshold, due date and penalties. ${f.whatItReports}`.slice(0, 158),
    path: `/forms/${f.slug}/`,
  });
}

export default async function FormPage({ params }: P) {
  const f = getForm((await params).slug);
  if (!f) notFound();
  const theme = getFormTheme(f.theme)!;
  const svcs = f.services.map(getService).filter(Boolean) as NonNullable<ReturnType<typeof getService>>[];
  const related = f.relatedForms.map(getForm).filter(Boolean) as NonNullable<ReturnType<typeof getForm>>[];

  const facts: [string, string][] = [
    ["Who must file", f.whoMustFile],
    ["Filing threshold", f.threshold],
    ["Due date", f.dueDate],
    ["Extensions", f.extensions],
    ["Penalties for late or non-filing", f.penalties],
  ];

  return (
    <>
      <div className="wrap">
        <Breadcrumbs items={[{ label: "Forms", href: "/forms/" }, { label: theme.name, href: `/forms/#${theme.slug}` }, { label: f.number }]} />
      </div>
      <PageHero art="docs" eyebrow={theme.name} title={`${f.number}: ${f.name}`} lead={f.whatItReports} />
      <div className="wrap with-side">
        <article>
          <dl className="facts reveal-stagger">
            {facts.map(([k, v]) => (
              <div key={k} className={k.startsWith("Penalties") ? "fact warn" : "fact"}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          {svcs.length > 0 && (
            <section className="block">
              <h2>Get help filing {f.number}</h2>
              <ul className="cards cols-2">
                {svcs.map((s) => (
                  <li key={s.slug}>
                    <Link className="card has-cover" href={`/services/${s.slug}/`}>
                      <CardCover cover={serviceCover(s)} />
                      <span className="card-tag">Related service</span>
                      <span className="card-title">{s.name}</span>
                      <span className="card-text">{s.summary}</span>
                      <span className="card-arrow" aria-hidden>→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {related.length > 0 && (
            <section className="block">
              <h2>Often filed with</h2>
              <ul className="form-list">
                {related.map((r) => (
                  <li key={r.slug}><Link href={`/forms/${r.slug}/`}><span className="form-num">{r.number}</span><span className="form-name">{r.name}</span></Link></li>
                ))}
              </ul>
            </section>
          )}

          <p>
            <a href={f.irsUrl} target="_blank" rel="noopener noreferrer">Official {f.number} and instructions ↗</a>
          </p>
          <ReviewedNote />
        </article>
        <SideCta />
      </div>
      <CtaBand title={`Need ${f.number} filed correctly?`} text="We prepare it as part of a fixed-fee engagement — and check what else your situation triggers." />
    </>
  );
}
