import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, HandHeart, Lock, Users, Heart, BookOpen, Home } from "lucide-react";
import { Container } from "@/components/common/Container";
import { ScriptureQuote } from "@/components/common/ScriptureQuote";
import { AnimateIn, StaggerContainer, AnimateInItem } from "@/components/common/AnimateIn";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Consejería Pastoral | Roca de Vida Panamá",
  description: "Solicita una sesión de consejería pastoral en Roca de Vida Panamá. Acompañamiento bíblico y confidencial.",
};

const AREAS = [
  { icon: Home,      label: "Familia",        description: "Conflictos familiares, crianza, relaciones entre padres e hijos." },
  { icon: Heart,     label: "Matrimonio",      description: "Fortalecimiento del matrimonio, comunicación, crisis de pareja." },
  { icon: Users,     label: "Duelo y pérdida", description: "Acompañamiento en pérdidas, tristeza prolongada, procesos de duelo." },
  { icon: BookOpen,  label: "Fe y espiritualidad", description: "Dudas, crisis de fe, crecimiento espiritual, decisiones de vida." },
];

export default function ConsejeriaPage() {
  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-bg-base border-b border-border">
        <Container className="py-4">
          <nav className="flex items-center gap-2 text-label text-text-muted text-[0.75rem]" aria-label="Breadcrumb">
            <Link href="/contacto" className="hover:text-gold transition-colors">Contacto</Link>
            <ChevronRight size={12} aria-hidden />
            <span className="text-text-secondary">Consejería pastoral</span>
          </nav>
        </Container>
      </section>

      {/* Hero */}
      <section className="relative bg-bg-base overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 100% 70% at 50% 0%, rgba(198,168,103,0.07) 0%, transparent 65%)" }}
          aria-hidden
        />
        <Container className="pt-16 pb-12 relative z-10">
          <AnimateIn variant="fadeUp">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-2xl bg-bg-surface border border-border-gold/50 flex items-center justify-center">
                <HandHeart size={16} strokeWidth={1.5} className="text-gold" aria-hidden />
              </div>
              <p className="text-label text-gold">Consejería pastoral</p>
            </div>
            <h1 className="text-h1 text-text-primary leading-tight max-w-[16ch]">
              No tienes que cargarlo solo
            </h1>
            <p className="font-body text-[1rem] text-text-secondary leading-relaxed max-w-[52ch] mt-4">
              La consejería pastoral es un espacio seguro para hablar con honestidad sobre lo que estás viviendo, encontrar perspectiva bíblica y sentirte acompañado en el proceso.
            </p>
          </AnimateIn>
        </Container>
      </section>

      {/* Versículo */}
      <section className="bg-bg-surface border-y border-border">
        <Container section size="narrow">
          <AnimateIn variant="scaleIn">
            <ScriptureQuote
              text="Llevad los unos las cargas de los otros, y cumplid así la ley de Cristo."
              reference="Gálatas 6:2"
              align="center"
            />
          </AnimateIn>
        </Container>
      </section>

      {/* Importante: qué es y qué no es */}
      <section className="bg-bg-base border-b border-border">
        <Container section className="grid lg:grid-cols-2 gap-8 items-start">
          <AnimateIn variant="fadeRight" amount={0.15}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="gold-line shrink-0" aria-hidden />
                <p className="text-label text-gold">Qué ofrecemos</p>
              </div>
              <h2 className="text-h2 text-text-primary">Acompañamiento pastoral</h2>
              <div className="flex flex-col gap-3 font-body text-[0.9375rem] text-text-secondary leading-relaxed">
                <p>
                  Nuestros pastores ofrecen consejería bíblica — orientación fundamentada en las Escrituras para situaciones de vida reales. Es un espacio para ser escuchado, orar juntos y encontrar dirección.
                </p>
                <p>
                  Las sesiones son confidenciales y sin costo. Las coordinamos según la disponibilidad del equipo pastoral.
                </p>
              </div>
              <div className="flex items-start gap-2 mt-1 p-4 rounded-xl bg-bg-surface border border-border">
                <Lock size={14} strokeWidth={1.5} className="text-gold mt-0.5 shrink-0" aria-hidden />
                <p className="font-body text-[0.8125rem] text-text-secondary leading-snug">
                  <span className="text-text-primary font-semibold">Confidencialidad total.</span>{" "}
                  Lo que se habla en consejería permanece entre tú y el pastor. No se comparte con otros sin tu consentimiento.
                </p>
              </div>
            </div>
          </AnimateIn>

          <AnimateIn variant="fadeLeft" amount={0.15}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="gold-line shrink-0" aria-hidden />
                <p className="text-label text-gold">Nota importante</p>
              </div>
              <div className="flex flex-col gap-3 p-5 rounded-2xl bg-bg-surface border border-border">
                <h3 className="font-display font-700 text-text-primary text-[1rem]">
                  No somos psicólogos ni terapeutas
                </h3>
                <p className="font-body text-[0.875rem] text-text-secondary leading-relaxed">
                  La consejería pastoral es complementaria, no reemplaza la atención de un profesional de salud mental. Si tu situación requiere apoyo psicológico o psiquiátrico, te orientaremos para que encuentres el recurso adecuado.
                </p>
              </div>
            </div>
          </AnimateIn>
        </Container>
      </section>

      {/* Áreas */}
      <section className="bg-bg-surface border-b border-border">
        <Container section className="flex flex-col gap-8">
          <AnimateIn>
            <h2 className="text-h2 text-text-primary">Áreas en las que podemos acompañarte</h2>
          </AnimateIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" staggerDelay={0.08}>
            {AREAS.map(({ icon: Icon, label, description }) => (
              <AnimateInItem key={label}>
                <div className="flex flex-col gap-3 p-5 rounded-2xl bg-bg-raised border border-border h-full">
                  <div className="w-9 h-9 rounded-xl bg-bg-surface border border-border flex items-center justify-center">
                    <Icon size={16} strokeWidth={1.5} className="text-gold" aria-hidden />
                  </div>
                  <h3 className="font-display font-700 text-text-primary text-[0.9375rem]">{label}</h3>
                  <p className="font-body text-[0.8125rem] text-text-secondary leading-snug">{description}</p>
                </div>
              </AnimateInItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Formulario */}
      <section className="bg-bg-base">
        <Container section size="narrow" className="flex flex-col gap-8">
          <AnimateIn>
            <div className="flex flex-col gap-3">
              <h2 className="text-h2 text-text-primary">Solicitar una sesión</h2>
              <p className="font-body text-[0.9375rem] text-text-secondary">
                Cuéntanos brevemente qué está pasando. Un pastor se pondrá en contacto contigo para coordinar una cita. No hay prisa.
              </p>
            </div>
          </AnimateIn>

          <AnimateIn variant="fadeUp" delay={0.1}>
            <ContactForm defaultSubject="consejeria" />
          </AnimateIn>
        </Container>
      </section>

      {/* Otros recursos */}
      <section className="bg-bg-surface border-t border-border">
        <Container className="py-8">
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <p className="text-label text-text-muted text-[0.75rem]">También puedes:</p>
            <Link href="/contacto/oracion" className="text-label text-[0.8125rem] text-text-secondary hover:text-gold transition-colors">
              Petición de oración →
            </Link>
            <Link href="/contacto/bautismo" className="text-label text-[0.8125rem] text-text-secondary hover:text-gold transition-colors">
              Información sobre bautismo →
            </Link>
            <Link href="/contacto" className="text-label text-[0.8125rem] text-text-secondary hover:text-gold transition-colors">
              Contacto general →
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
