import type { CollectionConfig } from "payload";

export const MinistryInterests: CollectionConfig = {
  slug: "ministry-interests",
  labels: { singular: "Interés en Ministerio", plural: "Intereses en Ministerio" },
  admin: {
    group: "Formularios",
    useAsTitle: "name",
    defaultColumns: ["name", "ministry", "status", "createdAt"],
  },
  access: {
    read: ({ req }) => ["super-admin", "editor"].includes(req.user?.role ?? ""),
    create: () => true,
    update: ({ req }) => ["super-admin", "editor"].includes(req.user?.role ?? ""),
    delete: ({ req }) => req.user?.role === "super-admin",
  },
  fields: [
    { name: "name", type: "text", required: true, label: "Nombre completo" },
    { name: "email", type: "email", required: true, label: "Email" },
    { name: "phone", type: "text", label: "Teléfono" },
    {
      name: "ministry",
      type: "relationship",
      relationTo: "ministries",
      required: true,
      label: "Ministerio de interés",
    },
    { name: "message", type: "textarea", label: "¿Por qué te interesa este ministerio?" },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      label: "Estado",
      options: [
        { label: "Nuevo", value: "new" },
        { label: "Contactado", value: "contacted" },
        { label: "Integrado", value: "integrated" },
        { label: "Archivado", value: "archived" },
      ],
      admin: { position: "sidebar" },
    },
  ],
  timestamps: true,
};
