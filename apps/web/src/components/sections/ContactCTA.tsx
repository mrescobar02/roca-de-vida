import Link from "next/link";
import { MessageCircle, MapPin, Play } from "lucide-react";
import { Container } from "@/components/common/Container";
import { AnimateIn, StaggerContainer, AnimateInItem } from "@/components/common/AnimateIn";
import { cn } from "@rdv/utils";

export function ContactCTA() {
  const actions = [
    {
      icon: MapPin,
      label: "Visítanos",
      description: "Ven a uno de nuestros servicios. Siempre hay un lugar para ti.",
      href: "/contacto",
      cta: "Cómo llegar",
    },
    {
      icon: MessageCircle,
      label: "¿Tienes preguntas?",
      description: "Nuestro equipo está disponible para responder cualquier duda.",
      href: "/contacto",
      cta: "Escríbenos",
    },
    {
      icon: Play,
      label: "Ver en línea",
      description: "Sigue nuestros servicios en vivo o accede al archivo de sermones.",
      href: "/media/en-vivo",
      cta: "Ver transmisión",
    },
  ];

  return (
    <section className="bg-bg-base border-t border-border">
      <Container section className="flex flex-col gap-10">

        <AnimateIn>
          <div className="text-center">
            <p className="text-label text-gold mb-3">¿Primera vez?</p>
            <h2 className="text-h2 text-text-primary">
              Nos alegra tenerte aquí
            </h2>
          </div>
        </AnimateIn>

        <StaggerContainer
          className="grid sm:grid-cols-3 gap-5"
          staggerDelay={0.1}
        >
          {actions.map(({ icon: Icon, label, description, href, cta }) => (
            <AnimateInItem key={label}>
              <Link
                href={href}
                className={cn(
                  "group flex flex-col gap-4 p-6 rounded-2xl",
                  "bg-bg-surface border border-border hover:border-border-gold",
                  "transition-colors duration-300"
                )}
              >
                <div className="w-10 h-10 rounded-2xl bg-bg-raised border border-border flex items-center justify-center group-hover:border-border-gold transition-colors">
                  <Icon size={18} strokeWidth={1.5} className="text-gold" aria-hidden />
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display font-700 text-text-primary text-[1rem] leading-tight group-hover:text-gold transition-colors">
                    {label}
                  </h3>
                  <p className="font-body text-[0.8125rem] text-text-secondary leading-snug">
                    {description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 mt-auto">
                  <span className="text-label text-gold text-[0.8125rem]">{cta}</span>
                  <span
                    className="text-gold group-hover:translate-x-1 transition-transform duration-200"
                    aria-hidden
                  >
                    →
                  </span>
                </div>
              </Link>
            </AnimateInItem>
          ))}
        </StaggerContainer>

      </Container>
    </section>
  );
}
