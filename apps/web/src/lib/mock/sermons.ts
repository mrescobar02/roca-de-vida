// Mock data — reemplazar con getSermons() / getSermon() de lib/payload/client.ts

export interface SermonMock {
  title: string;
  slug: string;
  youtubeUrl: string;
  pastor: { name: string; slug: string };
  date: string;
  series?: string;
  seriesSlug?: string;
  scripture?: string;
  duration?: string;
  description?: string;
  isFeatured?: boolean;
}

export interface StudyMock {
  title: string;
  slug: string;
  youtubeUrl: string;
  teacher: { name: string };
  date: string;
  series?: string;
  book?: string;
  duration?: string;
  description?: string;
}

const YT = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; // placeholder

export const SERMONS: SermonMock[] = [
  {
    title: "La fe que mueve montañas",
    slug: "fe-que-mueve-montanas",
    youtubeUrl: YT,
    pastor: { name: "Ps. Carlos Rodríguez", slug: "carlos-rodriguez" },
    date: "2025-05-04",
    series: "Fe Inquebrantable",
    seriesSlug: "fe-inquebrantable",
    scripture: "Marcos 11:22-24",
    duration: "48 min",
    description: "En este mensaje exploramos qué significa tener una fe que no se rinde ante las circunstancias. La fe genuina no ignora los obstáculos — los usa como plataforma para ver la gloria de Dios.",
    isFeatured: true,
  },
  {
    title: "La anatomía de la fe",
    slug: "anatomia-de-la-fe",
    youtubeUrl: YT,
    pastor: { name: "Ps. Carlos Rodríguez", slug: "carlos-rodriguez" },
    date: "2025-04-27",
    series: "Fe Inquebrantable",
    seriesSlug: "fe-inquebrantable",
    scripture: "Hebreos 11:1-6",
    duration: "51 min",
    description: "La fe bíblica tiene componentes que vale la pena entender: convicción, confianza y acción. Descubrimos qué hace que la fe sea real y no solo emocional.",
  },
  {
    title: "Cuando la fe es probada",
    slug: "cuando-la-fe-es-probada",
    youtubeUrl: YT,
    pastor: { name: "Ps. Carlos Rodríguez", slug: "carlos-rodriguez" },
    date: "2025-04-20",
    series: "Fe Inquebrantable",
    seriesSlug: "fe-inquebrantable",
    scripture: "Santiago 1:2-4",
    duration: "44 min",
  },
  {
    title: "Fe sin obras está muerta",
    slug: "fe-sin-obras-muerta",
    youtubeUrl: YT,
    pastor: { name: "Ps. Carlos Rodríguez", slug: "carlos-rodriguez" },
    date: "2025-04-13",
    series: "Fe Inquebrantable",
    seriesSlug: "fe-inquebrantable",
    scripture: "Santiago 2:14-26",
    duration: "46 min",
  },
  {
    title: "Héroes de la fe",
    slug: "heroes-de-la-fe",
    youtubeUrl: YT,
    pastor: { name: "Ps. Carlos Rodríguez", slug: "carlos-rodriguez" },
    date: "2025-04-06",
    series: "Fe Inquebrantable",
    seriesSlug: "fe-inquebrantable",
    scripture: "Hebreos 11:32-40",
    duration: "53 min",
  },
  {
    title: "Gracia suficiente para hoy",
    slug: "gracia-suficiente",
    youtubeUrl: YT,
    pastor: { name: "Ps. María González", slug: "maria-gonzalez" },
    date: "2025-03-30",
    series: "Fundamentos",
    seriesSlug: "fundamentos",
    scripture: "2 Corintios 12:9",
    duration: "38 min",
    description: "La gracia de Dios no es solo el punto de entrada a la vida cristiana — es el combustible diario para vivir. Exploramos por qué Pablo encontraba fortaleza precisamente en su debilidad.",
  },
  {
    title: "El corazón del Padre",
    slug: "corazon-del-padre",
    youtubeUrl: YT,
    pastor: { name: "Ps. María González", slug: "maria-gonzalez" },
    date: "2025-03-23",
    series: "Fundamentos",
    seriesSlug: "fundamentos",
    scripture: "Lucas 15:11-32",
    duration: "45 min",
  },
  {
    title: "Identidad en Cristo",
    slug: "identidad-en-cristo",
    youtubeUrl: YT,
    pastor: { name: "Ps. Luis Herrera", slug: "luis-herrera" },
    date: "2025-03-16",
    series: "Fundamentos",
    seriesSlug: "fundamentos",
    scripture: "Gálatas 2:20",
    duration: "41 min",
  },
  {
    title: "El poder de la oración",
    slug: "poder-de-la-oracion",
    youtubeUrl: YT,
    pastor: { name: "Ps. María González", slug: "maria-gonzalez" },
    date: "2025-03-09",
    series: "Fundamentos",
    seriesSlug: "fundamentos",
    scripture: "Mateo 6:5-13",
    duration: "42 min",
  },
  {
    title: "Vivir en comunidad",
    slug: "vivir-en-comunidad",
    youtubeUrl: YT,
    pastor: { name: "Ps. Luis Herrera", slug: "luis-herrera" },
    date: "2025-03-02",
    series: "Fundamentos",
    seriesSlug: "fundamentos",
    scripture: "Hechos 2:42-47",
    duration: "39 min",
  },
  {
    title: "El camino angosto",
    slug: "camino-angosto",
    youtubeUrl: YT,
    pastor: { name: "Ps. Luis Herrera", slug: "luis-herrera" },
    date: "2025-02-23",
    series: "El Camino",
    seriesSlug: "el-camino",
    scripture: "Mateo 7:13-14",
    duration: "47 min",
    description: "Jesús habla de dos caminos. Uno amplio y popular, otro estrecho y menos transitado. ¿Qué significa realmente elegir el camino de Cristo en el mundo de hoy?",
  },
  {
    title: "Cargar la cruz cada día",
    slug: "cargar-la-cruz",
    youtubeUrl: YT,
    pastor: { name: "Ps. Luis Herrera", slug: "luis-herrera" },
    date: "2025-02-16",
    series: "El Camino",
    seriesSlug: "el-camino",
    scripture: "Lucas 9:23",
    duration: "44 min",
  },
  {
    title: "Andar en el Espíritu",
    slug: "andar-en-el-espiritu",
    youtubeUrl: YT,
    pastor: { name: "Ps. Carlos Rodríguez", slug: "carlos-rodriguez" },
    date: "2025-02-09",
    series: "El Camino",
    seriesSlug: "el-camino",
    scripture: "Gálatas 5:16-26",
    duration: "50 min",
  },
  {
    title: "El propósito del sufrimiento",
    slug: "proposito-del-sufrimiento",
    youtubeUrl: YT,
    pastor: { name: "Ps. Carlos Rodríguez", slug: "carlos-rodriguez" },
    date: "2025-02-02",
    scripture: "Romanos 8:28",
    duration: "52 min",
    description: "¿Por qué permite Dios el dolor? No como respuesta fácil, sino como exploración honesta de lo que las Escrituras enseñan sobre el sufrimiento y la soberanía de Dios.",
  },
  {
    title: "Llamados a ser luz",
    slug: "llamados-a-ser-luz",
    youtubeUrl: YT,
    pastor: { name: "Ps. María González", slug: "maria-gonzalez" },
    date: "2025-01-26",
    scripture: "Mateo 5:14-16",
    duration: "37 min",
  },
];

export const STUDIES: StudyMock[] = [
  {
    title: "El Evangelio de Juan — Introducción",
    slug: "juan-intro",
    youtubeUrl: YT,
    teacher: { name: "Ps. Carlos Rodríguez" },
    date: "2025-05-07",
    series: "Estudio de Juan",
    book: "Juan",
    duration: "55 min",
    description: "Comenzamos un estudio versículo por versículo del Evangelio de Juan. En esta primera sesión exploramos el prólogo y el contexto del libro.",
  },
  {
    title: "Juan 1 — El Verbo se hizo carne",
    slug: "juan-cap-1",
    youtubeUrl: YT,
    teacher: { name: "Ps. Carlos Rodríguez" },
    date: "2025-04-30",
    series: "Estudio de Juan",
    book: "Juan 1",
    duration: "62 min",
  },
  {
    title: "Juan 3 — El nuevo nacimiento",
    slug: "juan-cap-3",
    youtubeUrl: YT,
    teacher: { name: "Ps. María González" },
    date: "2025-04-23",
    series: "Estudio de Juan",
    book: "Juan 3",
    duration: "58 min",
  },
  {
    title: "Los nombres de Dios",
    slug: "nombres-de-dios",
    youtubeUrl: YT,
    teacher: { name: "Ps. Luis Herrera" },
    date: "2025-04-16",
    duration: "48 min",
    description: "Un estudio sobre los nombres hebreos de Dios y lo que revelan sobre su carácter y naturaleza.",
  },
  {
    title: "Escatología básica",
    slug: "escatologia-basica",
    youtubeUrl: YT,
    teacher: { name: "Ps. Carlos Rodríguez" },
    date: "2025-04-09",
    duration: "67 min",
    description: "¿Qué enseña la Biblia sobre los tiempos finales? Estudio panorámico de los textos escatológicos principales.",
  },
  {
    title: "La doctrina de la salvación",
    slug: "doctrina-salvacion",
    youtubeUrl: YT,
    teacher: { name: "Ps. María González" },
    date: "2025-04-02",
    duration: "51 min",
  },
];

export const SERMON_SERIES = [...new Set(SERMONS.filter((s) => s.series).map((s) => s.series!))]
  .map((name) => ({ name, slug: SERMONS.find((s) => s.series === name)!.seriesSlug! }));

export const SERMON_PASTORS = [...new Set(SERMONS.map((s) => s.pastor.name))];
