// Mock data — reemplazar con getMinistries() / getMinistry() de lib/payload/client.ts en Etapa 3 CMS

const PHOTO = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop";
const PHOTO_F = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=400&fit=crop";

export interface MinistryData {
  name: string;
  slug: string;
  tagline: string;
  category: string;
  heroImage: { url: string; alt: string };
  accent: string;
  mission: string;
  vision: string;
  keyVerse: string;
  keyVerseRef: string;
  schedule?: string;
  leaders: Array<{ name: string; title: string; photo: { url: string; alt: string }; bio?: string }>;
  gallery: Array<{ url: string; alt: string }>;
}

export const MINISTRIES_DATA: Record<string, MinistryData> = {
  hombres: {
    name: "Ministerio de Hombres",
    slug: "hombres",
    tagline: "Construyendo hombres de carácter",
    category: "Ministerio",
    heroImage: { url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&h=800&fit=crop", alt: "Hombres de Roca de Vida" },
    accent: "#1e3a5f",
    mission: "Formar hombres íntegros que reflejen el carácter de Cristo en sus hogares, lugares de trabajo y comunidad.",
    vision: "Ser un ministerio de cobertura y hermandad donde cada hombre encuentre identidad, propósito y comunidad genuina.",
    keyVerse: "Sed fuertes y muy valientes, y cuidad de poner por obra toda la ley que mi siervo Moisés os mandó.",
    keyVerseRef: "Josué 1:7",
    schedule: "Sábados 8:00 AM — Desayuno de Hombres",
    leaders: [
      { name: "Eduardo Martínez", title: "Director", photo: { url: PHOTO, alt: "Eduardo Martínez" }, bio: "Más de 10 años liderando el ministerio de hombres con un corazón por la restauración familiar." },
      { name: "Roberto Silva", title: "Coordinador", photo: { url: PHOTO, alt: "Roberto Silva" } },
    ],
    gallery: [],
  },
  mujeres: {
    name: "Ministerio de Mujeres",
    slug: "mujeres",
    tagline: "Propósito, identidad y comunidad",
    category: "Ministerio",
    heroImage: { url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1400&h=800&fit=crop", alt: "Mujeres de Roca de Vida" },
    accent: "#c8956c",
    mission: "Formar mujeres que caminen en su identidad en Cristo y sean agentes de transformación en sus hogares y ciudad.",
    vision: "Una comunidad donde cada mujer es vista, valorada y equipada para vivir su propósito divino.",
    keyVerse: "Mujer virtuosa, ¿quién la hallará? Porque su estima sobrepasa largamente a la de las piedras preciosas.",
    keyVerseRef: "Proverbios 31:10",
    schedule: "Viernes 7:00 PM — Noches de Mujeres (mensual)",
    leaders: [
      { name: "Pastora Ana González", title: "Directora", photo: { url: PHOTO_F, alt: "Pastora Ana González" }, bio: "Apasionada por ver a cada mujer caminar en sanidad, libertad y propósito." },
      { name: "Carmen Ruiz", title: "Coordinadora", photo: { url: PHOTO_F, alt: "Carmen Ruiz" } },
    ],
    gallery: [],
  },
  "roca-kids": {
    name: "Roca Kids",
    slug: "roca-kids",
    tagline: "Fe desde la infancia",
    category: "Ministerio",
    heroImage: { url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1400&h=800&fit=crop", alt: "Roca Kids" },
    accent: "#ffb347",
    mission: "Crear experiencias de fe que conecten a los niños con Dios desde temprana edad, en un ambiente seguro, divertido y lleno del Espíritu.",
    vision: "Que cada niño que pase por Roca Kids tenga una base espiritual sólida que marque su vida para siempre.",
    keyVerse: "Instruye al niño en su camino, y aun cuando fuere viejo no se apartará de él.",
    keyVerseRef: "Proverbios 22:6",
    schedule: "Domingos 9:00 AM y 11:30 AM (durante servicio)",
    leaders: [
      { name: "Sofía Herrera", title: "Directora Kids", photo: { url: PHOTO_F, alt: "Sofía Herrera" }, bio: "Educadora de profesión y apasionada por la niñez. Lleva 7 años liderando Roca Kids." },
      { name: "Daniel Torres", title: "Coordinador de Voluntarios", photo: { url: PHOTO, alt: "Daniel Torres" } },
    ],
    gallery: [],
  },
  prejuvenil: {
    name: "Prejuvenil",
    slug: "prejuvenil",
    tagline: "10 a 14 años — Identidad y propósito",
    category: "Ministerio",
    heroImage: { url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1400&h=800&fit=crop", alt: "Prejuvenil" },
    accent: "#2d6a4f",
    mission: "Acompañar a los preadolescentes en la etapa más crítica de su formación, conectándolos con Dios y entre sí.",
    vision: "Jóvenes de 10 a 14 años que conocen su identidad en Cristo y están firmes en la fe antes de entrar a la adolescencia.",
    keyVerse: "No te avergüences de dar testimonio de nuestro Señor, ni de mí, preso suyo, sino participa de las aflicciones del evangelio según el poder de Dios.",
    keyVerseRef: "2 Timoteo 1:8",
    schedule: "Domingos 9:00 AM — durante servicio principal",
    leaders: [
      { name: "Andrés López", title: "Líder Prejuvenil", photo: { url: PHOTO, alt: "Andrés López" }, bio: "Trabajando con preadolescentes desde hace 5 años, apasionado por ver esta generación firmemente anclada." },
    ],
    gallery: [],
  },
  "jovenes-teens": {
    name: "Ministerio de Jóvenes",
    slug: "jovenes-teens",
    tagline: "15 a 20 años — Una generación de fuego",
    category: "Ministerio",
    heroImage: { url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&h=800&fit=crop&sig=2", alt: "Ministerio de Jóvenes" },
    accent: "#4a1942",
    mission: "Conectar a los jóvenes de 15 a 20 años con Dios, con comunidad genuina y con su propósito de vida.",
    vision: "Una generación de jóvenes que no se avergüenzan del evangelio y que impactan cada espacio donde se mueven.",
    keyVerse: "No tenga nadie en poco tu juventud, sino sé ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza.",
    keyVerseRef: "1 Timoteo 4:12",
    schedule: "Viernes 7:00 PM — Servicio de Jóvenes",
    leaders: [
      { name: "Luis Herrera", title: "Pastor de Jóvenes", photo: { url: PHOTO, alt: "Luis Herrera" }, bio: "Conectando la próxima generación con la fe y el propósito de Dios desde hace 8 años." },
      { name: "Valeria Gómez", title: "Lideresa de Mujeres Jóvenes", photo: { url: PHOTO_F, alt: "Valeria Gómez" } },
    ],
    gallery: [],
  },
  "jovenes-adultos": {
    name: "Jóvenes Adultos",
    slug: "jovenes-adultos",
    tagline: "21 a 29 años — Construyendo sobre la Roca",
    category: "Ministerio",
    heroImage: { url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1400&h=800&fit=crop", alt: "Jóvenes Adultos" },
    accent: "#1b4d5a",
    mission: "Acompañar a jóvenes adultos solteros en los años más decisivos de su vida: vocación, relaciones, fe y propósito.",
    vision: "Jóvenes adultos arraigados en la Palabra que toman decisiones desde los principios del Reino.",
    keyVerse: "Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia.",
    keyVerseRef: "Proverbios 3:5",
    schedule: "Sábados 7:00 PM — Reunión de Jóvenes Adultos",
    leaders: [
      { name: "Carlos Mendoza", title: "Líder Jóvenes Adultos", photo: { url: PHOTO, alt: "Carlos Mendoza" }, bio: "Profesional y líder que acompaña a una generación en sus decisiones más importantes." },
      { name: "Isabel Torres", title: "Coordinadora", photo: { url: PHOTO_F, alt: "Isabel Torres" } },
    ],
    gallery: [],
  },
  bendecidos: {
    name: "Bendecidos para Bendecir",
    slug: "bendecidos",
    tagline: "Servicio, impacto y generosidad",
    category: "Ministerio",
    heroImage: { url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1400&h=800&fit=crop", alt: "Bendecidos para Bendecir" },
    accent: "#3d4f2e",
    mission: "Movilizar a la iglesia para servir a la comunidad con amor práctico, sin condiciones y con excelencia.",
    vision: "Ser una iglesia reconocida en Panamá por su generosidad y servicio a los más vulnerables.",
    keyVerse: "El que es generoso será bendecido, pues comparte su comida con los pobres.",
    keyVerseRef: "Proverbios 22:9",
    schedule: "Activaciones mensuales — ver agenda de eventos",
    leaders: [
      { name: "Patricia Gómez", title: "Directora de Servicio", photo: { url: PHOTO_F, alt: "Patricia Gómez" }, bio: "Con un corazón para los más vulnerables, Patricia coordina todas las activaciones de servicio comunitario." },
    ],
    gallery: [],
  },
  metanoia: {
    name: "Metanoia",
    slug: "metanoia",
    tagline: "Ministerio escolar — Transformando escuelas",
    category: "Ministerio",
    heroImage: { url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1400&h=800&fit=crop", alt: "Metanoia" },
    accent: "#1a2744",
    mission: "Llevar el mensaje de transformación a las escuelas de Panamá, equipando a estudiantes y docentes con principios de vida.",
    vision: "Un ministerio presente en cada escuela pública de Panamá, transformando la cultura educativa desde adentro.",
    keyVerse: "No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento.",
    keyVerseRef: "Romanos 12:2",
    schedule: "Activaciones escolares — coordinadas con instituciones educativas",
    leaders: [
      { name: "Marcos Ríos", title: "Director Metanoia", photo: { url: PHOTO, alt: "Marcos Ríos" }, bio: "Docente y pastor que lleva más de 6 años llevando el evangelio a las escuelas panameñas." },
    ],
    gallery: [],
  },
};

export const MINISTRIES_LIST = Object.values(MINISTRIES_DATA);

export const MINISTRY_SLUGS = Object.keys(MINISTRIES_DATA);
