import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    group: "Administración",
  },
  access: {
    read: ({ req }) => !!req.user,
    create: ({ req }) => req.user?.role === "super-admin",
    update: ({ req }) => !!req.user,
    delete: ({ req }) => req.user?.role === "super-admin",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Nombre completo",
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      label: "Rol",
      options: [
        { label: "Super Administrador", value: "super-admin" },
        { label: "Editor", value: "editor" },
        { label: "Líder de Ministerio", value: "ministry-leader" },
      ],
    },
    {
      name: "ministry",
      type: "relationship",
      relationTo: "ministries",
      label: "Ministerio asignado",
      admin: {
        condition: (data) => data.role === "ministry-leader",
        description: "Solo para líderes de ministerio",
      },
    },
  ],
};
