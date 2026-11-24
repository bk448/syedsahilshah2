"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { divisions } from "@/data/divisions";
import { serviceThemes, servicesByTheme } from "@/data/services";
import { formThemes, formsByTheme } from "@/data/forms";
import { countries } from "@/data/countries";
import { site } from "@/data/site";

type Col = { heading?: string; links: { href: string; label: string }[] };
type Menu = { key: string; label: string; href: string; cols: Col[]; wide?: boolean };

const menus: Menu[] = [
  {
    key: "divisions", label: "Who we help", href: "/divisions/",
    cols: [{ links: divisions.map((d) => ({ href: `/divisions/${d.slug}/`, label: d.name })) }],
  },
  {
    key: "services", label: "Services", href: "/services/", wide: true,
    cols: serviceThemes.map((t) => ({
      heading: t.name,
      links: servicesByTheme(t.slug).map((s) => ({ href: `/services/${s.slug}/`, label: s.name.replace(/ \(.*\)$/, "") })),
    })),
  },
  {
    key: "forms", label: "Forms", href: "/forms/", wide: true,
    cols: formThemes.map((t) => ({
      heading: t.name,
      links: formsByTheme(t.slug).map((f) => ({ href: `/forms/${f.slug}/`, label: f.number })),
    })),
  },
  {
    key: "countries", label: "Countries", href: "/countries/",
    cols: [
      { links: countries.slice(0, 8).map((c) => ({ href: `/countries/${c.slug}/`, label: c.name })) },
      { links: countries.slice(8).map((c) => ({ href: `/countries/${c.slug}/`, label: c.name })) },
    ],
  },
  {
    key: "resources", label: "Resources", href: "/resources/",
    cols: [{ links: [
      { href: "/resources/", label: "Blog & guides" },
      { href: "/resources/deadlines/", label: "Deadlines calendar" },
      { href: "/faqs/", label: "FAQs" },
      { href: "/pricing/", label: "Pricing" },
      { href: "/about/", label: "About us" },
    ] }],
  },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenKey(null);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenKey(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="topbar">
        <div className="wrap topbar-inner">
          <span>{site.tagline}</span>
          <span className="topbar-links">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.clientPortalUrl} target="_blank" rel="noopener noreferrer">Client Portal ↗</a>
          </span>
        </div>
      </div>
      <div className="wrap nav-row">
        <Link href="/" className="logo" aria-label={`${site.name} home`}>
          <span className="logo-mark" aria-hidden>N</span>
          <span className="logo-text">{site.name}</span>
        </Link>

        <button
          className="menu-toggle"
          aria-expanded={mobileOpen}
          aria-controls="primary-nav"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span aria-hidden className="burger" />
        </button>

        <nav id="primary-nav" aria-label="Primary" className={`primary-nav ${mobileOpen ? "is-open" : ""}`}>
          <ul className="nav-list">
            {menus.map((m) => {
              const isOpen = openKey === m.key;
              const active = pathname.startsWith(m.href) && m.href !== "/";
              return (
                <li
                  key={m.key}
                  className={`nav-item ${isOpen ? "is-open" : ""} ${active ? "is-active" : ""}`}
                  onMouseEnter={() => window.matchMedia("(min-width: 1024px)").matches && setOpenKey(m.key)}
                  onMouseLeave={() => window.matchMedia("(min-width: 1024px)").matches && setOpenKey(null)}
                >
                  <button
                    className="nav-trigger"
                    aria-expanded={isOpen}
                    aria-controls={`menu-${m.key}`}
                    onClick={() => setOpenKey(isOpen ? null : m.key)}
                  >
                    {m.label}
                    <span aria-hidden className="chev">▾</span>
                  </button>
                  <div id={`menu-${m.key}`} className={`dropdown ${m.wide ? "dropdown-wide" : ""}`}>
                    <div className="dropdown-cols">
                      {m.cols.map((c, i) => (
                        <div key={i} className="dropdown-col">
                          {c.heading && <p className="dropdown-h">{c.heading}</p>}
                          <ul>
                            {c.links.map((l) => (
                              <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <Link href={m.href} className="dropdown-all">View all {m.label.toLowerCase()} →</Link>
                  </div>
                </li>
              );
            })}
            <li className="nav-item"><Link className="nav-trigger" href="/contact/">Contact</Link></li>
          </ul>
          <div className="nav-ctas">
            <Link href="/contact/request-a-quote/" className="btn btn-outline" data-cta="quote">Request a Quote</Link>
            <Link href="/contact/book-a-consultation/" className="btn btn-primary" data-cta="book">Book a Consultation</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
