import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Banknote, Smartphone, ShieldCheck, Lock } from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScriptureQuote } from "@/components/common/ScriptureQuote";
import { AnimateIn, StaggerContainer, AnimateInItem } from "@/components/common/AnimateIn";
import { TilopayForm } from "./TilopayForm";

export const metadata: Metadata = {
  title: "Donaciones | Roca de Vida Panamá",
  description: "Apoya la visión de Roca de Vida Panamá. Tu generosidad transforma vidas.",
};

const IMPACT_STATS = [
  { value: "8",    label: "ministerios activos" },
  { value: "24",   label: "grupos celulares" },
  { value: "380+", label: "personas en comunidad" },
  { value: "15+",  label: "sermones al mes" },
];

const BANK_DETAILS = [
  { label: "Banco",    value: "Banco Nacional de Panamá" },
  { label: "Cuenta",  value: "123-456-789-0" },
  { label: "Titular", value: "Iglesia Roca de Vida Panamá" },
  { label: "RUC",     value: "XXX-XXX-XXXXX" },
];

export default function DonacionesPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative bg-bg-base overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: "radial-gradient(ellipse 100% 60% at 50% 100%, rgba(255,204,77,0.12) 0%, transparent 70%)" }}
          aria-hidden
        />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" aria-hidden />

        <Container size="narrow" className="pt-32 pb-16 relative z-10 flex flex-col items-center text-center gap-6">
          <AnimateIn variant="fadeUp" trigger="mount">
            <div className="w-14 h-14 rounded-full bg-gold/10 border border-border-gold flex items-center justify-center mx-auto mb-2">
              <Heart size={22} strokeWidth={1.5} className="text-gold" aria-hidden />
            </div>
            <p className="text-label text-gold">Donaciones</p>
            <h1 className="text-display text-text-primary leading-none mt-3">
              Tu generosidad<br />transforma vidas
            </h1>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.2}>
            <p className="font-body text-[1.0625rem] text-text-secondary leading-relaxed max-w-[50ch]">
              Cada donación hace posible que continuemos alcanzando a Panamá con el evangelio — a través de ministerios, grupos celulares, programas comunitarios y medios digitales.
            </p>
          </AnimateIn>
        </Container>
      </section>

      {/* ── Versículo ─────────────────────────────────────────────── */}
      <section className="bg-bg-surface border-y border-border">
        <Container section size="narrow">
          <AnimateIn variant="scaleIn">
            <ScriptureQuote
              text="Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre."
              reference="2 Corintios 9:7"
              align="center"
              size="large"
            />
          </AnimateIn>
        </Container>
      </section>

      {/* ── Métodos de pago ───────────────────────────────────────── */}
      <section className="bg-bg-base border-b border-border">
        <Container section className="flex flex-col gap-10">
          <AnimateIn>
            <SectionHeading
              label="Métodos de pago"
              heading="Cómo donar"
              subheading="Elige el método que más te convenga. Todos los fondos van directamente a la iglesia."
            />
          </AnimateIn>

          <div className="flex flex-col gap-5">
            {/* Tilopay — tarjeta prominente */}
            <AnimateIn variant="fadeUp">
              <div className="relative overflow-hidden rounded-2xl border border-border-gold bg-bg-raised p-6 sm:p-8">
                {/* Fondo decorativo */}
                <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 80% 60% at 100% 0%, rgba(255,204,77,1) 0%, transparent 60%)" }}
                  aria-hidden
                />

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-start gap-8">
                  {/* Info */}
                  <div className="flex flex-col gap-4 lg:w-80 shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-gold/10 border border-border-gold flex items-center justify-center shrink-0">
                        <CreditCardIcon />
                      </div>
                      <div>
                        <h3 className="font-display font-700 text-text-primary text-[1.125rem]">
                          Pago con tarjeta
                        </h3>
                        <p className="text-label text-text-muted text-[0.75rem]">vía Tilopay</p>
                      </div>
                    </div>
                    <p className="font-body text-[0.9375rem] text-text-secondary leading-relaxed">
                      Dona con tarjeta de crédito o débito de forma rápida y segura. Aceptamos Visa, Mastercard y American Express.
                    </p>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-text-muted">
                        <ShieldCheck size={13} strokeWidth={1.5} aria-hidden />
                        <span className="font-body text-[0.8125rem]">Cifrado SSL de 256 bits</span>
                      </div>
                      <div className="flex items-center gap-2 text-text-muted">
                        <Lock size={13} strokeWidth={1.5} aria-hidden />
                        <span className="font-body text-[0.8125rem]">No almacenamos datos de tarjeta</span>
                      </div>
                    </div>
                  </div>

                  {/* Formulario */}
                  <div className="flex-1 min-w-0">
                    <TilopayForm />
                  </div>
                </div>
              </div>
            </AnimateIn>

            {/* Yappy + Transferencia */}
            <StaggerContainer className="grid sm:grid-cols-2 gap-5" staggerDelay={0.1}>
              {/* Yappy */}
              <AnimateInItem>
                <div className="flex flex-col gap-5 p-6 bg-bg-raised border border-border rounded-2xl hover:border-border-gold transition-colors h-full">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-bg-surface border border-border flex items-center justify-center shrink-0">
                      <Smartphone size={18} strokeWidth={1.5} className="text-gold" aria-hidden />
                    </div>
                    <h3 className="font-display font-700 text-text-primary text-[1.0625rem]">Yappy</h3>
                  </div>

                  <div className="flex gap-5 items-start">
                    {/* QR */}
                    <div className="shrink-0">
                      <div className="w-28 h-28 rounded-xl border border-border bg-white flex items-center justify-center overflow-hidden">
                        {/* Reemplazar con: <Image src="/images/yappy-qr.png" alt="QR Yappy Roca de Vida" width={112} height={112} /> */}
                        <div className="flex flex-col items-center gap-1 p-2 text-center">
                          <span className="text-[0.5rem] text-neutral-400 leading-tight">QR próximamente</span>
                        </div>
                      </div>
                    </div>

                    {/* Datos */}
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-label text-text-muted text-[0.625rem]">Usuario Yappy</span>
                        <span className="font-display font-700 text-gold text-[1.125rem] tracking-tight">
                          @rocadevidapanama
                        </span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-label text-text-muted text-[0.625rem]">Titular</span>
                        <span className="font-body text-[0.9375rem] text-text-primary font-medium">
                          Iglesia Roca de Vida Panamá
                        </span>
                      </div>
                      <p className="font-body text-[0.8125rem] text-text-muted leading-snug">
                        Abre Yappy, escanea el QR o busca el usuario directamente.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateInItem>

              {/* Transferencia bancaria */}
              <AnimateInItem>
                <div className="flex flex-col gap-5 p-6 bg-bg-raised border border-border rounded-2xl hover:border-border-gold transition-colors h-full">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-bg-surface border border-border flex items-center justify-center shrink-0">
                      <Banknote size={18} strokeWidth={1.5} className="text-gold" aria-hidden />
                    </div>
                    <h3 className="font-display font-700 text-text-primary text-[1.0625rem]">
                      Transferencia bancaria
                    </h3>
                  </div>

                  <dl className="flex flex-col gap-3">
                    {BANK_DETAILS.map(({ label, value }) => (
                      <div key={label} className="flex flex-col gap-0.5">
                        <dt className="text-label text-text-muted text-[0.625rem]">{label}</dt>
                        <dd className="font-body text-[0.9375rem] text-text-primary font-medium">{value}</dd>
                      </div>
                    ))}
                  </dl>

                  <p className="font-body text-[0.8125rem] text-text-muted leading-snug mt-auto pt-2 border-t border-border">
                    Envía el comprobante a{" "}
                    <a
                      href="mailto:donaciones@rocadevidapanama.com"
                      className="text-gold hover:underline"
                    >
                      donaciones@rocadevidapanama.com
                    </a>
                  </p>
                </div>
              </AnimateInItem>
            </StaggerContainer>
          </div>
        </Container>
      </section>

      {/* ── Impacto ───────────────────────────────────────────────── */}
      <section className="bg-bg-surface border-b border-border">
        <Container section className="flex flex-col gap-10">
          <AnimateIn>
            <SectionHeading
              label="Impacto"
              heading="¿A dónde va tu donación?"
              subheading="Todo lo que damos se invierte en la misión de alcanzar y discipular a nuestra ciudad."
              align="center"
            />
          </AnimateIn>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4" staggerDelay={0.1}>
            {IMPACT_STATS.map(({ value, label }) => (
              <AnimateInItem key={label}>
                <div className="flex flex-col items-center gap-2 p-6 bg-bg-raised border border-border rounded-2xl text-center hover:border-border-gold transition-colors">
                  <span className="font-display font-900 text-gold text-[3rem] leading-none">{value}</span>
                  <span className="text-label text-text-muted text-[0.6875rem]">{label}</span>
                </div>
              </AnimateInItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="bg-bg-base border-t border-border">
        <Container section size="narrow" className="text-center flex flex-col items-center gap-5">
          <AnimateIn variant="fadeUp">
            <h2 className="text-h2 text-text-primary">¿Tienes preguntas sobre las donaciones?</h2>
            <p className="font-body text-[1rem] text-text-secondary mt-3">
              Escríbenos y con gusto te aclaramos cualquier duda.
            </p>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.1}>
            <a
              href="/contacto"
              className="flex items-center gap-2 font-display font-700 text-gold hover:text-gold-muted transition-colors"
            >
              Contactar al equipo <span aria-hidden>→</span>
            </a>
          </AnimateIn>
        </Container>
      </section>
    </>
  );
}

// Ícono de tarjeta de crédito (inline para no importar todo lucide solo por esto)
function CreditCardIcon() {
  return (
    <svg
      width="20" height="20" viewBox="0 0 24 24"
      fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      className="text-gold"
      aria-hidden
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}
