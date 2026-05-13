import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Clock, Instagram, Youtube, MessageCircle } from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AnimateIn, StaggerContainer, AnimateInItem } from "@/components/common/AnimateIn";
import { ContactForm } from "@/components/sections/ContactForm";
import { cn } from "@rdv/utils";

export const metadata: Metadata = {
  title: "Contáctanos | Roca de Vida Panamá",
  description: "Visítanos, escríbenos o pide oración. El equipo de Roca de Vida Panamá está aquí para ti.",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const SCHEDULE = [
  { day: "Martes",    time: "7:00 PM",  label: "Servicio de oración" },
  { day: "Miércoles", time: "8:30 PM",  label: "Estudio bíblico" },
  { day: "Domingo",   time: "10:30 AM", label: "Servicio principal" },
];

const PASTORS = [
  { name: "Juan Mario Herrero", role: "Pastor Principal",    initials: "JMH" },
  { name: "Giordano Donado",    role: "Pastor",              initials: "GD" },
  { name: "Carlos Pelaez",      role: "Pastor",              initials: "CP" },
];

const CHANNELS = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    description: "Escríbenos directamente para preguntas rápidas o peticiones de oración.",
    href: "https://wa.me/50700000000", // TODO: replace with church WhatsApp number
    cta: "Abrir chat",
    external: true,
  },
  {
    icon: Instagram,
    label: "Instagram",
    description: "Síguenos para noticias, devocionales y actualizaciones de la iglesia.",
    href: "https://instagram.com/rocadevidapanama",
    cta: "@rocadevidapanama",
    external: true,
  },
  {
    icon: Youtube,
    label: "YouTube",
    description: "Mira nuestros servicios en vivo y el archivo completo de sermones.",
    href: "https://youtube.com/@rocadevidapanama",
    cta: "@rocadevidapanama",
    external: true,
  },
];

// ─── Map embed ────────────────────────────────────────────────────────────────
// To get the exact embed URL: open https://share.google/WR9k6jyDUSTP5TRug,
// then use Google Maps → Share → Embed a map → copy the iframe src.
const MAPS_EMBED_SRC =
  "https://maps.google.com/maps?q=Roca+de+Vida+Panama&output=embed&hl=es&z=15";
const MAPS_SHARE_URL = "https://share.google/WR9k6jyDUSTP5TRug";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative bg-bg-base overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 100% 70% at 50% 0%, rgba(198,168,103,0.08) 0%, transparent 65%)" }}
          aria-hidden
        />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" aria-hidden />

        <Container className="pt-36 pb-20 relative z-10">
          <AnimateIn variant="fadeUp">
            <p className="text-label text-gold mb-4">Contacto</p>
            <h1 className="text-display text-text-primary leading-none max-w-[14ch]">
              Estamos aquí<br />para ti
            </h1>
            <p className="text-lead text-text-secondary mt-6 max-w-[44ch]">
              Cualquier pregunta, petición de oración o deseo de conectar — la puerta siempre está abierta.
            </p>
          </AnimateIn>
        </Container>
      </section>

      {/* ── Mapa + Horarios ───────────────────────────────────────── */}
      <section className="bg-bg-surface border-t border-border">
        <Container section className="grid lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Mapa */}
          <AnimateIn variant="fadeRight" amount={0.15}>
            <div className="relative rounded-2xl overflow-hidden border border-border h-full min-h-[380px]">
              <iframe
                title="Ubicación de Roca de Vida Panamá"
                src={MAPS_EMBED_SRC}
                width="100%"
                height="100%"
                className="absolute inset-0 w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, filter: "grayscale(0.2) contrast(1.02)" }}
              />
            </div>
          </AnimateIn>

          {/* Info */}
          <AnimateIn variant="fadeLeft" amount={0.15} className="flex flex-col gap-6">

            {/* Dirección */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-bg-raised border border-border flex items-center justify-center shrink-0">
                  <MapPin size={15} strokeWidth={1.5} className="text-gold" aria-hidden />
                </div>
                <p className="text-label text-gold">Dónde estamos</p>
              </div>
              <div className="pl-11 flex flex-col gap-1">
                <p className="font-display font-700 text-text-primary text-[1.0625rem]">
                  Roca de Vida Panamá
                </p>
                <p className="font-body text-[0.9rem] text-text-secondary">
                  Ciudad de Panamá, República de Panamá
                </p>
                <a
                  href={MAPS_SHARE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-label text-gold hover:text-gold-muted transition-colors mt-1 text-[0.8125rem]"
                >
                  Ver en Google Maps <span aria-hidden>→</span>
                </a>
              </div>
            </div>

            <div className="border-t border-border" aria-hidden />

            {/* Horarios */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-bg-raised border border-border flex items-center justify-center shrink-0">
                  <Clock size={15} strokeWidth={1.5} className="text-gold" aria-hidden />
                </div>
                <p className="text-label text-gold">Horarios de servicios</p>
              </div>
              <div className="pl-11 flex flex-col gap-3">
                {SCHEDULE.map(({ day, time, label }) => (
                  <div key={day} className="flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="font-display font-700 text-text-primary text-[0.9375rem]">{day}</span>
                      <span className="font-body text-[0.8125rem] text-text-muted">{label}</span>
                    </div>
                    <span className="font-body text-[0.9rem] text-text-secondary shrink-0">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-border" aria-hidden />

            {/* Nota primera visita */}
            <div className="rounded-2xl bg-bg-raised border border-border-gold/30 p-4">
              <p className="font-body text-[0.875rem] text-text-secondary leading-relaxed">
                <span className="text-gold font-display font-700">¿Primera vez?</span>{" "}
                No necesitas registrarte. Llega unos minutos antes del servicio — alguien del equipo de bienvenida te estará esperando.
              </p>
            </div>

          </AnimateIn>
        </Container>
      </section>

      {/* ── Canales de contacto ───────────────────────────────────── */}
      <section className="bg-bg-base border-t border-border">
        <Container section className="flex flex-col gap-10">
          <AnimateIn>
            <SectionHeading
              label="Conéctate"
              heading="Elige cómo comunicarte"
              subheading="Estamos presentes donde estés."
              align="center"
            />
          </AnimateIn>

          <StaggerContainer className="grid sm:grid-cols-3 gap-5" staggerDelay={0.1}>
            {CHANNELS.map(({ icon: Icon, label, description, href, cta, external }) => (
              <AnimateInItem key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={cn(
                    "group flex flex-col gap-4 p-6 rounded-2xl h-full",
                    "bg-bg-surface border border-border hover:border-border-gold",
                    "transition-colors duration-300"
                  )}
                >
                  <div className="w-10 h-10 rounded-2xl bg-bg-raised border border-border flex items-center justify-center group-hover:border-border-gold transition-colors">
                    <Icon size={18} strokeWidth={1.5} className="text-gold" aria-hidden />
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <h3 className="font-display font-700 text-text-primary text-[1rem] group-hover:text-gold transition-colors">
                      {label}
                    </h3>
                    <p className="font-body text-[0.8125rem] text-text-secondary leading-snug">
                      {description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-label text-gold text-[0.8125rem]">{cta}</span>
                    <span className="text-gold group-hover:translate-x-1 transition-transform duration-200" aria-hidden>→</span>
                  </div>
                </a>
              </AnimateInItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── Equipo pastoral ───────────────────────────────────────── */}
      <section className="bg-bg-surface border-t border-border">
        <Container section className="flex flex-col gap-10">
          <AnimateIn>
            <SectionHeading
              label="Liderazgo"
              heading="Equipo pastoral"
              subheading="Puedes contactarnos directamente o a través del formulario más abajo."
            />
          </AnimateIn>

          <StaggerContainer className="grid sm:grid-cols-3 gap-5" staggerDelay={0.1}>
            {PASTORS.map(({ name, role, initials }) => (
              <AnimateInItem key={name}>
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-bg-raised border border-border">
                  {/* Avatar placeholder */}
                  <div className="w-12 h-12 rounded-full bg-bg-surface border border-border flex items-center justify-center shrink-0">
                    <span className="font-display font-700 text-gold text-[0.75rem] tracking-wide">
                      {initials}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <p className="font-display font-700 text-text-primary text-[0.9375rem] leading-tight truncate">
                      {name}
                    </p>
                    <p className="font-body text-[0.8125rem] text-text-muted">{role}</p>
                  </div>
                </div>
              </AnimateInItem>
            ))}
          </StaggerContainer>

          <AnimateIn variant="fadeUp">
            <Link
              href="/nosotros/equipo"
              className="inline-flex items-center gap-2 text-label text-gold hover:text-gold-muted transition-colors"
            >
              Ver equipo completo <span aria-hidden>→</span>
            </Link>
          </AnimateIn>
        </Container>
      </section>

      {/* ── Formulario de contacto ────────────────────────────────── */}
      <section className="bg-bg-base border-t border-border">
        <Container section size="narrow" className="flex flex-col gap-8">
          <AnimateIn>
            <SectionHeading
              label="Escríbenos"
              heading="¿En qué podemos ayudarte?"
              subheading="Completa el formulario y alguien del equipo te responderá en las próximas 24–48 horas."
            />
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.1}>
            <ContactForm />
          </AnimateIn>
        </Container>
      </section>

      {/* ── Sub-páginas de contacto ───────────────────────────────── */}
      <section className="bg-bg-surface border-t border-border">
        <Container className="py-8">
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <p className="text-label text-text-muted text-[0.75rem]">También puedes:</p>
            {[
              { label: "Petición de oración", href: "/contacto/oracion" },
              { label: "Información sobre bautismo", href: "/contacto/bautismo" },
              { label: "Solicitar consejería", href: "/contacto/consejeria" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-label text-[0.8125rem] text-text-secondary hover:text-gold transition-colors"
              >
                {label} →
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
