import { formThemes, formsByTheme } from "@/data/forms";
import { CtaBand, PageHero } from "@/components/Blocks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FormsSearch } from "@/components/Filters";
import { pageMeta, withFirm } from "@/lib/seo";

export const metadata = pageMeta({
  title: withFirm("US Expat Tax Forms Library"),
  description: "Plain-language guides to every major US expat tax form: who files, thresholds, due dates and penalties for FBAR, 8938, 8621, 5471, 3520 and more.",
  path: "/forms/",
});

export default function FormsHub() {
  const groups = formThemes.map((t) => ({ slug: t.slug, name: t.name, forms: formsByTheme(t.slug).map(({ slug, number, name }) => ({ slug, number, name })) }));
  return (
    <>
      <div className="wrap"><Breadcrumbs items={[{ label: "Forms" }]} /></div>
      <PageHero art="docs" eyebrow="Forms library" title="US expat tax forms, explained" lead="What each form reports, who must file, the threshold, the due date and the penalty for missing it." />
      <div className="wrap section-tight">
        <FormsSearch groups={groups} />
      </div>
      <CtaBand title="Not sure which forms apply to you?" />
    </>
  );
}
