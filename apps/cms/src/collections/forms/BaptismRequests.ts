import type { CollectionConfig } from "payload";

export const BaptismRequests: CollectionConfig = {
  slug: "baptism-requests",
  labels: { singular: "Solicitud de Bautismo", plural: "Solicitudes de Bautismo" },
  admin: {
    group: "Formularios",
    useAsTitle: "name",
    defaultColumns: ["name", "age", "status", "createdAt"],
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
    { name: "phone", type: "text", required: true, label: "Teléfono" },
    { name: "age", type: "number", label: "Edad" },
    {
      name: "hasAcceptedChrist",
      type: "checkbox",
      label: "¿Ha aceptado a Cristo como Salvador?",
      required: true,
    },
    { name: "testimony", type: "textarea", label: "Testimonio corto (opcional)" },
    { name: "message", type: "textarea", label: "Mensaje adicional" },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      label: "Estado",
      options: [
        { label: "Nueva", value: "new" },
        { label: "Contactado", value: "contacted" },
        { label: "Programado", value: "scheduled" },
        { label: "Completado", value: "completed" },
        { label: "Archivado", value: "archived" },
      ],
      admin: { position: "sidebar" },
    },
  ],
  timestamps: true,
};
