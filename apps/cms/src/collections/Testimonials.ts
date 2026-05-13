import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: { singular: "Testimonio", plural: "Testimonios" },
  admin: {
    group: "Contenido",
    useAsTitle: "name",
    defaultColumns: ["name", "category", "isFeatured", "status"],
  },
  access: {
    read: () => true,
    create: ({ req }) => ["super-admin", "editor"].includes(req.user?.role ?? ""),
    update: ({ req }) => ["super-admin", "editor"].includes(req.user?.role ?? ""),
    delete: ({ req }) => req.user?.role === "super-admin",
  },
  fields: [
    { name: "name", type: "text", required: true, label: "Nombre" },
    {
      name: "content",
      type: "textarea",
      required: true,
      label: "Testimonio",
      admin: { description: "Máximo 300 caracteres recomendado" },
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      label: "Foto (opcional)",
    },
    {
      name: "category",
      type: "select",
      required: true,
      label: "Categoría",
      options: [
        { label: "Salvación", value: "salvation" },
        { label: "Sanidad", value: "healing" },
        { label: "Restauración", value: "restoration" },
        { label: "Comunidad", value: "community" },
        { label: "Familia", value: "family" },
      ],
    },
    {
      name: "ministry",
      type: "relationship",
      relationTo: "ministries",
      label: "Ministerio relacionado (opcional)",
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
