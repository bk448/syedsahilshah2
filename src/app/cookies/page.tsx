import { LegalPage } from "@/components/LegalPage";
import { pageMeta, withFirm } from "@/lib/seo";

export const metadata = pageMeta({ title: withFirm("Cookie Policy"), description: "Which cookies this website uses and how to control them.", path: "/cookies/" });

export default function Page() {
  return (
    <LegalPage
      title="Cookie Policy"
      updated="November 24, 2026"
      sections={[
        { h: "Essential", p: ["Needed for the site to work and to remember your cookie choice (stored in your browser as cookie-consent-v1). These cannot be switched off."] },
        { h: "Analytics (optional)", p: ["Google Analytics 4 helps us understand which pages are useful and how many people request consultations. It loads only after you accept analytics cookies, using Google Consent Mode v2."] },
        { h: "Marketing (optional)", p: ["Off by default. Used only if we run advertising campaigns, and only with your consent."] },
        { h: "Changing your choice", p: ["Use the 'Cookie settings' link in the footer at any time to change or withdraw consent."] },
      ]}
    />
  );
}
