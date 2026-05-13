import type { GlobalConfig } from "payload";

export const DonationSettings: GlobalConfig = {
  slug: "donation-settings",
  label: "Configuración de Donaciones",
  admin: { group: "Configuración" },
  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === "super-admin",
  },
  fields: [
    {
      name: "isEnabled",
      type: "checkbox",
      label: "Mostrar sección de donaciones",
      defaultValue: true,
    },
    {
      name: "heading",
      type: "text",
      label: "Título de la sección",
      defaultValue: "Tu ofrenda transforma vidas",
    },
    {
      name: "description",
      type: "richText",
      label: "Descripción / propósito de las donaciones",
    },
    {
      name: "methods",
      type: "array",
      label: "Métodos de donación",
      fields: [
        { name: "name", type: "text", required: true, label: "Nombre (ej: Yappy, Transferencia)" },
        { name: "instructions", type: "textarea", label: "Instrucciones" },
        { name: "qrCode", type: "upload", relationTo: "media", label: "Código QR" },
        { name: "accountNumber", type: "text", label: "Número de cuenta (si aplica)" },
      ],
    },
  ],
};
