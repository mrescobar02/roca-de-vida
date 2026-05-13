import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Camera } from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AnimateIn, StaggerContainer, AnimateInItem } from "@/components/common/AnimateIn";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@rdv/utils";
import { cn } from "@rdv/utils";
import { GALLERIES } from "@/lib/mock/gallery";

export const metadata: Metadata = {
  title: "Galería | Roca de Vida Panamá",
  description: "Fotos y momentos de la comunidad de Roca de Vida Panamá.",
};

export default function GaleriaPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-bg-base overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,204,77,0.1) 0%, transparent 70%)" }}
          aria-hidden
        />
        <Container className="pt-32 pb-14 relative z-10">
          <AnimateIn variant="fadeUp">
            <SectionHeading
              label="Galería"
              heading="Momentos de comunidad"
              subheading="Un vistazo a la vida de Roca de Vida Panamá — retiros, servicios, eventos y más."
            />
          </AnimateIn>
        </Container>
      </section>

      {/* Grid de galerías */}
      <section className="bg-bg-base">
        <Container section>
          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            staggerDelay={0.08}
          >
            {GALLERIES.map((gallery) => (
              <AnimateInItem key={gallery.slug}>
                <Link
                  href={`/galeria/${gallery.slug}`}
                  className={cn(
                    "group flex flex-col overflow-hidden rounded-2xl bg-bg-surface",
                    "focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
                  )}
                  aria-label={`Ver galería: ${gallery.title}`}
                >
                  {/* Cover */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={gallery.coverImage.url}
                      alt={gallery.coverImage.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 overlay-card opacity-60 group-hover:opacity-80 transition-opacity duration-300" aria-hidden />

                    {/* Count badge */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/70 px-2.5 py-1 rounded-sm">
                      <Camera size={11} strokeWidth={1.5} className="text-gold" aria-hidden />
                      <span className="text-label text-text-secondary text-[0.625rem]">{gallery.photoCount} fotos</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-2 p-4">
                    {gallery.ministry && (
                      <Badge variant="gold" className="self-start">{gallery.ministry.name}</Badge>
                    )}
                    <h3 className="font-display font-700 text-text-primary text-[1rem] leading-snug group-hover:text-gold transition-colors duration-200">
                      {gallery.title}
                    </h3>
                    <time dateTime={gallery.date} className="font-body text-[0.8125rem] text-text-muted">
                      {formatDate(gallery.date)}
                    </time>
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
