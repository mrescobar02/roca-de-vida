import Link from "next/link";
import { Instagram, Youtube, Facebook } from "lucide-react";
import { cn } from "@rdv/utils";
import { FOOTER_COLUMNS } from "./nav-config";
import { RdvLogo } from "./MobileNav";

// Datos del footer — vendrán del CMS (SiteSettings global) cuando esté conectado
const SERVICE_TIMES = [
  { day: "Domingo", times: "9:00am · 11:00am · 6:00pm" },
  { day: "Miércoles", times: "7:00pm" },
];

const SOCIAL_LINKS = [
  {
    href: "https://instagram.com/rocadevidapanama",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://youtube.com/@rocadevidapanama",
    label: "YouTube",
    icon: Youtube,
  },
  {
    href: "https://facebook.com/rocadevidapanama",
    label: "Facebook",
    icon: Facebook,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-bg-base border-t border-border"
      aria-label="Pie de página"
    >
      {/* ─── Top: columnas de links ─────────────────────────────────── */}
      <div className="container-main section-py-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Col 1 — Identidad */}
          <div className="flex flex-col gap-6 lg:pr-8">
            <RdvLogo size="md" />

            <p className="font-body text-[0.9rem] text-text-secondary leading-relaxed max-w-[28ch]">
              Edificando vidas, fortaleciendo familias y alcanzando nuestra ciudad.
            </p>

            {/* Horarios */}
            <div className="flex flex-col gap-2">
              <p className="text-label text-gold">Horarios de servicio</p>
              {SERVICE_TIMES.map((s) => (
                <div key={s.day} className="flex flex-col">
                  <span className="font-body text-[0.8125rem] text-text-secondary">
                    <span className="text-text-primary">{s.day}</span> — {s.times}
                  </span>
                </div>
              ))}
            </div>

            {/* Redes sociales */}
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-text-muted hover:text-gold transition-colors duration-200"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Cols 2–4 — Grupos de links */}
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <p className="text-label text-gold mb-5">{col.heading}</p>
              <ul className="flex flex-col gap-3" role="list">
                {col.links.map((link) => {
                  const isExternal = link.href.startsWith("http");
                  return (
                    <li key={link.label} role="listitem">
                      {isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body text-[0.9rem] text-text-secondary hover:text-gold transition-colors duration-150"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="font-body text-[0.9rem] text-text-secondary hover:text-gold transition-colors duration-150"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* ─── Bottom: copyright ───────────────────────────────────────── */}
      <div className="border-t border-border">
        <div
          className={cn(
            "container-main py-5",
            "flex flex-col sm:flex-row items-center justify-between gap-3"
          )}
        >
          <p className="font-body text-[0.8125rem] text-text-muted">
            © {currentYear} Roca de Vida Panamá. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacidad"
              className="font-body text-[0.8125rem] text-text-muted hover:text-text-secondary transition-colors"
            >
              Privacidad
            </Link>
            <Link
              href="/terminos"
              className="font-body text-[0.8125rem] text-text-muted hover:text-text-secondary transition-colors"
            >
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
