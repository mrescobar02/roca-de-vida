import Link from "next/link";
import Image from "next/image";
import { Compass, Tv, Users } from "lucide-react";
import { cn } from "@rdv/utils";
import { Button, ButtonArrow } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimateIn } from "@/components/common/AnimateIn";

interface ServiceTime {
  day: string;
  time: string;
  label?: string;
}

export interface HeroSectionProps {
  headline?: string;
  subheading?: string;
  backgroundImage?: { url: string; alt: string };
  isLive?: boolean;
  serviceSchedule?: ServiceTime[];
}

const DEFAULT_SCHEDULE: ServiceTime[] = [
  { day: "Martes", time: "7:00 PM", label: "Servicio de oración" },
  { day: "Miércoles", time: "8:30 PM", label: "Estudio bíblico" },
  { day: "Domingo", time: "10:30 AM", label: "Servicio principal" },
];

export function HeroSection({
  headline = "Una iglesia firme sobre la Roca",
  subheading = "Edificando vidas, fortaleciendo familias y alcanzando nuestra ciudad de Panamá.",
  backgroundImage,
  isLive = false,
  serviceSchedule = DEFAULT_SCHEDULE,
}: HeroSectionProps) {
  return (
    <section
      className="relative min-h-svh flex flex-col justify-center overflow-hidden"
      aria-label="Bienvenida"
    >
      {/* Fondo */}
      <div className="absolute inset-0 bg-bg-base">
        {backgroundImage ? (
          <Image
            src={backgroundImage.url}
            alt={backgroundImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        ) : (
          /* Placeholder visual hasta tener fotografía real */
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 120% 80% at 60% 40%, #1a1a1a 0%, #0d0d0d 50%, #000 100%)",
            }}
          />
        )}
        {/* Overlay principal */}
        <div className="absolute inset-0 overlay-hero" aria-hidden />
        {/* Gradiente extra en el borde inferior para transición suave */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg-base to-transparent"
          aria-hidden
        />
      </div>

      {/* Indicador En Vivo */}
      {isLive && (
        <div className="absolute top-24 left-0 right-0 z-10">
          <div className="container-main">
            <Link href="/media/en-vivo" className="inline-flex items-center gap-2 group">
              <Badge variant="live">● EN VIVO</Badge>
              <span className="text-label text-text-secondary group-hover:text-gold transition-colors text-[0.75rem]">
                Ver transmisión →
              </span>
            </Link>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <div className="relative z-10 container-main pt-32 pb-24">
        <AnimateIn variant="fadeUp" delay={0.15} trigger="mount">
          <p className="text-label text-gold mb-4">Roca de Vida Panamá</p>
        </AnimateIn>

        <AnimateIn variant="fadeUp" delay={0.3} trigger="mount">
          <h1 className="text-display text-text-primary max-w-[16ch] leading-[0.95]">
            {headline.includes("Roca") ? (
              <>
                {headline.split("Roca")[0]}
                <span className="text-gold">Roca</span>
                {headline.split("Roca")[1]}
              </>
            ) : (
              headline
            )}
          </h1>
        </AnimateIn>

        <AnimateIn variant="fadeUp" delay={0.45} trigger="mount">
          <p className="text-lead text-text-secondary mt-6 max-w-[42ch]">
            {subheading}
          </p>
        </AnimateIn>

        <AnimateIn variant="fadeUp" delay={0.6} trigger="mount">
          <div className="flex flex-wrap gap-4 mt-10">
            <Button variant="primary" size="lg" asChild>
              <Link href="/nosotros">Conócenos</Link>
            </Button>
            <Button variant="ghost" size="lg" className="group" asChild>
              <Link href="/media/sermones">
                Ver prédica <ButtonArrow />
              </Link>
            </Button>
          </div>
        </AnimateIn>

        {/* Accesos rápidos — glass cards */}
        <AnimateIn variant="fadeUp" delay={0.75} trigger="mount">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10 max-w-2xl">
            {[
              {
                Icon: Compass,
                label: "Tu primer paso",
                desc: "Únete este domingo",
                href: "/contacto",
              },
              {
                Icon: Tv,
                label: "Ver en línea",
                desc: "Prédicas y en vivo",
                href: "/media/en-vivo",
              },
              {
                Icon: Users,
                label: "Encuentra un grupo",
                desc: "Grupos cerca de ti",
                href: "/grupos",
              },
            ].map(({ Icon, label, desc, href }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "group flex items-center gap-3 px-4 py-3.5 rounded-2xl",
                  "glass-card hover:border-border-gold",
                  "transition-all duration-300"
                )}
              >
                <div className="w-9 h-9 rounded-xl bg-gold/10 border border-border-gold flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors duration-300">
                  <Icon size={16} strokeWidth={1.5} className="text-gold" aria-hidden />
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="font-display font-700 text-text-primary text-[0.875rem] leading-tight group-hover:text-gold transition-colors duration-200">
                    {label}
                  </span>
                  <span className="font-body text-[0.75rem] text-text-muted leading-tight">
                    {desc}
                  </span>
                </div>
                <span className="ml-auto text-text-muted group-hover:text-gold group-hover:translate-x-0.5 transition-all duration-200 text-[0.875rem]" aria-hidden>→</span>
              </Link>
            ))}
          </div>
        </AnimateIn>
      </div>

      {/* Scroll cue */}
      <AnimateIn
        variant="fadeUp"
        delay={2}
        trigger="mount"
        className="relative z-10 flex justify-center pb-8 mt-auto"
      >
        <div className="flex flex-col items-center gap-3" aria-hidden>
          <div className="relative w-[1px] h-14 bg-white/10 overflow-hidden">
            <span className="absolute left-0 top-0 w-full h-1/2 bg-gold animate-scroll-cue" />
          </div>
          <span className="font-body text-text-muted text-[0.625rem] tracking-[0.22em] uppercase">
            Desliza para explorar
          </span>
        </div>
      </AnimateIn>

      {/* Service Times Strip */}
      <div className="relative z-10">
        <div
          className="bg-bg-surface/80 backdrop-blur-md border-t border-border"
        >
          <div className="container-main">
            <div className="flex flex-wrap items-center gap-0 divide-x divide-border">
              <span className="text-label text-gold pr-6 py-4 text-[0.6875rem] shrink-0">
                HORARIOS
              </span>
              {serviceSchedule.map((s, i) => (
                <div key={i} className="flex flex-col px-6 py-4">
                  <span className="font-display font-700 text-text-primary text-[0.875rem] leading-tight">
                    {s.day} · {s.time}
                  </span>
                  {s.label && (
                    <span className="text-label text-text-muted text-[0.625rem]">
                      {s.label}
                    </span>
                  )}
                </div>
              ))}
              <div className="ml-auto pl-6 py-4 hidden sm:block">
                <Link
                  href="/contacto"
                  className="font-display font-700 text-[0.8125rem] text-gold hover:text-gold-muted transition-colors"
                >
                  Visítanos →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
