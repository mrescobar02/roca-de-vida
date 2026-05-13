"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn, formatDate } from "@rdv/utils";
import { SermonCard } from "@/components/cards";
interface SermonItem {
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

interface SermonsFilterProps {
  sermons: SermonItem[];
  series: Array<{ name: string; slug: string }>;
  pastors: string[];
}

export function SermonsFilter({ sermons, series, pastors }: SermonsFilterProps) {
  const [activeSeries, setActiveSeries] = React.useState<string | null>(null);
  const [activePastor, setActivePastor] = React.useState<string | null>(null);

  const filtered = sermons.filter((s) => {
    const matchSeries = !activeSeries || s.series === activeSeries;
    const matchPastor = !activePastor || s.pastor.name === activePastor;
    return matchSeries && matchPastor;
  });

  const hasFilters = activeSeries !== null || activePastor !== null;

  const clearFilters = () => {
    setActiveSeries(null);
    setActivePastor(null);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Barra de filtros */}
      <div className="flex flex-col gap-4 pb-6 border-b border-border">
        {/* Series */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-label text-text-muted text-[0.75rem] shrink-0 mr-1">Serie:</span>
          <button
            onClick={() => setActiveSeries(null)}
            className={cn(
              "px-4 py-1.5 rounded-full border text-label text-[0.8125rem] transition-all duration-200",
              activeSeries === null
                ? "bg-gold border-gold text-bg-base font-700"
                : "border-border text-text-secondary hover:border-border-gold hover:text-gold"
            )}
          >
            Todas
          </button>
          {series.map((s) => (
            <button
              key={s.slug}
              onClick={() => setActiveSeries(activeSeries === s.name ? null : s.name)}
              className={cn(
                "px-4 py-1.5 rounded-full border text-label text-[0.8125rem] transition-all duration-200",
                activeSeries === s.name
                  ? "bg-gold border-gold text-bg-base font-700"
                  : "border-border text-text-secondary hover:border-border-gold hover:text-gold"
              )}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Pastor + contador + clear */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="pastor-filter" className="text-label text-text-muted text-[0.75rem] shrink-0">
              Pastor:
            </label>
            <select
              id="pastor-filter"
              value={activePastor ?? ""}
              onChange={(e) => setActivePastor(e.target.value || null)}
              className={cn(
                "bg-bg-surface border border-border rounded-xl px-3 py-1.5",
                "font-body text-[0.875rem] text-text-secondary",
                "hover:border-border-gold focus:outline-none focus:border-border-gold",
                "transition-colors duration-200"
              )}
            >
              <option value="">Todos</option>
              {pastors.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <span className="text-label text-text-muted text-[0.75rem]">
            {filtered.length === sermons.length
              ? `${sermons.length} prédicas`
              : `${filtered.length} de ${sermons.length}`}
          </span>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-label text-text-muted hover:text-gold transition-colors text-[0.75rem] ml-auto"
            >
              <X size={12} aria-hidden /> Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Grid de resultados */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((sermon) => (
            <SermonCard
              key={sermon.slug}
              title={sermon.title}
              slug={sermon.slug}
              youtubeUrl={sermon.youtubeUrl}
              pastor={sermon.pastor}
              date={sermon.date}
              series={sermon.series}
              scripture={sermon.scripture}
              duration={sermon.duration}
              thumbnail={sermon.thumbnail}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <p className="font-display font-700 text-text-primary text-[1.0625rem]">
            No hay prédicas con esos filtros
          </p>
          <button
            onClick={clearFilters}
            className="text-label text-gold hover:text-gold-muted transition-colors"
          >
            Ver todas las prédicas →
          </button>
        </div>
      )}
    </div>
  );
}
