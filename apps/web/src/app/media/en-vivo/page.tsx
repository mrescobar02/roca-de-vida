import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AnimateIn, StaggerContainer, AnimateInItem } from "@/components/common/AnimateIn";
import { Badge } from "@/components/ui/badge";
import { SermonCard } from "@/components/cards";
import { YoutubeEmbed } from "@/components/media/YoutubeEmbed";
import { SERMONS } from "@/lib/mock/sermons";
import { getIsLive, getLatestSermons, toSermonProps } from "@/lib/youtube/api";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "En Vivo | Roca de Vida Panamá",
  description: "Sigue los servicios de Roca de Vida Panamá en tiempo real todos los domingos.",
};

const NEXT_BROADCAST_LABEL = "Domingo · 9:00 AM (Panamá)";
const PRE_STREAM_MESSAGE = "El servicio comenzará en breve. Prepárate para adorar con nosotros.";

export default async function EnVivoPage() {
  const [liveStatus, ytVideos] = await Promise.all([
    getIsLive(),
    getLatestSermons(3),
  ]);

  const recent = ytVideos.length > 0
    ? ytVideos.map(toSermonProps)
    : SERMONS.slice(0, 3).map((s) => ({
        title: s.title, slug: s.slug, youtubeUrl: s.youtubeUrl,
        pastor: { name: s.pastor.name }, date: s.date, duration: s.duration,
      }));

  const streamUrl = liveStatus.videoId
    ? `https://www.youtube.com/watch?v=${liveStatus.videoId}`
    : "https://www.youtube.com/@rocadevidapanama/live";

  if (liveStatus.isLive) {
    return <LiveView streamUrl={streamUrl} preStreamMessage={PRE_STREAM_MESSAGE} />;
  }

  return <OfflineView nextLabel={NEXT_BROADCAST_LABEL} recent={recent} />;
}

// ── Vista: En vivo ─────────────────────────────────────────────────────────────

function LiveView({ streamUrl, preStreamMessage }: { streamUrl: string; preStreamMessage: string }) {
  return (
    <>
      <section className="bg-black">
        <Container size="wide" className="pt-20 pb-0">
          <AnimateIn variant="fadeUp" trigger="mount" delay={0.1} className="flex items-center gap-3 py-4">
            <Badge variant="live" className="text-sm px-3 py-1">● EN VIVO</Badge>
            <span className="font-body text-[0.9375rem] text-text-secondary">
              Servicio en vivo — Roca de Vida Panamá
            </span>
          </AnimateIn>
        </Container>

        <Container size="wide">
          <YoutubeEmbed url={streamUrl} title="Servicio en vivo — Roca de Vida Panamá" autoplay />
        </Container>

        <Container size="wide" className="py-4">
          <p className="font-body text-[0.875rem] text-text-muted">{preStreamMessage}</p>
        </Container>
      </section>

      <section className="bg-bg-surface border-t border-border">
        <Container section size="narrow" className="text-center">
          <AnimateIn variant="fadeUp">
            <p className="font-body text-[1rem] text-text-secondary leading-relaxed">
              ¿Estás disfrutando el servicio? Compártelo con alguien que necesite escuchar esta palabra.
            </p>
          </AnimateIn>
        </Container>
      </section>
    </>
  );
}

// ── Vista: Offline ─────────────────────────────────────────────────────────────

interface SermonItem {
  title: string;
  slug: string;
  youtubeUrl: string;
  pastor: { name: string };
  date: string;
  series?: string;
  duration?: string;
  thumbnail?: { url: string; alt: string };
}

interface OfflineViewProps {
  nextLabel: string;
  recent: SermonItem[];
}

function OfflineView({ nextLabel, recent }: OfflineViewProps) {
  return (
    <>
      {/* Hero — próxima transmisión */}
      <section className="relative bg-bg-base overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(255,204,77,0.1) 0%, transparent 70%)" }}
          aria-hidden
        />
        <Container className="pt-32 pb-16 relative z-10 flex flex-col items-center text-center gap-6">
          <AnimateIn variant="fadeUp" trigger="mount">
            <div className="w-16 h-16 rounded-full bg-bg-surface border border-border flex items-center justify-center mx-auto mb-2">
              <div className="w-4 h-4 rounded-full bg-border" aria-hidden />
            </div>
            <p className="text-label text-text-muted">No estamos transmitiendo en este momento</p>
          </AnimateIn>

          <AnimateIn variant="fadeUp" trigger="mount" delay={0.15}>
            <h1 className="text-h1 text-text-primary">Próxima transmisión</h1>
          </AnimateIn>

          <AnimateIn variant="fadeUp" trigger="mount" delay={0.25}>
            <div className="flex flex-wrap justify-center gap-5 mt-2">
              <div className="flex items-center gap-2 px-5 py-3 bg-bg-surface border border-border rounded-2xl">
                <Calendar size={16} strokeWidth={1.5} className="text-gold" aria-hidden />
                <span className="font-display font-700 text-text-primary text-[1.0625rem]">
                  {nextLabel}
                </span>
              </div>
            </div>
          </AnimateIn>

          <AnimateIn variant="fadeUp" trigger="mount" delay={0.35}>
            <div className="flex flex-col items-center gap-2 mt-4">
              <p className="font-body text-[0.9375rem] text-text-secondary">
                Mientras tanto, explora nuestros sermones más recientes.
              </p>
              <div className="flex flex-wrap gap-3 justify-center mt-2">
                <div className="flex items-center gap-2 text-label text-text-muted text-[0.8125rem]">
                  <Clock size={13} strokeWidth={1.5} aria-hidden />
                  <span>Domingos 9:00 AM y 11:30 AM</span>
                </div>
                <div className="flex items-center gap-2 text-label text-text-muted text-[0.8125rem]">
                  <Clock size={13} strokeWidth={1.5} aria-hidden />
                  <span>Miércoles 7:00 PM</span>
                </div>
              </div>
            </div>
          </AnimateIn>
        </Container>
      </section>

      {/* Últimas prédicas */}
      <section className="bg-bg-surface border-t border-border">
        <Container section className="flex flex-col gap-10">
          <AnimateIn>
            <SectionHeading
              label="Prédicas recientes"
              heading="Mientras esperas"
              subheading="Escucha los últimos mensajes de nuestra iglesia."
            />
          </AnimateIn>
          <StaggerContainer className="grid sm:grid-cols-3 gap-5" staggerDelay={0.1}>
            {recent.map((s) => (
              <AnimateInItem key={s.slug}>
                <SermonCard
                  title={s.title}
                  slug={s.slug}
                  youtubeUrl={s.youtubeUrl}
                  pastor={s.pastor}
                  date={s.date}
                  series={s.series}
                  duration={s.duration}
                  thumbnail={s.thumbnail}
                />
              </AnimateInItem>
            ))}
          </StaggerContainer>

          <AnimateIn>
            <div className="flex justify-center">
              <Link
                href="/media/sermones"
                className="flex items-center gap-2 font-display font-700 text-gold hover:text-gold-muted transition-colors"
              >
                Ver archivo completo <span aria-hidden>→</span>
              </Link>
            </div>
          </AnimateIn>
        </Container>
      </section>
    </>
  );
}
