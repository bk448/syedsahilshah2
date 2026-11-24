import type { Division } from "./types";

export const divisions: Division[] = [
  {
    slug: "accidental-americans",
    name: "Accidental Americans",
    short: "Born a US citizen but never filed? Get compliant without the panic.",
    whoFor:
      "People who hold US citizenship by birth or parentage, have lived most or all of their lives outside the US, and have only recently learned they have US filing obligations — often after a bank asked for a W-9 or a FATCA self-certification.",
    situations: [
      "A bank has asked for your US tax ID or frozen an account",
      "You have never filed a US return or an FBAR",
      "You need a Social Security number before you can file",
      "You are considering renouncing US citizenship",
    ],
    services: ["streamlined-filing-procedures", "delinquent-fbar-submission", "us-expat-tax-return", "fbar-filing", "expatriation-renunciation"],
    forms: ["14653", "1040", "fincen-114", "2555", "8854"],
    faqs: [
      { q: "Will I owe a lot of US tax?", a: "Most accidental Americans owe little or nothing once the foreign earned income exclusion or foreign tax credits are applied. The bigger risk is the information returns (FBAR, Form 8938, PFIC reporting), which is why catching up properly matters." },
      { q: "How many years do I need to file?", a: "Under the Streamlined Foreign Offshore Procedures you normally file the last three years of tax returns and the last six years of FBARs, plus a certification that the failure was non-wilful." },
      { q: "Can I renounce without catching up first?", a: "You can renounce at a consulate, but to avoid being treated as a 'covered expatriate' you must certify five years of tax compliance on Form 8854. Most people catch up first." },
    ],
  },
  {
    slug: "individuals-families",
    name: "Individuals & Families",
    short: "Annual US returns, FBARs and credits for Americans settled abroad.",
    whoFor:
      "US citizens and families living abroad long-term who need their annual federal return, FBAR and related forms prepared correctly — and who want to make sure they are using the exclusions and credits that stop them being taxed twice.",
    situations: [
      "You are employed by a local company abroad",
      "You are married to a non-US spouse",
      "You have children and want to claim the Child Tax Credit",
      "You hold local savings, pensions or investment funds",
    ],
    services: ["us-expat-tax-return", "fbar-filing", "fatca-form-8938", "foreign-earned-income-exclusion", "foreign-tax-credit", "non-resident-spouse-planning", "pfic-reporting"],
    forms: ["1040", "2555", "1116", "fincen-114", "8938", "8621"],
    faqs: [
      { q: "Should I use the FEIE or the Foreign Tax Credit?", a: "It depends on where you live. In higher-tax countries the Foreign Tax Credit often eliminates US tax and preserves refundable credits; in low-tax countries the exclusion may be better. We model both every year." },
      { q: "Can my non-US spouse be on my return?", a: "Yes, by electing to treat them as a US resident for tax purposes. That can lower tax, but it brings their worldwide income into the US return, so it needs to be modelled first." },
      { q: "When is my return due?", a: "Americans abroad get an automatic extension to June 15 to file, and can extend to October 15 with Form 4868. Interest on unpaid tax still runs from April 15." },
    ],
  },
  {
    slug: "business-owners-entrepreneurs",
    name: "Business Owners & Entrepreneurs",
    short: "Foreign companies, self-employment and the forms that come with them.",
    whoFor:
      "Americans abroad who own all or part of a foreign company, run a sole proprietorship or freelance business overseas, or hold interests in foreign partnerships — and the information returns those structures trigger.",
    situations: [
      "You own 10% or more of a foreign company",
      "You are self-employed or freelance abroad",
      "You are a partner in a foreign partnership or LLP",
      "You are thinking about how to structure a new venture",
    ],
    services: ["foreign-corporation-reporting", "gilti-planning", "foreign-partnership-reporting", "disregarded-entity-reporting", "self-employment-tax-totalization", "us-llc-foreign-owners"],
    forms: ["5471", "8865", "8858", "8992", "5472", "8832", "schedule-se"],
    faqs: [
      { q: "My company is small. Do I still need Form 5471?", a: "Yes. Form 5471 has no size threshold for a 10%+ US shareholder, and the penalty for not filing starts at $10,000 per form per year." },
      { q: "Do I pay US self-employment tax as well as local social security?", a: "Not if you live in a country with a US totalization agreement and obtain a certificate of coverage. Without an agreement, US self-employment tax may apply on top of local contributions." },
      { q: "What is GILTI?", a: "A tax on certain income of controlled foreign corporations, renamed 'net CFC tested income' for tax years starting in 2026. Elections such as the high-tax exclusion or a Section 962 election can reduce it significantly." },
    ],
  },
  {
    slug: "green-card-holders-abroad",
    name: "Green Card Holders Abroad",
    short: "Still holding a green card while living outside the US? You still file.",
    whoFor:
      "Lawful permanent residents who live outside the United States, temporarily or long-term. Green card holders are US tax residents until the card is formally abandoned, so they carry the same worldwide filing obligations as citizens.",
    situations: [
      "You moved abroad but kept your green card",
      "You want to give up your green card",
      "You have held a green card for 8 of the last 15 years",
      "You want to use a treaty to be taxed as a non-resident",
    ],
    services: ["us-expat-tax-return", "tax-treaty-planning", "expatriation-renunciation", "fbar-filing", "dual-status-returns"],
    forms: ["1040", "1040-nr", "8833", "8854", "fincen-114"],
    faqs: [
      { q: "Do I file if I don't live in the US?", a: "Yes. Until the green card is formally abandoned (typically with Form I-407), you are a US tax resident and file a Form 1040 reporting worldwide income." },
      { q: "Can I use a tax treaty to file as a non-resident?", a: "Some treaties allow it via Form 8833, but doing so can count as an expatriating act for long-term residents. This needs careful advice before filing." },
      { q: "What is a long-term resident?", a: "Someone who held a green card in at least 8 of the last 15 tax years. Long-term residents who give up the card may face the exit tax rules." },
    ],
  },
  {
    slug: "moving-abroad-returning",
    name: "Moving Abroad & Returning",
    short: "Relocating this year? Get the move-year return and state exit right.",
    whoFor:
      "People moving out of the US, coming back after years abroad, or non-US nationals arriving in or leaving the US — whose move-year returns, state residency and timing decisions have outsized consequences.",
    situations: [
      "You are moving abroad within the next 12 months",
      "You are returning to the US after living overseas",
      "You are a foreign national arriving in or leaving the US",
      "Your state may still treat you as a resident",
    ],
    services: ["pre-move-planning", "dual-status-returns", "state-tax-exit", "foreign-earned-income-exclusion", "us-expat-tax-return"],
    forms: ["1040", "1040-nr", "2555", "2350", "4868"],
    faqs: [
      { q: "Will my state still tax me after I move?", a: "Some states — notably California, Virginia, New Mexico and South Carolina — can be hard to leave. Selling or renting your home, moving your driver's licence and voter registration all matter." },
      { q: "Can I claim the FEIE in my move year?", a: "Yes, pro-rated, once you meet the physical presence or bona fide residence test. Form 2350 lets you extend the filing deadline until you qualify." },
      { q: "What is a dual-status return?", a: "A return for a non-US national who was a US resident for part of the year and a non-resident for the rest. Different rules apply to each part." },
    ],
  },
  {
    slug: "private-client",
    name: "Private Client",
    short: "Trusts, estates, gifts and complex foreign assets, handled discreetly.",
    whoFor:
      "High-net-worth individuals and families with foreign trusts, significant cross-border gifts or inheritances, multi-jurisdiction estates, or complex investment portfolios that create layered US reporting.",
    situations: [
      "You are a beneficiary or settlor of a foreign trust",
      "You have received a gift or inheritance from a non-US person",
      "You are planning gifts to a non-US spouse or children",
      "Your estate includes assets in more than one country",
    ],
    services: ["foreign-trust-reporting", "foreign-gifts-inheritances", "gift-estate-tax-planning", "pfic-reporting", "expatriation-renunciation"],
    forms: ["3520", "3520-a", "709", "706-na", "8621"],
    faqs: [
      { q: "Do I pay US tax on an inheritance from abroad?", a: "Generally no, but gifts and bequests from non-US persons above $100,000 in a year must be reported on Form 3520. The penalty for late filing can be up to 25% of the amount received." },
      { q: "Is my local family trust a 'foreign trust'?", a: "Almost certainly yes for US purposes, which can mean Forms 3520 and 3520-A every year. Some pension and savings vehicles are also treated as foreign trusts." },
      { q: "Can I gift unlimited amounts to my spouse?", a: "Only if your spouse is a US citizen. Gifts to a non-citizen spouse are limited to a higher annual exclusion (inflation-adjusted each year)." },
    ],
  },
];

export const getDivision = (slug: string) => divisions.find((d) => d.slug === slug);
