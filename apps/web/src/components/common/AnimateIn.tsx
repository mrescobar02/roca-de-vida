"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variant, type Easing } from "framer-motion";
import { cn } from "@rdv/utils";

// ─── Variantes predefinidas ───────────────────────────────────────────────────

const VARIANTS = {
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 1.04 },
    visible: { opacity: 1, scale: 1 },
  },
} satisfies Record<string, { hidden: Variant; visible: Variant }>;

export type AnimateVariant = keyof typeof VARIANTS;

// ─── Stagger container ────────────────────────────────────────────────────────

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
}

function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  delayChildren = 0.05,
  once = true,
}: StaggerProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      variants={
        reducedMotion
          ? undefined
          : {
              hidden: {},
              visible: {
                transition: { staggerChildren: staggerDelay, delayChildren },
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}

// ─── AnimateIn ────────────────────────────────────────────────────────────────

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  /** Tipo de animación de entrada */
  variant?: AnimateVariant;
  /** Delay adicional en segundos */
  delay?: number;
  /** Duración en segundos */
  duration?: number;
  /** Easing curve */
  ease?: Easing | Easing[];
  /** Trigger al entrar en viewport (default) o inmediatamente al montar */
  trigger?: "viewport" | "mount";
  /** Si la animación ocurre solo una vez */
  once?: boolean;
  /** Cantidad del elemento visible antes de triggear (0–1) */
  amount?: number;
}

function AnimateIn({
  children,
  className,
  variant = "fadeUp",
  delay = 0,
  duration = 0.6,
  ease = [0.22, 1, 0.36, 1],
  trigger = "viewport",
  once = true,
  amount = 0.2,
}: AnimateInProps) {
  const reducedMotion = useReducedMotion();
  const selectedVariant = VARIANTS[variant];

  // Si prefers-reduced-motion, renderizar directamente sin animación
  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const transition = { duration, delay, ease };

  if (trigger === "mount") {
    return (
      <motion.div
        className={className}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: selectedVariant.hidden,
          visible: { ...selectedVariant.visible, transition },
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: selectedVariant.hidden,
        visible: { ...selectedVariant.visible, transition },
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── AnimateInItem — para uso dentro de StaggerContainer ─────────────────────

interface AnimateInItemProps {
  children: React.ReactNode;
  className?: string;
  variant?: AnimateVariant;
  duration?: number;
  ease?: Easing | Easing[];
}

function AnimateInItem({
  children,
  className,
  variant = "fadeUp",
  duration = 0.55,
  ease = [0.22, 1, 0.36, 1],
}: AnimateInItemProps) {
  const reducedMotion = useReducedMotion();
  const selectedVariant = VARIANTS[variant];

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: selectedVariant.hidden,
        visible: { ...selectedVariant.visible, transition: { duration, ease } },
      }}
    >
      {children}
    </motion.div>
  );
}

export { AnimateIn, AnimateInItem, StaggerContainer, VARIANTS };
