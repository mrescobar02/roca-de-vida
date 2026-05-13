import type { Field } from "payload";

export const slugField = (sourceField = "name"): Field => ({
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
  label: "Slug (URL)",
  admin: {
    description: "URL amigable. Se genera automáticamente. Solo minúsculas, guiones.",
    position: "sidebar",
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (!value && data?.[sourceField]) {
          return (data[sourceField] as string)
            .toLowerCase()
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, "")
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim();
        }
        return value;
      },
    ],
  },
});
