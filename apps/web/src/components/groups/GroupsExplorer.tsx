"use client";

import * as React from "react";
import { cn } from "@rdv/utils";
import { CellGroupCard } from "@/components/cards";
export interface CellGroupData {
  name: string;
  slug: string;
  neighborhood: string;
  district: string;
  day: string;
  schedule: string;
  leaderName: string;
  leaderTitle?: string;
  capacity: number;
  enrolled: number;
  isFull: boolean;
  address?: string;
  bio: string;
  lat?: number;
  lng?: number;
}

interface GroupsExplorerProps {
  groups: CellGroupData[];
  districts: string[];
  days: string[];
}

export function GroupsExplorer({ groups, districts, days }: GroupsExplorerProps) {
  const [activeDay, setActiveDay] = React.useState<string>("Todos");
  const [activeDistrict, setActiveDistrict] = React.useState<string>("Todos");

  const filtered = groups.filter((g) => {
    const matchDay = activeDay === "Todos" || g.day === activeDay;
    const matchDistrict = activeDistrict === "Todos" || g.district === activeDistrict;
    return matchDay && matchDistrict;
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Filtros */}
      <div className="flex flex-col gap-4">
        {/* Filtro por día */}
        <div className="flex flex-wrap gap-2">
          {["Todos", ...days].map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={cn(
                "px-4 py-1.5 rounded-full border text-label transition-all duration-200",
                "text-[0.8125rem] font-display font-700",
                activeDay === day
                  ? "bg-gold border-gold text-bg-base"
                  : "border-border text-text-secondary hover:border-border-gold hover:text-gold"
              )}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Filtro por sector + contador */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label
              htmlFor="district-filter"
              className="text-label text-text-muted text-[0.75rem] shrink-0"
            >
              Sector:
            </label>
            <select
              id="district-filter"
              value={activeDistrict}
              onChange={(e) => setActiveDistrict(e.target.value)}
              className={cn(
                "bg-bg-surface border border-border rounded-xl px-3 py-1.5",
                "font-body text-[0.875rem] text-text-secondary",
                "hover:border-border-gold focus:outline-none focus:border-border-gold",
                "transition-colors duration-200"
              )}
            >
              <option value="Todos">Todos los sectores</option>
              {districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <span className="text-label text-text-muted text-[0.75rem] ml-auto">
            {filtered.length === groups.length
              ? `${groups.length} grupos`
              : `${filtered.length} de ${groups.length} grupos`}
          </span>
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((group) => (
            <CellGroupCard
              key={group.slug}
              name={group.name}
              neighborhood={group.neighborhood}
              district={group.district}
              schedule={group.schedule}
              leaderName={group.leaderName}
              capacity={group.capacity}
              enrolled={group.enrolled}
              isFull={group.isFull}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <p className="font-display font-700 text-text-primary text-[1.0625rem]">
            No hay grupos con esos filtros
          </p>
          <p className="font-body text-[0.9375rem] text-text-secondary">
            Prueba con otro día o sector.
          </p>
          <button
            onClick={() => { setActiveDay("Todos"); setActiveDistrict("Todos"); }}
            className="text-label text-gold hover:text-gold-muted transition-colors mt-2"
          >
            Ver todos los grupos →
          </button>
        </div>
      )}
    </div>
  );
}
