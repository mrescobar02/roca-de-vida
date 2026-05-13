import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Clock, Users, User } from "lucide-react";
import { Container } from "@/components/common/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { AnimateIn } from "@/components/common/AnimateIn";
import { Badge } from "@/components/ui/badge";
import { JoinGroupForm } from "@/components/groups/JoinGroupForm";
import { CELL_GROUPS } from "@/lib/mock/groups";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  // TODO: Replace with async fetch to Payload CMS
  return CELL_GROUPS.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const group = CELL_GROUPS.find((g) => g.slug === slug);
  if (!group) return {};
  return {
    title: `${group.name} | Grupos Celulares — Roca de Vida Panamá`,
    description: group.bio,
  };
}

export default async function GroupPage({ params }: PageProps) {
  const { slug } = await params;
  const group = CELL_GROUPS.find((g) => g.slug === slug);
  if (!group) notFound();

  const spotsLeft = group.capacity - group.enrolled;
  const almostFull = !group.isFull && spotsLeft > 0 && spotsLeft <= 3;

  return (
    <>
      {/* ── Header de la página ────────────────────────────────── */}
      <section className="relative bg-bg-base overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(255,204,77,0.1) 0%, transparent 70%)" }}
          aria-hidden
        />

        <Container className="pt-32 pb-16 relative z-10">
          <AnimateIn variant="fadeUp" trigger="mount" delay={0.1}>
            <div className="flex items-center gap-2 mb-4">
              <Link
                href="/grupos"
                className="text-label text-text-muted hover:text-gold transition-colors text-[0.75rem]"
              >
                Grupos celulares
              </Link>
              <span className="text-text-muted" aria-hidden>/</span>
              <span className="text-label text-text-secondary text-[0.75rem]">{group.neighborhood}</span>
            </div>

            <div className="flex flex-wrap items-start gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-label text-gold">{group.district}</p>
                <h1 className="text-display text-text-primary leading-none">
                  {group.name}
                </h1>
              </div>

              {/* Status badge */}
              <div className="mt-2">
                {group.isFull ? (
                  <Badge variant="outline" className="text-text-muted border-border">Lleno</Badge>
                ) : almostFull ? (
                  <Badge variant="gold">Últimos cupos</Badge>
                ) : (
                  <Badge variant="surface" className="text-gold border-border-gold">Disponible</Badge>
                )}
              </div>
            </div>
          </AnimateIn>
        </Container>
      </section>

      {/* Línea decorativa */}
      <div className="h-[2px] bg-gradient-to-r from-gold/60 via-gold/20 to-transparent" aria-hidden />

      {/* ── Info del grupo ──────────────────────────────────────── */}
      <section className="bg-bg-surface">
        <Container section className="grid md:grid-cols-[1fr_300px] gap-10 lg:gap-16 items-start">

          {/* Detalles */}
          <AnimateIn variant="fadeRight" className="flex flex-col gap-8">
            <p className="font-body text-[1rem] text-text-secondary leading-relaxed">
              {group.bio}
            </p>

            {/* Info cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: MapPin, label: "Ubicación", value: group.address ?? group.neighborhood },
                { icon: Clock, label: "Horario", value: group.schedule },
                { icon: User, label: "Líder", value: `${group.leaderName}${group.leaderTitle ? ` — ${group.leaderTitle}` : ""}` },
                {
                  icon: Users,
                  label: "Capacidad",
                  value: group.isFull
                    ? `${group.capacity}/${group.capacity} — Lleno`
                    : `${group.enrolled}/${group.capacity} personas`,
                },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex gap-3 p-4 bg-bg-raised rounded-2xl border border-border"
                >
                  <Icon size={16} strokeWidth={1.5} className="text-gold shrink-0 mt-0.5" aria-hidden />
                  <div>
                    <p className="text-label text-text-muted text-[0.625rem] mb-0.5">{label}</p>
                    <p className="font-body text-[0.9375rem] text-text-primary leading-snug">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mapa placeholder */}
            <div className="flex flex-col gap-3">
              <p className="text-label text-text-muted text-[0.75rem]">Ubicación aproximada</p>
              <div className="relative aspect-[16/7] bg-bg-raised rounded-2xl border border-border flex items-center justify-center overflow-hidden">
                <svg className="absolute inset-0 w-full h-full text-border" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="dot-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="0.8" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dot-grid)" />
                </svg>
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center">
                    <MapPin size={12} strokeWidth={2} className="text-bg-base" />
                  </div>
                  <span className="text-label text-text-secondary text-[0.6875rem] bg-bg-surface/90 px-2 py-1 rounded-sm">
                    {group.neighborhood}, {group.district}
                  </span>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Sidebar — formulario */}
          <AnimateIn variant="fadeLeft" delay={0.1}>
            <div className="sticky top-24">
              {group.isFull ? (
                <div className="flex flex-col gap-4 p-6 bg-bg-raised border border-border rounded-2xl">
                  <h3 className="font-display font-700 text-text-primary text-[1.0625rem]">
                    Este grupo está lleno
                  </h3>
                  <p className="font-body text-[0.875rem] text-text-secondary leading-snug">
                    Puedes unirte a la lista de espera o buscar otro grupo disponible cerca de ti.
                  </p>
                  <Link
                    href="/grupos"
                    className="font-display font-700 text-gold hover:text-gold-muted transition-colors text-[0.875rem]"
                  >
                    Ver otros grupos →
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-5 p-6 bg-bg-raised border border-border rounded-2xl">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display font-700 text-text-primary text-[1.0625rem]">
                      Quiero unirme
                    </h3>
                    <p className="font-body text-[0.8125rem] text-text-secondary">
                      Completa el formulario y {group.leaderName} te contactará.
                    </p>
                  </div>
                  <JoinGroupForm groupName={group.name} groupSlug={group.slug} />
                </div>
              )}
            </div>
          </AnimateIn>

        </Container>
      </section>

      {/* ── Nav ──────────────────────────────────────────────────── */}
      <section className="bg-bg-base border-t border-border">
        <Container className="py-8">
          <Link
            href="/grupos"
            className="flex items-center gap-2 text-label text-text-muted hover:text-gold transition-colors"
          >
            <span aria-hidden>←</span> Todos los grupos
          </Link>
        </Container>
      </section>
    </>
  );
}
