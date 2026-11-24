import Link from "next/link";
import { divisions } from "@/data/divisions";
import { site, disclaimer } from "@/data/site";
import { CookieSettingsLink } from "./CookieConsent";

const topServices = [
  ["us-expat-tax-return", "US Expat Tax Return"],
  ["fbar-filing", "FBAR Filing"],
  ["streamlined-filing-procedures", "Streamlined Filing"],
  ["pfic-reporting", "PFIC Reporting"],
  ["foreign-corporation-reporting", "Form 5471 Reporting"],
  ["expatriation-renunciation", "Renunciation"],
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <p className="logo-text light">{site.name}</p>
          <p>{site.tagline}. Credentialed preparers, fixed fees, clients in 60+ countries.</p>
          <address>
            {site.address.street}<br />
            {site.address.city}, {site.address.region} {site.address.postcode}<br />
            <a href={`mailto:${site.email}`}>{site.email}</a><br />
            <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}>{site.phone}</a>
          </address>
        </div>
        <div>
          <p className="footer-h">Who we help</p>
          <ul>{divisions.map((d) => <li key={d.slug}><Link href={`/divisions/${d.slug}/`}>{d.name}</Link></li>)}</ul>
        </div>
        <div>
          <p className="footer-h">Top services</p>
          <ul>
            {topServices.map(([s, l]) => <li key={s}><Link href={`/services/${s}/`}>{l}</Link></li>)}
            <li><Link href="/services/">All services</Link></li>
            <li><Link href="/forms/">Forms library</Link></li>
            <li><Link href="/countries/">Country guides</Link></li>
          </ul>
        </div>
        <div>
          <p className="footer-h">Resources</p>
          <ul>
            <li><Link href="/pricing/">Pricing</Link></li>
            <li><Link href="/faqs/">FAQs</Link></li>
            <li><Link href="/resources/">Blog & Resources</Link></li>
            <li><Link href="/resources/deadlines/">Deadlines Calendar</Link></li>
            <li><a href={site.clientPortalUrl} target="_blank" rel="noopener noreferrer">Client Portal ↗</a></li>
            <li><Link href="/about/">About us</Link></li>
            <li><Link href="/contact/">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-legal">
        <p className="disclaimer">{disclaimer}</p>
        <div className="legal-row">
          <span>© {new Date().getFullYear()} {site.legalName}</span>
          <span className="legal-links">
            <Link href="/privacy/">Privacy</Link>
            <Link href="/terms/">Terms</Link>
            <Link href="/cookies/">Cookies</Link>
            <Link href="/accessibility/">Accessibility</Link>
            <CookieSettingsLink />
          </span>
        </div>
      </div>
    </footer>
  );
}
