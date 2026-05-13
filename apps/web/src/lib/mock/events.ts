// Mock data — reemplazar con getEvents() / getEvent() de lib/payload/client.ts

export interface EventData {
  title: string;
  slug: string;
  date: string;
  endDate?: string;
  time?: string;
  location?: string;
  address?: string;
  banner: { url: string; alt: string };
  ministry?: { name: string; slug: string };
  description: string;
  isFeatured?: boolean;
  registrationUrl?: string;
  isPast?: boolean;
}

const BANNER_1 = "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=675&fit=crop";
const BANNER_2 = "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&h=675&fit=crop";
const BANNER_3 = "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200&h=675&fit=crop";
const BANNER_4 = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=675&fit=crop";
const BANNER_5 = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=675&fit=crop";
const BANNER_6 = "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&h=675&fit=crop";
const BANNER_7 = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=675&fit=crop";
const BANNER_8 = "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&h=675&fit=crop";
const BANNER_9 = "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&h=675&fit=crop";

export const EVENTS: EventData[] = [
  {
    title: "Noche de Adoración",
    slug: "noche-adoracion-jun-2025",
    date: "2025-06-15",
    time: "7:00 PM",
    location: "Templo principal",
    address: "Roca de Vida Panamá, Ciudad de Panamá",
    banner: { url: BANNER_1, alt: "Noche de Adoración" },
    ministry: { name: "Jóvenes", slug: "jovenes-teens" },
    isFeatured: true,
    description: "Una noche especial de alabanza y adoración. Ven a encontrarte con Dios en un ambiente de profunda reverencia y celebración. Música en vivo, oración y una palabra de Dios para tu vida.",
  },
  {
    title: "Retiro de Jóvenes Adultos",
    slug: "retiro-jovenes-adultos-jun-2025",
    date: "2025-06-27",
    endDate: "2025-06-29",
    time: "8:00 AM",
    location: "Centro de Retiros, Capira",
    address: "Capira, Panamá Oeste",
    banner: { url: BANNER_3, alt: "Retiro de Jóvenes Adultos" },
    ministry: { name: "Jóvenes Adultos", slug: "jovenes-adultos" },
    description: "Un fin de semana para alejarse del ruido, conectar con Dios y construir comunidad genuina. Talleres, tiempo de oración, actividades y mucha comunión.",
  },
  {
    title: "Conferencia de Liderazgo",
    slug: "conferencia-liderazgo-jul-2025",
    date: "2025-07-05",
    time: "9:00 AM",
    location: "Templo principal",
    address: "Roca de Vida Panamá, Ciudad de Panamá",
    banner: { url: BANNER_2, alt: "Conferencia de Liderazgo" },
    description: "Un espacio de formación para líderes de célula, ministerio y equipo. Herramientas prácticas, mentoría y visión compartida para la siguiente temporada.",
  },
  {
    title: "Bautismos Julio 2025",
    slug: "bautismos-jul-2025",
    date: "2025-07-13",
    time: "9:00 AM",
    location: "Templo principal",
    address: "Roca de Vida Panamá, Ciudad de Panamá",
    banner: { url: BANNER_4, alt: "Bautismos" },
    description: "¿Estás listo para hacer público tu compromiso con Dios? El bautismo es uno de los momentos más significativos en la vida de un creyente. Pre-inscripción requerida.",
    registrationUrl: "/contacto/bautismo",
  },
  {
    title: "Servicio de Bendecidos para Bendecir",
    slug: "bendecidos-ago-2025",
    date: "2025-08-02",
    time: "8:00 AM",
    location: "Comunidad de Chilibre",
    address: "Chilibre, Panamá",
    banner: { url: BANNER_1, alt: "Servicio comunitario" },
    ministry: { name: "Bendecidos para Bendecir", slug: "bendecidos" },
    description: "Día de servicio comunitario en la comunidad de Chilibre. Distribución de alimentos, actividades para niños y oración por las familias del sector.",
  },
  {
    title: "Clase de Nuevos Creyentes",
    slug: "nuevos-creyentes-ago-2025",
    date: "2025-08-10",
    time: "10:00 AM",
    location: "Sala de reuniones — Iglesia",
    address: "Roca de Vida Panamá, Ciudad de Panamá",
    banner: { url: BANNER_2, alt: "Nuevos creyentes" },
    description: "¿Diste el paso de fe recientemente? Esta clase es para ti. Cuatro semanas de fundamentos: salvación, bautismo, Espíritu Santo y vida en comunidad.",
    registrationUrl: "/contacto",
  },
  // ── Hombres ───────────────────────────────────────────────────────────────
  {
    title: "Retiro de Hombres 2026",
    slug: "retiro-hombres-jun-2026",
    date: "2026-06-06",
    endDate: "2026-06-08",
    time: "8:00 AM",
    location: "Gamboa Rainforest Resort",
    address: "Gamboa, Panamá",
    banner: { url: BANNER_4, alt: "Retiro de Hombres 2026" },
    ministry: { name: "Ministerio de Hombres", slug: "hombres" },
    description: "Un fin de semana para hombres que quieren crecer en carácter, liderazgo y fe. Actividades al aire libre, enseñanza, oración y comunidad genuina.",
    registrationUrl: "/contacto",
  },
  {
    title: "Desayuno de Hombres — Junio",
    slug: "desayuno-hombres-jun-2026",
    date: "2026-06-21",
    time: "8:00 AM",
    location: "Templo principal",
    address: "Roca de Vida Panamá, Ciudad de Panamá",
    banner: { url: BANNER_4, alt: "Desayuno de Hombres" },
    ministry: { name: "Ministerio de Hombres", slug: "hombres" },
    description: "Nuestro desayuno mensual de hombres. Un espacio de comunión, Palabra y hermandad para comenzar el mes con propósito.",
  },

  // ── Mujeres ──────────────────────────────────────────────────────────────
  {
    title: "Noche de Mujeres — Junio",
    slug: "noche-mujeres-jun-2026",
    date: "2026-06-13",
    time: "7:00 PM",
    location: "Templo principal",
    address: "Roca de Vida Panamá, Ciudad de Panamá",
    banner: { url: BANNER_5, alt: "Noche de Mujeres" },
    ministry: { name: "Ministerio de Mujeres", slug: "mujeres" },
    description: "Una noche especial para mujeres. Adoración, Palabra y comunidad en un ambiente íntimo y transformador. Ven con tus amigas.",
  },
  {
    title: "Retiro de Mujeres 2026",
    slug: "retiro-mujeres-jul-2026",
    date: "2026-07-18",
    endDate: "2026-07-19",
    time: "9:00 AM",
    location: "Coronado Beach Resort",
    address: "Coronado, Panamá Oeste",
    banner: { url: BANNER_5, alt: "Retiro de Mujeres 2026" },
    ministry: { name: "Ministerio de Mujeres", slug: "mujeres" },
    description: "Dos días para reconectarte con Dios y contigo misma. Talleres sobre identidad, propósito y fe, en un ambiente rodeado de naturaleza.",
    registrationUrl: "/contacto",
  },

  // ── Roca Kids ────────────────────────────────────────────────────────────
  {
    title: "Campamento Kids 2026",
    slug: "campamento-kids-2026",
    date: "2026-07-11",
    endDate: "2026-07-12",
    time: "9:00 AM",
    location: "Parque Omar, Ciudad de Panamá",
    address: "Parque Omar, San Francisco, Ciudad de Panamá",
    banner: { url: BANNER_6, alt: "Campamento Kids 2026" },
    ministry: { name: "Roca Kids", slug: "roca-kids" },
    description: "Dos días de aventura, juegos, adoración y aprendizaje para niños de 4 a 9 años. Un campamento diseñado para que los niños vivan la fe de una manera divertida y memorable.",
    registrationUrl: "/contacto",
  },
  {
    title: "Día del Niño — Celebración Kids",
    slug: "dia-nino-kids-2026",
    date: "2026-08-08",
    time: "9:00 AM",
    location: "Templo principal",
    address: "Roca de Vida Panamá, Ciudad de Panamá",
    banner: { url: BANNER_6, alt: "Día del Niño Roca Kids" },
    ministry: { name: "Roca Kids", slug: "roca-kids" },
    description: "¡Celebramos el Día del Niño con una fiesta especial para todos los niños de Roca de Vida! Juegos, sorpresas y mucho amor.",
  },

  // ── Prejuvenil ───────────────────────────────────────────────────────────
  {
    title: "Encuentro Prejuvenil",
    slug: "encuentro-prejuvenil-jun-2026",
    date: "2026-06-27",
    time: "4:00 PM",
    location: "Templo principal",
    address: "Roca de Vida Panamá, Ciudad de Panamá",
    banner: { url: BANNER_7, alt: "Encuentro Prejuvenil" },
    ministry: { name: "Prejuvenil", slug: "prejuvenil" },
    description: "Un encuentro especial para los chicos de 10 a 14 años. Dinámica, Palabra, juegos y espacio para conectar con Dios y con otros.",
  },
  {
    title: "Campamento Prejuvenil 2026",
    slug: "campamento-prejuvenil-2026",
    date: "2026-07-25",
    endDate: "2026-07-27",
    time: "8:00 AM",
    location: "Centro de Retiros, Capira",
    address: "Capira, Panamá Oeste",
    banner: { url: BANNER_7, alt: "Campamento Prejuvenil 2026" },
    ministry: { name: "Prejuvenil", slug: "prejuvenil" },
    description: "Tres días de campamento para preadolescentes. Actividades al aire libre, adoración, charlas sobre identidad y comunidad en un ambiente seguro y transformador.",
    registrationUrl: "/contacto",
  },

  // ── Metanoia ─────────────────────────────────────────────────────────────
  {
    title: "Activación Escolar — Colegio La Paz",
    slug: "activacion-metanoia-jun-2026",
    date: "2026-06-19",
    time: "7:00 AM",
    location: "Colegio La Paz",
    address: "Ciudad de Panamá",
    banner: { url: BANNER_8, alt: "Activación Metanoia" },
    ministry: { name: "Metanoia", slug: "metanoia" },
    description: "Activación mensual del ministerio Metanoia. Llevamos un mensaje de transformación y esperanza a los estudiantes y docentes del Colegio La Paz.",
  },
  {
    title: "Noche de Impacto Escolar",
    slug: "noche-impacto-metanoia-2026",
    date: "2026-08-14",
    time: "6:00 PM",
    location: "Templo principal",
    address: "Roca de Vida Panamá, Ciudad de Panamá",
    banner: { url: BANNER_8, alt: "Noche de Impacto Escolar" },
    ministry: { name: "Metanoia", slug: "metanoia" },
    description: "Una noche para celebrar el impacto del ministerio en las escuelas de Panamá. Testimonios, adoración y visión para la siguiente temporada escolar.",
  },

  // ── Bendecidos (adicional) ────────────────────────────────────────────────
  {
    title: "Servicio Comunitario — Tocumen",
    slug: "bendecidos-tocumen-2026",
    date: "2026-06-06",
    time: "7:00 AM",
    location: "Comunidad de Tocumen",
    address: "Tocumen, Panamá",
    banner: { url: BANNER_9, alt: "Servicio comunitario Tocumen" },
    ministry: { name: "Bendecidos para Bendecir", slug: "bendecidos" },
    description: "Día de servicio comunitario en Tocumen. Distribución de alimentos, corte de cabello gratuito, atención médica básica y actividades para los niños del sector.",
  },

  // Eventos pasados
  {
    title: "Noche de Adoración — Mayo",
    slug: "noche-adoracion-may-2025",
    date: "2025-05-18",
    time: "7:00 PM",
    location: "Templo principal",
    banner: { url: BANNER_1, alt: "Noche de Adoración Mayo" },
    ministry: { name: "Jóvenes", slug: "jovenes-teens" },
    description: "Noche de alabanza y adoración del mes de mayo.",
    isPast: true,
  },
  {
    title: "Retiro de Hombres 2025",
    slug: "retiro-hombres-may-2025",
    date: "2025-05-09",
    endDate: "2025-05-11",
    time: "8:00 AM",
    location: "Gamboa Rainforest Resort",
    banner: { url: BANNER_4, alt: "Retiro de Hombres" },
    ministry: { name: "Hombres", slug: "hombres" },
    description: "Retiro anual de hombres.",
    isPast: true,
  },
];

export const UPCOMING_EVENTS = EVENTS.filter((e) => !e.isPast);
export const PAST_EVENTS = EVENTS.filter((e) => e.isPast);
