import { faqCategories } from "@/data/content";
import { CtaBand, PageHero } from "@/components/Blocks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSearch } from "@/components/Filters";
import { JsonLd, faqLd, pageMeta, withFirm } from "@/lib/seo";

export const metadata = pageMeta({
  title: withFirm("US Expat Tax FAQs"),
  description: "Answers to common US expat tax questions: filing from abroad, deadlines, FBAR, Streamlined catch-up, PFICs, pensions and pricing.",
  path: "/faqs/",
});

export default function Faqs() {
  return (
    <>
      <div className="wrap"><Breadcrumbs items={[{ label: "FAQs" }]} /></div>
      <PageHero art="chat" eyebrow="FAQs" title="Frequently asked questions" lead="Quick answers, with links to the service or form that covers each topic in depth." />
      <div className="wrap prose-wrap section-tight">
        <FaqSearch cats={faqCategories} />
      </div>
      <CtaBand title="Didn't find your answer?" />
      <JsonLd data={faqLd(faqCategories.flatMap((c) => c.items))} />
    </>
  );
}
