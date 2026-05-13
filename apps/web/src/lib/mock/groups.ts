// Mock data — reemplazar con getCellGroups() de lib/payload/client.ts en Etapa 4 CMS
// Payload schema: cada grupo debe tener campos `lat` y `lng` (tipo Number / Point)
// para que se reflejen en el mapa. Sin coordenadas el grupo aparece solo en la lista.

export interface CellGroupData {
  name: string;
  slug: string;
  neighborhood: string;
  district: string;
  day: string;
  schedule: string;
  leaderName: string;
  leaderTitle?: string;
  leaderPhoto?: { url: string; alt: string };
  capacity: number;
  enrolled: number;
  isFull: boolean;
  address?: string;
  bio: string;
  /** Coordenadas configurables desde Payload CMS */
  lat?: number;
  lng?: number;
}

const LEADER_PHOTO = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop";

export const CELL_GROUPS: CellGroupData[] = [
  {
    name: "Grupo Costa del Este",
    slug: "costa-del-este",
    neighborhood: "Costa del Este",
    district: "Panamá Este",
    day: "Martes",
    schedule: "Martes 7:30 PM",
    leaderName: "Marco Rodríguez",
    leaderTitle: "Líder de célula",
    leaderPhoto: { url: LEADER_PHOTO, alt: "Marco Rodríguez" },
    capacity: 15,
    enrolled: 12,
    isFull: false,
    address: "Costa del Este, Panamá",
    bio: "Un grupo familiar que se reúne para estudiar la Palabra y orar juntos. Abierto a personas de todas las edades. Nos caracterizamos por la hospitalidad y la oración intercesora.",
    lat: 9.0039, lng: -79.4696,
  },
  {
    name: "Grupo San Francisco",
    slug: "san-francisco",
    neighborhood: "San Francisco",
    district: "Ciudad de Panamá",
    day: "Jueves",
    schedule: "Jueves 7:00 PM",
    leaderName: "Isabela Torres",
    leaderTitle: "Lideresa de célula",
    leaderPhoto: { url: LEADER_PHOTO, alt: "Isabela Torres" },
    capacity: 12,
    enrolled: 11,
    isFull: false,
    address: "San Francisco, Ciudad de Panamá",
    bio: "Grupo enfocado en estudio bíblico profundo y discipulado. Ideal para profesionales y jóvenes adultos que buscan crecer en la Palabra.",
    lat: 8.9954, lng: -79.5177,
  },
  {
    name: "Grupo Clayton",
    slug: "clayton",
    neighborhood: "Clayton",
    district: "Ciudad de Panamá",
    day: "Miércoles",
    schedule: "Miércoles 7:00 PM",
    leaderName: "Juan Pérez",
    leaderTitle: "Líder de célula",
    leaderPhoto: { url: LEADER_PHOTO, alt: "Juan Pérez" },
    capacity: 15,
    enrolled: 15,
    isFull: true,
    address: "Clayton, Ciudad de Panamá",
    bio: "Grupo con comunidad sólida y activa. Actualmente lleno — contáctanos para ser incluido en la lista de espera.",
    lat: 8.9947, lng: -79.5536,
  },
  {
    name: "Grupo Bella Vista",
    slug: "bella-vista",
    neighborhood: "Bella Vista",
    district: "Ciudad de Panamá",
    day: "Lunes",
    schedule: "Lunes 7:30 PM",
    leaderName: "Sandra Mora",
    leaderTitle: "Lideresa de célula",
    leaderPhoto: { url: LEADER_PHOTO, alt: "Sandra Mora" },
    capacity: 12,
    enrolled: 7,
    isFull: false,
    address: "Bella Vista, Ciudad de Panamá",
    bio: "Grupo mixto con énfasis en adoración y oración. Un ambiente acogedor para personas que están iniciando su caminar con Dios.",
    lat: 8.9934, lng: -79.5296,
  },
  {
    name: "Grupo Arraiján",
    slug: "arraijan",
    neighborhood: "Arraiján",
    district: "Panamá Oeste",
    day: "Viernes",
    schedule: "Viernes 7:00 PM",
    leaderName: "Ricardo Núñez",
    leaderTitle: "Líder de célula",
    leaderPhoto: { url: LEADER_PHOTO, alt: "Ricardo Núñez" },
    capacity: 15,
    enrolled: 10,
    isFull: false,
    address: "Arraiján, Panamá Oeste",
    bio: "Grupo familiar que cubre toda el área de Arraiján. Ambiente cálido y acogedor para familias y personas solteras.",
    lat: 8.9481, lng: -79.6825,
  },
  {
    name: "Grupo La Chorrera",
    slug: "la-chorrera",
    neighborhood: "La Chorrera",
    district: "Panamá Oeste",
    day: "Sábado",
    schedule: "Sábados 10:00 AM",
    leaderName: "Ernesto Castillo",
    leaderTitle: "Líder de célula",
    leaderPhoto: { url: LEADER_PHOTO, alt: "Ernesto Castillo" },
    capacity: 18,
    enrolled: 14,
    isFull: false,
    address: "La Chorrera, Panamá Oeste",
    bio: "El único grupo de fin de semana en el área de La Chorrera. Reuniones matutinas con dinámica familiar e inclusión de niños.",
    lat: 8.8794, lng: -79.7819,
  },
  {
    name: "Grupo Tocumen",
    slug: "tocumen",
    neighborhood: "Tocumen",
    district: "Panamá Este",
    day: "Miércoles",
    schedule: "Miércoles 7:30 PM",
    leaderName: "Jorge Ávila",
    leaderTitle: "Líder de célula",
    leaderPhoto: { url: LEADER_PHOTO, alt: "Jorge Ávila" },
    capacity: 15,
    enrolled: 9,
    isFull: false,
    address: "Tocumen, Panamá Este",
    bio: "Grupo nuevo con mucho crecimiento y energía. Ideal para personas que viven en el área este de la ciudad.",
    lat: 9.0636, lng: -79.3845,
  },
  {
    name: "Grupo Albrook",
    slug: "albrook",
    neighborhood: "Albrook",
    district: "Ciudad de Panamá",
    day: "Martes",
    schedule: "Martes 7:00 PM",
    leaderName: "Natalia Reyes",
    leaderTitle: "Lideresa de célula",
    leaderPhoto: { url: LEADER_PHOTO, alt: "Natalia Reyes" },
    capacity: 12,
    enrolled: 12,
    isFull: true,
    address: "Albrook, Ciudad de Panamá",
    bio: "Grupo con comunidad establecida y profunda. Actualmente lleno — hay lista de espera activa.",
    lat: 8.9840, lng: -79.5560,
  },
  {
    name: "Grupo Bethania",
    slug: "bethania",
    neighborhood: "Bethania",
    district: "Ciudad de Panamá",
    day: "Jueves",
    schedule: "Jueves 7:30 PM",
    leaderName: "Felipe Castro",
    leaderTitle: "Líder de célula",
    leaderPhoto: { url: LEADER_PHOTO, alt: "Felipe Castro" },
    capacity: 15,
    enrolled: 6,
    isFull: false,
    address: "Bethania, Ciudad de Panamá",
    bio: "Grupo en crecimiento con espacios disponibles. Énfasis en evangelismo y alcance al barrio.",
    lat: 8.9940, lng: -79.5460,
  },
  {
    name: "Grupo Miraflores",
    slug: "miraflores",
    neighborhood: "Miraflores",
    district: "Ciudad de Panamá",
    day: "Lunes",
    schedule: "Lunes 7:00 PM",
    leaderName: "Alejandra Vega",
    leaderTitle: "Lideresa de célula",
    leaderPhoto: { url: LEADER_PHOTO, alt: "Alejandra Vega" },
    capacity: 12,
    enrolled: 4,
    isFull: false,
    address: "Miraflores, Ciudad de Panamá",
    bio: "Grupo nuevo, recién formado. Gran oportunidad para ser parte desde el inicio y ayudar a construir comunidad.",
    lat: 9.0045, lng: -79.5512,
  },
];

export const GROUP_DISTRICTS = [...new Set(CELL_GROUPS.map((g) => g.district))].sort();
export const GROUP_DAYS = [...new Set(CELL_GROUPS.map((g) => g.day))].sort((a, b) => {
  const order = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  return order.indexOf(a) - order.indexOf(b);
});
