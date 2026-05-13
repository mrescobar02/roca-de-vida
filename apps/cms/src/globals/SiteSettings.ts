import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Configuración del Sitio",
  admin: { group: "Configuración" },
  access: {
    read: () => true,
    update: ({ req }) => ["super-admin", "editor"].includes(req.user?.role ?? ""),
  },
  fields: [
    { name: "siteName", type: "text", defaultValue: "Roca de Vida Panamá", label: "Nombre del sitio" },
    { name: "tagline", type: "text", label: "Tagline" },
    { name: "logo", type: "upload", relationTo: "media", label: "Logo" },
    { name: "favicon", type: "upload", relationTo: "media", label: "Favicon" },
    {
      name: "contact",
      type: "group",
      label: "Información de contacto",
      fields: [
        { name: "phone", type: "text", label: "Teléfono principal" },
        { name: "email", type: "email", label: "Email principal" },
        { name: "address", type: "textarea", label: "Dirección" },
        { name: "googleMapsUrl", type: "text", label: "URL de Google Maps" },
      ],
    },
    {
      name: "serviceSchedule",
      type: "array",
      label: "Horarios de servicio",
      fields: [
        { name: "day", type: "text", label: "Día", required: true },
        { name: "time", type: "text", label: "Hora", required: true },
        { name: "description", type: "text", label: "Descripción (ej: Servicio familiar)" },
        {
          name: "type",
          type: "select",
          label: "Tipo",
          options: [
            { label: "Presencial", value: "in-person" },
            { label: "En línea", value: "online" },
            { label: "Ambos", value: "both" },
          ],
        },
      ],
    },
    {
      name: "social",
      type: "group",
      label: "Redes sociales",
      fields: [
        { name: "instagram", type: "text", label: "Instagram URL" },
        { name: "facebook", type: "text", label: "Facebook URL" },
        { name: "youtube", type: "text", label: "YouTube URL" },
        { name: "tiktok", type: "text", label: "TikTok URL" },
        { name: "spotify", type: "text", label: "Spotify URL" },
      ],
    },
    {
      name: "maintenanceMode",
      type: "checkbox",
      label: "Modo mantenimiento",
      defaultValue: false,
      admin: { description: "Activa para mostrar una página de mantenimiento" },
    },
  ],
};
