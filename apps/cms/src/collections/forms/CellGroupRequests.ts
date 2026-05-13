import type { CollectionConfig } from "payload";

export const CellGroupRequests: CollectionConfig = {
  slug: "cell-group-requests",
  labels: { singular: "Solicitud de Grupo", plural: "Solicitudes de Grupo" },
  admin: {
    group: "Formularios",
    useAsTitle: "name",
    defaultColumns: ["name", "cellGroup", "district", "status", "createdAt"],
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
    {
      name: "cellGroup",
      type: "relationship",
      relationTo: "cell-groups",
      label: "Grupo de interés (opcional)",
    },
    {
      name: "district",
      type: "text",
      label: "Tu sector/barrio",
      admin: { description: "Si no conoces un grupo, cuéntanos dónde vives" },
    },
    { name: "message", type: "textarea", label: "Mensaje adicional" },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      label: "Estado",
      options: [
        { label: "Nuevo", value: "new" },
        { label: "Contactado", value: "contacted" },
        { label: "Asignado a grupo", value: "assigned" },
        { label: "Archivado", value: "archived" },
      ],
      admin: { position: "sidebar" },
    },
  ],
  timestamps: true,
};
