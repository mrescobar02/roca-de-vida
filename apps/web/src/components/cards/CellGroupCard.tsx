import { MapPin, Clock, Users } from "lucide-react";
import { cn } from "@rdv/utils";
import { Badge } from "@/components/ui/badge";

export interface CellGroupCardProps {
  name: string;
  neighborhood: string;
  district?: string;
  schedule: string;
  leaderName: string;
  capacity?: number;
  enrolled?: number;
  isFull?: boolean;
  /** "default" | "compact" */
  layout?: "default" | "compact";
  className?: string;
  onContact?: () => void;
}

export function CellGroupCard({
  name,
  neighborhood,
  district,
  schedule,
  leaderName,
  capacity,
  enrolled,
  isFull = false,
  layout = "default",
  className,
  onContact,
}: CellGroupCardProps) {
  const spotsLeft = capacity && enrolled != null ? capacity - enrolled : null;
  const almostFull = spotsLeft != null && spotsLeft > 0 && spotsLeft <= 3;

  if (layout === "compact") {
    return (
      <div
        className={cn(
          "flex items-center justify-between gap-3 p-4 bg-bg-surface border border-border rounded-2xl",
          "hover:border-border-gold transition-colors duration-200",
          className
        )}
      >
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="font-display font-700 text-text-primary text-[0.9375rem] leading-tight truncate">
            {name}
          </p>
          <div className="flex items-center gap-1.5 text-text-muted">
            <MapPin size={11} strokeWidth={1.5} aria-hidden />
            <span className="font-body text-[0.75rem] truncate">{neighborhood}</span>
          </div>
        </div>
        <StatusBadge isFull={isFull} almostFull={almostFull} />
      </div>
    );
  }

  return (
    <article
      className={cn(
        "flex flex-col gap-4 p-5 bg-bg-surface border border-border rounded-2xl",
        "hover:border-border-gold transition-colors duration-300",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1 min-w-0">
          {district && (
            <span className="text-label text-gold text-[0.6875rem]">{district}</span>
          )}
          <h3 className="font-display font-700 text-text-primary text-[1.0625rem] leading-tight">
            {name}
          </h3>
        </div>
        <StatusBadge isFull={isFull} almostFull={almostFull} />
      </div>

      {/* Detalles */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <MapPin size={13} strokeWidth={1.5} className="text-text-muted shrink-0" aria-hidden />
          <span className="font-body text-[0.8125rem] text-text-secondary">{neighborhood}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={13} strokeWidth={1.5} className="text-text-muted shrink-0" aria-hidden />
          <span className="font-body text-[0.8125rem] text-text-secondary">{schedule}</span>
        </div>
        {capacity != null && (
          <div className="flex items-center gap-2">
            <Users size={13} strokeWidth={1.5} className="text-text-muted shrink-0" aria-hidden />
            <span className="font-body text-[0.8125rem] text-text-secondary">
              {enrolled ?? 0}/{capacity} personas
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-border">
        <div className="flex flex-col gap-0.5">
          <span className="text-label text-text-muted text-[0.625rem]">Líder</span>
          <span className="font-body text-[0.8125rem] text-text-secondary">{leaderName}</span>
        </div>

        {!isFull && onContact && (
          <button
            onClick={onContact}
            className={cn(
              "font-display font-700 text-[0.8125rem] tracking-[0.04em]",
              "px-4 py-1.5 rounded-2xl border border-border-gold text-gold",
              "hover:bg-gold hover:text-bg-base transition-colors duration-200"
            )}
          >
            Unirme
          </button>
        )}

        {isFull && (
          <span className="font-body text-[0.75rem] text-text-muted italic">Grupo lleno</span>
        )}
      </div>
    </article>
  );
}

function StatusBadge({ isFull, almostFull }: { isFull: boolean; almostFull: boolean }) {
  if (isFull) {
    return <Badge variant="outline" className="shrink-0 text-text-muted border-border">Lleno</Badge>;
  }
  if (almostFull) {
    return <Badge variant="gold" className="shrink-0">Últimos cupos</Badge>;
  }
  return <Badge variant="surface" className="shrink-0 text-gold border-border-gold">Disponible</Badge>;
}
