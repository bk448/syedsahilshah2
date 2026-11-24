import { Breadcrumbs } from "./Breadcrumbs";
import { site } from "@/data/site";

export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: { h: string; p: string[] }[] }) {
  return (
    <>
      <div className="wrap"><Breadcrumbs items={[{ label: title }]} /></div>
      <article className="wrap prose-wrap article">
        <h1>{title}</h1>
        <p className="byline">Last updated {updated} · {site.legalName}</p>
        <p className="callout">Sample legal text for the demo. Have it reviewed by counsel before launch.</p>
        {sections.map((s) => (
          <section key={s.h}>
            <h2>{s.h}</h2>
            {s.p.map((p, i) => <p key={i}>{p}</p>)}
          </section>
        ))}
      </article>
    </>
  );
}
