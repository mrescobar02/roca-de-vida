import type { Metadata } from "next";
import Link from "next/link";
import { Mic, ExternalLink } from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AnimateIn, StaggerContainer, AnimateInItem } from "@/components/common/AnimateIn";
import { cn } from "@rdv/utils";

export const metadata: Metadata = {
  title: "Podcast | Roca de Vida Panamá",
  description: "Escucha el podcast de Roca de Vida Panamá en Spotify y Apple Podcasts.",
};

// Mock — reemplazar con getPodcastSettings() de Payload
const PODCAST = {
  title: "RDV Podcast",
  description: "Mensajes, reflexiones y conversaciones para tu semana. Escúchanos donde sea que estés.",
  spotifyEmbedUrl: "", // TODO: URL del embed de Spotify cuando el podcast esté activo
  spotifyUrl: "https://open.spotify.com",
  appleUrl: "https://podcasts.apple.com",
  youtubeUrl: "https://youtube.com/@rocadevidapanama",
  isActive: false, // Cambiar a true cuando el podcast esté publicado
};

// Episodios mock — reemplazar con lista real o feed de Spotify
const EPISODES = [
  { num: 5, title: "¿Cómo orar cuando no tenemos palabras?", duration: "28 min", date: "2025-05-06" },
  { num: 4, title: "Fe en tiempos de incertidumbre", duration: "32 min", date: "2025-04-29" },
  { num: 3, title: "El poder de la gratitud", duration: "25 min", date: "2025-04-22" },
  { num: 2, title: "Identidad: quién eres antes de lo que haces", duration: "35 min", date: "2025-04-15" },
  { num: 1, title: "Bienvenidos a RDV Podcast", duration: "18 min", date: "2025-04-08" },
];

const PLATFORMS = [
  { name: "Spotify", url: PODCAST.spotifyUrl, color: "#1DB954" },
  { name: "Apple Podcasts", url: PODCAST.appleUrl, color: "#FC3C44" },
  { name: "YouTube", url: PODCAST.youtubeUrl, color: "#FF0000" },
];

export default function PodcastPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-bg-base overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(29,185,84,0.08) 0%, transparent 70%)" }}
          aria-hidden
        />
        <Container className="pt-32 pb-16 relative z-10">
          <AnimateIn variant="fadeUp" trigger="mount">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-bg-surface border border-border flex items-center justify-center">
                <Mic size={24} strokeWidth={1.5} className="text-gold" aria-hidden />
              </div>
              <div>
                <p className="text-label text-gold">Podcast</p>
                <h1 className="text-h1 text-text-primary">{PODCAST.title}</h1>
              </div>
            </div>
            <p className="font-body text-[1.0625rem] text-text-secondary leading-relaxed max-w-[52ch]">
              {PODCAST.description}
            </p>
          </AnimateIn>
        </Container>
      </section>

      {/* Embed de Spotify o placeholder */}
      <section className="bg-bg-surface border-y border-border">
        <Container section>
          <AnimateIn variant="fadeUp">
            {PODCAST.spotifyEmbedUrl ? (
              /* Embed real cuando el podcast esté activo */
              <iframe
                src={PODCAST.spotifyEmbedUrl}
                width="100%"
                height="352"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-2xl"
                title="RDV Podcast en Spotify"
              />
            ) : (
              /* Placeholder hasta que el podcast esté activo */
              <div className="flex flex-col items-center gap-5 py-16 text-center border border-border rounded-2xl bg-bg-raised">
                <div className="w-14 h-14 rounded-full bg-bg-surface border border-border flex items-center justify-center">
                  <Mic size={22} strokeWidth={1.5} className="text-gold" aria-hidden />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-display font-700 text-text-primary text-[1.125rem]">
                    Podcast próximamente
                  </p>
                  <p className="font-body text-[0.9375rem] text-text-secondary max-w-[40ch] mx-auto">
                    Estamos preparando el podcast. Mientras tanto, todos nuestros mensajes están disponibles en YouTube.
                  </p>
                </div>
                <Link
                  href="/media/sermones"
                  className="flex items-center gap-1.5 font-display font-700 text-gold hover:text-gold-muted transition-colors"
                >
                  Ver sermones en video <span aria-hidden>→</span>
                </Link>
              </div>
            )}
          </AnimateIn>
        </Container>
      </section>

      {/* Plataformas */}
      <section className="bg-bg-base">
        <Container section className="flex flex-col gap-8">
          <AnimateIn>
            <SectionHeading
              label="Escúchanos en"
              heading="Disponible en todas las plataformas"
            />
          </AnimateIn>
          <StaggerContainer className="flex flex-wrap gap-4" staggerDelay={0.1}>
            {PLATFORMS.map((p) => (
              <AnimateInItem key={p.name}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center gap-3 px-6 py-4 rounded-2xl",
                    "bg-bg-surface border border-border hover:border-border-gold",
                    "transition-colors duration-200 group"
                  )}
                >
                  <span className="font-display font-700 text-text-primary group-hover:text-gold transition-colors text-[0.9375rem]">
                    {p.name}
                  </span>
                  <ExternalLink size={13} strokeWidth={1.5} className="text-text-muted group-hover:text-gold transition-colors" aria-hidden />
                </a>
              </AnimateInItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Lista de episodios */}
      <section className="bg-bg-surface border-t border-border">
        <Container section className="flex flex-col gap-8">
          <AnimateIn>
            <SectionHeading label="Episodios" heading="Últimos episodios" />
          </AnimateIn>
          <StaggerContainer className="flex flex-col gap-3" staggerDelay={0.07}>
            {EPISODES.map((ep) => (
              <AnimateInItem key={ep.num} variant="fadeRight">
                <div className="flex items-center gap-4 p-4 bg-bg-raised border border-border rounded-2xl hover:border-border-gold transition-colors duration-200">
                  <span className="font-display font-900 text-text-muted text-[1.5rem] leading-none w-8 shrink-0 text-right">
                    {ep.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-700 text-text-primary text-[0.9375rem] leading-snug truncate">
                      {ep.title}
                    </p>
                    <p className="text-label text-text-muted text-[0.6875rem] mt-0.5">
                      {ep.date} · {ep.duration}
                    </p>
                  </div>
                  {PODCAST.spotifyEmbedUrl && (
                    <a
                      href={PODCAST.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-label text-gold hover:text-gold-muted transition-colors shrink-0"
                      aria-label={`Escuchar episodio ${ep.num}`}
                    >
                      Escuchar →
                    </a>
                  )}
                </div>
              </AnimateInItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>
    </>
  );
}
