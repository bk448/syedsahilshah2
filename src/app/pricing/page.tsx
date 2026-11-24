import Link from "next/link";
import { addOns, pricing } from "@/data/content";
import { CtaBand, PageHero } from "@/components/Blocks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMeta, withFirm } from "@/lib/seo";

export const metadata = pageMeta({
  title: withFirm("Pricing — Fixed Fees for US Expat Tax"),
  description: "Transparent fixed-fee pricing for US expat tax returns, FBARs, Streamlined catch-up filing and foreign company reporting.",
  path: "/pricing/",
});

export default function Pricing() {
  return (
    <>
      <div className="wrap"><Breadcrumbs items={[{ label: "Pricing" }]} /></div>
      <PageHero art="chart" eyebrow="Pricing" title="Fixed fees, agreed before we start" lead="Prices are in US dollars and are starting points — your quote is confirmed after a short fit call. Sample pricing for the demo." />
      <div className="wrap section-tight">
        <ul className="price-grid reveal-stagger">
          {pricing.map((p) => (
            <li key={p.name} className={p.featured ? "price featured" : "price"}>
              {p.featured && <span className="badge">Most popular</span>}
              <h2>{p.name}</h2>
              <p className="price-v">{p.price}</p>
              <p className="muted">{p.desc}</p>
              <ul className="ticks">{p.includes.map((i) => <li key={i}>{i}</li>)}</ul>
              <Link className={p.featured ? "btn btn-primary btn-block" : "btn btn-outline btn-block"} href="/contact/request-a-quote/" data-cta="quote">Request a Quote</Link>
            </li>
          ))}
        </ul>
        <section className="block">
          <h2>Add-ons</h2>
          <table className="table">
            <thead><tr><th scope="col">Item</th><th scope="col">Fee</th></tr></thead>
            <tbody>{addOns.map(([a, b]) => <tr key={a}><td>{a}</td><td>{b}</td></tr>)}</tbody>
          </table>
        </section>
      </div>
      <CtaBand title="Want an exact number?" text="Tell us your situation and we'll send a fixed quote within one business day." primary={{ href: "/contact/request-a-quote/", label: "Request a Quote" }} secondary={null} />
    </>
  );
}
