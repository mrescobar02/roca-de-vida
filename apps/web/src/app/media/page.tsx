import type { Metadata } from "next";
import Link from "next/link";
import { Play, Radio, Mic, BookOpen } from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AnimateIn, StaggerContainer, AnimateInItem } from "@/components/common/AnimateIn";
import { cn } from "@rdv/utils";

export const metadata: Metadata = {
  title: "Media | Roca de Vida Panamá",
  description: "Sermones, transmisiones en vivo, podcast y estudios bíblicos de Roca de Vida Panamá.",
};

const MEDIA_SECTIONS = [
  {
    icon: Play,
    label: "Prédicas",
    title: "Archivo de sermones",
    description: "Accede a todos nuestros mensajes. Filtra por serie, pastor o fecha.",
    href: "/media/sermones",
    cta: "Ver sermones",
    accent: "gold",
  },
  {
    icon: Radio,
    label: "En Vivo",
    title: "Servicio en vivo",
    description: "Sigue nuestros servicios en tiempo real todos los domingos.",
    href: "/media/en-vivo",
    cta: "Ver transmisión",
    accent: "red",
  },
  {
    icon: Mic,
    label: "Podcast",
    title: "RDV Podcast",
    description: "Escúchanos en Spotify y Apple Podcasts. Mensajes para tu semana.",
    href: "/media/podcast",
    cta: "Escuchar podcast",
    accent: "green",
  },
  {
    icon: BookOpen,
    label: "Estudios",
    title: "Estudios bíblicos",
    description: "Estudios expositivos profundos: libro por libro, tema por tema.",
    href: "/media/estudios",
    cta: "Ver estudios",
    accent: "blue",
  },
] as const;

const ACCENT_CLASSES: Record<string, string> = {
  gold: "text-gold border-gold/30 group-hover:border-gold/60",
  red: "text-red-400 border-red-400/30 group-hover:border-red-400/60",
  green: "text-green-400 border-green-400/30 group-hover:border-green-400/60",
  blue: "text-blue-400 border-blue-400/30 group-hover:border-blue-400/60",
};

export default function MediaPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-bg-base overflow-hidden">
        <div
          className="absolute inset-0 opacity-25"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,204,77,0.12) 0%, transparent 70%)" }}
          aria-hidden
        />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" aria-hidden />

        <Container className="pt-32 pb-16 relative z-10">
          <AnimateIn variant="fadeUp">
            <SectionHeading
              label="Media"
              heading="Contenido para tu vida"
              subheading="Sermones, transmisiones en vivo, podcast y estudios bíblicos — todo en un lugar."
              align="center"
            />
          </AnimateIn>
        </Container>
      </section>

      {/* Cards de secciones */}
      <section className="bg-bg-base">
        <Container section>
          <StaggerContainer
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
            staggerDelay={0.1}
          >
            {MEDIA_SECTIONS.map(({ icon: Icon, label, title, description, href, cta, accent }) => (
              <AnimateInItem key={href}>
                <Link
                  href={href}
                  className={cn(
                    "group flex flex-col gap-5 p-6 h-full rounded-2xl",
                    "bg-bg-surface border transition-all duration-300",
                    ACCENT_CLASSES[accent]
                  )}
                >
                  <div className={cn("w-12 h-12 rounded-2xl bg-bg-raised border flex items-center justify-center transition-colors duration-300", ACCENT_CLASSES[accent])}>
                    <Icon size={20} strokeWidth={1.5} aria-hidden />
                  </div>

                  <div className="flex flex-col gap-2 flex-1">
                    <p className={cn("text-label text-[0.6875rem]", ACCENT_CLASSES[accent].split(" ")[0])}>
                      {label}
                    </p>
                    <h2 className="font-display font-700 text-text-primary text-[1.125rem] leading-tight">
                      {title}
                    </h2>
                    <p className="font-body text-[0.875rem] text-text-secondary leading-snug">
                      {description}
                    </p>
                  </div>

                  <div className={cn("flex items-center gap-1.5 text-label text-[0.8125rem]", ACCENT_CLASSES[accent].split(" ")[0])}>
                    {cta}
                    <span className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden>→</span>
                  </div>
                </Link>
              </AnimateInItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>
    </>
  );
}
