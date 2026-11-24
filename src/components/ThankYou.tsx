import Link from "next/link";
import { site } from "@/data/site";

export function ThankYou({ title, text }: { title: string; text: string }) {
  return (
    <section className="thanks wrap">
      <div className="thanks-icon" aria-hidden>✓</div>
      <h1>{title}</h1>
      <p className="lead">{text}</p>
      <p>A confirmation has been sent to your email. If it doesn't arrive, check spam or write to <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
      <p className="hero-ctas center">
        <Link className="btn btn-outline" href="/resources/deadlines/">Check upcoming deadlines</Link>
        <Link className="btn btn-outline" href="/forms/">Browse the forms library</Link>
      </p>
    </section>
  );
}
