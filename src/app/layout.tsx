import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { CardFx, RevealObserver, ScrollProgress } from "@/components/Motion";
import { JsonLd, organizationLd } from "@/lib/seo";
import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s | ${site.name}` },
  description: "Specialist US tax preparation for Americans abroad: expat returns, FBAR, FATCA, Streamlined catch-up filing, PFIC and foreign company reporting.",
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#0f2a44", width: "device-width", initialScale: 1 };

// Google Consent Mode v2: deny everything until the visitor chooses.
const consentDefaults = `
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-motion');
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: consentDefaults }} />
      </head>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <ScrollProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CookieConsent />
        <RevealObserver />
        <CardFx />
        <JsonLd data={organizationLd()} />
      </body>
    </html>
  );
}
