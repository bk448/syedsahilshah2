import { ThankYou } from "@/components/ThankYou";
import { pageMeta, withFirm } from "@/lib/seo";

// Separate URL so analytics can count consultation requests as a conversion goal. Not indexed.
export const metadata = pageMeta({ title: withFirm("Consultation Requested"), description: "Thanks — your consultation request was received.", path: "/contact/book-a-consultation/thank-you/", noindex: true });

export default function Page() {
  return <ThankYou title="Your consultation request is in" text="We'll email you within one business day to confirm a time in your time zone." />;
}
