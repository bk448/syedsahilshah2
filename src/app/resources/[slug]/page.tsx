import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/data/content";
import { CtaBand } from "@/components/Blocks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, abs, pageMeta, withFirm } from "@/lib/seo";
import { CardCover, postCover } from "@/components/CardCover";
import { site } from "@/data/site";

type P = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: P) {
  const p = getPost((await params).slug);
  if (!p) return {};
  return pageMeta({ title: withFirm(p.title), description: p.excerpt, path: `/resources/${p.slug}/`, type: "article" });
}

export default async function PostPage({ params }: P) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const others = posts.filter((x) => x.slug !== p.slug && x.tags.some((t) => p.tags.includes(t))).slice(0, 3);
  const date = new Date(p.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <>
      <div className="wrap"><Breadcrumbs items={[{ label: "Resources", href: "/resources/" }, { label: p.title }]} /></div>
      <article className="wrap prose-wrap article">
        <p className="eyebrow dark">{p.tags.join(" · ")}</p>
        <h1>{p.title}</h1>
        <p className="byline">By {p.author} · Reviewed by {p.reviewer} · <time dateTime={p.date}>{date}</time></p>
        <p className="lead dark">{p.excerpt}</p>
        <div className="article-cover"><CardCover cover={postCover(p)} /></div>
        {p.body.map((b, i) => (
          <section key={i}>
            {b.h && <h2>{b.h}</h2>}
            <p>{b.p}</p>
          </section>
        ))}
        {others.length > 0 && (
          <aside className="block">
            <h2>Related reading</h2>
            <ul>{others.map((o) => <li key={o.slug}><Link href={`/resources/${o.slug}/`}>{o.title}</Link></li>)}</ul>
          </aside>
        )}
      </article>
      <CtaBand />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: p.title,
          description: p.excerpt,
          datePublished: p.date,
          dateModified: p.date,
          author: { "@type": "Person", name: p.author },
          publisher: { "@id": abs("/#organization"), name: site.name },
          mainEntityOfPage: abs(`/resources/${p.slug}/`),
        }}
      />
    </>
  );
}
