import type { CollectionConfig } from "payload";

export const Staff: CollectionConfig = {
  slug: "staff",
  labels: { singular: "Persona del equipo", plural: "Equipo" },
  admin: {
    group: "Contenido",
    useAsTitle: "name",
    defaultColumns: ["name", "title", "role", "status"],
  },
  access: {
    read: () => true,
    create: ({ req }) => ["super-admin", "editor"].includes(req.user?.role ?? ""),
    update: ({ req }) => ["super-admin", "editor"].includes(req.user?.role ?? ""),
    delete: ({ req }) => req.user?.role === "super-admin",
  },
  fields: [
    { name: "name", type: "text", required: true, label: "Nombre completo" },
    { name: "title", type: "text", required: true, label: "Cargo/Título" },
    {
      name: "role",
      type: "select",
      required: true,
      label: "Rol",
      options: [
        { label: "Pastor Principal", value: "lead-pastor" },
        { label: "Pastor", value: "pastor" },
        { label: "Anciano", value: "elder" },
        { label: "Diácono", value: "deacon" },
        { label: "Líder de Ministerio", value: "ministry-leader" },
        { label: "Personal", value: "staff" },
      ],
    },
    { name: "bio", type: "richText", label: "Biografía" },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      label: "Foto",
      required: true,
    },
    {
      name: "ministry",
      type: "relationship",
      relationTo: "ministries",
      label: "Ministerio principal",
    },
    { name: "email", type: "email", label: "Email (visible al público)" },
    {
      name: "isPastoralTeam",
      type: "checkbox",
      label: "Aparece en Equipo Pastoral",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
    {
      name: "order",
      type: "number",
      label: "Orden",
      defaultValue: 99,
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
        { label: "Oculto", value: "draft" },
      ],
      admin: { position: "sidebar" },
    },
  ],
};
