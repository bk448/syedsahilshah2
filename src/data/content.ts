import type { Deadline, FAQ, Post } from "./types";

export const faqCategories: { slug: string; name: string; items: (FAQ & { links?: { href: string; label: string }[] })[] }[] = [
  {
    slug: "getting-started", name: "Getting started",
    items: [
      { q: "Do I really need to file US taxes if I live abroad?", a: "Yes. The US taxes citizens and green card holders on worldwide income wherever they live. Most expats owe little or nothing, but the return and related reports are still required.", links: [{ href: "/services/us-expat-tax-return/", label: "US Expat Tax Return" }] },
      { q: "How do I know which services I need?", a: "Start from your situation in Divisions, or book a free 15-minute fit call and we'll tell you exactly what applies.", links: [{ href: "/contact/book-a-consultation/", label: "Book a consultation" }] },
      { q: "How do I send you documents securely?", a: "Through the Client Portal once you are engaged. Please don't email tax documents or send them through the website forms." },
    ],
  },
  {
    slug: "deadlines", name: "Deadlines & extensions",
    items: [
      { q: "When is my return due if I live abroad?", a: "April 15, with an automatic extension to June 15 for taxpayers abroad, and to October 15 with Form 4868.", links: [{ href: "/forms/4868/", label: "Form 4868" }, { href: "/resources/deadlines/", label: "Deadlines calendar" }] },
      { q: "When is the FBAR due?", a: "April 15, with an automatic extension to October 15.", links: [{ href: "/forms/fincen-114/", label: "FinCEN 114" }] },
    ],
  },
  {
    slug: "catching-up", name: "Catching up",
    items: [
      { q: "I've never filed. Am I in trouble?", a: "If your failure was non-wilful, the Streamlined Foreign Offshore Procedures let you catch up with three years of returns and six years of FBARs, with no penalty if you meet the residency test.", links: [{ href: "/services/streamlined-filing-procedures/", label: "Streamlined Filing" }] },
      { q: "What's the difference between SFOP and SDOP?", a: "SFOP is for people living abroad and carries no offshore penalty. SDOP is for US residents and carries a 5% penalty.", links: [{ href: "/forms/14653/", label: "Form 14653" }, { href: "/forms/14654/", label: "Form 14654" }] },
    ],
  },
  {
    slug: "investments", name: "Investments & pensions",
    items: [
      { q: "Why do you keep warning about PFICs?", a: "Non-US mutual funds and ETFs are usually PFICs, which are taxed punitively by default and need Form 8621. Early elections can avoid most of the cost.", links: [{ href: "/services/pfic-reporting/", label: "PFIC Reporting" }, { href: "/forms/8621/", label: "Form 8621" }] },
      { q: "Is my local pension tax-free in the US?", a: "Sometimes. It depends on the treaty and the type of scheme. See your country page or talk to us.", links: [{ href: "/countries/", label: "Country guides" }] },
    ],
  },
  {
    slug: "pricing", name: "Pricing & working with us",
    items: [
      { q: "Do you charge fixed fees?", a: "Yes. After a short fit call we send a fixed-fee quote before any work starts.", links: [{ href: "/pricing/", label: "Pricing" }, { href: "/contact/request-a-quote/", label: "Request a quote" }] },
      { q: "Is the first consultation free?", a: "The 15-minute fit call is free. Longer advisory sessions are quoted in advance." },
    ],
  },
];

// Deadline data for the 2026 tax year filing season. Review every November.
export const deadlines: Deadline[] = [
  { date: "2026-12-15", title: "Discretionary extension deadline (abroad)", detail: "Last date for taxpayers abroad who requested the additional extension by letter to file their 2025 return.", situations: ["all"], countries: ["all"], link: "/forms/1040/" },
  { date: "2027-01-15", title: "Q4 2026 estimated tax payment", detail: "Final 2026 estimated payment (Form 1040-ES).", situations: ["business-owners-entrepreneurs", "individuals-families"], countries: ["all"], link: "/forms/1040-es/" },
  { date: "2027-01-31", title: "UK Self Assessment (2025/26)", detail: "UK online return and balancing payment due.", situations: ["all"], countries: ["uk"] },
  { date: "2027-03-15", title: "Form 3520-A (calendar-year trusts)", detail: "Foreign grantor trust information return due, or extend with Form 7004.", situations: ["private-client"], countries: ["all"], link: "/forms/3520-a/" },
  { date: "2027-03-15", title: "Japan final tax return", detail: "Japanese individual income tax return due.", situations: ["all"], countries: ["japan"] },
  { date: "2027-04-15", title: "US returns, payments & FBAR", detail: "2026 Form 1040 due for US residents; tax payment due for everyone (interest runs from today); FBAR due (automatic extension to Oct 15); Q1 2027 estimated tax.", situations: ["all"], countries: ["all"], link: "/forms/1040/" },
  { date: "2027-04-18", title: "Singapore e-filing", detail: "Singapore individual income tax e-filing deadline.", situations: ["all"], countries: ["singapore"] },
  { date: "2027-04-30", title: "Canada T1 return & payment", detail: "Canadian return and balance owing due (15 June filing for self-employed).", situations: ["all"], countries: ["canada"] },
  { date: "2027-04-30", title: "Mexico annual declaration", detail: "Mexican individual annual return due.", situations: ["all"], countries: ["mexico"] },
  { date: "2027-05-01", title: "Netherlands income tax return", detail: "Dutch return due (extension available on request).", situations: ["all"], countries: ["netherlands"] },
  { date: "2027-06-15", title: "US return due for taxpayers abroad", detail: "Automatic 2-month extension date for Americans living abroad; Q2 estimated tax.", situations: ["all"], countries: ["all"], link: "/forms/4868/" },
  { date: "2027-06-30", title: "Spain Renta deadline", detail: "End of the Spanish income tax campaign.", situations: ["all"], countries: ["spain"] },
  { date: "2027-07-07", title: "New Zealand IR3", detail: "NZ individual return due (later with a tax agent).", situations: ["all"], countries: ["new-zealand"] },
  { date: "2027-09-15", title: "Q3 estimated tax payment", detail: "Third 2027 estimated payment.", situations: ["business-owners-entrepreneurs"], countries: ["all"], link: "/forms/1040-es/" },
  { date: "2027-10-15", title: "Extended US returns & FBAR", detail: "Final extended deadline for 2026 Form 1040 and the FBAR.", situations: ["all"], countries: ["all"], link: "/forms/fincen-114/" },
  { date: "2027-10-31", title: "Australia individual return (self-lodged)", detail: "2026–27 Australian return due if lodging yourself.", situations: ["all"], countries: ["australia"] },
  { date: "2027-10-31", title: "Ireland Form 11 (paper)", detail: "Irish self-assessment return due (mid-November via ROS).", situations: ["all"], countries: ["ireland"] },
];

export const pricing = [
  { name: "Essential Expat Return", price: "from $650", desc: "Form 1040 with FEIE or FTC, one W-2-equivalent employer, FBAR up to 5 accounts.", includes: ["Form 1040", "Form 2555 or 1116", "FBAR (up to 5 accounts)", "Child Tax Credit"] },
  { name: "Expat Plus", price: "from $1,150", desc: "For investors and families with pensions, rentals or multiple income sources.", includes: ["Everything in Essential", "Form 8938", "One foreign rental", "Pension treaty review", "Up to 2 PFIC funds"], featured: true },
  { name: "Streamlined Catch-Up", price: "from $2,400", desc: "Three years of returns, six years of FBARs and the non-wilful certification.", includes: ["3 × Form 1040", "6 × FBAR", "Form 14653", "Non-wilful narrative"] },
  { name: "Business Owner", price: "from $1,850", desc: "Personal return plus one foreign company.", includes: ["Expat Plus return", "Form 5471 (one entity)", "Tested-income calculation", "Salary/dividend planning call"] },
];

export const addOns = [
  ["Additional PFIC fund (Form 8621)", "$250"],
  ["Additional Form 5471 / 8865 / 8858", "$1,200"],
  ["State part-year return", "$350"],
  ["Form 3520 (gift reporting)", "$500"],
  ["Advisory hour", "$400"],
  ["Renunciation package (Form 8854 + final return)", "from $2,900"],
];

export const posts: Post[] = [
  {
    slug: "streamlined-vs-delinquent-fbar",
    title: "Streamlined filing or delinquent FBAR submission: which route fits?",
    excerpt: "Two very different catch-up paths. The right one depends on whether your income was already reported.",
    date: "2026-11-10", author: "Placeholder Author, EA", reviewer: "Placeholder Reviewer, CPA",
    tags: ["catch-up", "FBAR", "streamlined"],
    body: [
      { p: "If you've discovered you missed FBARs, the first question isn't 'how bad is this?' — it's 'did I report all my income?'" },
      { h: "When delinquent FBAR submission works", p: "If your tax returns already reported all your income, including interest from the foreign accounts, and you're not under examination, you can file the late FBARs with a statement explaining why they were late." },
      { h: "When you need Streamlined", p: "If income is missing — for example foreign interest, fund gains or a pension — the Streamlined Foreign Offshore Procedures let you file three years of returns and six years of FBARs with a non-wilful certification." },
      { h: "What to do next", p: "Gather six years of account statements and your last three years of income records, then book a fit call. We'll confirm which route applies before you file anything." },
    ],
  },
  {
    slug: "isa-pfic-trap",
    title: "Why your ISA, TFSA or NISA can be a US tax trap",
    excerpt: "Local tax-free wrappers don't exist for the IRS — and the funds inside them are usually PFICs.",
    date: "2026-10-28", author: "Placeholder Author, EA", reviewer: "Placeholder Reviewer, CPA",
    tags: ["PFIC", "investments", "uk", "canada", "japan"],
    body: [
      { p: "Governments love tax-free savings wrappers. The US doesn't recognise any of them." },
      { h: "Two problems in one account", p: "Income inside an ISA, TFSA or NISA is reportable on your US return, and the local funds commonly held inside are passive foreign investment companies." },
      { h: "What helps", p: "Holding individual shares rather than funds, making QEF or mark-to-market elections early, or keeping investments in a US brokerage account where possible." },
    ],
  },
  {
    slug: "moving-abroad-checklist",
    title: "Moving abroad next year? A US tax checklist for the move",
    excerpt: "Decisions made before you leave — home sale, state exit, brokerage — matter more than anything you do afterwards.",
    date: "2026-10-05", author: "Placeholder Author, EA", reviewer: "Placeholder Reviewer, CPA",
    tags: ["moving", "state tax", "planning"],
    body: [
      { p: "The move year is the most complicated return most expats ever file. A few decisions made in advance make it far simpler." },
      { h: "Break state residency cleanly", p: "Change your driver's licence, voter registration and mailing address, and decide whether to sell or rent your home." },
      { h: "Keep your US brokerage", p: "Check that your broker allows non-US addresses. US-domiciled funds avoid PFIC problems abroad." },
      { h: "Track your days", p: "The physical presence test counts full days outside the US. Keep a travel log from day one." },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
