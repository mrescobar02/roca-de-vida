import type { CollectionConfig } from "payload";
import { seoFields } from "../fields/seoFields";
import { slugField } from "../fields/slugField";

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Página", plural: "Páginas" },
  admin: {
    group: "Contenido",
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "status", "updatedAt"],
    description: "Páginas con contenido libre (Nosotros, Historia, Creencias)",
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
    { name: "title", type: "text", required: true, label: "Título de la página" },
    slugField("title"),
    {
      name: "hero",
      type: "group",
      label: "Hero",
      fields: [
        { name: "image", type: "upload", relationTo: "media", label: "Imagen de fondo" },
        { name: "heading", type: "text", label: "Título principal" },
        { name: "subheading", type: "text", label: "Subtítulo" },
      ],
    },
    {
      name: "content",
      type: "richText",
      label: "Contenido principal",
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
