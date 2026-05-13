import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, BookOpen, ChevronRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import { ScriptureQuote } from "@/components/common/ScriptureQuote";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AnimateIn, StaggerContainer, AnimateInItem } from "@/components/common/AnimateIn";
import { Badge } from "@/components/ui/badge";
import { SermonCard } from "@/components/cards";
import { YoutubeEmbed } from "@/components/media/YoutubeEmbed";
import { formatDate, getYoutubeThumbnail, getYoutubeEmbedUrl } from "@rdv/utils";
import { SERMONS } from "@/lib/mock/sermons";
import {
  getVideoById,
  getLatestSermons,
  toSermonProps,
  isYoutubeId,
  type YoutubeSermon,
  type SermonProps,
} from "@/lib/youtube/api";

export const revalidate = 3600;

type PageProps = { params: Promise<{ slug: string }> };

// ─── Data fetching ────────────────────────────────────────────────────────────

type SermonData = {
  title: string;
  slug: string;
  youtubeUrl: string;
  pastor: { name: string };
  date: string;
  series?: string;
  seriesSlug?: string;
  scripture?: string;
  duration?: string;
  description?: string;
  thumbnail?: { url: string; alt: string };
};

async function getSermonData(slug: string): Promise<SermonData | null> {
  if (isYoutubeId(slug)) {
    const video = await getVideoById(slug);
    if (!video) return null;
    const props = toSermonProps(video);
    return { ...props, description: video.description.slice(0, 500) };
  }

  const mock = SERMONS.find((s) => s.slug === slug);
  if (!mock) return null;
  return {
    title: mock.title,
    slug: mock.slug,
    youtubeUrl: mock.youtubeUrl,
    pastor: { name: mock.pastor.name },
    date: mock.date,
    series: mock.series,
    seriesSlug: mock.seriesSlug,
    scripture: mock.scripture,
    duration: mock.duration,
    description: mock.description,
  };
}

async function getRelatedSermons(current: SermonData): Promise<SermonProps[]> {
  const ytVideos = await getLatestSermons(10);
  if (ytVideos.length > 0) {
    return ytVideos
      .filter((v) => v.videoId !== current.slug)
      .slice(0, 3)
      .map(toSermonProps);
  }
  return SERMONS.filter(
    (s) =>
      s.slug !== current.slug &&
      (s.seriesSlug === current.seriesSlug || s.pastor.name === current.pastor.name)
  )
    .slice(0, 3)
    .map((s) => ({
      title: s.title,
      slug: s.slug,
      youtubeUrl: s.youtubeUrl,
      pastor: { name: s.pastor.name },
      date: s.date,
      duration: s.duration,
    }));
}

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const ytVideos = await getLatestSermons(20);
  const ytParams = ytVideos.map((v) => ({ slug: v.videoId }));
  const mockParams = SERMONS.map((s) => ({ slug: s.slug }));
  return [...ytParams, ...mockParams];
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sermon = await getSermonData(slug);
  if (!sermon) return {};
  return {
    title: `${sermon.title} | Roca de Vida Panamá`,
    description:
      sermon.description?.slice(0, 160) ??
      `Prédica de ${sermon.pastor.name} — ${sermon.series ?? "Roca de Vida"}`,
    openGraph: {
      images: [
        {
          url:
            sermon.thumbnail?.url ??
            getYoutubeThumbnail(sermon.youtubeUrl, "maxresdefault") ??
            "",
        },
      ],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function SermonPage({ params }: PageProps) {
  const { slug } = await params;
  const sermon = await getSermonData(slug);
  if (!sermon) notFound();

  const related = await getRelatedSermons(sermon);

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: sermon.title,
    description: sermon.description ?? `Prédica de ${sermon.pastor.name}`,
    thumbnailUrl:
      sermon.thumbnail?.url ??
      getYoutubeThumbnail(sermon.youtubeUrl, "maxresdefault"),
    uploadDate: sermon.date,
    embedUrl: getYoutubeEmbedUrl(sermon.youtubeUrl) ?? undefined,
    author: { "@type": "Person", name: sermon.pastor.name },
    publisher: {
      "@type": "Organization",
      name: "Roca de Vida Panamá",
      logo: { "@type": "ImageObject", url: "https://rocadevidapanama.com/og-image.jpg" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />

      {/* Breadcrumb */}
      <section className="bg-bg-base border-b border-border">
        <Container className="py-4">
          <nav
            className="flex items-center gap-2 text-label text-text-muted text-[0.75rem]"
            aria-label="Breadcrumb"
          >
            <Link href="/media" className="hover:text-gold transition-colors">Media</Link>
            <ChevronRight size={12} aria-hidden />
            <Link href="/media/sermones" className="hover:text-gold transition-colors">Prédicas</Link>
            {sermon.series && (
              <>
                <ChevronRight size={12} aria-hidden />
                <span className="text-text-secondary">{sermon.series}</span>
              </>
            )}
          </nav>
        </Container>
      </section>

      {/* Video embed */}
      <section className="bg-black">
        <Container size="wide" className="py-0">
          <YoutubeEmbed url={sermon.youtubeUrl} title={sermon.title} />
        </Container>
      </section>

      {/* Metadata */}
      <section className="bg-bg-base border-b border-border">
        <Container className="py-8">
          <AnimateIn variant="fadeUp" trigger="mount">
            <div className="flex flex-col gap-4">
              {sermon.series && (
                <Badge variant="gold" className="self-start">{sermon.series}</Badge>
              )}
              <h1 className="text-h1 text-text-primary leading-tight">{sermon.title}</h1>
              <div className="flex flex-wrap items-center gap-4">
                <span className="font-body text-[0.9375rem] text-text-secondary font-medium">
                  {sermon.pastor.name}
                </span>
                <div className="flex items-center gap-1.5 text-text-muted">
                  <Calendar size={13} strokeWidth={1.5} aria-hidden />
                  <time dateTime={sermon.date} className="font-body text-[0.875rem]">
                    {formatDate(sermon.date)}
                  </time>
                </div>
                {sermon.duration && (
                  <div className="flex items-center gap-1.5 text-text-muted">
                    <Clock size={13} strokeWidth={1.5} aria-hidden />
                    <span className="font-body text-[0.875rem]">{sermon.duration}</span>
                  </div>
                )}
                {sermon.scripture && (
                  <div className="flex items-center gap-1.5 text-text-muted">
                    <BookOpen size={13} strokeWidth={1.5} aria-hidden />
                    <span className="font-body text-[0.875rem]">{sermon.scripture}</span>
                  </div>
                )}
              </div>
              {sermon.description && (
                <p className="font-body text-[1rem] text-text-secondary leading-relaxed max-w-prose mt-2">
                  {sermon.description}
                </p>
              )}
            </div>
          </AnimateIn>
        </Container>
      </section>

      {/* Scripture */}
      {sermon.scripture && (
        <section className="bg-bg-surface">
          <Container section size="narrow">
            <AnimateIn variant="scaleIn">
              <ScriptureQuote
                text={`"Prédica sobre ${sermon.scripture}"`}
                reference={sermon.scripture}
                align="center"
              />
            </AnimateIn>
          </Container>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-bg-base">
          <Container section className="flex flex-col gap-10">
            <AnimateIn>
              <div className="flex items-end justify-between gap-4">
                <SectionHeading
                  label={sermon.series ? `Serie: ${sermon.series}` : "Más prédicas"}
                  heading="También te puede interesar"
                />
                <Link
                  href="/media/sermones"
                  className="text-label text-gold hover:text-gold-muted transition-colors shrink-0 pb-1"
                >
                  Ver todas →
                </Link>
              </div>
            </AnimateIn>
            <StaggerContainer className="grid sm:grid-cols-3 gap-5" staggerDelay={0.1}>
              {related.map((s) => (
                <AnimateInItem key={s.slug}>
                  <SermonCard
                    title={s.title}
                    slug={s.slug}
                    youtubeUrl={s.youtubeUrl}
                    pastor={s.pastor}
                    date={s.date}
                    duration={s.duration}
                    thumbnail={s.thumbnail}
                  />
                </AnimateInItem>
              ))}
            </StaggerContainer>
          </Container>
        </section>
      )}

      {/* Nav */}
      <section className="bg-bg-base border-t border-border">
        <Container className="py-8">
          <Link
            href="/media/sermones"
            className="flex items-center gap-2 text-label text-text-muted hover:text-gold transition-colors"
          >
            <span aria-hidden>←</span> Todas las prédicas
          </Link>
        </Container>
      </section>
    </>
  );
}
