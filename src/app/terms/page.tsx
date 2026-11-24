import { LegalPage } from "@/components/LegalPage";
import { pageMeta, withFirm } from "@/lib/seo";
import { disclaimer } from "@/data/site";

export const metadata = pageMeta({ title: withFirm("Terms of Use"), description: "Terms that apply to your use of this website.", path: "/terms/" });

export default function Page() {
  return (
    <LegalPage
      title="Terms of Use"
      updated="November 24, 2026"
      sections={[
        { h: "No advice relationship", p: [disclaimer, "Using this website or submitting a form does not create a client relationship. An engagement begins only when we both sign an engagement letter."] },
        { h: "Accuracy", p: ["We review content regularly, but tax rules, thresholds and deadlines change. We do not guarantee that any content is current or complete for your circumstances."] },
        { h: "No guaranteed outcomes", p: ["Descriptions of penalty relief, amnesty programmes and abatement are general. Outcomes depend on your facts and IRS decisions; we cannot guarantee any result."] },
        { h: "Intellectual property", p: ["Site content is ours or licensed to us. You may share links and short quotations with attribution."] },
        { h: "External links", p: ["Links to the IRS, FinCEN and other sites are provided for convenience; we are not responsible for their content. The Client Portal is a separate service with its own terms."] },
        { h: "Governing law", p: ["These terms are governed by the laws of the State of New York (placeholder — confirm with counsel)."] },
      ]}
    />
  );
}
