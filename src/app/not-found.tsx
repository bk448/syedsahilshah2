import Link from "next/link";

export default function NotFound() {
  return (
    <section className="thanks wrap">
      <p className="eyebrow dark">404</p>
      <h1>We couldn't find that page</h1>
      <p className="lead">It may have moved. Try one of these instead:</p>
      <p className="hero-ctas center">
        <Link className="btn btn-primary" href="/">Home</Link>
        <Link className="btn btn-outline" href="/services/">Services</Link>
        <Link className="btn btn-outline" href="/forms/">Forms library</Link>
        <Link className="btn btn-outline" href="/contact/">Contact</Link>
      </p>
    </section>
  );
}
