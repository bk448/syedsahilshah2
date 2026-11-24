import { NextResponse } from "next/server";

// Lead intake for Book a Consultation / Request a Quote / Contact.
// Validates, drops bots, rate-limits per IP (in-memory, per instance), then forwards to LEAD_WEBHOOK_URL (CRM, Zapier, Make…).

const KINDS = new Set(["book", "quote", "contact"]);
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const str = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    return NextResponse.json({ errors: { form: "Too many requests. Please try again in a few minutes or email us." } }, { status: 429 });
  }
  hits.set(ip, [...recent, now]);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ errors: { form: "Invalid request." } }, { status: 400 });
  }

  // Honeypot filled → pretend success, store nothing.
  if (str(body.company_website)) return NextResponse.json({ ok: true });

  const kind = str(body.kind, 10);
  const lead = {
    kind,
    name: str(body.name, 120),
    email: str(body.email, 160),
    phone: str(body.phone, 40),
    country: str(body.country, 80),
    situation: str(body.situation, 80),
    urgency: str(body.urgency, 80),
    service_area: str(body.service_area, 80),
    years_behind: str(body.years_behind, 20),
    timezone: str(body.timezone, 80),
    preferred_date: str(body.preferred_date, 20),
    preferred_time: str(body.preferred_time, 40),
    message: str(body.message, 2000),
    marketing_opt_in: body.marketing === "yes",
    consent: body.consent === "yes",
    page: str(body.page, 200),
    submitted_at: new Date().toISOString(),
  };

  const errors: Record<string, string> = {};
  if (!KINDS.has(kind)) errors.form = "Unknown form.";
  if (lead.name.length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) errors.email = "Please enter a valid email address.";
  if (!lead.country) errors.country = "Please choose a country.";
  if (!lead.situation) errors.situation = "Please choose the option closest to your situation.";
  if (kind === "quote" && !lead.urgency) errors.urgency = "Please tell us how urgent this is.";
  if (kind === "book" && !lead.timezone) errors.timezone = "Please confirm your time zone.";
  if (kind === "contact" && lead.message.length < 5) errors.message = "Please add a short message.";
  if (!lead.consent) errors.consent = "Please agree to the Privacy Policy so we can respond.";
  // Discourage sensitive data on marketing forms.
  if (/\b\d{3}-\d{2}-\d{4}\b/.test(lead.message)) errors.message = "Please remove any Social Security number — we'll collect sensitive details securely later.";

  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 422 });

  const hook = process.env.LEAD_WEBHOOK_URL;
  if (hook) {
    try {
      const r = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) });
      if (!r.ok) throw new Error(`Webhook ${r.status}`);
    } catch (e) {
      console.error("Lead webhook failed", e);
      return NextResponse.json({ errors: { form: "We couldn't save your request. Please email us directly." } }, { status: 502 });
    }
  } else {
    console.info("[lead]", JSON.stringify(lead));
  }

  return NextResponse.json({ ok: true });
}
