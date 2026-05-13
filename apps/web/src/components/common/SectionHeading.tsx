import * as React from "react";
import { cn } from "@rdv/utils";

interface SectionHeadingProps {
  label?: string;
  heading: string;
  subheading?: string;
  /** "left" (default) | "center" */
  align?: "left" | "center";
  /** Nivel del heading HTML */
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Aplica la animación de la línea dorada */
  showLine?: boolean;
}

function SectionHeading({
  label,
  heading,
  subheading,
  align = "left",
  as: Tag = "h2",
  className,
  showLine = true,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col",
        isCenter ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {/* Línea decorativa dorada */}
      {showLine && (
        <span
          aria-hidden
          className={cn(
            "block h-[2px] w-9 bg-gold mb-3.5",
            isCenter && "mx-auto"
          )}
        />
      )}

      {/* Label — Bebas Neue, dorado */}
      {label && (
        <p
          className={cn(
            "text-label text-gold mb-2",
            isCenter && "text-center"
          )}
        >
          {label}
        </p>
      )}

      {/* Heading principal */}
      <Tag
        className={cn(
          "text-h2 text-text-primary",
          isCenter && "text-center"
        )}
      >
        {heading}
      </Tag>

      {/* Subheading / descripción */}
      {subheading && (
        <p
          className={cn(
            "text-lead mt-4 max-w-[55ch]",
            isCenter && "text-center mx-auto"
          )}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}

export { SectionHeading };
