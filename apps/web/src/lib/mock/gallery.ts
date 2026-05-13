// Mock data — reemplazar con getGalleries() / getGallery() de lib/payload/client.ts

export interface GalleryPhoto {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface GalleryData {
  title: string;
  slug: string;
  date: string;
  coverImage: { url: string; alt: string };
  ministry?: { name: string; slug: string };
  event?: string;
  photoCount: number;
  photos: GalleryPhoto[];
}

const makePhotos = (count: number, query: string): GalleryPhoto[] =>
  Array.from({ length: count }, (_, i) => ({
    url: `https://images.unsplash.com/photo-${1529156069898 + i * 100}?w=800&h=600&fit=crop&q=${query}`,
    alt: `Foto ${i + 1}`,
  }));

export const GALLERIES: GalleryData[] = [
  {
    title: "Bautismos — Mayo 2025",
    slug: "bautismos-mayo-2025",
    date: "2025-05-18",
    coverImage: { url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=450&fit=crop", alt: "Bautismos" },
    photoCount: 24,
    photos: makePhotos(12, "baptism"),
  },
  {
    title: "Retiro de Hombres 2025",
    slug: "retiro-hombres-2025",
    date: "2025-05-09",
    coverImage: { url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=450&fit=crop", alt: "Retiro de Hombres" },
    ministry: { name: "Hombres", slug: "hombres" },
    event: "Retiro de Hombres 2025",
    photoCount: 36,
    photos: makePhotos(12, "retreat"),
  },
  {
    title: "Noche de Adoración — Abril",
    slug: "noche-adoracion-abril-2025",
    date: "2025-04-20",
    coverImage: { url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=450&fit=crop", alt: "Noche de Adoración" },
    ministry: { name: "Jóvenes", slug: "jovenes" },
    photoCount: 18,
    photos: makePhotos(9, "worship"),
  },
  {
    title: "Día de Servicio — Bendecidos para Bendecir",
    slug: "servicio-bendecidos-2025",
    date: "2025-04-05",
    coverImage: { url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=450&fit=crop", alt: "Servicio comunitario" },
    ministry: { name: "Bendecidos para Bendecir", slug: "bendecidos" },
    photoCount: 30,
    photos: makePhotos(12, "community"),
  },
  {
    title: "Conferencia de Mujeres — Marzo",
    slug: "conferencia-mujeres-2025",
    date: "2025-03-22",
    coverImage: { url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=450&fit=crop", alt: "Conferencia de Mujeres" },
    ministry: { name: "Mujeres", slug: "mujeres" },
    photoCount: 42,
    photos: makePhotos(12, "conference"),
  },
  {
    title: "Roca Kids — Semana de Ciencia",
    slug: "roca-kids-ciencia-2025",
    date: "2025-03-15",
    coverImage: { url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=450&fit=crop", alt: "Roca Kids" },
    ministry: { name: "Roca Kids", slug: "roca-kids" },
    photoCount: 28,
    photos: makePhotos(12, "children"),
  },
];
