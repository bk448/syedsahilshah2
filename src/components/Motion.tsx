"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Plain content that animates in automatically, without having to tag every element in every page.
const AUTO_TEXT = [
  "main h2:not(.split)",
  "main section.block > p",
  "main .article section > p",
  "main .block > ul:not([class]) > li",
  "main .block > ol:not([class]) > li",
  "main .table",
  "main .callout",
  "main .reviewed",
].join(",");

/**
 * Site-wide scroll animation:
 *  - .reveal           → block fades/slides in
 *  - .reveal-stagger   → children animate one after another
 *  - .split            → heading words rise in one by one
 *  - AUTO_TEXT targets → plain headings/paragraphs/list items get .auto-reveal
 * Elements stay visible without JS (html.js-motion is only set when motion is allowed).
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (reduced()) return;
    document.documentElement.classList.add("js-motion");

    // Tag plain text elements that aren't already inside an animated container or hero.
    document.querySelectorAll<HTMLElement>(AUTO_TEXT).forEach((el) => {
      if (el.closest(".reveal, .reveal-stagger, .page-hero, .hero, .split, .cta-band, .lead-form")) return;
      el.classList.add("auto-reveal");
    });

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-in), .reveal-stagger:not(.is-in), .split:not(.is-in), .auto-reveal:not(.is-in)"),
    );
    // Consecutive auto-reveal siblings (list items, paragraphs) get a small stagger.
    targets.forEach((el) => {
      if (el.classList.contains("auto-reveal") && el.parentElement) {
        const sib = Array.from(el.parentElement.children).filter((c) => c.classList.contains("auto-reveal"));
        el.style.setProperty("--i", String(Math.min(sib.indexOf(el), 8)));
      }
      if (el.classList.contains("reveal-stagger")) {
        Array.from(el.children).forEach((c, i) => (c as HTMLElement).style.setProperty("--i", String(Math.min(i, 12))));
      }
    });

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      }),
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    targets.forEach((el) => io.observe(el));

    // Safety net: anything on screen that is still hidden after 2.5s is shown.
    const safety = window.setTimeout(() => {
      document.querySelectorAll(".reveal:not(.is-in), .reveal-stagger:not(.is-in), .split:not(.is-in), .auto-reveal:not(.is-in)").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-in");
      });
    }, 2500);

    return () => { io.disconnect(); window.clearTimeout(safety); };
  }, [pathname]);

  return null;
}

/**
 * Card interactions (event delegation, so it works for every card on every page):
 * 3D tilt toward the pointer + a spotlight that follows the cursor.
 * Only on devices with a real hover pointer.
 */
const TILT = ".card, .feature-card, .price, .process li, .stat, .quotes li, .side-cta";

export function CardFx() {
  useEffect(() => {
    if (reduced() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let current: HTMLElement | null = null;
    let raf = 0;

    const reset = (el: HTMLElement) => {
      el.classList.remove("is-tilting");
      el.style.removeProperty("--rx");
      el.style.removeProperty("--ry");
    };

    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(TILT);
      if (current && current !== el) reset(current);
      current = el;
      if (!el) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        const max = el.classList.contains("side-cta") ? 3 : 6; // degrees
        el.style.setProperty("--ry", `${(x - 0.5) * max * 2}deg`);
        el.style.setProperty("--rx", `${(0.5 - y) * max * 2}deg`);
        el.style.setProperty("--mx", `${x * 100}%`);
        el.style.setProperty("--my", `${y * 100}%`);
        el.classList.add("is-tilting");
      });
    };
    const onLeave = () => { if (current) reset(current); current = null; };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}

/** Thin gradient bar at the top showing how far down the page you are. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  return <div className="scroll-progress" ref={ref} aria-hidden="true" />;
}

/** Animates a stat like "2,400+" or "4.9/5" from 0 when scrolled into view. */
export function CountUp({ value }: { value: string }) {
  const m = value.match(/^([^\d]*)([\d,.]+)(.*)$/);
  const target = m ? parseFloat(m[2].replace(/,/g, "")) : 0;
  const decimals = m && m[2].includes(".") ? m[2].split(".")[1].length : 0;
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!m || reduced() || !ref.current) return;
    const el = ref.current;
    const fmt = (n: number) => `${m[1]}${n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${m[3]}`;
    setShown(fmt(0));
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1400);
        setShown(fmt(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <span ref={ref} aria-label={value}>{shown}</span>;
}
