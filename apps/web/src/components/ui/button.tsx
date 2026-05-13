"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@rdv/utils";

const buttonVariants = cva(
  // Base — compartido por todas las variantes
  [
    "inline-flex items-center justify-center gap-2",
    "font-display font-700 text-[0.9375rem] tracking-[0.07em] uppercase",
    "border-2 rounded-full",
    "transition-all duration-200",
    "disabled:pointer-events-none disabled:opacity-40",
    "focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-3",
    "whitespace-nowrap select-none",
  ],
  {
    variants: {
      variant: {
        // Dorado sólido — CTA primario
        primary: [
          "bg-gold text-bg-base border-gold",
          "hover:bg-gold-muted hover:border-gold-muted hover:-translate-y-px",
          "active:translate-y-0 active:brightness-90",
        ],
        // Outline — CTA secundario
        secondary: [
          "bg-transparent text-text-primary border-border",
          "hover:border-gold hover:text-gold",
          "active:scale-[0.98]",
        ],
        // Ghost — links con flecha
        ghost: [
          "bg-transparent text-text-primary border-transparent",
          "hover:text-gold",
          "group",
        ],
        // Outline dorado — para sobre fondos dark
        outline: [
          "bg-transparent text-gold border-border-gold",
          "hover:bg-gold hover:text-bg-base",
          "active:scale-[0.98]",
        ],
        // Destructivo
        destructive: [
          "bg-red-900/30 text-red-400 border-red-900/50",
          "hover:bg-red-900/50 hover:border-red-800",
        ],
      },
      size: {
        sm:   "h-9  px-4   text-[0.8125rem]",
        md:   "h-11 px-6",
        lg:   "h-13 px-8   text-[1rem]",
        icon: "h-10 w-10 p-0 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

// Componente auxiliar para el ghost con flecha animada
const ButtonArrow = ({ className }: { className?: string }) => (
  <span
    className={cn(
      "inline-block transition-transform duration-200 group-hover:translate-x-1",
      className
    )}
    aria-hidden
  >
    →
  </span>
);

export { Button, ButtonArrow, buttonVariants };
