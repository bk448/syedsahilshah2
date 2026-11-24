import { LegalPage } from "@/components/LegalPage";
import { pageMeta, withFirm } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = pageMeta({ title: withFirm("Accessibility Statement"), description: "Our commitment to an accessible website and how to report a problem.", path: "/accessibility/" });

export default function Page() {
  return (
    <LegalPage
      title="Accessibility Statement"
      updated="November 24, 2026"
      sections={[
        { h: "Our goal", p: ["We aim to meet WCAG 2.2 level AA across this website: keyboard navigation, visible focus, text alternatives, sufficient colour contrast and labelled form fields."] },
        { h: "Known limitations", p: ["Third-party scheduling embeds may not fully meet the standard; a plain booking form is always available as an alternative."] },
        { h: "Report a problem", p: [`If anything on this site is hard to use, email ${site.email} and we'll respond within five business days.`] },
      ]}
    />
  );
}
