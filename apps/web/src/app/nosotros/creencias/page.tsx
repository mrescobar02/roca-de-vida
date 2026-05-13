import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Triangle, Heart, Droplets, Wind, ArrowUpFromLine, Users, Home } from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScriptureQuote } from "@/components/common/ScriptureQuote";
import { AnimateIn, StaggerContainer, AnimateInItem } from "@/components/common/AnimateIn";

export const metadata: Metadata = {
  title: "Lo que creemos | Roca de Vida Panamá",
  description: "Declaración de fe y creencias doctrinales de Roca de Vida Panamá.",
};

const BELIEFS = [
  {
    icon: BookOpen,
    title: "La Biblia",
    body: "Creemos que toda la Escritura es inspirada por Dios y es útil para enseñar, redargüir, corregir e instruir en justicia. La Biblia es la autoridad final en todas las cuestiones de fe y práctica.",
    verse: "2 Timoteo 3:16-17",
  },
  {
    icon: Triangle,
    title: "La Trinidad",
    body: "Creemos en un solo Dios, eterno y todopoderoso, que se revela en tres personas co-iguales y co-eternas: el Padre, el Hijo Jesucristo y el Espíritu Santo.",
    verse: "Mateo 28:19",
  },
  {
    icon: Heart,
    title: "La Salvación",
    body: "Creemos que la salvación es solo por gracia, solo mediante la fe, solo en Cristo. Nadie puede merecer el favor de Dios — es un don gratuito recibido por medio del arrepentimiento y la fe.",
    verse: "Efesios 2:8-9",
  },
  {
    icon: Droplets,
    title: "El Bautismo",
    body: "Creemos en el bautismo por inmersión de creyentes como acto de obediencia y testimonio público de una fe ya ejercida. El bautismo no salva, pero declara la salvación.",
    verse: "Romanos 6:4",
  },
  {
    icon: Wind,
    title: "El Espíritu Santo",
    body: "Creemos en la persona y obra del Espíritu Santo, quien habita en cada creyente al momento de la conversión, capacitándole para vivir una vida santa y servir con dones espirituales.",
    verse: "1 Corintios 12:7",
  },
  {
    icon: ArrowUpFromLine,
    title: "La Segunda Venida",
    body: "Creemos en el retorno literal, físico y glorioso de Jesucristo. Vivimos con esperanza, preparándonos para ese día y llevando el evangelio a toda nación.",
    verse: "Hechos 1:11",
  },
  {
    icon: Users,
    title: "La Iglesia",
    body: "Creemos que la iglesia local es la expresión visible del cuerpo de Cristo — una comunidad de creyentes que se reúne para adorar, crecer y servir juntos.",
    verse: "Hebreos 10:25",
  },
  {
    icon: Home,
    title: "La Familia",
    body: "Creemos que Dios instituyó la familia como fundamento de la sociedad. El matrimonio es la unión de un hombre y una mujer, reflejo del amor de Cristo por su iglesia.",
    verse: "Efesios 5:25",
  },
];

export default function CreenciasPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative bg-bg-base overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(198,168,103,0.07) 0%, transparent 65%)" }}
          aria-hidden
        />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" aria-hidden />

        <Container className="pt-36 pb-20 relative z-10">
          <AnimateIn variant="fadeUp" trigger="mount" delay={0.1}>
            <p className="text-label text-gold mb-4">Nosotros</p>
            <h1 className="text-display text-text-primary leading-none max-w-[14ch]">
              Lo que<br />creemos
            </h1>
            <p className="text-lead text-text-secondary mt-6 max-w-[46ch]">
              Nuestras convicciones no son opiniones — están ancladas en la Palabra de Dios. Aquí están los pilares que definen nuestra fe y práctica.
            </p>
          </AnimateIn>
        </Container>
      </section>

      {/* ── Versículo ─────────────────────────────────────────────── */}
      <section className="bg-bg-surface border-t border-border">
        <Container section size="narrow">
          <AnimateIn variant="scaleIn">
            <ScriptureQuote
              text="Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia."
              reference="2 Timoteo 3:16"
              size="large"
              align="center"
            />
          </AnimateIn>
        </Container>
      </section>

      {/* ── Creencias ─────────────────────────────────────────────── */}
      <section className="bg-bg-base border-t border-border">
        <Container section className="flex flex-col gap-10">
          <AnimateIn>
            <SectionHeading
              label="Declaración de fe"
              heading="Nuestras convicciones"
              subheading="Estos son los fundamentos bíblicos sobre los que edificamos todo."
            />
          </AnimateIn>

          <StaggerContainer
            className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5"
            staggerDelay={0.06}
          >
            {BELIEFS.map(({ icon: Icon, title, body, verse }) => (
              <AnimateInItem key={title}>
                <article className="flex gap-5 p-6 rounded-2xl bg-bg-surface border border-border hover:border-border-gold transition-colors duration-300 h-full">
                  <div className="w-10 h-10 rounded-xl bg-bg-raised border border-border flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={16} strokeWidth={1.5} className="text-gold" aria-hidden />
                  </div>
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <h3 className="font-display font-700 text-text-primary text-[1rem]">{title}</h3>
                      <span className="text-label text-[0.6875rem] text-gold shrink-0">{verse}</span>
                    </div>
                    <p className="font-body text-[0.875rem] text-text-secondary leading-relaxed">{body}</p>
                  </div>
                </article>
              </AnimateInItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── Preguntas ─────────────────────────────────────────────── */}
      <section className="bg-bg-surface border-t border-border">
        <Container section size="narrow" className="flex flex-col items-center gap-5 text-center">
          <AnimateIn variant="fadeUp">
            <h2 className="text-h2 text-text-primary">¿Tienes preguntas sobre la fe?</h2>
            <p className="font-body text-[1rem] text-text-secondary mt-3 max-w-[44ch] mx-auto">
              Nuestro equipo estará feliz de conversar contigo. No hay pregunta demasiado grande ni demasiado pequeña.
            </p>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.1}>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 font-display font-700 text-gold hover:text-gold-muted transition-colors"
            >
              Hablar con el equipo <span aria-hidden>→</span>
            </Link>
          </AnimateIn>
        </Container>
      </section>

      {/* ── Nav ───────────────────────────────────────────────────── */}
      <section className="bg-bg-base border-t border-border">
        <Container className="py-8">
          <Link
            href="/nosotros"
            className="flex items-center gap-2 text-label text-text-muted hover:text-gold transition-colors"
          >
            <span aria-hidden>←</span> Quiénes somos
          </Link>
        </Container>
      </section>
    </>
  );
}
