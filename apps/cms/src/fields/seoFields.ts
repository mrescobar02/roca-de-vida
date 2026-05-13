import type { Field } from "payload";

export const seoFields: Field = {
  name: "seo",
  type: "group",
  label: "SEO",
  admin: {
    description: "Configura cómo esta página aparece en buscadores y redes sociales",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Título SEO",
      admin: {
        description: "Máximo 60 caracteres. Si está vacío, se usa el título principal.",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Descripción meta",
      admin: {
        description: "150–160 caracteres. Se muestra en resultados de búsqueda.",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Imagen Open Graph",
      admin: {
        description: "Se muestra al compartir en redes sociales. Tamaño recomendado: 1200x630px",
      },
    },
    {
      name: "noIndex",
      type: "checkbox",
      label: "No indexar en buscadores",
      defaultValue: false,
    },
  ],
};
