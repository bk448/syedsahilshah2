// Placeholder firm details for the demo. Swap these for the real firm before launch.
export const site = {
  name: "Northbridge Expat Tax",
  legalName: "Northbridge Expat Tax (placeholder)",
  tagline: "US tax compliance for Americans living abroad",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.example-expat-tax.com").replace(/\/$/, ""),
  email: "hello@example-expat-tax.com",
  phone: "+1 (555) 010-0199",
  address: {
    street: "100 Placeholder Avenue, Suite 400",
    city: "New York",
    region: "NY",
    postcode: "10001",
    country: "US",
  },
  hours: "Mon–Fri, 8:00–18:00 ET · Evening slots for Asia-Pacific clients",
  clientPortalUrl: process.env.NEXT_PUBLIC_CLIENT_PORTAL_URL || "https://portal.example.com",
  bookingEmbedUrl: process.env.NEXT_PUBLIC_BOOKING_EMBED_URL || "",
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  credentials: ["Enrolled Agents (EA)", "Certified Public Accountants (CPA)", "IRS e-file provider", "PTIN-registered preparers"],
  stats: [
    { value: "2,400+", label: "expat returns filed each year" },
    { value: "60+", label: "countries clients live in" },
    { value: "15 yrs", label: "focused only on US expat tax" },
    { value: "4.9/5", label: "average client rating" },
  ],
  lastReviewed: "2026-11-24",
};

export const disclaimer =
  "Information on this site is general guidance, not tax or legal advice for your situation. Thresholds and dates change; confirm them with a qualified adviser before acting. Any US federal tax advice on this site is not intended to be used to avoid penalties.";
