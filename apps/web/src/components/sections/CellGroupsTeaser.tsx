"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { MapPin, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/Container";
import { AnimateIn } from "@/components/common/AnimateIn";
import type { GroupPin } from "@/components/groups/GroupsMap";

// Leaflet requires the browser — never render on the server
const GroupsMap = dynamic(
  () => import("@/components/groups/GroupsMap").then((m) => m.GroupsMap),
  {
    ssr: false,
    loading: () => (
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-bg-surface border border-border flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <MapPin size={28} strokeWidth={1.25} className="text-gold/40" aria-hidden />
          <span className="text-label text-text-muted text-[0.75rem]">Cargando mapa…</span>
        </div>
      </div>
    ),
  }
);

export interface CellGroupsTeaserProps {
  totalGroups?: number;
  totalMembers?: number;
  neighborhoods?: number;
  /** Grupos con coordenadas para mostrar en el mapa */
  groups?: GroupPin[];
}

export function CellGroupsTeaser({
  totalGroups = 24,
  totalMembers = 380,
  neighborhoods = 12,
  groups = [],
}: CellGroupsTeaserProps) {
  return (
    <section className="bg-bg-base overflow-hidden">
      <Container section className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Texto */}
        <AnimateIn variant="fadeRight" amount={0.2} className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="gold-line shrink-0" aria-hidden />
            <p className="text-label text-gold">Grupos Celulares</p>
          </div>

          <h2 className="text-h1 text-text-primary leading-tight">
            La iglesia en tu barrio
          </h2>

          <p className="font-body text-[1rem] text-text-secondary leading-relaxed">
            Los grupos celulares son el corazón de nuestra comunidad. Nos reunimos en casas a lo largo de toda la ciudad para estudiar la Palabra, orar y crecer juntos en un ambiente cercano y familiar.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 py-6 border-y border-border">
            {[
              { icon: Users,    value: totalGroups,   label: "grupos activos" },
              { icon: MapPin,   value: neighborhoods, label: "sectores" },
              { icon: Calendar, value: "7",           label: "días a la semana" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <Icon size={14} strokeWidth={1.5} className="text-gold" aria-hidden />
                <span className="font-display font-900 text-gold text-[2rem] leading-none">{value}</span>
                <span className="text-label text-text-muted text-[0.6875rem]">{label}</span>
              </div>
            ))}
          </div>

          <Button variant="primary" size="lg" asChild>
            <Link href="/grupos">Encontrar un grupo</Link>
          </Button>
        </AnimateIn>

        {/* Mapa interactivo */}
        <AnimateIn variant="fadeLeft" amount={0.2}>
          <div className="relative z-0 isolate aspect-[4/3] rounded-2xl overflow-hidden border border-border">
            <GroupsMap groups={groups} className="absolute inset-0 h-full w-full" />
          </div>
        </AnimateIn>

      </Container>
    </section>
  );
}
