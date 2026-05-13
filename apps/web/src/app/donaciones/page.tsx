import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Banknote, QrCode, Smartphone } from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScriptureQuote } from "@/components/common/ScriptureQuote";
import { AnimateIn, StaggerContainer, AnimateInItem } from "@/components/common/AnimateIn";
import { cn } from "@rdv/utils";

export const metadata: Metadata = {
  title: "Donaciones | Roca de Vida Panamá",
  description: "Apoya la visión de Roca de Vida Panamá. Tu generosidad transforma vidas.",
};

// Mock del global donation-settings — reemplazar con getDonationSettings() de Payload
const DONATION_SETTINGS = {
  isEnabled: true,
  impactText: "Cada donación hace posible que continuemos alcanzando a Panamá con el evangelio — a través de ministerios, grupos celulares, programas comunitarios y medios digitales.",
  methods: [
    {
      type: "transfer",
      icon: Banknote,
      title: "Transferencia bancaria",
      details: [
        { label: "Banco", value: "Banco Nacional de Panamá" },
        { label: "Cuenta", value: "123-456-789-0" },
        { label: "Titular", value: "Iglesia Roca de Vida Panamá" },
        { label: "RUC", value: "XXX-XXX-XXXXX" },
      ],
    },
    {
      type: "yappy",
      icon: Smartphone,
      title: "Yappy",
      details: [
        { label: "Número", value: "+507 6XXX-XXXX" },
        { label: "Titular", value: "Roca de Vida Panamá" },
      ],
    },
    {
      type: "qr",
      icon: QrCode,
      title: "Código QR",
      details: [],
      qrPlaceholder: true,
    },
  ],
  impactStats: [
    { value: "8", label: "ministerios activos" },
    { value: "24", label: "grupos celulares" },
    { value: "380+", label: "personas en comunidad" },
    { value: "15+", label: "sermones al mes" },
  ],
};

export default function DonacionesPage() {
  return (
    <>
      {/* Hero */}
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
              {DONATION_SETTINGS.impactText}
            </p>
          </AnimateIn>
        </Container>
      </section>

      {/* Versículo */}
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

      {/* Impacto */}
      <section className="bg-bg-base">
        <Container section className="flex flex-col gap-10">
          <AnimateIn>
            <SectionHeading
              label="Impacto"
              heading="¿A dónde va tu donación?"
              subheading="Todo lo que damos se invierte en la misión de alcanzar y discipular a nuestra ciudad."
              align="center"
            />
          </AnimateIn>

          <StaggerContainer
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            staggerDelay={0.1}
          >
            {DONATION_SETTINGS.impactStats.map(({ value, label }) => (
              <AnimateInItem key={label}>
                <div className="flex flex-col items-center gap-2 p-6 bg-bg-surface border border-border rounded-2xl text-center hover:border-border-gold transition-colors">
                  <span className="font-display font-900 text-gold text-[3rem] leading-none">{value}</span>
                  <span className="text-label text-text-muted text-[0.6875rem]">{label}</span>
                </div>
              </AnimateInItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Métodos de donación */}
      <section className="bg-bg-surface border-t border-border">
        <Container section className="flex flex-col gap-10">
          <AnimateIn>
            <SectionHeading
              label="Métodos de pago"
              heading="Cómo donar"
              subheading="Elige el método que más te convenga. Todos los fondos van directamente a la iglesia."
            />
          </AnimateIn>

          <StaggerContainer className="grid sm:grid-cols-3 gap-5" staggerDelay={0.1}>
            {DONATION_SETTINGS.methods.map((method) => {
              const Icon = method.icon;
              return (
                <AnimateInItem key={method.type}>
                  <div className="flex flex-col gap-4 p-6 bg-bg-raised border border-border rounded-2xl hover:border-border-gold transition-colors h-full">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-bg-surface border border-border flex items-center justify-center shrink-0">
                        <Icon size={18} strokeWidth={1.5} className="text-gold" aria-hidden />
                      </div>
                      <h3 className="font-display font-700 text-text-primary text-[1.0625rem]">
                        {method.title}
                      </h3>
                    </div>

                    {method.qrPlaceholder ? (
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-36 h-36 bg-bg-surface border border-border rounded-2xl flex items-center justify-center">
                          <div className="flex flex-col items-center gap-2">
                            <QrCode size={40} strokeWidth={1} className="text-border" aria-hidden />
                            <span className="text-label text-text-muted text-[0.625rem]">QR disponible pronto</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <dl className="flex flex-col gap-2.5">
                        {method.details.map(({ label, value }) => (
                          <div key={label} className="flex flex-col gap-0.5">
                            <dt className="text-label text-text-muted text-[0.625rem]">{label}</dt>
                            <dd className="font-body text-[0.9375rem] text-text-primary font-medium">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>
                </AnimateInItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </section>

      {/* CTA final */}
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
