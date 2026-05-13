import type { CollectionConfig } from "payload";

export const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  labels: { singular: "Contacto", plural: "Contactos" },
  admin: {
    group: "Formularios",
    useAsTitle: "name",
    defaultColumns: ["name", "email", "subject", "status", "createdAt"],
  },
  access: {
    read: ({ req }) => ["super-admin", "editor"].includes(req.user?.role ?? ""),
    create: () => true,
    update: ({ req }) => ["super-admin", "editor"].includes(req.user?.role ?? ""),
    delete: ({ req }) => req.user?.role === "super-admin",
  },
  fields: [
    { name: "name", type: "text", required: true, label: "Nombre" },
    { name: "email", type: "email", required: true, label: "Email" },
    { name: "phone", type: "text", label: "Teléfono" },
    { name: "subject", type: "text", required: true, label: "Asunto" },
    { name: "message", type: "textarea", required: true, label: "Mensaje" },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      label: "Estado",
      options: [
        { label: "Nuevo", value: "new" },
        { label: "Leído", value: "read" },
        { label: "Respondido", value: "responded" },
        { label: "Archivado", value: "archived" },
      ],
      admin: { position: "sidebar" },
    },
  ],
  timestamps: true,
};
