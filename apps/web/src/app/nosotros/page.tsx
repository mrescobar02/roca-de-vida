import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Users, Heart, Compass } from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScriptureQuote } from "@/components/common/ScriptureQuote";
import { AnimateIn, StaggerContainer, AnimateInItem } from "@/components/common/AnimateIn";
import { cn } from "@rdv/utils";

export const metadata: Metadata = {
  title: "Quiénes somos | Roca de Vida Panamá",
  description: "Conoce la misión, visión y valores de Roca de Vida Panamá — una iglesia edificada sobre la Palabra de Dios.",
};

const VALUES = [
  {
    icon: BookOpen,
    title: "La Palabra",
    body: "Toda doctrina, decisión y dirección está anclada en la Biblia. Predicamos el texto, no tendencias.",
  },
  {
    icon: Users,
    title: "La Comunidad",
    body: "Nadie crece solo. Los grupos, los ministerios y los servicios existen para que nos necesitemos unos a otros.",
  },
  {
    icon: Heart,
    title: "La Familia",
    body: "Creemos que Dios diseñó la familia como el fundamento de la sociedad. Fortalecemos hogares.",
  },
  {
    icon: Compass,
    title: "El Evangelismo",
    body: "Somos enviados. El evangelio no es solo para los que ya están adentro — alcanzamos a quienes aún no lo conocen.",
  },
];

const SUB_PAGES = [
  {
    label: "Nuestra historia",
    href: "/nosotros/historia",
    description: "Cómo comenzó todo y hacia dónde vamos.",
  },
  {
    label: "Lo que creemos",
    href: "/nosotros/creencias",
    description: "Nuestras convicciones bíblicas y declaración de fe.",
  },
  {
    label: "Equipo pastoral",
    href: "/nosotros/equipo",
    description: "Conoce a quienes lideran esta iglesia.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative bg-bg-base overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 120% 70% at 65% 40%, #1a1000 0%, #0d0d0d 55%, #000 100%)" }}
          aria-hidden
        />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" aria-hidden />

        <Container className="pt-36 pb-24 relative z-10">
          <AnimateIn variant="fadeUp" trigger="mount" delay={0.1}>
            <p className="text-label text-gold mb-4">Nosotros</p>
            <h1 className="text-display text-text-primary leading-none max-w-[14ch]">
              Una iglesia<br />edificada<br />sobre la Roca
            </h1>
            <p className="text-lead text-text-secondary mt-6 max-w-[48ch]">
              Somos una comunidad de creyentes en Ciudad de Panamá unida por la fe en Jesucristo, el amor por su Palabra y una pasión genuina por las personas.
            </p>
          </AnimateIn>
        </Container>
      </section>

      {/* ── Misión & Visión ───────────────────────────────────────── */}
      <section className="bg-bg-surface border-t border-border">
        <Container section className="grid md:grid-cols-2 gap-10 lg:gap-20">
          <AnimateIn variant="fadeRight">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-8 bg-gold shrink-0" aria-hidden />
                <p className="text-label text-gold">Misión</p>
              </div>
              <h2 className="text-h2 text-text-primary">¿Por qué existimos?</h2>
              <p className="font-body text-[1rem] text-text-secondary leading-relaxed">
                Ser una comunidad que glorifica a Dios mediante la predicación fiel de su Palabra, el discipulado genuino y el alcance evangelístico de nuestra ciudad y el mundo.
              </p>
            </div>
          </AnimateIn>

          <AnimateIn variant="fadeLeft" delay={0.1}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-8 bg-gold shrink-0" aria-hidden />
                <p className="text-label text-gold">Visión</p>
              </div>
              <h2 className="text-h2 text-text-primary">¿Hacia dónde vamos?</h2>
              <p className="font-body text-[1rem] text-text-secondary leading-relaxed">
                Ver a Panamá transformada por el evangelio de Jesucristo — iglesias plantadas, familias restauradas y una generación levantada para el avance del Reino.
              </p>
            </div>
          </AnimateIn>
        </Container>
      </section>

      {/* ── Versículo ─────────────────────────────────────────────── */}
      <section className="bg-bg-base">
        <Container section size="narrow">
          <AnimateIn variant="scaleIn">
            <ScriptureQuote
              text="Porque nadie puede poner otro fundamento que el que está puesto, el cual es Jesucristo."
              reference="1 Corintios 3:11"
              size="large"
              align="center"
            />
          </AnimateIn>
        </Container>
      </section>

      {/* ── Valores ───────────────────────────────────────────────── */}
      <section className="bg-bg-surface border-t border-border">
        <Container section className="flex flex-col gap-10">
          <AnimateIn>
            <SectionHeading
              label="Identidad"
              heading="Lo que nos define"
              subheading="Cuatro convicciones que guían todo lo que hacemos."
            />
          </AnimateIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.08}>
            {VALUES.map(({ icon: Icon, title, body }) => (
              <AnimateInItem key={title}>
                <div className="flex flex-col gap-4 p-6 rounded-2xl bg-bg-raised border border-border h-full">
                  <div className="w-10 h-10 rounded-2xl bg-bg-surface border border-border flex items-center justify-center shrink-0">
                    <Icon size={18} strokeWidth={1.5} className="text-gold" aria-hidden />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-display font-700 text-text-primary text-[1rem]">{title}</h3>
                    <p className="font-body text-[0.875rem] text-text-secondary leading-relaxed">{body}</p>
                  </div>
                </div>
              </AnimateInItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── Explora más ───────────────────────────────────────────── */}
      <section className="bg-bg-base border-t border-border">
        <Container section className="flex flex-col gap-10">
          <AnimateIn>
            <SectionHeading
              label="Conoce más"
              heading="Hay más por descubrir"
            />
          </AnimateIn>

          <StaggerContainer className="grid sm:grid-cols-3 gap-5" staggerDelay={0.1}>
            {SUB_PAGES.map(({ label, href, description }) => (
              <AnimateInItem key={href}>
                <Link
                  href={href}
                  className={cn(
                    "group flex flex-col gap-3 p-6 rounded-2xl h-full",
                    "bg-bg-surface border border-border hover:border-border-gold",
                    "transition-colors duration-300"
                  )}
                >
                  <h3 className="font-display font-700 text-text-primary text-[1.0625rem] group-hover:text-gold transition-colors">
                    {label}
                  </h3>
                  <p className="font-body text-[0.875rem] text-text-secondary leading-snug flex-1">
                    {description}
                  </p>
                  <div className="flex items-center gap-1.5 mt-auto">
                    <span className="text-label text-gold text-[0.8125rem]">Explorar</span>
                    <span className="text-gold group-hover:translate-x-1 transition-transform duration-200" aria-hidden>→</span>
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
