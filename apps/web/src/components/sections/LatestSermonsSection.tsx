import Link from "next/link";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SermonCard } from "@/components/cards";
import { AnimateIn, StaggerContainer, AnimateInItem } from "@/components/common/AnimateIn";
import { ButtonArrow } from "@/components/ui/button";

interface Sermon {
  title: string;
  slug: string;
  youtubeUrl: string;
  pastor: { name: string };
  date: string;
  series?: string;
  scripture?: string;
  duration?: string;
  thumbnail?: { url: string; alt: string };
}

export interface LatestSermonsSectionProps {
  featured?: Sermon;
  recent: Sermon[];
}

export function LatestSermonsSection({ featured, recent }: LatestSermonsSectionProps) {
  if (!featured && !recent.length) return null;

  return (
    <section className="bg-bg-base">
      <Container section className="flex flex-col gap-12">

        <AnimateIn>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <SectionHeading
              label="Prédicas"
              heading="Palabra para tu vida"
              subheading="Mensajes que transforman. Disponibles cuando los necesites."
            />
            <Link
              href="/media/sermones"
              className="flex items-center gap-1.5 text-label text-gold hover:text-gold-muted transition-colors shrink-0 pb-1"
            >
              Archivo completo <ButtonArrow className="inline-block" />
            </Link>
          </div>
        </AnimateIn>

        {/* Sermón destacado */}
        {featured && (
          <AnimateIn variant="fadeUp" amount={0.15}>
            <SermonCard
              layout="featured"
              title={featured.title}
              slug={featured.slug}
              youtubeUrl={featured.youtubeUrl}
              pastor={featured.pastor}
              date={featured.date}
              series={featured.series}
              scripture={featured.scripture}
              duration={featured.duration}
              thumbnail={featured.thumbnail}
              priority
            />
          </AnimateIn>
        )}

        {/* Grid recientes */}
        {recent.length > 0 && (
          <StaggerContainer
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            staggerDelay={0.1}
            delayChildren={0.05}
          >
            {recent.slice(0, 3).map((sermon) => (
              <AnimateInItem key={sermon.slug}>
                <SermonCard
                  title={sermon.title}
                  slug={sermon.slug}
                  youtubeUrl={sermon.youtubeUrl}
                  pastor={sermon.pastor}
                  date={sermon.date}
                  series={sermon.series}
                  duration={sermon.duration}
                  thumbnail={sermon.thumbnail}
                />
              </AnimateInItem>
            ))}
          </StaggerContainer>
        )}

      </Container>
    </section>
  );
}
