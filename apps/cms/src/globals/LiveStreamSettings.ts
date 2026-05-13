import type { GlobalConfig } from "payload";

export const LiveStreamSettings: GlobalConfig = {
  slug: "live-stream-settings",
  label: "Streaming en Vivo",
  admin: { group: "Configuración" },
  access: {
    read: () => true,
    update: ({ req }) => ["super-admin", "editor"].includes(req.user?.role ?? ""),
  },
  fields: [
    {
      name: "isLive",
      type: "checkbox",
      label: "● ESTAMOS EN VIVO AHORA",
      defaultValue: false,
      admin: {
        description: "Activa este switch cuando el servicio está transmitiendo en YouTube Live",
      },
    },
    {
      name: "streamUrl",
      type: "text",
      label: "URL del stream de YouTube",
      admin: {
        description: "URL completa del video/stream de YouTube en vivo",
      },
    },
    {
      name: "streamTitle",
      type: "text",
      label: "Título del servicio en vivo",
    },
    {
      name: "nextBroadcastDate",
      type: "date",
      label: "Próxima transmisión",
      admin: { date: { pickerAppearance: "dayAndTime" } },
    },
    {
      name: "preStreamMessage",
      type: "textarea",
      label: "Mensaje cuando no hay stream activo",
      defaultValue: "El próximo servicio en línea será pronto. ¡Te esperamos!",
    },
  ],
};
