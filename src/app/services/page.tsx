import { serviceThemes, servicesByTheme } from "@/data/services";
import { CtaBand, LinkCards, PageHero } from "@/components/Blocks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon, themeIcon } from "@/components/Icons";
import { serviceCover } from "@/components/CardCover";
import { pageMeta, withFirm } from "@/lib/seo";

export const metadata = pageMeta({
  title: withFirm("US Expat Tax Services"),
  description: "All US expat tax services grouped by need: annual compliance, catch-up and amnesty, double taxation, foreign assets, business entities, trusts and life changes.",
  path: "/services/",
});

export default function ServicesHub() {
  return (
    <>
      <div className="wrap"><Breadcrumbs items={[{ label: "Services" }]} /></div>
      <PageHero art="shield" eyebrow="Services" title="US expat tax services" lead="Everything we do, grouped by what you need. Each service lists the forms it covers and who it's for.">
        <nav aria-label="Service themes" className="jump">
          {serviceThemes.map((t) => <a key={t.slug} href={`#${t.slug}`}><Icon name={themeIcon[t.slug]} size={16} />{t.name}</a>)}
        </nav>
      </PageHero>
      <div className="wrap section-tight">
        {serviceThemes.map((t) => (
          <section key={t.slug} id={t.slug} className="block theme-block">
            <h2 className="h-icon"><span className="h-icon-badge"><Icon name={themeIcon[t.slug]} /></span>{t.name}</h2>
            <p className="muted">{t.intro}</p>
            <LinkCards items={servicesByTheme(t.slug).map((s) => ({ href: `/services/${s.slug}/`, title: s.name, text: s.summary, tag: s.priceFrom ? `From ${s.priceFrom}` : undefined, cover: serviceCover(s) }))} />
          </section>
        ))}
      </div>
      <CtaBand />
    </>
  );
}
