import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SermonCard } from "@/components/cards";
import { AnimateIn } from "@/components/common/AnimateIn";
import { SermonsFilter } from "@/components/media/SermonsFilter";
import { getLatestSermons, toSermonProps } from "@/lib/youtube/api";
import { SERMONS, SERMON_SERIES, SERMON_PASTORS } from "@/lib/mock/sermons";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Prédicas | Roca de Vida Panamá",
  description: "Archivo completo de sermones de Roca de Vida Panamá. Filtra por serie, pastor o fecha.",
};

export default async function SermonesPage() {
  const ytVideos = await getLatestSermons(50);
  const useYT = ytVideos.length > 0;

  const allSermons = useYT
    ? ytVideos.map(toSermonProps)
    : SERMONS.map((s) => ({
        title: s.title,
        slug: s.slug,
        youtubeUrl: s.youtubeUrl,
        pastor: { name: s.pastor.name },
        date: s.date,
        series: s.series,
        duration: s.duration,
        thumbnail: undefined as undefined,
      }));

  const featured = allSermons[0];
  const rest = allSermons.slice(1);

  const series = useYT ? [] : SERMON_SERIES;
  const pastors = useYT
    ? [...new Set(allSermons.map((s) => s.pastor.name))]
    : SERMON_PASTORS;

  return (
    <>
      {/* Header */}
      <section className="relative bg-bg-base overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,204,77,0.12) 0%, transparent 70%)" }}
          aria-hidden
        />
        <Container className="pt-32 pb-14 relative z-10">
          <AnimateIn variant="fadeUp">
            <SectionHeading
              label="Prédicas"
              heading="Palabra para tu vida"
              subheading={`${allSermons.length} mensajes disponibles. Busca por serie o pastor.`}
            />
          </AnimateIn>
        </Container>
      </section>

      <section className="bg-bg-base">
        <Container section className="flex flex-col gap-14">

          {/* Sermón destacado */}
          <AnimateIn variant="fadeUp" amount={0.15}>
            <div className="flex flex-col gap-3">
              <p className="text-label text-gold">Último mensaje</p>
              <SermonCard
                layout="featured"
                title={featured.title}
                slug={featured.slug}
                youtubeUrl={featured.youtubeUrl}
                pastor={featured.pastor}
                date={featured.date}
                series={"series" in featured ? (featured as any).series : undefined}
                duration={featured.duration}
                thumbnail={featured.thumbnail}
                priority
              />
            </div>
          </AnimateIn>

          {/* Filtro + archivo */}
          <AnimateIn>
            <div className="flex flex-col gap-3">
              <p className="text-label text-text-muted">Todos los mensajes</p>
              <SermonsFilter
                sermons={rest}
                series={series}
                pastors={pastors}
              />
            </div>
          </AnimateIn>

        </Container>
      </section>
    </>
  );
}
