"use server";

import { z } from "zod";

const CMS_URL     = process.env.NEXT_PUBLIC_CMS_URL!;
const PAYLOAD_KEY = process.env.PAYLOAD_API_KEY!;

// ── Schemas compartidos ────────────────────────────────────────────────────────

const nameSchema    = z.string().min(2, "Nombre muy corto").max(100).trim();
const emailSchema   = z.string().email("Email inválido").max(255).trim();
const optEmailSchema = z.preprocess(
  (v) => String(v ?? "").trim() || undefined,
  z.string().email("Email inválido").max(255).optional()
);
const phoneSchema = z.preprocess(
  (v) => String(v ?? "").trim() || undefined,
  z.string().regex(/^[\d\s+\-(). ]*$/, "Teléfono inválido").max(30).optional()
);
const messageSchema = z.string().min(5, "Mensaje muy corto").max(5000).trim();
const idSchema      = z.string().regex(/^[a-zA-Z0-9_-]+$/, "ID inválido").min(1).max(100);

const VALID_SUBJECTS = ["general", "oracion", "bautismo", "consejeria", "grupos", "nuevo"] as const;
const subjectLabels: Record<string, string> = {
  general:    "Consulta general",
  oracion:    "Petición de oración",
  bautismo:   "Quiero bautizarme",
  consejeria: "Solicitar consejería",
  grupos:     "Grupos celulares",
  nuevo:      "Soy nuevo creyente",
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function checkHoneypot(formData: FormData): void {
  if (String(formData.get("_hp_name") ?? "").trim()) {
    throw new Error("Invalid submission.");
  }
}

async function postToCMS(collection: string, data: Record<string, unknown>) {
  const res = await fetch(`${CMS_URL}/api/${collection}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `API-Key ${PAYLOAD_KEY}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    console.error(`[forms] CMS error on ${collection}: ${res.status}`);
    throw new Error("Error al enviar. Intenta de nuevo.");
  }
  return res.json();
}

// ── Petición de oración ────────────────────────────────────────────────────────

const PrayerSchema = z.object({
  name:    nameSchema,
  email:   optEmailSchema,
  country: z.preprocess((v) => String(v ?? "").trim() || undefined, z.string().max(100).optional()),
  request: messageSchema,
});

export async function submitPrayerRequest(formData: FormData) {
  checkHoneypot(formData);

  const parsed = PrayerSchema.safeParse({
    name:    formData.get("name"),
    email:   formData.get("email"),
    country: formData.get("country"),
    request: formData.get("request"),
  });
  if (!parsed.success) throw new Error("Datos inválidos. Revisa el formulario.");

  const phoneCode = String(formData.get("phoneCode") ?? "").trim();
  const phoneNum  = String(formData.get("phone") ?? "").trim();
  const rawPhone  = phoneNum ? (phoneCode ? `${phoneCode} ${phoneNum}` : phoneNum) : "";
  const phone     = phoneSchema.parse(rawPhone);

  await postToCMS("prayer-requests", { ...parsed.data, phone });
}

// ── Contacto general ──────────────────────────────────────────────────────────

const ContactSchema = z.object({
  name:    nameSchema,
  email:   emailSchema,
  subject: z.enum(VALID_SUBJECTS),
  message: messageSchema,
  phone:   phoneSchema,
});

export async function submitContactForm(formData: FormData) {
  checkHoneypot(formData);

  const parsed = ContactSchema.safeParse({
    name:    formData.get("name"),
    email:   formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    phone:   formData.get("phone"),
  });
  if (!parsed.success) throw new Error("Datos inválidos. Revisa el formulario.");

  const { subject, ...rest } = parsed.data;
  await postToCMS("contact-submissions", { ...rest, subject: subjectLabels[subject] });
}

// ── Interés en ministerio ─────────────────────────────────────────────────────

const MinistryInterestSchema = z.object({
  name:       nameSchema,
  email:      emailSchema,
  phone:      phoneSchema,
  ministryId: idSchema,
  message:    z.preprocess(
    (v) => String(v ?? "").trim() || undefined,
    z.string().max(2000).optional()
  ),
});

export async function submitMinistryInterest(formData: FormData) {
  checkHoneypot(formData);

  const parsed = MinistryInterestSchema.safeParse({
    name:       formData.get("name"),
    email:      formData.get("email"),
    phone:      formData.get("phone"),
    ministryId: formData.get("ministryId"),
    message:    formData.get("message"),
  });
  if (!parsed.success) throw new Error("Datos inválidos. Revisa el formulario.");

  const { ministryId, ...rest } = parsed.data;
  await postToCMS("ministry-interests", { ...rest, ministry: ministryId });
}

// ── Solicitud de grupo celular ────────────────────────────────────────────────

const CellGroupSchema = z.object({
  name:        nameSchema,
  email:       emailSchema,
  phone:       phoneSchema,
  cellGroupId: z.preprocess(
    (v) => String(v ?? "").trim() || undefined,
    idSchema.optional()
  ),
  district: z.preprocess(
    (v) => String(v ?? "").trim() || undefined,
    z.string().max(100).optional()
  ),
  message: z.preprocess(
    (v) => String(v ?? "").trim() || undefined,
    z.string().max(2000).optional()
  ),
});

export async function submitCellGroupRequest(formData: FormData) {
  checkHoneypot(formData);

  const parsed = CellGroupSchema.safeParse({
    name:        formData.get("name"),
    email:       formData.get("email"),
    phone:       formData.get("phone"),
    cellGroupId: formData.get("cellGroupId"),
    district:    formData.get("district"),
    message:     formData.get("message"),
  });
  if (!parsed.success) throw new Error("Datos inválidos. Revisa el formulario.");

  const { cellGroupId, ...rest } = parsed.data;
  await postToCMS("cell-group-requests", { ...rest, cellGroup: cellGroupId });
}
