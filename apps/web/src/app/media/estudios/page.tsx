import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Play, BookOpen, Clock, Calendar } from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AnimateIn, StaggerContainer, AnimateInItem } from "@/components/common/AnimateIn";
import { Badge } from "@/components/ui/badge";
import { formatDate, getYoutubeThumbnail, getYoutubeVideoId } from "@rdv/utils";
import { cn } from "@rdv/utils";
import { getSermons } from "@/lib/payload/client";

export const metadata: Metadata = {
  title: "Estudios Bíblicos | Roca de Vida Panamá",
  description: "Estudios bíblicos expositivos de Roca de Vida Panamá. Libro por libro, tema por tema.",
};

export const revalidate = 3600;

interface Study {
  title: string;
  slug: string;
  youtubeUrl: string;
  teacher: { name: string };
  date: string;
  series?: string;
  book?: string;
  duration?: string;
}

export default async function EstudiosPage() {
  const result = await getSermons({ limit: 50 });

  const studies: Study[] = result.docs.map((s) => ({
    title: s.title,
    slug: s.slug,
    youtubeUrl: s.youtubeUrl,
    teacher: { name: s.pastor?.name ?? "Roca de Vida" },
    date: s.date,
    series: s.series,
    book: s.scripture?.split(" ")[0],
    duration: s.duration,
  }));

  const seriesList = [...new Set(studies.filter((s) => s.series).map((s) => s.series!))];

  return (
    <>
      {/* Header */}
      <section className="relative bg-bg-base overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,204,77,0.1) 0%, transparent 70%)" }}
          aria-hidden
        />
        <Container className="pt-32 pb-14 relative z-10">
          <AnimateIn variant="fadeUp">
            <SectionHeading
              label="Estudios Bíblicos"
              heading="Profundiza en la Palabra"
              subheading="Estudios expositivos: libro por libro y tema por tema. Para quienes quieren ir más allá del sermón dominical."
            />
          </AnimateIn>
        </Container>
      </section>

      <section className="bg-bg-base">
        <Container section className="flex flex-col gap-14">

          {/* Por serie */}
          {seriesList.map((seriesName) => {
            const items = studies.filter((s) => s.series === seriesName);
            return (
              <div key={seriesName} className="flex flex-col gap-6">
                <AnimateIn>
                  <div className="flex items-center gap-3">
                    <div className="gold-line" aria-hidden />
                    <p className="font-display font-700 text-text-primary text-[1.125rem]">{seriesName}</p>
                    <span className="text-label text-text-muted text-[0.625rem]">{items.length} episodios</span>
                  </div>
                </AnimateIn>
                <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
                  {items.map((study) => (
                    <AnimateInItem key={study.slug}>
                      <StudyCard study={study} />
                    </AnimateInItem>
                  ))}
                </StaggerContainer>
              </div>
            );
          })}

          {/* Independientes */}
          {(() => {
            const standalone = studies.filter((s) => !s.series);
            if (!standalone.length) return null;
            return (
              <div className="flex flex-col gap-6">
                <AnimateIn>
                  <div className="flex items-center gap-3">
                    <div className="gold-line" aria-hidden />
                    <p className="font-display font-700 text-text-primary text-[1.125rem]">Estudios independientes</p>
                  </div>
                </AnimateIn>
                <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
                  {standalone.map((study) => (
                    <AnimateInItem key={study.slug}>
                      <StudyCard study={study} />
                    </AnimateInItem>
                  ))}
                </StaggerContainer>
              </div>
            );
          })()}

        </Container>
      </section>

      {/* CTA a sermones */}
      <section className="bg-bg-surface border-t border-border">
        <Container section size="narrow" className="text-center flex flex-col items-center gap-4">
          <AnimateIn variant="fadeUp">
            <h2 className="text-h2 text-text-primary">¿Buscas los sermones dominicales?</h2>
            <p className="font-body text-[0.9375rem] text-text-secondary mt-3">
              Los estudios son sesiones de profundización. Para los mensajes del domingo, visita el archivo de prédicas.
            </p>
          </AnimateIn>
          <AnimateIn variant="fadeUp" delay={0.1}>
            <Link href="/media/sermones" className="flex items-center gap-2 font-display font-700 text-gold hover:text-gold-muted transition-colors">
              Ver prédicas <span aria-hidden>→</span>
            </Link>
          </AnimateIn>
        </Container>
      </section>
    </>
  );
}

function StudyCard({ study }: { study: Study }) {
  const videoId = getYoutubeVideoId(study.youtubeUrl);
  const thumb = getYoutubeThumbnail(study.youtubeUrl, "hqdefault");

  return (
    <Link
      href={`/media/sermones/${study.slug}`}
      className={cn(
        "group flex flex-col gap-3 rounded-2xl",
        "focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
      )}
      aria-label={`Ver estudio: ${study.title}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-bg-raised">
        {thumb && videoId ? (
          <Image
            src={thumb}
            alt={study.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-bg-raised">
            <BookOpen size={32} strokeWidth={1} className="text-border" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" aria-hidden />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden>
          <div className="w-11 h-11 rounded-full bg-gold/90 flex items-center justify-center shadow-lg">
            <Play size={16} fill="#000" className="ml-0.5 text-bg-base" />
          </div>
        </div>
        {study.duration && (
          <span className="absolute bottom-2 right-2 text-label text-[0.625rem] bg-black/80 text-text-secondary px-1.5 py-0.5 rounded-sm">
            {study.duration}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5">
        {study.book && <Badge variant="gold" className="self-start">{study.book}</Badge>}
        <h3 className="font-display font-700 text-text-primary text-[1rem] leading-snug group-hover:text-gold transition-colors duration-200 line-clamp-2">
          {study.title}
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-body text-[0.8125rem] text-text-secondary">{study.teacher.name}</span>
          <span className="text-text-muted" aria-hidden>·</span>
          <div className="flex items-center gap-1 text-text-muted">
            <Calendar size={11} strokeWidth={1.5} aria-hidden />
            <time dateTime={study.date} className="font-body text-[0.8125rem]">{formatDate(study.date)}</time>
          </div>
          {study.duration && (
            <>
              <span className="text-text-muted" aria-hidden>·</span>
              <div className="flex items-center gap-1 text-text-muted">
                <Clock size={11} strokeWidth={1.5} aria-hidden />
                <span className="font-body text-[0.8125rem]">{study.duration}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
