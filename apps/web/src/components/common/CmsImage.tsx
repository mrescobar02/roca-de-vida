import Image, { type ImageProps } from "next/image";
import { cn } from "@rdv/utils";

interface CmsImageProps extends Omit<ImageProps, "src" | "alt"> {
  src: string;
  alt: string;
  /** Aspecto de la imagen — se aplica al wrapper */
  aspect?: "video" | "square" | "portrait" | "wide" | "cinema";
  /** Aplica overlay-card automáticamente */
  overlay?: "card" | "hero" | "dark" | "none";
  className?: string;
  wrapperClassName?: string;
}

const ASPECT_CLASSES = {
  video:    "aspect-video",
  square:   "aspect-square",
  portrait: "aspect-[3/4]",
  wide:     "aspect-[4/3]",
  cinema:   "aspect-[21/9]",
} as const;

const OVERLAY_CLASSES = {
  card:  "overlay-card",
  hero:  "overlay-hero",
  dark:  "overlay-dark",
  none:  "",
} as const;

/**
 * Wrapper sobre next/image con soporte para Cloudinary y overlays.
 * Cuando Cloudinary esté configurado, las URLs se transforman automáticamente.
 */
function CmsImage({
  src,
  alt,
  aspect,
  overlay = "none",
  className,
  wrapperClassName,
  fill,
  ...props
}: CmsImageProps) {
  const shouldFill = fill ?? !!aspect;

  if (aspect) {
    return (
      <div
        className={cn(
          "relative overflow-hidden",
          ASPECT_CLASSES[aspect],
          wrapperClassName
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={cn("object-cover object-center", className)}
          {...props}
        />
        {overlay !== "none" && (
          <div
            aria-hidden
            className={cn("absolute inset-0", OVERLAY_CLASSES[overlay])}
          />
        )}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)}>
      <Image
        src={src}
        alt={alt}
        fill={shouldFill}
        className={cn("object-cover object-center", className)}
        {...props}
      />
      {overlay !== "none" && (
        <div
          aria-hidden
          className={cn("absolute inset-0", OVERLAY_CLASSES[overlay])}
        />
      )}
    </div>
  );
}

export { CmsImage };
