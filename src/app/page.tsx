import { Fragment } from "react";
import Link from "next/link";
import { divisions } from "@/data/divisions";
import { getService } from "@/data/services";
import { countries } from "@/data/countries";
import { site } from "@/data/site";
import { CtaBand, LinkCards } from "@/components/Blocks";
import { GlobeArt, HeroDecor } from "@/components/Art";
import { CountUp } from "@/components/Motion";
import { Icon, divisionIcon } from "@/components/Icons";
import { CardCover, divisionCover, serviceCover, countryCover } from "@/components/CardCover";
import { SplitText } from "@/components/SplitText";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: `US Expat Tax Services for Americans Abroad | ${site.name}`,
  description: "US tax returns, FBAR, FATCA and Streamlined catch-up filing for Americans living abroad. Fixed fees, credentialed preparers, clients in 60+ countries.",
  path: "/",
});

const topServiceSlugs = ["us-expat-tax-return", "fbar-filing", "streamlined-filing-procedures", "pfic-reporting", "foreign-corporation-reporting", "expatriation-renunciation"];

const steps = [
  { icon: "clock", t: "Free fit call", d: "15 minutes to understand where you live, what you own and what you've filed." },
  { icon: "doc", t: "Fixed-fee quote", d: "A written quote and engagement letter before any work starts." },
  { icon: "lock", t: "Secure upload", d: "Documents go through the encrypted Client Portal — never email." },
  { icon: "check", t: "Prepared & filed", d: "A credentialed preparer prepares, reviews and e-files. You approve first." },
];

const testimonials = [
  { quote: "Twelve years of not knowing I had to file, sorted in six weeks with no penalty.", who: "Placeholder client, Lyon" },
  { quote: "They found the PFIC problem in my ISA before it got expensive.", who: "Placeholder client, London" },
  { quote: "Finally an accountant who understands both my Australian super and my US return.", who: "Placeholder client, Melbourne" },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <span className="blob b1" aria-hidden="true" />
        <span className="blob b2" aria-hidden="true" />
        <span className="hero-grid-bg" aria-hidden="true" />
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow anim-up">US tax compliance for Americans abroad</p>
            <h1 className="split hero-h1">
              <span className="sr-only">Live anywhere. File with confidence.</span>
              <span aria-hidden="true">
                {["Live", "anywhere."].map((w, i) => <Fragment key={w}><span className="w" style={{ ["--w" as string]: i }}><span className="wi">{w}</span></span>{" "}</Fragment>)}
                <br />
                {["File", "with", "confidence."].map((w, i) => <Fragment key={w}><span className="w" style={{ ["--w" as string]: i + 2 }}><span className="wi h1-accent">{w}</span></span>{" "}</Fragment>)}
              </span>
            </h1>
            <p className="lead anim-up d2">
              Expat returns, FBARs, Streamlined catch-up filing and foreign company reporting — prepared by credentialed specialists who only do cross-border US tax.
            </p>
            <div className="hero-ctas anim-up d3">
              <Link href="/contact/book-a-consultation/" className="btn btn-primary btn-lg btn-shine" data-cta="book">Book a Consultation</Link>
              <Link href="/contact/request-a-quote/" className="btn btn-ghost-light btn-lg" data-cta="quote">Request a Quote</Link>
            </div>
            <ul className="trust-row anim-up d4" aria-label="Credentials">
              {site.credentials.map((c) => <li key={c}><Icon name="check" size={16} /> {c}</li>)}
            </ul>
          </div>

          <div className="hero-visual">
            <GlobeArt />
            <div className="float-chip glass chip-a" aria-hidden="true">
              <span className="chip-ic ok"><Icon name="check" size={16} /></span>
              <span><strong>FBAR filed</strong><small>Confirmation received</small></span>
            </div>
            <div className="float-chip glass chip-b" aria-hidden="true">
              <span className="chip-ic gold"><Icon name="shield" size={16} /></span>
              <span><strong>Streamlined (SFOP)</strong><small>No penalty abroad</small></span>
            </div>
            <div className="hero-panel glass anim-up d3" aria-label="Find your situation">
              <p className="panel-h">Start with your situation</p>
              <ul>
                {divisions.map((d) => (
                  <li key={d.slug}>
                    <Link href={`/divisions/${d.slug}/`}>
                      <span className="panel-ic"><Icon name={divisionIcon[d.slug]} size={18} /></span>
                      <span className="panel-label">{d.name}</span>
                      <span aria-hidden className="panel-arrow">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="stats" aria-label="At a glance">
        <div className="wrap stats-grid reveal-stagger">
          {site.stats.map((s) => (
            <div key={s.label} className="stat glass-light">
              <p className="stat-v"><CountUp value={s.value} /></p>
              <p className="stat-l">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <SplitText text="Browse by who you are" />
            <Link href="/divisions/">All situations →</Link>
          </div>
          <LinkCards items={divisions.map((d) => ({ href: `/divisions/${d.slug}/`, title: d.name, text: d.short, cover: divisionCover(d.slug) }))} />
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <div className="section-head">
            <SplitText text="Or by what you need" />
            <Link href="/services/">All services →</Link>
          </div>
          <LinkCards
            items={topServiceSlugs.map((s) => getService(s)!).map((s) => ({ href: `/services/${s.slug}/`, title: s.name, text: s.summary, tag: s.priceFrom ? `From ${s.priceFrom}` : undefined, cover: serviceCover(s) }))}
          />
        </div>
      </section>

      <section className="section process-section">
        <HeroDecor kind="shield" />
        <div className="wrap">
          <div className="section-head"><SplitText text="How it works" /></div>
          <ol className="process reveal-stagger">
            {steps.map((s, i) => (
              <li key={s.t} className="glass-light">
                <span className="process-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="process-ic"><Icon name={s.icon} size={22} /></span>
                <p className="process-t">{s.t}</p>
                <p className="muted">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap two-col">
          <div className="reveal feature-card has-cover">
            <CardCover cover={{ kind: "icon", icon: "doc", tone: "navy", seed: "forms-library" }} />
            <SplitText text="A forms library that actually explains things" />
            <p>Every major expat form — who files it, when, the threshold, and what the penalty is — in plain language, linked to the service that handles it.</p>
            <p><Link className="btn btn-outline" href="/forms/">Open the forms library</Link></p>
          </div>
          <div className="reveal feature-card has-cover">
            <span className="cover-mosaic" aria-hidden="true">
              {["uk", "canada", "germany", "japan"].map((c) => <CardCover key={c} cover={countryCover(c)} />)}
            </span>
            <SplitText text="Guides for 16 countries" />
            <p>Treaty position, local pensions, deadlines and PFIC traps for the countries where most of our clients live.</p>
            <ul className="pill-list">
              {countries.map((c) => <li key={c.slug}><Link href={`/countries/${c.slug}/`}>{c.name}</Link></li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section testimonials" aria-labelledby="t-h">
        <span className="blob b1" aria-hidden="true" />
        <div className="wrap">
          <SplitText id="t-h" text="What clients say" />
          <ul className="quotes reveal-stagger">
            {testimonials.map((t) => (
              <li key={t.who} className="glass-dark">
                <span className="stars" aria-label="5 out of 5">★★★★★</span>
                <blockquote>“{t.quote}”</blockquote>
                <p className="quote-who">— {t.who}</p>
              </li>
            ))}
          </ul>
          <p className="fine light">Sample testimonials for the demo. Replace with verified client reviews before launch.</p>
        </div>
      </section>

      <CtaBand
        title="Get a fixed-fee quote in one business day"
        text="Tell us where you live and what's going on. We'll come back with exactly what you need to file and what it costs."
        primary={{ href: "/contact/request-a-quote/", label: "Request a Quote" }}
        secondary={{ href: "/contact/book-a-consultation/", label: "Book a Consultation" }}
      />
    </>
  );
}
