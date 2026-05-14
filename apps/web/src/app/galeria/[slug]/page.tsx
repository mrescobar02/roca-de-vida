import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Camera } from "lucide-react";
import { Container } from "@/components/common/Container";
import { AnimateIn, StaggerContainer, AnimateInItem } from "@/components/common/AnimateIn";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@rdv/utils";
import { getGalleries, getGalleryBySlug } from "@/lib/payload/client";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const result = await getGalleries();
    return result.docs.map((g) => ({ slug: g.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getGalleryBySlug(slug);
  const gallery = result.docs[0];
  if (!gallery) return {};
  return {
    title: `${gallery.title} | Galería — Roca de Vida Panamá`,
    openGraph: gallery.coverImage ? { images: [{ url: gallery.coverImage.url }] } : {},
  };
}

export const revalidate = 300;
export const dynamicParams = true;

export default async function GalleryPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getGalleryBySlug(slug);
  const gallery = result.docs[0];
  if (!gallery) notFound();

  const rawPhotos = gallery.photos ?? [];
  const coverImage = gallery.coverImage;
  const totalCount = gallery.photoCount ?? rawPhotos.length;

  const photos =
    rawPhotos.length >= 6
      ? rawPhotos
      : Array.from({ length: 12 }, (_, i) =>
          rawPhotos[i % rawPhotos.length] ?? coverImage
        ).filter(Boolean);

  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-bg-base border-b border-border">
        <Container className="py-4">
          <nav className="flex items-center gap-2 text-label text-text-muted text-[0.75rem]" aria-label="Breadcrumb">
            <Link href="/galeria" className="hover:text-gold transition-colors">Galería</Link>
            <ChevronRight size={12} aria-hidden />
            <span className="text-text-secondary truncate">{gallery.title}</span>
          </nav>
        </Container>
      </section>

      {/* Header */}
      <section className="bg-bg-base">
        <Container className="pt-10 pb-8">
          <AnimateIn variant="fadeUp" trigger="mount">
            <div className="flex flex-col gap-3">
              {gallery.ministry && (
                <Badge variant="gold" className="self-start">{gallery.ministry.name}</Badge>
              )}
              <h1 className="text-h1 text-text-primary">{gallery.title}</h1>
              <div className="flex items-center gap-4">
                <time dateTime={gallery.date} className="font-body text-[0.875rem] text-text-secondary">
                  {formatDate(gallery.date)}
                </time>
                <div className="flex items-center gap-1.5 text-text-muted">
                  <Camera size={13} strokeWidth={1.5} aria-hidden />
                  <span className="font-body text-[0.875rem]">{totalCount} fotos</span>
                </div>
              </div>
            </div>
          </AnimateIn>
        </Container>
      </section>

      {/* Grid de fotos */}
      <section className="bg-bg-base pb-20">
        <Container>
          <StaggerContainer
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3"
            staggerDelay={0.04}
          >
            {photos.map((photo, i) => (
              <AnimateInItem key={i} variant="scaleIn">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-bg-raised group cursor-zoom-in">
                  <Image
                    src={photo!.url}
                    alt={photo!.alt || `Foto ${i + 1} — ${gallery.title}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                  <div
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"
                    aria-hidden
                  />
                </div>
              </AnimateInItem>
            ))}
          </StaggerContainer>

          {totalCount > photos.length && (
            <AnimateIn variant="fadeUp" className="flex justify-center mt-10">
              <p className="font-body text-[0.9375rem] text-text-muted">
                Mostrando {photos.length} de {totalCount} fotos
              </p>
            </AnimateIn>
          )}
        </Container>
      </section>

      {/* Nav */}
      <section className="bg-bg-base border-t border-border">
        <Container className="py-8">
          <Link href="/galeria" className="flex items-center gap-2 text-label text-text-muted hover:text-gold transition-colors">
            <span aria-hidden>←</span> Todas las galerías
          </Link>
        </Container>
      </section>
    </>
  );
}
