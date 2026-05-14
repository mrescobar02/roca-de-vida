"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { X, Instagram, Youtube, Facebook } from "lucide-react";
import { cn } from "@rdv/utils";
import { NAV_ITEMS } from "./nav-config";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: typeof NAV_ITEMS;
}

// Curvas bezier tipadas como tuplas para Framer Motion v12
const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_IN_EXPO: [number, number, number, number] = [0.64, 0, 0.78, 0];

const overlayVariants: Variants = {
  closed: { opacity: 0 },
  open:   { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit:   { opacity: 0, transition: { duration: 0.25, ease: "easeIn" } },
};

const menuVariants: Variants = {
  closed: { x: "100%" },
  open:   { x: 0,     transition: { duration: 0.4, ease: EASE_OUT_EXPO } },
  exit:   { x: "100%", transition: { duration: 0.3, ease: EASE_IN_EXPO } },
};

const listVariants: Variants = {
  open: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  closed: { opacity: 0, x: 20 },
  open:   { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE_OUT_EXPO } },
};

export function MobileNav({ isOpen, onClose, navItems }: MobileNavProps) {
  const pathname = usePathname();
  const [expandedItem, setExpandedItem] = React.useState<string | null>(null);

  // Cerrar al navegar
  React.useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Trap focus y escape key
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Overlay oscuro detrás */}
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="exit"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* Panel del menú */}
          <motion.nav
            key="panel"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="exit"
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-bg-base border-l border-border flex flex-col"
            aria-label="Menú de navegación"
            role="dialog"
            aria-modal="true"
          >
            {/* Header del panel */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <Link
                href="/"
                className="flex items-center gap-2.5"
                onClick={onClose}
              >
                <RdvLogo size="sm" />
              </Link>
              <button
                onClick={onClose}
                className="text-text-secondary hover:text-text-primary transition-colors p-1"
                aria-label="Cerrar menú"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            {/* Links de navegación */}
            <motion.ul
              variants={listVariants}
              initial="closed"
              animate="open"
              className="flex flex-col flex-1 overflow-y-auto px-6 py-6 gap-1"
              role="list"
            >
              {navItems.map((item) => {
                const isExpanded = expandedItem === item.label;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <motion.li key={item.label} variants={itemVariants} role="listitem">
                    {item.children ? (
                      <>
                        {/* Item con hijos — accordion */}
                        <button
                          onClick={() =>
                            setExpandedItem(isExpanded ? null : item.label)
                          }
                          className={cn(
                            "w-full flex items-center justify-between",
                            "font-display font-700 text-[1.1rem] tracking-tight",
                            "py-3 transition-colors",
                            isActive ? "text-gold" : "text-text-primary hover:text-gold"
                          )}
                          aria-expanded={isExpanded}
                        >
                          {item.label}
                          <motion.span
                            animate={{ rotate: isExpanded ? 45 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-text-muted text-xl leading-none"
                            aria-hidden
                          >
                            +
                          </motion.span>
                        </button>

                        {/* Sub-items */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden pl-4 border-l border-border"
                              role="list"
                            >
                              {item.children.map((child) => (
                                <li key={child.href} role="listitem">
                                  <Link
                                    href={child.href}
                                    className={cn(
                                      "block py-2.5 font-body text-[0.9375rem] transition-colors",
                                      pathname === child.href
                                        ? "text-gold"
                                        : "text-text-secondary hover:text-text-primary"
                                    )}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "block font-display font-700 text-[1.1rem] tracking-tight",
                          "py-3 transition-colors",
                          isActive ? "text-gold" : "text-text-primary hover:text-gold"
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                );
              })}
            </motion.ul>

            {/* Footer del panel — CTAs y redes */}
            <div className="px-6 py-6 border-t border-border flex flex-col gap-4">
              <div className="flex gap-3">
                <Link
                  href="/donaciones"
                  className={cn(
                    "flex-1 text-center py-2.5 rounded-full border border-border-gold",
                    "font-display font-700 text-[0.875rem] tracking-[0.07em] uppercase text-gold",
                    "hover:bg-gold hover:text-bg-base transition-colors"
                  )}
                >
                  Donar
                </Link>
                <Link
                  href="/contacto"
                  className={cn(
                    "flex-1 text-center py-2.5 rounded-full",
                    "font-display font-700 text-[0.875rem] tracking-[0.07em] uppercase",
                    "bg-gold text-bg-base hover:bg-gold-muted transition-colors"
                  )}
                >
                  Visítanos
                </Link>
              </div>

              {/* Redes sociales */}
              <div className="flex items-center gap-4">
                <a
                  href="https://instagram.com/rocadevidapanama"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-text-muted hover:text-gold transition-colors"
                >
                  <Instagram size={18} strokeWidth={1.5} />
                </a>
                <a
                  href="https://youtube.com/@rocadevidapanama"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="text-text-muted hover:text-gold transition-colors"
                >
                  <Youtube size={18} strokeWidth={1.5} />
                </a>
                <a
                  href="https://facebook.com/rocadevidapanama"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-text-muted hover:text-gold transition-colors"
                >
                  <Facebook size={18} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

// Logo inline — se reemplaza por <Image> cuando llegue el asset
export function RdvLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: { mark: "text-lg", name: "text-[0.8125rem]" },
    md: { mark: "text-xl", name: "text-[0.9375rem]" },
    lg: { mark: "text-2xl", name: "text-base" },
  };

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Mark — placeholder hasta tener logo real */}
      <div
        className={cn(
          "font-display font-900 text-gold leading-none",
          sizes[size].mark
        )}
        aria-hidden
      >
        RDV
      </div>
      <div className="flex flex-col leading-tight">
        <span
          className={cn(
            "font-display font-700 text-text-primary tracking-tight",
            sizes[size].name
          )}
        >
          Roca de Vida
        </span>
        <span className="text-label text-text-muted" style={{ fontSize: "0.625rem" }}>
          Panamá
        </span>
      </div>
    </div>
  );
}
