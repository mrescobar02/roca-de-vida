"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@rdv/utils";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AnimateIn } from "@/components/common/AnimateIn";

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  ministry?: string;
  photo?: { url: string; alt: string };
}

export interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const EASING: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [current, setCurrent] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [direction, setDirection] = React.useState(1);

  React.useEffect(() => {
    if (paused || testimonials.length <= 1) return;
    const id = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(id);
  }, [paused, testimonials.length]);

  if (!testimonials.length) return null;

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const t = testimonials[current];

  return (
    <section className="bg-bg-surface overflow-hidden">
      <Container section className="flex flex-col items-center gap-12">

        <AnimateIn>
          <SectionHeading
            label="Testimonios"
            heading="Vidas transformadas"
            subheading="Historias reales de lo que Dios está haciendo en nuestra comunidad."
            align="center"
          />
        </AnimateIn>

        {/* Carousel */}
        <div
          className="w-full max-w-2xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative min-h-[280px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={t.id}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 40 }),
                  center: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASING } },
                  exit: (d: number) => ({ opacity: 0, x: d * -30, transition: { duration: 0.3, ease: "easeIn" } }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <figure className="flex flex-col items-center gap-6 text-center px-4">
                  {/* Comilla decorativa */}
                  <span
                    className="font-display font-900 text-gold/20 text-[6rem] leading-none select-none -mb-8"
                    aria-hidden
                  >
                    "
                  </span>

                  <blockquote className="font-body text-[1.0625rem] sm:text-[1.1875rem] text-text-secondary leading-relaxed">
                    {t.quote}
                  </blockquote>

                  <figcaption className="flex flex-col items-center gap-2">
                    <div className="w-8 h-[1px] bg-gold/40" aria-hidden />
                    <p className="font-display font-700 text-text-primary text-[0.9375rem]">{t.name}</p>
                    {t.ministry && (
                      <p className="text-label text-text-muted text-[0.6875rem]">{t.ministry}</p>
                    )}
                  </figcaption>
                </figure>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Testimonios">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Testimonio ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    i === current
                      ? "w-6 h-2 bg-gold"
                      : "w-2 h-2 bg-border hover:bg-text-muted"
                  )}
                />
              ))}
            </div>
          )}
        </div>

      </Container>
    </section>
  );
}
