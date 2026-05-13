"use client";

import * as React from "react";
import { Globe, Video } from "lucide-react";
import { cn } from "@rdv/utils";

// ─── Meeting config ───────────────────────────────────────────────────────────
// Every Thursday, 8:10 PM – 9:30 PM, Panama time (UTC-5, no DST)

const PANAMA_OFFSET_MS = 5 * 3_600_000; // ms to subtract from UTC → Panama
const MEETING_DAY = 4;                   // 0=Sun … 4=Thu … 6=Sat
const MEETING_START_MIN = 20 * 60 + 10; // 8:10 PM = 1210 min
const MEETING_END_MIN   = 21 * 60 + 30; // 9:30 PM = 1290 min

/** Returns a synthetic Date whose UTC fields equal Panama local time fields. */
function toPanamaLocal(utc: Date) {
  return new Date(utc.getTime() - PANAMA_OFFSET_MS);
}

type MeetingStatus = "live" | "countdown" | "upcoming";

function getMeetingStatus(now: Date): MeetingStatus {
  const p = toPanamaLocal(now);
  const day = p.getUTCDay();
  const min = p.getUTCHours() * 60 + p.getUTCMinutes();
  if (day !== MEETING_DAY) return "upcoming";
  if (min >= MEETING_START_MIN && min < MEETING_END_MIN) return "live";
  if (min < MEETING_START_MIN) return "countdown";
  return "upcoming"; // Thursday after 9:30 PM
}

/** Returns the UTC instant of the next (or current-day) Thursday 8:10 PM Panama. */
function getNextMeetingUTC(now: Date): Date {
  const p = toPanamaLocal(now);
  const day = p.getUTCDay();
  const min = p.getUTCHours() * 60 + p.getUTCMinutes();

  let ahead = (MEETING_DAY - day + 7) % 7;
  // Thursday after meeting end → skip to next Thursday
  if (day === MEETING_DAY && min >= MEETING_END_MIN) ahead = 7;

  const next = new Date(p);
  next.setUTCDate(p.getUTCDate() + ahead);
  next.setUTCHours(20, 10, 0, 0); // 8:10 PM in Panama-time representation
  return new Date(next.getTime() + PANAMA_OFFSET_MS); // back to real UTC
}

function msToCountdown(ms: number, withSeconds: boolean): string {
  if (ms <= 0) return withSeconds ? "00:00:00" : "0h 00m";
  const total = Math.floor(ms / 1_000);
  const d = Math.floor(total / 86_400);
  const h = Math.floor((total % 86_400) / 3_600);
  const m = Math.floor((total % 3_600) / 60);
  const s = total % 60;
  const z = (n: number) => String(n).padStart(2, "0");
  if (!withSeconds) return d > 0 ? `${d}d ${z(h)}h ${z(m)}m` : `${z(h)}h ${z(m)}m`;
  return d > 0 ? `${d}d ${z(h)}h ${z(m)}m` : `${z(h)}:${z(m)}:${z(s)}`;
}

function formatPanamaDate(utcDate: Date): string {
  const panama = new Date(utcDate.getTime() - PANAMA_OFFSET_MS);
  return new Intl.DateTimeFormat("es-ES", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(panama);
}

// ─── Component ────────────────────────────────────────────────────────────────

interface FeSinFronterasCardProps {
  /**
   * Google Meet link for the active session — set in Payload CMS every Thursday.
   * When undefined the button renders disabled; when present it activates during
   * the 8:10 PM – 9:30 PM Panama window.
   */
  joinUrl?: string;
}

export function FeSinFronterasCard({ joinUrl }: FeSinFronterasCardProps) {
  const [now, setNow] = React.useState<Date | null>(null);

  React.useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 1_000);
    return () => clearInterval(id);
  }, []);

  // Safe defaults before hydration
  const status: MeetingStatus = now ? getMeetingStatus(now) : "upcoming";
  const nextMeeting     = now ? getNextMeetingUTC(now) : null;
  const msTill          = nextMeeting && now ? nextMeeting.getTime() - now.getTime() : null;
  const panamaDateStr   = nextMeeting ? formatPanamaDate(nextMeeting) : null;
  const localTimeStr    = nextMeeting
    ? nextMeeting.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZoneName: "short",
      })
    : null;

  const isActive = !!joinUrl && status === "live";

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10",
        "bg-gradient-to-br from-[#0f0c29] via-[#1a1046] to-[#1f1135]",
        "p-6 sm:p-8"
      )}
    >
      {/* Decorative glows */}
      <div
        className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }}
        aria-hidden
      />
      <div
        className="absolute -bottom-12 -left-8 w-40 h-40 rounded-full opacity-15 blur-2xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-6">

        {/* Icon */}
        <div className="shrink-0 w-14 h-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
          <Globe size={26} strokeWidth={1.25} className="text-violet-300" aria-hidden />
        </div>

        {/* Main content */}
        <div className="flex flex-col gap-2.5 flex-1 min-w-0">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 text-label text-[0.625rem] tracking-[0.14em] px-2.5 py-0.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300">
              <Video size={9} strokeWidth={2} aria-hidden />
              CÉLULA VIRTUAL
            </span>
            <span className="inline-flex items-center text-label text-[0.625rem] tracking-[0.14em] px-2.5 py-0.5 rounded-full border border-white/15 bg-white/5 text-text-muted">
              EN ESPAÑOL
            </span>
            <span className="inline-flex items-center text-label text-[0.625rem] tracking-[0.14em] px-2.5 py-0.5 rounded-full border border-white/15 bg-white/5 text-text-muted">
              TODO EL MUNDO
            </span>
          </div>

          <h2 className="font-display font-800 text-text-primary text-[1.5rem] leading-tight">
            Fé sin Fronteras
          </h2>

          <p className="font-body text-[0.9rem] text-text-secondary leading-relaxed max-w-[60ch]">
            Una célula virtual abierta para hispano-hablantes en cualquier parte del mundo.
            Conéctate desde donde estés — lo único que necesitas es querer crecer.
          </p>
        </div>

        {/* CTA + schedule */}
        <div className="shrink-0 flex flex-col gap-3 sm:items-end">

          {/* Button — always visible; active only during live window with a joinUrl */}
          {isActive ? (
            <a
              href={joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2 whitespace-nowrap",
                "font-display font-700 text-[0.875rem] tracking-[0.03em]",
                "px-6 py-2.5 rounded-full",
                "bg-violet-600 hover:bg-violet-500 text-white",
                "transition-colors duration-200"
              )}
            >
              <Video size={14} strokeWidth={2} aria-hidden />
              Ingresar ahora
            </a>
          ) : (
            <button
              disabled
              aria-label="La reunión no está disponible en este momento"
              className={cn(
                "inline-flex items-center gap-2 whitespace-nowrap",
                "font-display font-700 text-[0.875rem] tracking-[0.03em]",
                "px-6 py-2.5 rounded-full",
                "bg-white/5 border border-white/10 text-white/30",
                "cursor-not-allowed"
              )}
            >
              <Video size={14} strokeWidth={2} aria-hidden />
              Unirme a la reunión
            </button>
          )}

          {/* Meeting info */}
          {status === "live" ? (
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" aria-hidden />
              <span className="font-body text-[0.75rem] text-green-400">
                En curso · termina a las 9:30 PM (Panamá)
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-0.5 sm:items-end">
              <p className="font-body text-[0.6875rem] text-text-muted uppercase tracking-[0.1em]">
                Próxima reunión
              </p>

              {panamaDateStr ? (
                <>
                  <p className="font-body text-[0.8125rem] text-text-secondary capitalize">
                    {panamaDateStr} · 8:10 PM (Panamá)
                  </p>
                  {localTimeStr && (
                    <p className="font-body text-[0.75rem] text-text-muted">
                      {localTimeStr} en tu zona horaria
                    </p>
                  )}
                </>
              ) : (
                <p className="font-body text-[0.8125rem] text-text-secondary">
                  Jueves · 8:10 PM (Panamá)
                </p>
              )}

              {/* Countdown — prominent (hh:mm:ss) when same day; subtle otherwise */}
              {status === "countdown" && msTill != null && (
                <p className="font-display font-700 text-violet-300 text-[1.5rem] leading-none tabular-nums mt-1.5">
                  {msToCountdown(msTill, true)}
                </p>
              )}
              {status === "upcoming" && msTill != null && (
                <p className="font-body text-[0.8125rem] text-text-muted tabular-nums mt-0.5">
                  en {msToCountdown(msTill, false)}
                </p>
              )}
            </div>
          )}

        </div>
      </div>
    </article>
  );
}
