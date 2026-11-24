import { Fragment } from "react";

// Renders a heading whose words animate in one by one when scrolled into view.
// Screen readers get the plain sentence; the animated word spans are aria-hidden.
type Tag = "h1" | "h2" | "h3" | "p";

export function SplitText({ as: As = "h2", text, className = "", id }: { as?: Tag; text: string; className?: string; id?: string }) {
  const words = text.split(" ");
  return (
    <As className={`split ${className}`} id={id}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className="w" style={{ ["--w" as string]: i }}>
              <span className="wi">{w}</span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </As>
  );
}
