import type { CollectionConfig } from "payload";
import { seoFields } from "../fields/seoFields";
import { slugField } from "../fields/slugField";

export const Sermons: CollectionConfig = {
  slug: "sermons",
  labels: { singular: "Sermón", plural: "Sermones" },
  admin: {
    group: "Contenido",
    useAsTitle: "title",
    defaultColumns: ["title", "pastor", "date", "status"],
    description: "Sermones con embed de YouTube — sin archivos propios",
  },
  access: {
    read: () => true,
    create: ({ req }) => ["super-admin", "editor"].includes(req.user?.role ?? ""),
    update: ({ req }) => ["super-admin", "editor"].includes(req.user?.role ?? ""),
    delete: ({ req }) => req.user?.role === "super-admin",
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Título del sermón",
    },
    slugField("title"),
    {
      name: "pastor",
      type: "relationship",
      relationTo: "staff",
      label: "Pastor / Predicador",
      required: true,
    },
    {
      name: "date",
      type: "date",
      required: true,
      label: "Fecha de predicación",
      admin: {
        date: { pickerAppearance: "dayOnly", displayFormat: "dd/MM/yyyy" },
      },
    },
    {
      name: "series",
      type: "text",
      label: "Serie (opcional)",
    },
    {
      name: "scripture",
      type: "text",
      label: "Pasaje bíblico principal",
      admin: { description: "Ej: Juan 15:1-8" },
    },
    {
      name: "description",
      type: "richText",
      label: "Descripción",
    },
    {
      name: "youtubeUrl",
      type: "text",
      required: true,
      label: "URL de YouTube",
      admin: {
        description: "URL completa del video en YouTube. Ej: https://www.youtube.com/watch?v=abc123",
      },
      validate: (value: unknown) => {
        if (typeof value !== "string" || !value) return "La URL de YouTube es requerida";
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/;
        if (!youtubeRegex.test(value)) return "Debe ser una URL válida de YouTube";
        return true;
      },
    },
    {
      name: "thumbnail",
      type: "upload",
      relationTo: "media",
      label: "Thumbnail personalizado",
      admin: {
        description: "Si no se sube, se usa el thumbnail de YouTube automáticamente",
      },
    },
    {
      name: "tags",
      type: "array",
      label: "Etiquetas",
      fields: [{ name: "tag", type: "text", label: "Etiqueta" }],
    },
    {
      name: "duration",
      type: "text",
      label: "Duración",
      admin: { description: "Ej: 45 min" },
    },
    {
      name: "transcript",
      type: "richText",
      label: "Transcripción (opcional)",
      admin: {
        description: "Mejora el SEO del sermón. Puede añadirse después del lanzamiento.",
      },
    },
    {
      name: "isFeatured",
      type: "checkbox",
      label: "Destacado en Home",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      label: "Estado",
      options: [
        { label: "Publicado", value: "published" },
        { label: "Borrador", value: "draft" },
      ],
      admin: { position: "sidebar" },
    },
    seoFields,
  ],
};
