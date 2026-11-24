import { deadlines } from "@/data/content";
import { countries } from "@/data/countries";
import { divisions } from "@/data/divisions";
import { CtaBand, PageHero } from "@/components/Blocks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DeadlinesFilter } from "@/components/Filters";
import { pageMeta, withFirm } from "@/lib/seo";

export const metadata = pageMeta({
  title: withFirm("US Expat Tax Deadlines Calendar"),
  description: "Every US expat tax deadline in one place — returns, FBAR, estimated tax, trusts — alongside local filing deadlines for 16 countries.",
  path: "/resources/deadlines/",
});

export default function Deadlines() {
  return (
    <>
      <div className="wrap"><Breadcrumbs items={[{ label: "Resources", href: "/resources/" }, { label: "Deadlines Calendar" }]} /></div>
      <PageHero art="calendar" eyebrow="Deadlines calendar" title="US expat tax deadlines" lead="Filter by where you live and your situation. Add any date to your calendar in one click." />
      <div className="wrap prose-wrap section-tight">
        <DeadlinesFilter
          items={deadlines}
          countries={countries.map(({ slug, name }) => ({ slug, name }))}
          situations={divisions.map(({ slug, name }) => ({ slug, name }))}
        />
        <p className="fine">If a date falls on a weekend or US federal holiday, the deadline moves to the next business day. Local deadlines are indicative — confirm with your local adviser.</p>
      </div>
      <CtaBand title="Worried about a deadline?" />
    </>
  );
}
