import type { CollectionConfig } from "payload";
import { seoFields } from "../fields/seoFields";
import { slugField } from "../fields/slugField";

export const Events: CollectionConfig = {
  slug: "events",
  labels: { singular: "Evento", plural: "Eventos" },
  admin: {
    group: "Contenido",
    useAsTitle: "title",
    defaultColumns: ["title", "date", "ministry", "isFeatured", "status"],
  },
  access: {
    read: () => true,
    create: ({ req }) => ["super-admin", "editor"].includes(req.user?.role ?? ""),
    update: ({ req }) => ["super-admin", "editor"].includes(req.user?.role ?? ""),
    delete: ({ req }) => req.user?.role === "super-admin",
  },
  fields: [
    { name: "title", type: "text", required: true, label: "Título del evento" },
    slugField("title"),
    {
      name: "date",
      type: "date",
      required: true,
      label: "Fecha",
      admin: { date: { pickerAppearance: "dayAndTime" } },
    },
    {
      name: "endDate",
      type: "date",
      label: "Fecha de fin (opcional)",
      admin: { date: { pickerAppearance: "dayAndTime" } },
    },
    { name: "time", type: "text", label: "Hora (ej: 7:00pm)" },
    { name: "location", type: "text", label: "Lugar" },
    { name: "description", type: "richText", label: "Descripción" },
    {
      name: "banner",
      type: "upload",
      relationTo: "media",
      label: "Banner del evento",
      required: true,
    },
    {
      name: "ministry",
      type: "relationship",
      relationTo: "ministries",
      label: "Ministerio organizador",
    },
    {
      name: "registrationUrl",
      type: "text",
      label: "URL de registro (externo, opcional)",
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
        { label: "Archivado", value: "archived" },
      ],
      admin: { position: "sidebar" },
    },
    seoFields,
  ],
};
