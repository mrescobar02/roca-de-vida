import type { CollectionConfig } from "payload";
import { slugField } from "../fields/slugField";

export const Galleries: CollectionConfig = {
  slug: "galleries",
  labels: { singular: "Galería", plural: "Galerías" },
  admin: {
    group: "Contenido",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "date", "status"],
  },
  access: {
    read: () => true,
    create: ({ req }) => ["super-admin", "editor"].includes(req.user?.role ?? ""),
    update: ({ req }) => ["super-admin", "editor"].includes(req.user?.role ?? ""),
    delete: ({ req }) => req.user?.role === "super-admin",
  },
  fields: [
    { name: "title", type: "text", required: true, label: "Título de la galería" },
    slugField("title"),
    {
      name: "category",
      type: "select",
      required: true,
      label: "Categoría",
      options: [
        { label: "Iglesia", value: "church" },
        { label: "Ministerio", value: "ministry" },
        { label: "Eventos", value: "events" },
        { label: "Misiones", value: "missions" },
      ],
    },
    {
      name: "ministry",
      type: "relationship",
      relationTo: "ministries",
      label: "Ministerio relacionado (opcional)",
    },
    {
      name: "event",
      type: "relationship",
      relationTo: "events",
      label: "Evento relacionado (opcional)",
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      label: "Imagen de portada",
      required: true,
    },
    {
      name: "photos",
      type: "array",
      label: "Fotos",
      minRows: 1,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        { name: "caption", type: "text", label: "Pie de foto" },
      ],
    },
    {
      name: "date",
      type: "date",
      label: "Fecha",
      admin: { date: { pickerAppearance: "dayOnly" } },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "published",
      label: "Estado",
      options: [
        { label: "Publicado", value: "published" },
        { label: "Borrador", value: "draft" },
      ],
      admin: { position: "sidebar" },
    },
  ],
};
