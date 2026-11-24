import { divisions } from "@/data/divisions";
import { CtaBand, LinkCards, PageHero } from "@/components/Blocks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { divisionCover } from "@/components/CardCover";
import { pageMeta, withFirm } from "@/lib/seo";

export const metadata = pageMeta({
  title: withFirm("Who We Help — US Tax by Situation"),
  description: "Find US expat tax help for your situation: accidental Americans, families abroad, business owners, green card holders, movers and private clients.",
  path: "/divisions/",
});

export default function DivisionsHub() {
  return (
    <>
      <div className="wrap"><Breadcrumbs items={[{ label: "Who we help" }]} /></div>
      <PageHero art="people" eyebrow="Divisions" title="Who we help" lead="Pick the situation closest to yours. Each page lists the services and forms that usually apply." />
      <div className="wrap section-tight">
        <LinkCards cols={2} items={divisions.map((d) => ({ href: `/divisions/${d.slug}/`, title: d.name, text: d.short, cover: divisionCover(d.slug) }))} />
      </div>
      <CtaBand />
    </>
  );
}
