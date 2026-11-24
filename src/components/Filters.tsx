"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CardCover, postCover } from "./CardCover";

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

/* ── Forms hub: search by form number or name ─────────────────────── */
export function FormsSearch({
  groups,
}: {
  groups: { slug: string; name: string; forms: { slug: string; number: string; name: string }[] }[];
}) {
  const [q, setQ] = useState("");
  const nq = norm(q);
  const filtered = groups
    .map((g) => ({ ...g, forms: g.forms.filter((f) => !nq || norm(f.number).includes(nq) || norm(f.name).includes(nq) || norm(f.slug).includes(nq)) }))
    .filter((g) => g.forms.length);
  const count = filtered.reduce((n, g) => n + g.forms.length, 0);

  return (
    <>
      <div className="search-bar">
        <label htmlFor="form-q" className="sr-only">Search forms</label>
        <input id="form-q" type="search" placeholder="Search by form number or name, e.g. 8621 or FBAR" value={q} onChange={(e) => setQ(e.target.value)} />
        <span className="muted" aria-live="polite">{count} form{count === 1 ? "" : "s"}</span>
      </div>
      {filtered.length === 0 && (
        <p className="empty">No forms match “{q}”. Try a number like 5471, or <Link href="/contact/">ask us</Link>.</p>
      )}
      {filtered.map((g) => (
        <section key={g.slug} id={g.slug} className="block">
          <h2>{g.name}</h2>
          <ul className="form-list">
            {g.forms.map((f) => (
              <li key={f.slug}>
                <Link href={`/forms/${f.slug}/`}>
                  <span className="form-num">{f.number}</span>
                  <span className="form-name">{f.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}

/* ── FAQs: searchable + categorised ───────────────────────────────── */
type FaqItem = { q: string; a: string; links?: { href: string; label: string }[] };
export function FaqSearch({ cats }: { cats: { slug: string; name: string; items: FaqItem[] }[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const lq = q.toLowerCase();
  const list = cats
    .filter((c) => cat === "all" || c.slug === cat)
    .map((c) => ({ ...c, items: c.items.filter((i) => !lq || i.q.toLowerCase().includes(lq) || i.a.toLowerCase().includes(lq)) }))
    .filter((c) => c.items.length);

  return (
    <>
      <div className="search-bar">
        <label htmlFor="faq-q" className="sr-only">Search FAQs</label>
        <input id="faq-q" type="search" placeholder="Search questions…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="chips" role="group" aria-label="Filter by category">
        <button className={cat === "all" ? "chip on" : "chip"} aria-pressed={cat === "all"} onClick={() => setCat("all")}>All</button>
        {cats.map((c) => (
          <button key={c.slug} className={cat === c.slug ? "chip on" : "chip"} aria-pressed={cat === c.slug} onClick={() => setCat(c.slug)}>{c.name}</button>
        ))}
      </div>
      {list.length === 0 && <p className="empty">No questions match. <Link href="/contact/">Ask us directly</Link>.</p>}
      {list.map((c) => (
        <section key={c.slug} className="block">
          <h2>{c.name}</h2>
          <div className="faq">
            {c.items.map((i) => (
              <details key={i.q}>
                <summary>{i.q}</summary>
                <p>{i.a}</p>
                {i.links && (
                  <p className="faq-links">
                    {i.links.map((l) => <Link key={l.href} href={l.href}>{l.label} →</Link>)}
                  </p>
                )}
              </details>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

/* ── Deadlines calendar: filter by country + situation ───────────── */
type DL = { date: string; title: string; detail: string; situations: string[]; countries: string[]; link?: string };
export function DeadlinesFilter({
  items, countries, situations,
}: {
  items: DL[];
  countries: { slug: string; name: string }[];
  situations: { slug: string; name: string }[];
}) {
  const [country, setCountry] = useState("all");
  const [situation, setSituation] = useState("all");
  const [showPast, setShowPast] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  const list = useMemo(
    () =>
      items
        .filter((d) => showPast || d.date >= today)
        .filter((d) => country === "all" || d.countries.includes("all") || d.countries.includes(country))
        .filter((d) => situation === "all" || d.situations.includes("all") || d.situations.includes(situation))
        .sort((a, b) => a.date.localeCompare(b.date)),
    [items, country, situation, showPast, today],
  );

  const ics = (d: DL) => {
    const dt = d.date.replace(/-/g, "");
    const body = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//ExpatTax//Deadlines//EN", "BEGIN:VEVENT",
      `UID:${dt}-${norm(d.title)}@expat-tax`, `DTSTART;VALUE=DATE:${dt}`, `SUMMARY:${d.title}`,
      `DESCRIPTION:${d.detail.replace(/[,;]/g, " ")}`, "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    return `data:text/calendar;charset=utf-8,${encodeURIComponent(body)}`;
  };

  const fmt = (iso: string) => new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

  return (
    <>
      <div className="filters">
        <label className="field">
          <span>Country</span>
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="all">All countries</option>
            {countries.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </label>
        <label className="field">
          <span>Situation</span>
          <select value={situation} onChange={(e) => setSituation(e.target.value)}>
            <option value="all">All situations</option>
            {situations.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
          </select>
        </label>
        <label className="check inline">
          <input type="checkbox" checked={showPast} onChange={(e) => setShowPast(e.target.checked)} /> <span>Show past dates</span>
        </label>
      </div>
      <p className="muted" aria-live="polite">{list.length} deadline{list.length === 1 ? "" : "s"}</p>
      {list.length === 0 && <p className="empty">No upcoming deadlines for this filter.</p>}
      <ol className="timeline">
        {list.map((d) => (
          <li key={d.date + d.title} className={d.countries.includes("all") ? "us" : "local"}>
            <time dateTime={d.date}>{fmt(d.date)}</time>
            <div>
              <p className="tl-title">{d.title} {!d.countries.includes("all") && <span className="badge">Local</span>}</p>
              <p>{d.detail}</p>
              <p className="tl-links">
                {d.link && <Link href={d.link}>Details →</Link>}
                <a href={ics(d)} download={`${norm(d.title)}.ics`}>Add to calendar</a>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

/* ── Blog list: filter by tag ─────────────────────────────────────── */
export function BlogList({ posts }: { posts: { slug: string; title: string; excerpt: string; date: string; tags: string[] }[] }) {
  const tags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();
  const [tag, setTag] = useState("all");
  const list = posts.filter((p) => tag === "all" || p.tags.includes(tag));
  return (
    <>
      <div className="chips" role="group" aria-label="Filter by tag">
        <button className={tag === "all" ? "chip on" : "chip"} aria-pressed={tag === "all"} onClick={() => setTag("all")}>All</button>
        {tags.map((t) => <button key={t} className={tag === t ? "chip on" : "chip"} aria-pressed={tag === t} onClick={() => setTag(t)}>{t}</button>)}
      </div>
      <ul className="cards cols-3">
        {list.map((p) => (
          <li key={p.slug}>
            <Link className="card has-cover" href={`/resources/${p.slug}/`}>
              <CardCover cover={postCover(p)} />
              <span className="card-tag">{new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
              <span className="card-title">{p.title}</span>
              <span className="card-text">{p.excerpt}</span>
              <span className="card-arrow" aria-hidden>→</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
