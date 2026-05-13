"use client";

import * as React from "react";
import { Play } from "lucide-react";
import Image from "next/image";
import { cn, getYoutubeVideoId, getYoutubeThumbnail } from "@rdv/utils";

interface YoutubeEmbedProps {
  url: string;
  title?: string;
  autoplay?: boolean;
  /** Mostrar thumbnail con play button — carga iframe solo al hacer click */
  lazy?: boolean;
  className?: string;
}

export function YoutubeEmbed({
  url,
  title = "Video",
  autoplay = false,
  lazy = false,
  className,
}: YoutubeEmbedProps) {
  const [active, setActive] = React.useState(!lazy);
  const videoId = getYoutubeVideoId(url);

  if (!videoId) return null;

  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    ...(autoplay || (lazy && active) ? { autoplay: "1" } : {}),
  });

  const embedUrl = `https://www.youtube.com/embed/${videoId}?${params}`;
  const thumbnail =
    getYoutubeThumbnail(url, "maxresdefault") ??
    getYoutubeThumbnail(url, "hqdefault") ??
    "";

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-2xl bg-black",
        className
      )}
    >
      {active ? (
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        /* Lazy poster */
        <button
          onClick={() => setActive(true)}
          className="group absolute inset-0 w-full h-full"
          aria-label={`Reproducir: ${title}`}
        >
          {thumbnail && (
            <Image
              src={thumbnail}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          )}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" aria-hidden />
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gold/90 shadow-2xl group-hover:scale-110 transition-transform duration-300">
              <Play size={28} fill="#000" className="ml-1 text-bg-base" aria-hidden />
            </div>
          </div>
        </button>
      )}
    </div>
  );
}
