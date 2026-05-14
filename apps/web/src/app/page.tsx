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
import { getLatestSermons, getIsLive, toSermonProps } from "@/lib/youtube/api";
import {
  getMinistries,
  getUpcomingEvents,
  getCellGroups,
  getFeaturedTestimonials,
  getSermons,
  richTextToPlain,
  type CmsSermon,
} from "@/lib/payload/client";

export const revalidate = 60;

function cmsSermonToProps(s: CmsSermon) {
  return {
    title: s.title,
    slug: s.slug,
    youtubeUrl: s.youtubeUrl,
    pastor: { name: s.pastor?.name ?? "Roca de Vida" },
    date: s.date,
    series: s.series,
    duration: s.duration,
    thumbnail: s.thumbnail ? { url: s.thumbnail.url, alt: s.thumbnail.alt ?? s.title } : undefined,
  };
}

export default async function HomePage() {
  const [ytVideos, liveStatus, ministriesResult, eventsResult, groupsResult, testimonialsResult, cmsSermons] =
    await Promise.all([
      getLatestSermons(4),
      getIsLive(),
      getMinistries(),
      getUpcomingEvents(3),
      getCellGroups(),
      getFeaturedTestimonials(),
      getSermons({ limit: 4 }),
    ]);

  const featuredSermon =
    ytVideos.length > 0
      ? toSermonProps(ytVideos[0])
      : cmsSermons.docs.length > 0
        ? cmsSermonToProps(cmsSermons.docs[0])
        : null;

  const recentSermons =
    ytVideos.length > 1
      ? ytVideos.slice(1, 4).map(toSermonProps)
      : cmsSermons.docs.slice(1, 4).map(cmsSermonToProps);

  const ministries = ministriesResult.docs.map((m) => ({
    name: m.name,
    slug: m.slug,
    tagline: m.tagline,
    category: m.category ?? "Ministerio",
    heroImage: m.heroImage
      ? { url: m.heroImage.url, alt: m.heroImage.alt ?? m.name }
      : { url: "", alt: m.name },
  }));

  const events = eventsResult.docs.map((e) => ({
    title: e.title,
    slug: e.slug,
    date: e.date,
    time: e.time,
    location: e.location,
    ministry: e.ministry ? { name: e.ministry.name, slug: e.ministry.slug } : undefined,
    banner: { url: e.banner?.url ?? "", alt: e.banner?.alt ?? e.title },
  }));

  const groups = groupsResult.docs;
  const districts = [...new Set(groups.map((g) => g.district))];

  const testimonials = testimonialsResult.docs.map((t) => ({
    id: t.id,
    quote: richTextToPlain(t.content),
    name: t.name,
    ministry: t.ministry?.name,
  }));

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

      <MinistriesPreview ministries={ministries} />

      {featuredSermon && (
        <LatestSermonsSection
          featured={featuredSermon}
          recent={recentSermons}
        />
      )}

      <EventsPreview events={events} />

      <CellGroupsTeaser
        totalGroups={groups.length}
        neighborhoods={districts.length}
        groups={groups
          .filter((g) => g.coordinates?.lat != null && g.coordinates?.lng != null)
          .map((g) => ({
            slug: g.slug,
            name: g.name,
            neighborhood: g.neighborhood,
            schedule: g.schedule,
            isFull: g.isFull ?? false,
            lat: g.coordinates!.lat,
            lng: g.coordinates!.lng,
          }))}
      />

      <TestimonialsSection testimonials={testimonials} />

      <DonationCTA />

      <ContactCTA />
    </>
  );
}
