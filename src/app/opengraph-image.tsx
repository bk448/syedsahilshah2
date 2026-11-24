import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default social-share image for every page (generated at build time).
export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "linear-gradient(135deg, #0b2036 0%, #0f2a44 55%, #12355a 100%)", color: "#fff", fontFamily: "Georgia, serif" }}>
        <div style={{ position: "absolute", width: 520, height: 520, borderRadius: 520, background: "#1f8f84", opacity: 0.45, top: -160, right: -60, filter: "blur(80px)" }} />
        <div style={{ position: "absolute", width: 420, height: 420, borderRadius: 420, border: "2px solid rgba(255,255,255,.18)", right: 90, top: 105, display: "flex" }} />
        <div style={{ position: "absolute", width: 420, height: 140, borderRadius: 420, border: "2px dashed rgba(232,176,75,.6)", right: 90, top: 245, display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px", width: 760 }}>
          <div style={{ fontSize: 26, color: "#e8b04b", letterSpacing: 3, textTransform: "uppercase", marginBottom: 24, fontFamily: "sans-serif" }}>{site.name}</div>
          <div style={{ fontSize: 70, lineHeight: 1.08, fontWeight: 700 }}>US tax compliance for Americans abroad</div>
          <div style={{ display: "flex", marginTop: 36, padding: "16px 26px", borderRadius: 18, background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.25)", fontSize: 26, fontFamily: "sans-serif", alignSelf: "flex-start" }}>
            Expat returns · FBAR · Streamlined · PFIC · Form 5471
          </div>
        </div>
      </div>
    ),
    size,
  );
}
