"use server";

const CMS_URL     = process.env.NEXT_PUBLIC_CMS_URL!;
const PAYLOAD_KEY = process.env.PAYLOAD_API_KEY!;

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
    const text = await res.text();
    console.error(`[forms] CMS error on ${collection}:`, text);
    throw new Error("Error al enviar. Intenta de nuevo.");
  }
  return res.json();
}

// ── Petición de oración ────────────────────────────────────────────────────────

export async function submitPrayerRequest(formData: FormData) {
  if (formData.get("_hp_name")) return; // honeypot

  await postToCMS("prayer-requests", {
    name:    String(formData.get("name") ?? "").trim(),
    email:   String(formData.get("email") ?? "").trim() || undefined,
    phone:   phoneValue(formData),
    country: String(formData.get("country") ?? "").trim() || undefined,
    request: String(formData.get("request") ?? "").trim(),
  });
}

// ── Contacto general ──────────────────────────────────────────────────────────

export async function submitContactForm(formData: FormData) {
  if (formData.get("_hp_name")) return;

  const subjectValue = String(formData.get("subject") ?? "general");
  const subjectLabels: Record<string, string> = {
    general:    "Consulta general",
    oracion:    "Petición de oración",
    bautismo:   "Quiero bautizarme",
    consejeria: "Solicitar consejería",
    grupos:     "Grupos celulares",
    nuevo:      "Soy nuevo creyente",
  };

  await postToCMS("contact-submissions", {
    name:    String(formData.get("name") ?? "").trim(),
    email:   String(formData.get("email") ?? "").trim(),
    phone:   String(formData.get("phone") ?? "").trim() || undefined,
    subject: subjectLabels[subjectValue] ?? subjectValue,
    message: String(formData.get("message") ?? "").trim(),
  });
}

// ── Interés en ministerio ─────────────────────────────────────────────────────

export async function submitMinistryInterest(formData: FormData) {
  if (formData.get("_hp_name")) return;

  const ministryId = String(formData.get("ministryId") ?? "").trim();
  if (!ministryId) throw new Error("Selecciona un ministerio.");

  await postToCMS("ministry-interests", {
    name:     String(formData.get("name") ?? "").trim(),
    email:    String(formData.get("email") ?? "").trim(),
    phone:    String(formData.get("phone") ?? "").trim() || undefined,
    ministry: ministryId,
    message:  String(formData.get("message") ?? "").trim() || undefined,
  });
}

// ── Solicitud de grupo celular ────────────────────────────────────────────────

export async function submitCellGroupRequest(formData: FormData) {
  if (formData.get("_hp_name")) return;

  const cellGroupId = String(formData.get("cellGroupId") ?? "").trim();

  await postToCMS("cell-group-requests", {
    name:      String(formData.get("name") ?? "").trim(),
    email:     String(formData.get("email") ?? "").trim(),
    phone:     String(formData.get("phone") ?? "").trim(),
    cellGroup: cellGroupId || undefined,
    district:  String(formData.get("district") ?? "").trim() || undefined,
    message:   String(formData.get("message") ?? "").trim() || undefined,
  });
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function phoneValue(formData: FormData): string | undefined {
  const code   = String(formData.get("phoneCode") ?? "").trim();
  const number = String(formData.get("phone") ?? "").trim();
  if (!number) return undefined;
  return code ? `${code} ${number}` : number;
}
