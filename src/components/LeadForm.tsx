"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { divisions } from "@/data/divisions";
import { countries } from "@/data/countries";
import { serviceThemes } from "@/data/services";
import { track } from "./CookieConsent";

type Kind = "book" | "quote" | "contact";

const thankYou: Record<Kind, string> = {
  book: "/contact/book-a-consultation/thank-you/",
  quote: "/contact/request-a-quote/thank-you/",
  contact: "/contact/thank-you/",
};

export function LeadForm({ kind, defaultSituation = "", defaultCountry = "" }: { kind: Kind; defaultSituation?: string; defaultCountry?: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tz, setTz] = useState("");
  const [country, setCountry] = useState(defaultCountry);
  const [situation, setSituation] = useState(defaultSituation);

  useEffect(() => {
    try { setTz(Intl.DateTimeFormat().resolvedOptions().timeZone); } catch { /* ignore */ }
    // Pre-fill from links like /contact/book-a-consultation/?country=Japan&situation=Private%20Client
    const sp = new URLSearchParams(window.location.search);
    const c = sp.get("country");
    const s = sp.get("situation");
    if (c && (countries.some((x) => x.name === c) || c === "Other")) setCountry(c);
    if (s && divisions.some((x) => x.name === s)) setSituation(s);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrors({});
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, kind, page: window.location.pathname }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrors(json.errors || { form: "Something went wrong. Please try again or email us." });
        setStatus("error");
        return;
      }
      track(kind === "book" ? "consultation_booked" : "generate_lead", { form: kind });
      router.push(thankYou[kind]);
    } catch {
      setErrors({ form: "We couldn't send your request. Please check your connection and try again." });
      setStatus("error");
    }
  }

  const err = (k: string) => errors[k] ? <span className="field-err" id={`${k}-err`}>{errors[k]}</span> : null;
  const aria = (k: string) => (errors[k] ? { "aria-invalid": true, "aria-describedby": `${k}-err` } : {});

  return (
    <form className="lead-form" onSubmit={onSubmit} noValidate>
      <div aria-live="polite" className="form-status">
        {errors.form && <p className="alert">{errors.form}</p>}
        {Object.keys(errors).length > 0 && !errors.form && <p className="alert">Please fix the highlighted fields.</p>}
      </div>

      {/* Honeypot: hidden from people, tempting to bots */}
      <div className="hp" aria-hidden="true">
        <label>Company website<input name="company_website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="grid-2">
        <label className="field">
          <span>Full name <abbr title="required">*</abbr></span>
          <input name="name" required autoComplete="name" maxLength={120} {...aria("name")} />
          {err("name")}
        </label>
        <label className="field">
          <span>Email <abbr title="required">*</abbr></span>
          <input name="email" type="email" required autoComplete="email" maxLength={160} {...aria("email")} />
          {err("email")}
        </label>
        <label className="field">
          <span>Phone / WhatsApp <small>(optional, include country code)</small></span>
          <input name="phone" type="tel" autoComplete="tel" maxLength={40} />
        </label>
        <label className="field">
          <span>Country you live in <abbr title="required">*</abbr></span>
          <select name="country" required value={country} onChange={(e) => setCountry(e.target.value)} {...aria("country")}>
            <option value="" disabled>Select…</option>
            {countries.map((c) => <option key={c.slug} value={c.name}>{c.name}</option>)}
            <option value="United States">United States</option>
            <option value="Other">Other</option>
          </select>
          {err("country")}
        </label>
        <label className="field">
          <span>Your situation <abbr title="required">*</abbr></span>
          <select name="situation" required value={situation} onChange={(e) => setSituation(e.target.value)} {...aria("situation")}>
            <option value="" disabled>Select…</option>
            {divisions.map((d) => <option key={d.slug} value={d.name}>{d.name}</option>)}
            <option value="Existing client">I'm an existing client</option>
            <option value="Not sure">Not sure</option>
          </select>
          {err("situation")}
        </label>

        {kind === "quote" && (
          <>
            <label className="field">
              <span>How urgent is this? <abbr title="required">*</abbr></span>
              <select name="urgency" required defaultValue="" {...aria("urgency")}>
                <option value="" disabled>Select…</option>
                <option>I've received an IRS notice</option>
                <option>Deadline within 30 days</option>
                <option>This tax season</option>
                <option>Just planning ahead</option>
              </select>
              {err("urgency")}
            </label>
            <label className="field">
              <span>Main area you need help with</span>
              <select name="service_area" defaultValue="">
                <option value="">Not sure</option>
                {serviceThemes.map((t) => <option key={t.slug}>{t.name}</option>)}
              </select>
            </label>
            <label className="field">
              <span>Years behind on filing</span>
              <select name="years_behind" defaultValue="0">
                <option value="0">I'm up to date</option>
                <option value="1-2">1–2 years</option>
                <option value="3+">3 or more years</option>
                <option value="never">Never filed</option>
              </select>
            </label>
          </>
        )}

        {kind === "book" && (
          <>
            <label className="field">
              <span>Your time zone <abbr title="required">*</abbr></span>
              <input name="timezone" required value={tz} onChange={(e) => setTz(e.target.value)} {...aria("timezone")} />
              {err("timezone")}
            </label>
            <label className="field">
              <span>Preferred date</span>
              <input name="preferred_date" type="date" min={new Date().toISOString().slice(0, 10)} />
            </label>
            <label className="field">
              <span>Preferred time (your local time)</span>
              <select name="preferred_time" defaultValue="Any">
                <option>Any</option>
                <option>Morning (8–12)</option>
                <option>Afternoon (12–17)</option>
                <option>Evening (17–20)</option>
              </select>
            </label>
          </>
        )}
      </div>

      <label className="field">
        <span>{kind === "contact" ? "Your message" : "Anything we should know?"} {kind === "contact" && <abbr title="required">*</abbr>}</span>
        <textarea name="message" rows={4} maxLength={2000} required={kind === "contact"} placeholder="Please don't include account numbers, SSNs or tax documents — we'll collect those securely later." {...aria("message")} />
        {err("message")}
      </label>

      <label className="check">
        <input type="checkbox" name="consent" value="yes" required {...aria("consent")} />
        <span>I agree to {""}
          <Link href="/privacy/" target="_blank">the Privacy Policy</Link> and to being contacted about this request. <abbr title="required">*</abbr></span>
      </label>
      {err("consent")}
      <label className="check">
        <input type="checkbox" name="marketing" value="yes" />
        <span>Send me occasional deadline reminders (optional, unsubscribe any time).</span>
      </label>

      <button className="btn btn-primary btn-lg" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : kind === "book" ? "Request consultation" : kind === "quote" ? "Get my quote" : "Send message"}
      </button>
      <p className="form-note">We reply within one business day. Your details are used only to respond to this request.</p>
    </form>
  );
}
