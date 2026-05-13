import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@rdv/utils";

const badgeVariants = cva(
  "inline-flex items-center font-label tracking-[0.15em] uppercase rounded-full",
  {
    variants: {
      variant: {
        // Dorado — para categorías destacadas, LIVE, etc.
        gold: "bg-gold/10 text-gold border border-border-gold px-2.5 py-0.5 text-[0.6875rem]",
        // Outline sutil — para tags de sermón, fechas
        outline: "bg-transparent text-text-secondary border border-border px-2.5 py-0.5 text-[0.6875rem]",
        // Sólido oscuro — para labels de ministerio
        surface: "bg-bg-surface text-text-secondary border border-border px-2.5 py-0.5 text-[0.6875rem]",
        // LIVE indicator
        live: "bg-red-600 text-white px-2.5 py-0.5 text-[0.6875rem] animate-pulse-dot",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
