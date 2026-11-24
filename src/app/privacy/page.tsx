import { LegalPage } from "@/components/LegalPage";
import { pageMeta, withFirm } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata = pageMeta({ title: withFirm("Privacy Policy"), description: "How we collect, use and protect personal information submitted through this website.", path: "/privacy/" });

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="November 24, 2026"
      sections={[
        { h: "Who we are", p: [`${site.legalName} ("we", "us") operates this website. Contact: ${site.email}.`] },
        { h: "What we collect", p: ["Through the website forms we collect your name, email, optional phone number, country, situation and the message you send. We do not ask for Social Security numbers, account numbers or tax documents on this website — those are collected later through our secure Client Portal.", "With your consent, analytics cookies collect information about how you use the site."] },
        { h: "Why we use it (lawful basis)", p: ["To respond to your enquiry and prepare a quote (steps prior to entering a contract), to send deadline reminders if you opted in (consent), and to improve the site (consent for analytics)."] },
        { h: "Who we share it with", p: ["Our CRM, email and scheduling providers, acting as processors under data processing agreements. We do not sell personal information."] },
        { h: "International transfers", p: ["Our clients live worldwide and our providers may process data in the United States. Where required (for example under UK or EU GDPR), transfers rely on appropriate safeguards such as Standard Contractual Clauses."] },
        { h: "How long we keep it", p: ["Enquiries that do not become engagements are deleted after 24 months. Client records are kept for the period required by professional and IRS record-keeping rules."] },
        { h: "Your rights", p: ["Depending on where you live (including under UK/EU GDPR and California law), you can ask to access, correct, delete or port your data, object to processing, or withdraw consent. Email us to exercise these rights. You may also complain to your local data protection authority."] },
      ]}
    />
  );
}
