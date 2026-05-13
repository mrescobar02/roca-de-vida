import type { CollectionConfig } from "payload";
import { seoFields } from "../fields/seoFields";
import { slugField } from "../fields/slugField";

export const Ministries: CollectionConfig = {
  slug: "ministries",
  labels: { singular: "Ministerio", plural: "Ministerios" },
  admin: {
    group: "Contenido",
    useAsTitle: "name",
    defaultColumns: ["name", "category", "status", "updatedAt"],
    description: "Los 8 ministerios activos de Roca de Vida",
  },
  access: {
    read: () => true,
    create: ({ req }) => ["super-admin", "editor"].includes(req.user?.role ?? ""),
    update: ({ req, id }) => {
      if (["super-admin", "editor"].includes(req.user?.role ?? "")) return true;
      // Ministry leaders can only update their own ministry
      return { id: { equals: req.user?.ministry } };
    },
    delete: ({ req }) => req.user?.role === "super-admin",
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Nombre del ministerio",
    },
    slugField("name"),
    {
      name: "category",
      type: "select",
      required: true,
      label: "Categoría",
      options: [
        { label: "Familiar", value: "family" },
        { label: "Jóvenes", value: "youth" },
        { label: "Alcance", value: "outreach" },
        { label: "Educación", value: "education" },
        { label: "Adoración", value: "worship" },
      ],
    },
    {
      name: "tagline",
      type: "text",
      label: "Tagline corto",
      admin: { description: "Una frase breve que define al ministerio" },
    },
    {
      name: "description",
      type: "richText",
      label: "Descripción completa",
    },
    {
      name: "mission",
      type: "textarea",
      label: "Misión",
    },
    {
      name: "vision",
      type: "textarea",
      label: "Visión",
    },
    {
      name: "keyVerse",
      type: "group",
      label: "Versículo clave",
      fields: [
        { name: "reference", type: "text", label: "Referencia (ej: Juan 3:16)" },
        { name: "text", type: "textarea", label: "Texto del versículo" },
      ],
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
      label: "Imagen principal (Hero)",
      required: true,
    },
    {
      name: "gallery",
      type: "array",
      label: "Galería de imágenes",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        { name: "caption", type: "text", label: "Pie de foto" },
      ],
    },
    {
      name: "leaders",
      type: "relationship",
      relationTo: "staff",
      hasMany: true,
      label: "Líderes del ministerio",
    },
    {
      name: "contactEmail",
      type: "email",
      label: "Email de contacto del ministerio",
    },
    {
      name: "order",
      type: "number",
      label: "Orden de aparición",
      defaultValue: 99,
      admin: { position: "sidebar" },
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
