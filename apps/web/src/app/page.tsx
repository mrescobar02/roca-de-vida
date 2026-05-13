import {
  HeroSection,
  WelcomeSection,
  MinistriesPreview,
  LatestSermonsSection,
  EventsPreview,
  CellGroupsTeaser,
  TestimonialsSection,
  DonationCTA,
  ContactCTA,
} from "@/components/sections";
import { CELL_GROUPS } from "@/lib/mock/groups";
import { getLatestSermons, getIsLive, toSermonProps } from "@/lib/youtube/api";
import { SERMONS } from "@/lib/mock/sermons";

const MINISTRIES = [
  { name: "Hombres", slug: "hombres", tagline: "Identidad y liderazgo", category: "Ministerio", heroImage: { url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=533&fit=crop", alt: "Ministerio de Hombres" } },
  { name: "Mujeres", slug: "mujeres", tagline: "Propósito y comunidad", category: "Ministerio", heroImage: { url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=533&fit=crop", alt: "Ministerio de Mujeres" } },
  { name: "Roca Kids", slug: "roca-kids", tagline: "Fe desde la infancia", category: "Ministerio", heroImage: { url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=533&fit=crop", alt: "Roca Kids" } },
  { name: "Prejuvenil", slug: "prejuvenil", tagline: "10 a 14 años", category: "Ministerio", heroImage: { url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=533&fit=crop", alt: "Prejuvenil" } },
  { name: "Jóvenes", slug: "jovenes", tagline: "15 a 20 años", category: "Ministerio", heroImage: { url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=533&fit=crop&sig=1", alt: "Jóvenes" } },
  { name: "Metanoia", slug: "metanoia", tagline: "Ministerio escolar", category: "Ministerio", heroImage: { url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=533&fit=crop", alt: "Metanoia" } },
];

// ─── Mock sermon fallback (used when YOUTUBE_API_KEY is not set) ─────────────
const MOCK_FEATURED = {
  title: SERMONS[0].title,
  slug: SERMONS[0].slug,
  youtubeUrl: SERMONS[0].youtubeUrl,
  pastor: { name: SERMONS[0].pastor.name },
  date: SERMONS[0].date,
  series: SERMONS[0].series,
  scripture: SERMONS[0].scripture,
  duration: SERMONS[0].duration,
};

const MOCK_RECENT = SERMONS.slice(1, 4).map((s) => ({
  title: s.title,
  slug: s.slug,
  youtubeUrl: s.youtubeUrl,
  pastor: { name: s.pastor.name },
  date: s.date,
  series: s.series,
  duration: s.duration,
}));

const EVENTS = [
  { title: "Noche de Adoración", slug: "noche-adoracion-jun", date: "2025-06-15", time: "7:00 PM", location: "Templo principal, Panamá", ministry: { name: "Jóvenes", slug: "jovenes" }, banner: { url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=338&fit=crop", alt: "Noche de Adoración" } },
  { title: "Retiro de Jóvenes Adultos", slug: "retiro-jovenes-jun", date: "2025-06-28", time: "8:00 AM", location: "Centro de Retiros, Capira", ministry: { name: "Jóvenes Adultos", slug: "jovenes-adultos" }, banner: { url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=338&fit=crop", alt: "Retiro de Jóvenes" } },
  { title: "Conferencia de Liderazgo", slug: "conferencia-liderazgo-jul", date: "2025-07-05", time: "9:00 AM", location: "Templo principal", banner: { url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=338&fit=crop", alt: "Conferencia de Liderazgo" } },
];

const TESTIMONIALS = [
  { id: "t1", name: "Sofía Martínez", ministry: "Ministerio de Mujeres", quote: "Roca de Vida me ayudó a encontrar mi propósito y a sanar heridas que cargaba por años. Estoy agradecida por cada persona en esta iglesia." },
  { id: "t2", name: "Andrés López", ministry: "Jóvenes Adultos", quote: "Encontré una comunidad auténtica que me acompañó en los momentos más difíciles. Hoy puedo decir que la fe cambia vidas reales." },
  { id: "t3", name: "Patricia Gómez", ministry: "Bendecidos para Bendecir", quote: "Este ministerio me enseñó que servir es la forma más alta de vivir. Mi vida tiene un nuevo significado desde que llegué a RDV." },
  { id: "t4", name: "Roberto Sánchez", ministry: "Ministerio de Hombres", quote: "Dios restauró mi familia a través de esta iglesia. Lo que parecía imposible, Él lo hizo posible en menos de un año." },
  { id: "t5", name: "Camila Herrera", ministry: "Roca Kids (voluntaria)", quote: "Ver crecer la fe de los niños semana a semana es el privilegio más grande que he tenido. Esta iglesia me dio un corazón para servir." },
];

export const revalidate = 60;

export default async function HomePage() {
  const [ytVideos, liveStatus] = await Promise.all([
    getLatestSermons(4),
    getIsLive(),
  ]);

  const featuredSermon = ytVideos.length > 0 ? toSermonProps(ytVideos[0]) : MOCK_FEATURED;
  const recentSermons = ytVideos.length > 1
    ? ytVideos.slice(1, 4).map(toSermonProps)
    : MOCK_RECENT;

  return (
    <>
      <HeroSection isLive={liveStatus.isLive} />

      <WelcomeSection
        overline="Nuestro pastor"
        heading="Ps. Juan Mario Herrero"
        body="Un maestro de la Palabra dedicado a la exposición fiel de las Escrituras Bíblicas. Su liderazgo en Roca de Vida se centra en el arrepentimiento como inicio de una nueva vida en Cristo, la sana doctrina, el fortalecimiento de la familia y una profunda pasión por las almas y el evangelismo."
        image={{
          url: "https://i0.wp.com/rocadevidapanama.com/wp-content/uploads/2026/02/RDV-JM-LDH-4-scaled.jpg?resize=683%2C1024&ssl=1",
          alt: "Pastor Juan Mario Herrero",
        }}
        ctaLabel="Conoce al equipo pastoral"
        ctaHref="/nosotros/equipo"
        pillars={[
          { label: "Sana doctrina y exposición bíblica" },
          { label: "Fortalecimiento de la familia" },
          { label: "Pasión por el evangelismo" },
        ]}
      />

      <MinistriesPreview ministries={MINISTRIES} />

      <LatestSermonsSection
        featured={featuredSermon}
        recent={recentSermons}
      />

      <EventsPreview events={EVENTS} />

      <CellGroupsTeaser
        totalGroups={CELL_GROUPS.length}
        neighborhoods={[...new Set(CELL_GROUPS.map((g) => g.district))].length}
        groups={CELL_GROUPS.filter((g) => g.lat != null && g.lng != null).map((g) => ({
          slug: g.slug,
          name: g.name,
          neighborhood: g.neighborhood,
          schedule: g.schedule,
          isFull: g.isFull,
          lat: g.lat!,
          lng: g.lng!,
        }))}
      />

      <TestimonialsSection testimonials={TESTIMONIALS} />

      <DonationCTA />

      <ContactCTA />
    </>
  );
}
