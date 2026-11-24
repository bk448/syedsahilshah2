import { countries } from "@/data/countries";
import { CtaBand, LinkCards, PageHero } from "@/components/Blocks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { countryCover } from "@/components/CardCover";
import { pageMeta, withFirm } from "@/lib/seo";

export const metadata = pageMeta({
  title: withFirm("US Taxes by Country — Guides for Americans Abroad"),
  description: "Country-by-country US tax guides for Americans abroad: treaty position, local pensions, filing deadlines and PFIC traps.",
  path: "/countries/",
});

export default function CountriesHub() {
  const regions = Array.from(new Set(countries.map((c) => c.region)));
  return (
    <>
      <div className="wrap"><Breadcrumbs items={[{ label: "Countries" }]} /></div>
      <PageHero art="globe" eyebrow="Country guides" title="US taxes, country by country" lead="How the US treats your local pension, which deadlines overlap, and the investment traps specific to where you live." />
      <div className="wrap section-tight">
        {regions.map((r) => (
          <section key={r} className="block">
            <h2>{r}</h2>
            <LinkCards
              cols={4}
              items={countries.filter((c) => c.region === r).map((c) => ({
                href: `/countries/${c.slug}/`,
                title: c.name,
                text: `${c.treaty.inForce ? "Treaty" : "No treaty"} · ${c.totalization ? "Totalization" : "No totalization"}`,
                cover: countryCover(c.slug),
              }))}
            />
          </section>
        ))}
      </div>
      <CtaBand />
    </>
  );
}
