import { ThankYou } from "@/components/ThankYou";
import { pageMeta, withFirm } from "@/lib/seo";

export const metadata = pageMeta({ title: withFirm("Quote Requested"), description: "Thanks — your quote request was received.", path: "/contact/request-a-quote/thank-you/", noindex: true });

export default function Page() {
  return <ThankYou title="Thanks — your quote is on its way" text="A specialist will review your details and email a fixed-fee quote within one business day." />;
}
