// Configuración estática de navegación.
// Cuando el CMS esté conectado, esto vendrá del global "navigation" de Payload.

export interface NavChild {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Inicio",
    href: "/",
  },
  {
    label: "Nosotros",
    href: "/nosotros",
    children: [
      { label: "Quiénes somos", href: "/nosotros", description: "Nuestra historia y visión" },
      { label: "Historia", href: "/nosotros/historia", description: "Cómo comenzó Roca de Vida" },
      { label: "Creencias", href: "/nosotros/creencias", description: "Lo que creemos y confesamos" },
      { label: "Equipo pastoral", href: "/nosotros/equipo", description: "Conoce a nuestros pastores" },
    ],
  },
  {
    label: "Ministerios",
    href: "/ministerios",
    children: [
      { label: "Hombres", href: "/ministerios/hombres" },
      { label: "Mujeres", href: "/ministerios/mujeres" },
      { label: "Roca Kids", href: "/ministerios/roca-kids" },
      { label: "Jóvenes", href: "/ministerios/jovenes", description: "Prejuvenil, Jóvenes y Jóvenes Adultos" },
      { label: "Bendecidos", href: "/ministerios/bendecidos" },
      { label: "Metanoia", href: "/ministerios/metanoia" },
    ],
  },
  {
    label: "Recursos",
    href: "/media",
    children: [
      { label: "Sermones", href: "/media/sermones", description: "Archivo completo de prédicas" },
      { label: "En Vivo", href: "/media/en-vivo", description: "Transmisión en tiempo real" },
      { label: "Podcast", href: "/media/podcast", description: "Escucha donde quieras" },
      { label: "Estudios", href: "/media/estudios", description: "Materiales de crecimiento" },
    ],
  },
  {
    label: "Eventos",
    href: "/eventos",
  },
  {
    label: "Grupos",
    href: "/grupos",
  },
];

export const FOOTER_COLUMNS = [
  {
    heading: "Explora",
    links: [
      { label: "Ministerios", href: "/ministerios" },
      { label: "Sermones", href: "/media/sermones" },
      { label: "Eventos", href: "/eventos" },
      { label: "Galería", href: "/galeria" },
      { label: "Donaciones", href: "/donaciones" },
    ],
  },
  {
    heading: "Conecta",
    links: [
      { label: "Grupos de Vida", href: "/grupos" },
      { label: "Petición de oración", href: "/contacto/oracion" },
      { label: "Bautismo", href: "/contacto/bautismo" },
      { label: "Consejería", href: "/contacto/consejeria" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
  {
    heading: "Síguenos",
    links: [
      { label: "Instagram", href: "https://instagram.com/rocadevidapanama" },
      { label: "YouTube", href: "https://youtube.com/@rocadevidapanama" },
      { label: "Facebook", href: "https://facebook.com/rocadevidapanama" },
      { label: "TikTok", href: "https://tiktok.com/@rocadevidapanama" },
      { label: "Spotify", href: "https://open.spotify.com" },
    ],
  },
];
