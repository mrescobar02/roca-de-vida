"use client";

import * as React from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { Navigation, Loader2 } from "lucide-react";
import { cn } from "@rdv/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GroupPin {
  slug: string;
  name: string;
  neighborhood: string;
  schedule: string;
  isFull: boolean;
  lat: number;
  lng: number;
}

interface GroupsMapProps {
  groups: GroupPin[];
  className?: string;
}

// ─── Panama center ────────────────────────────────────────────────────────────
const PANAMA_CENTER: LatLngExpression = [8.994, -79.518];
const DEFAULT_ZOOM = 11;

// ─── Subcomponent: user-location layer + locate button ───────────────────────

function LocationLayer() {
  const map = useMap();
  const [userPos, setUserPos] = React.useState<[number, number] | null>(null);
  const [status, setStatus] = React.useState<"idle" | "loading" | "denied">("idle");

  // Listen to Leaflet location events
  React.useEffect(() => {
    const onFound = (e: L.LocationEvent) => {
      setUserPos([e.latlng.lat, e.latlng.lng]);
      setStatus("idle");
    };
    const onError = () => setStatus("denied");
    map.on("locationfound", onFound);
    map.on("locationerror", onError);
    return () => {
      map.off("locationfound", onFound);
      map.off("locationerror", onError);
    };
  }, [map]);

  const locate = React.useCallback(() => {
    setStatus("loading");
    map.locate({ setView: true, maxZoom: 13 });
  }, [map]);

  return (
    <>
      {/* User position marker */}
      {userPos && (
        <CircleMarker
          center={userPos}
          radius={8}
          pathOptions={{
            color: "#3b82f6",
            fillColor: "#3b82f6",
            fillOpacity: 0.9,
            weight: 3,
            opacity: 0.5,
          }}
        >
          <Tooltip direction="top" offset={[0, -10]} permanent={false}>
            <span className="text-[0.75rem] font-body">Tu ubicación</span>
          </Tooltip>
        </CircleMarker>
      )}

      {/* Locate-me button — rendered via Portal outside MapContainer to avoid z-index issues */}
      <LocateButton status={status} onLocate={locate} />
    </>
  );
}

// Custom control rendered as an absolute-positioned overlay
function LocateButton({
  status,
  onLocate,
}: {
  status: "idle" | "loading" | "denied";
  onLocate: () => void;
}) {
  // Rendered inside MapContainer so it's positioned relative to the map div
  return (
    <div
      className="leaflet-top leaflet-right"
      style={{ pointerEvents: "none" }}
    >
      <div className="leaflet-control" style={{ pointerEvents: "auto", margin: "10px 10px 0 0" }}>
        <button
          onClick={onLocate}
          disabled={status === "loading" || status === "denied"}
          title={
            status === "denied"
              ? "Permiso de ubicación denegado"
              : "Centrar en mi ubicación"
          }
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-xl",
            "font-body text-[0.75rem] font-semibold",
            "border transition-colors duration-200",
            status === "denied"
              ? "bg-bg-raised border-border text-text-muted cursor-not-allowed"
              : "bg-bg-raised border-border-gold text-gold hover:bg-gold hover:text-bg-base cursor-pointer"
          )}
        >
          {status === "loading" ? (
            <Loader2 size={12} strokeWidth={2} className="animate-spin" aria-hidden />
          ) : (
            <Navigation size={12} strokeWidth={2} aria-hidden />
          )}
          {status === "denied" ? "Sin permiso" : "Mi ubicación"}
        </button>
      </div>
    </div>
  );
}

// ─── Main map component ───────────────────────────────────────────────────────

export function GroupsMap({ groups, className }: GroupsMapProps) {
  const pinned = groups.filter((g) => g.lat != null && g.lng != null);

  return (
    <MapContainer
      center={PANAMA_CENTER}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom={false}
      className={cn("h-full w-full", className)}
      style={{ background: "#111111" }}
    >
      {/* CartoDB DarkMatter — no API key, matches dark theme */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
      />

      {/* Group pins */}
      {pinned.map((g) => (
        <CircleMarker
          key={g.slug}
          center={[g.lat, g.lng]}
          radius={g.isFull ? 5 : 7}
          pathOptions={{
            color: g.isFull ? "#555555" : "#ffcc4d",
            fillColor: g.isFull ? "#333333" : "#ffcc4d",
            fillOpacity: g.isFull ? 0.5 : 0.85,
            weight: g.isFull ? 1 : 2,
          }}
        >
          <Tooltip direction="top" offset={[0, -8]}>
            <div className="flex flex-col gap-0.5">
              <span className="font-display font-700 text-text-primary text-[0.8125rem] leading-tight">
                {g.name}
              </span>
              <span className="font-body text-text-secondary text-[0.75rem]">{g.schedule}</span>
              <span
                className={cn(
                  "text-[0.6875rem] font-semibold mt-0.5",
                  g.isFull ? "text-text-muted" : "text-gold"
                )}
              >
                {g.isFull ? "Lleno" : "Disponible"}
              </span>
            </div>
          </Tooltip>
        </CircleMarker>
      ))}

      {/* Geolocation layer + button */}
      <LocationLayer />
    </MapContainer>
  );
}
