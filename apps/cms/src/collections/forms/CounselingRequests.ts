import type { CollectionConfig } from "payload";

export const CounselingRequests: CollectionConfig = {
  slug: "counseling-requests",
  labels: { singular: "Solicitud de Consejería", plural: "Solicitudes de Consejería" },
  admin: {
    group: "Formularios",
    useAsTitle: "name",
    defaultColumns: ["name", "category", "status", "createdAt"],
    description: "Acceso restringido — solo equipo pastoral",
  },
  access: {
    // Máxima restricción — solo super-admin ve consejería
    read: ({ req }) => req.user?.role === "super-admin",
    create: () => true,
    update: ({ req }) => req.user?.role === "super-admin",
    delete: ({ req }) => req.user?.role === "super-admin",
  },
  fields: [
    { name: "name", type: "text", required: true, label: "Nombre completo" },
    { name: "email", type: "email", required: true, label: "Email" },
    { name: "phone", type: "text", required: true, label: "Teléfono" },
    {
      name: "category",
      type: "select",
      label: "Área de consejería",
      options: [
        { label: "Matrimonio / Pareja", value: "marriage" },
        { label: "Familia", value: "family" },
        { label: "Adicciones", value: "addictions" },
        { label: "Duelo / Pérdida", value: "grief" },
        { label: "Salud emocional / Depresión", value: "mental-health" },
        { label: "Espiritual", value: "spiritual" },
        { label: "Otro", value: "other" },
      ],
    },
    {
      name: "preferredContact",
      type: "select",
      label: "Preferencia de contacto",
      options: [
        { label: "Llamada telefónica", value: "phone" },
        { label: "WhatsApp", value: "whatsapp" },
        { label: "Email", value: "email" },
        { label: "Presencial", value: "in-person" },
      ],
    },
    { name: "message", type: "textarea", required: true, label: "Cuéntanos brevemente tu situación" },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      label: "Estado",
      options: [
        { label: "Nueva", value: "new" },
        { label: "Contactado", value: "contacted" },
        { label: "En proceso", value: "in-progress" },
        { label: "Cerrado", value: "closed" },
        { label: "Archivado", value: "archived" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "notes", type: "textarea", label: "Notas internas (solo pastoral)" },
  ],
  timestamps: true,
};
