import type { CollectionConfig } from "payload";
import { slugField } from "../fields/slugField";

export const CellGroups: CollectionConfig = {
  slug: "cell-groups",
  labels: { singular: "Grupo de Vida", plural: "Grupos de Vida" },
  admin: {
    group: "Contenido",
    useAsTitle: "name",
    defaultColumns: ["name", "district", "schedule", "isFull", "status"],
  },
  access: {
    read: () => true,
    create: ({ req }) => ["super-admin", "editor"].includes(req.user?.role ?? ""),
    update: ({ req }) => ["super-admin", "editor"].includes(req.user?.role ?? ""),
    delete: ({ req }) => req.user?.role === "super-admin",
  },
  fields: [
    { name: "name", type: "text", required: true, label: "Nombre del grupo" },
    slugField("name"),
    {
      name: "neighborhood",
      type: "text",
      label: "Barrio/Sector",
      required: true,
    },
    {
      name: "district",
      type: "select",
      label: "Distrito / Corregimiento",
      options: [
        { label: "Ciudad de Panamá", value: "ciudad-panama" },
        { label: "San Miguelito", value: "san-miguelito" },
        { label: "Panamá Oeste", value: "panama-oeste" },
        { label: "Chorrera", value: "chorrera" },
        { label: "Otro", value: "otro" },
      ],
    },
    {
      name: "schedule",
      type: "text",
      required: true,
      label: "Horario",
      admin: { description: "Ej: Miércoles 7:00pm" },
    },
    {
      name: "leader",
      type: "relationship",
      relationTo: "staff",
      label: "Líder del grupo",
    },
    { name: "description", type: "richText", label: "Descripción" },
    {
      name: "capacity",
      type: "number",
      label: "Capacidad máxima",
    },
    {
      name: "isFull",
      type: "checkbox",
      label: "Grupo lleno",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Activa si el grupo ya no acepta nuevos miembros",
      },
    },
    { name: "contactEmail", type: "email", label: "Email de contacto" },
    {
      name: "coordinates",
      type: "group",
      label: "Coordenadas (para mapa futuro)",
      admin: { description: "Opcional — para integración de mapa" },
      fields: [
        { name: "lat", type: "number", label: "Latitud" },
        { name: "lng", type: "number", label: "Longitud" },
      ],
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "published",
      label: "Estado",
      options: [
        { label: "Activo", value: "published" },
        { label: "Inactivo", value: "draft" },
      ],
      admin: { position: "sidebar" },
    },
  ],
};
