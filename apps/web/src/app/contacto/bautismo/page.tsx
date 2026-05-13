import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Droplets } from "lucide-react";
import { Container } from "@/components/common/Container";
import { ScriptureQuote } from "@/components/common/ScriptureQuote";
import { AnimateIn, StaggerContainer, AnimateInItem } from "@/components/common/AnimateIn";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Bautismo | Roca de Vida Panamá",
  description: "¿Quieres bautizarte? Conoce qué es el bautismo, por qué es importante y cómo dar el siguiente paso en Roca de Vida.",
};

const STEPS = [
  {
    step: "01",
    title: "Asiste a un servicio",
    body: "El primer paso es visitar nuestra iglesia y experimentar la comunidad. Si ya asistes, ya estás en el camino.",
  },
  {
    step: "02",
    title: "Habla con un pastor",
    body: "Luego de completar este formulario, uno de nuestros pastores te contactará para tener una conversación personal sobre tu fe y decisión.",
  },
  {
    step: "03",
    title: "Tu bautismo",
    body: "Coordinamos juntos la fecha y preparación. El bautismo se realiza durante uno de nuestros servicios, acompañado por la iglesia.",
  },
];

const FAQS = [
  {
    q: "¿Hay edad mínima para bautizarse?",
    a: "Practicamos el bautismo de creyentes. Cualquier persona que tenga una fe personal en Cristo puede bautizarse, sin límite de edad.",
  },
  {
    q: "¿Ya me bauticé de bebé, necesito bautizarme de nuevo?",
    a: "El bautismo bíblico es una declaración pública de fe personal. Si deseas dar ese paso como creyente, hablemos — no hay presión.",
  },
  {
    q: "¿Mis familiares pueden estar presentes?",
    a: "¡Absolutamente! El bautismo es una celebración. Invita a quienes quieras que sean testigos de tu decisión.",
  },
];

export default function BautismoPage() {
  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-bg-base border-b border-border">
        <Container className="py-4">
          <nav className="flex items-center gap-2 text-label text-text-muted text-[0.75rem]" aria-label="Breadcrumb">
            <Link href="/contacto" className="hover:text-gold transition-colors">Contacto</Link>
            <ChevronRight size={12} aria-hidden />
            <span className="text-text-secondary">Bautismo</span>
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
                <Droplets size={16} strokeWidth={1.5} className="text-gold" aria-hidden />
              </div>
              <p className="text-label text-gold">Bautismo</p>
            </div>
            <h1 className="text-h1 text-text-primary leading-tight max-w-[18ch]">
              Un paso de fe que cambia todo
            </h1>
            <p className="font-body text-[1rem] text-text-secondary leading-relaxed max-w-[52ch] mt-4">
              El bautismo es una declaración pública de tu fe en Cristo. No te salva — eso ya lo hizo Él — pero es tu manera de decirle al mundo: "Pertenezco a Cristo, y no me avergüenza."
            </p>
          </AnimateIn>
        </Container>
      </section>

      {/* Versículo */}
      <section className="bg-bg-surface border-y border-border">
        <Container section size="narrow">
          <AnimateIn variant="scaleIn">
            <ScriptureQuote
              text="Porque somos sepultados juntamente con él para muerte por el bautismo, a fin de que como Cristo resucitó de los muertos por la gloria del Padre, así también nosotros andemos en vida nueva."
              reference="Romanos 6:4"
              align="center"
            />
          </AnimateIn>
        </Container>
      </section>

      {/* Qué es el bautismo */}
      <section className="bg-bg-base border-b border-border">
        <Container section className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <AnimateIn variant="fadeRight" amount={0.15}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="gold-line shrink-0" aria-hidden />
                <p className="text-label text-gold">¿Qué es el bautismo?</p>
              </div>
              <h2 className="text-h2 text-text-primary">Más que un ritual</h2>
              <div className="flex flex-col gap-3 font-body text-[0.9375rem] text-text-secondary leading-relaxed">
                <p>
                  En Roca de Vida practicamos el bautismo por inmersión — la forma más cercana a lo que enseña el Nuevo Testamento. Es un acto de obediencia y una celebración.
                </p>
                <p>
                  No es un requisito para ser salvo ni para pertenecer a nuestra iglesia. Es un paso de fe que tomas cuando estás listo, porque quieres hacerlo — no porque tengas que hacerlo.
                </p>
              </div>
            </div>
          </AnimateIn>

          <AnimateIn variant="fadeLeft" amount={0.15}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="gold-line shrink-0" aria-hidden />
                <p className="text-label text-gold">El proceso</p>
              </div>
              <div className="flex flex-col gap-4">
                {STEPS.map(({ step, title, body }) => (
                  <div key={step} className="flex gap-4">
                    <span className="font-display font-900 text-gold/30 text-[1.75rem] leading-tight w-8 shrink-0">
                      {step}
                    </span>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-display font-700 text-text-primary text-[0.9375rem]">{title}</h3>
                      <p className="font-body text-[0.875rem] text-text-secondary leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-bg-surface border-b border-border">
        <Container section size="narrow" className="flex flex-col gap-8">
          <AnimateIn>
            <h2 className="text-h2 text-text-primary">Preguntas frecuentes</h2>
          </AnimateIn>
          <StaggerContainer className="flex flex-col gap-5" staggerDelay={0.08}>
            {FAQS.map(({ q, a }) => (
              <AnimateInItem key={q} variant="fadeUp">
                <div className="flex flex-col gap-2 p-5 rounded-2xl bg-bg-raised border border-border">
                  <h3 className="font-display font-700 text-text-primary text-[0.9375rem]">{q}</h3>
                  <p className="font-body text-[0.875rem] text-text-secondary leading-relaxed">{a}</p>
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
              <h2 className="text-h2 text-text-primary">¿Listo para el siguiente paso?</h2>
              <p className="font-body text-[0.9375rem] text-text-secondary">
                Cuéntanos dónde estás en tu caminar de fe y un pastor te contactará para conversar sin presión.
              </p>
            </div>
          </AnimateIn>

          <AnimateIn variant="fadeUp" delay={0.1}>
            <ContactForm defaultSubject="bautismo" />
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
            <Link href="/contacto/consejeria" className="text-label text-[0.8125rem] text-text-secondary hover:text-gold transition-colors">
              Solicitar consejería →
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
