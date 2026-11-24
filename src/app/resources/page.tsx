import Link from "next/link";
import { posts } from "@/data/content";
import { CtaBand, PageHero } from "@/components/Blocks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BlogList } from "@/components/Filters";
import { pageMeta, withFirm } from "@/lib/seo";

export const metadata = pageMeta({
  title: withFirm("Blog & Resources for Americans Abroad"),
  description: "Guides and updates on US expat tax: catch-up filing, PFICs, moving abroad, deadlines and more.",
  path: "/resources/",
});

export default function Resources() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <div className="wrap"><Breadcrumbs items={[{ label: "Resources" }]} /></div>
      <PageHero art="docs" eyebrow="Resources" title="Blog & resources" lead="Practical guides written and reviewed by credentialed preparers.">
        <p><Link className="btn btn-ghost-light" href="/resources/deadlines/">Open the deadlines calendar →</Link></p>
      </PageHero>
      <div className="wrap section-tight">
        <BlogList posts={sorted.map(({ slug, title, excerpt, date, tags }) => ({ slug, title, excerpt, date, tags }))} />
      </div>
      <CtaBand />
    </>
  );
}
