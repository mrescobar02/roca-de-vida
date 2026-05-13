import * as React from "react";
import { cn } from "@rdv/utils";

interface ScriptureQuoteProps {
  text: string;
  reference: string;
  className?: string;
  /** "default" | "large" (para páginas de ministerio) */
  size?: "default" | "large";
  /** "left" | "center" */
  align?: "left" | "center";
}

function ScriptureQuote({
  text,
  reference,
  className,
  size = "default",
  align = "left",
}: ScriptureQuoteProps) {
  return (
    <figure
      className={cn(
        "relative flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {/* Comilla decorativa */}
      <span
        aria-hidden
        className={cn(
          "font-display text-gold/20 leading-none select-none",
          size === "large" ? "text-[8rem]" : "text-[5rem]",
          align === "left" ? "-ml-2" : "mx-auto"
        )}
        style={{ lineHeight: 0.6 }}
      >
        "
      </span>

      <blockquote
        className={cn(
          "font-body italic text-text-primary leading-relaxed",
          size === "large"
            ? "text-xl sm:text-2xl max-w-[38ch]"
            : "text-base sm:text-lg max-w-[44ch]",
          align === "center" && "mx-auto"
        )}
      >
        {text}
      </blockquote>

      <figcaption className="text-label text-gold">
        — {reference}
      </figcaption>
    </figure>
  );
}

export { ScriptureQuote };
