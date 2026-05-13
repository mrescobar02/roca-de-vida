"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@rdv/utils";
import { NAV_ITEMS, type NavItem } from "./nav-config";
import { MobileNav, RdvLogo } from "./MobileNav";

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const pathname = usePathname();
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detectar scroll — también chequea posición inicial para back-navigation
  React.useEffect(() => {
    setIsScrolled(window.scrollY > 20);
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Re-chequear scroll al cambiar de ruta (browser puede restaurar posición)
  React.useEffect(() => {
    setIsScrolled(window.scrollY > 20);
    setActiveDropdown(null);
    setIsMobileOpen(false);
  }, [pathname]);

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40",
          "transition-all duration-300 ease-in-out",
          isScrolled
            ? "backdrop-blur-md bg-black/85 border-b border-border shadow-[0_1px_0_rgba(255,255,255,0.04)]"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="container-main">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <Link href="/" aria-label="Roca de Vida Panamá — Inicio">
              <RdvLogo />
            </Link>

            {/* Nav desktop */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Navegación principal"
            >
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.label}
                  item={item}
                  pathname={pathname}
                  activeDropdown={activeDropdown}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
            </nav>

            {/* CTAs desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/donaciones"
                className={cn(
                  "text-label text-gold border border-border-gold",
                  "px-4 py-2 rounded-full",
                  "hover:bg-gold hover:text-bg-base transition-colors duration-200"
                )}
              >
                Donar
              </Link>
              <Link
                href="/contacto"
                className={cn(
                  "text-label bg-gold text-bg-base",
                  "px-5 py-2 rounded-full",
                  "hover:bg-gold-muted transition-colors duration-200"
                )}
              >
                Visítanos
              </Link>
            </div>

            {/* Hamburger mobile */}
            <button
              className="lg:hidden text-text-secondary hover:text-text-primary transition-colors p-1"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={isMobileOpen}
              aria-controls="mobile-menu"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <MobileNav
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />
    </>
  );
}

// ─── NavLink individual con dropdown ─────────────────────────────────────────

interface NavLinkProps {
  item: NavItem;
  pathname: string;
  activeDropdown: string | null;
  onMouseEnter: (label: string) => void;
  onMouseLeave: () => void;
}

function NavLink({
  item,
  pathname,
  activeDropdown,
  onMouseEnter,
  onMouseLeave,
}: NavLinkProps) {
  const isActive =
    pathname === item.href ||
    (item.href !== "/" && pathname.startsWith(item.href));
  const isOpen = activeDropdown === item.label;
  const hasChildren = !!item.children?.length;

  return (
    <div
      className="relative"
      onMouseEnter={() => hasChildren && onMouseEnter(item.label)}
      onMouseLeave={onMouseLeave}
    >
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-1 px-3 py-2 rounded-lg",
          "font-body text-[0.875rem] tracking-wide",
          "transition-colors duration-150",
          isActive
            ? "text-gold"
            : "text-text-secondary hover:text-text-primary"
        )}
        aria-current={isActive ? "page" : undefined}
        aria-haspopup={hasChildren ? "true" : undefined}
        aria-expanded={hasChildren ? isOpen : undefined}
      >
        {item.label}
        {hasChildren && (
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown
              size={14}
              strokeWidth={1.5}
              className="text-text-muted"
              aria-hidden
            />
          </motion.span>
        )}
      </Link>

      {/* Dropdown */}
      {hasChildren && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "absolute top-full left-0 mt-1 min-w-[220px]",
                "bg-bg-surface border border-border rounded-xl",
                "shadow-[0_8px_32px_rgba(0,0,0,0.6)]",
                "overflow-hidden"
              )}
              role="menu"
            >
              {item.children!.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  role="menuitem"
                  className={cn(
                    "flex flex-col px-4 py-3 gap-0.5",
                    "font-body text-[0.875rem]",
                    "border-b border-border last:border-0",
                    "transition-colors duration-150",
                    pathname === child.href
                      ? "text-gold bg-gold/5"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-raised"
                  )}
                >
                  <span>{child.label}</span>
                  {child.description && (
                    <span className="text-[0.75rem] text-text-muted">
                      {child.description}
                    </span>
                  )}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
