"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

type Consent = { analytics: boolean; marketing: boolean; decided: boolean };
const KEY = "cookie-consent-v1";
const OPEN_EVENT = "open-cookie-settings";

declare global {
  interface Window { dataLayer: unknown[]; gtag?: (...args: unknown[]) => void }
}

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (window.gtag) window.gtag("event", event, params);
  else window.dataLayer.push({ event, ...params });
}

function read(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

function apply(c: Consent) {
  window.gtag?.("consent", "update", {
    analytics_storage: c.analytics ? "granted" : "denied",
    ad_storage: c.marketing ? "granted" : "denied",
    ad_user_data: c.marketing ? "granted" : "denied",
    ad_personalization: c.marketing ? "granted" : "denied",
  });
  if (c.analytics && site.gaId && !document.getElementById("ga4-src")) {
    const s = document.createElement("script");
    s.id = "ga4-src";
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${site.gaId}`;
    document.head.appendChild(s);
    window.gtag?.("js", new Date());
    window.gtag?.("config", site.gaId);
  }
}

export function CookieConsent() {
  const [show, setShow] = useState(false);
  const [custom, setCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const c = read();
    if (c?.decided) {
      apply(c);
      setAnalytics(c.analytics);
      setMarketing(c.marketing);
    } else setShow(true);

    const reopen = () => { setCustom(true); setShow(true); };
    window.addEventListener(OPEN_EVENT, reopen);

    // Track clicks on the two primary CTAs anywhere on the site.
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-cta]");
      if (el) track("cta_click", { cta: el.dataset.cta, location: window.location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener(OPEN_EVENT, reopen);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const save = (c: Omit<Consent, "decided">) => {
    const full = { ...c, decided: true };
    try { localStorage.setItem(KEY, JSON.stringify(full)); } catch { /* storage unavailable */ }
    apply(full);
    setShow(false);
  };

  if (!show) return null;
  return (
    <div className="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-h">
      <p id="cookie-h" className="cookie-h">Cookies on this site</p>
      <p>
        We use essential cookies to run the site and, with your permission, analytics cookies to understand which pages help people.
        See our <Link href="/cookies/">Cookie Policy</Link>.
      </p>
      {custom && (
        <div className="cookie-opts">
          <label><input type="checkbox" checked disabled /> Essential (always on)</label>
          <label><input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} /> Analytics</label>
          <label><input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} /> Marketing</label>
        </div>
      )}
      <div className="cookie-actions">
        <button className="btn btn-primary" onClick={() => save({ analytics: true, marketing: true })}>Accept all</button>
        <button className="btn btn-outline" onClick={() => save({ analytics: false, marketing: false })}>Reject non-essential</button>
        {custom ? (
          <button className="btn btn-link" onClick={() => save({ analytics, marketing })}>Save choices</button>
        ) : (
          <button className="btn btn-link" onClick={() => setCustom(true)}>Customise</button>
        )}
      </div>
    </div>
  );
}

export function CookieSettingsLink() {
  return (
    <button type="button" className="linklike" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Cookie settings
    </button>
  );
}
