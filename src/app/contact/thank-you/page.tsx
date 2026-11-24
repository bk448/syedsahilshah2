import { ThankYou } from "@/components/ThankYou";
import { pageMeta, withFirm } from "@/lib/seo";

export const metadata = pageMeta({ title: withFirm("Message Received"), description: "Thanks — your message was received.", path: "/contact/thank-you/", noindex: true });

export default function Page() {
  return <ThankYou title="Message received" text="We'll reply within one business day." />;
}
