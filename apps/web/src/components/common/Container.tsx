import * as React from "react";
import { cn } from "@rdv/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** "main" (1280px) | "narrow" (720px) | "wide" (full con padding) */
  size?: "main" | "narrow" | "wide";
  /** Aplica section-py (padding vertical de sección) */
  section?: boolean;
}

function Container({
  children,
  className,
  size = "main",
  section = false,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        size === "main" && "container-main",
        size === "narrow" && "container-narrow",
        size === "wide" && "w-full px-6 lg:px-10",
        section && "section-py",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Container };
