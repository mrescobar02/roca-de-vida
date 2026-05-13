import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Heart, Lock } from "lucide-react";
import { Container } from "@/components/common/Container";
import { ScriptureQuote } from "@/components/common/ScriptureQuote";
import { AnimateIn } from "@/components/common/AnimateIn";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Petición de Oración | Roca de Vida Panamá",
  description: "Comparte tu petición con el equipo de oración de Roca de Vida. Creemos en el poder de la oración intercesora.",
};

export default function OracionPage() {
  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-bg-base border-b border-border">
        <Container className="py-4">
          <nav className="flex items-center gap-2 text-label text-text-muted text-[0.75rem]" aria-label="Breadcrumb">
            <Link href="/contacto" className="hover:text-gold transition-colors">Contacto</Link>
            <ChevronRight size={12} aria-hidden />
            <span className="text-text-secondary">Petición de oración</span>
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
                <Heart size={16} strokeWidth={1.5} className="text-gold" aria-hidden />
              </div>
              <p className="text-label text-gold">Petición de oración</p>
            </div>
            <h1 className="text-h1 text-text-primary leading-tight max-w-[20ch]">
              Creemos en el poder de la oración
            </h1>
            <p className="font-body text-[1rem] text-text-secondary leading-relaxed max-w-[52ch] mt-4">
              No importa qué estés atravesando — enfermedad, dificultades familiares, decisiones difíciles o simplemente el peso del día a día. El equipo de intercesión de Roca de Vida está aquí para orar contigo.
            </p>
          </AnimateIn>
        </Container>
      </section>

      {/* Versículo */}
      <section className="bg-bg-surface border-y border-border">
        <Container section size="narrow">
          <AnimateIn variant="scaleIn">
            <ScriptureQuote
              text="Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias."
              reference="Filipenses 4:6"
              align="center"
            />
          </AnimateIn>
        </Container>
      </section>

      {/* Cómo funciona */}
      <section className="bg-bg-base border-b border-border">
        <Container className="py-10">
          <AnimateIn variant="fadeUp">
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                {
                  step: "01",
                  title: "Comparte tu petición",
                  body: "Describe en tus propias palabras lo que necesitas. No hay petición demasiado grande ni demasiado pequeña.",
                },
                {
                  step: "02",
                  title: "El equipo ora por ti",
                  body: "Tu petición llega al equipo de intercesión. Oramos específicamente por cada nombre y cada situación.",
                },
                {
                  step: "03",
                  title: "Recibe respuesta",
                  body: "Si incluyes tu correo, alguien del equipo te escribirá para hacerte saber que estamos orando contigo.",
                },
              ].map(({ step, title, body }) => (
                <div key={step} className="flex flex-col gap-3 p-5 rounded-2xl bg-bg-surface border border-border">
                  <span className="font-display font-900 text-gold/30 text-[2.5rem] leading-none">{step}</span>
                  <h3 className="font-display font-700 text-text-primary text-[1rem]">{title}</h3>
                  <p className="font-body text-[0.875rem] text-text-secondary leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </Container>
      </section>

      {/* Formulario */}
      <section className="bg-bg-base">
        <Container section size="narrow" className="flex flex-col gap-8">
          <AnimateIn>
            <div className="flex flex-col gap-3">
              <h2 className="text-h2 text-text-primary">Comparte tu petición</h2>
              <p className="font-body text-[0.9375rem] text-text-secondary">
                Puedes ser tan específico como desees. Tu petición es tratada con respeto y confidencialidad.
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Lock size={13} strokeWidth={1.5} className="text-text-muted" aria-hidden />
                <span className="font-body text-[0.8125rem] text-text-muted">
                  Todas las peticiones son confidenciales y solo las ve el equipo de oración.
                </span>
              </div>
            </div>
          </AnimateIn>

          <AnimateIn variant="fadeUp" delay={0.1}>
            <ContactForm defaultSubject="oracion" />
          </AnimateIn>
        </Container>
      </section>

      {/* Otros recursos */}
      <section className="bg-bg-surface border-t border-border">
        <Container className="py-8">
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <p className="text-label text-text-muted text-[0.75rem]">También puedes:</p>
            <Link href="/contacto/consejeria" className="text-label text-[0.8125rem] text-text-secondary hover:text-gold transition-colors">
              Solicitar consejería →
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
