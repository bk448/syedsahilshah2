import Link from "next/link";
import { site } from "@/data/site";
import { CtaBand, PageHero } from "@/components/Blocks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { pageMeta, withFirm } from "@/lib/seo";

export const metadata = pageMeta({
  title: withFirm("About Us — US Expat Tax Specialists"),
  description: `Meet the team behind ${site.name}: credentialed US tax specialists who work only with Americans living abroad.`,
  path: "/about/",
});

const team = [
  { name: "Placeholder Name", role: "Founder, CPA", bio: "Fifteen years in cross-border tax; previously international tax at a Big Four firm." },
  { name: "Placeholder Name", role: "Senior Preparer, EA", bio: "Specialises in Streamlined filings and PFIC elections for clients in Europe." },
  { name: "Placeholder Name", role: "Business Tax Lead, CPA", bio: "Leads Form 5471, 8865 and tested-income work for owner-managed companies." },
  { name: "Placeholder Name", role: "Client Manager", bio: "First point of contact for new clients across Asia-Pacific time zones." },
];

export default function About() {
  return (
    <>
      <div className="wrap"><Breadcrumbs items={[{ label: "About Us" }]} /></div>
      <PageHero art="people" eyebrow="About us" title="We only do one thing: US tax for Americans abroad" lead="Specialists, not generalists — so the forms most firms find unusual are the ones we file every day." />
      <div className="wrap prose-wrap">
        <section className="block">
          <h2>Our story</h2>
          <p>{site.name} was founded by preparers who kept meeting Americans abroad who had been badly served — told they didn't need to file, or charged for returns that missed FBARs and PFICs entirely. We built a firm around getting the cross-border pieces right first time, at a fixed price.</p>
          <p className="fine">Placeholder copy for the demo — replace with the firm's own story.</p>
        </section>
        <section className="block">
          <h2>Credentials</h2>
          <ul className="ticks">{site.credentials.map((c) => <li key={c}>{c}</li>)}</ul>
        </section>
        <section className="block">
          <h2>The team</h2>
          <ul className="team reveal-stagger">
            {team.map((t, i) => (
              <li key={i}>
                <div className="avatar" aria-hidden>{t.role.slice(0, 1)}</div>
                <p className="team-name">{t.name}</p>
                <p className="team-role">{t.role}</p>
                <p>{t.bio}</p>
              </li>
            ))}
          </ul>
        </section>
        <p><Link href="/contact/">Get in touch →</Link></p>
      </div>
      <CtaBand />
    </>
  );
}
