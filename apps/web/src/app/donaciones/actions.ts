"use server";

import { redirect } from "next/navigation";

const CMS_URL     = process.env.NEXT_PUBLIC_CMS_URL!;
const PAYLOAD_KEY = process.env.PAYLOAD_API_KEY!;
const SITE_URL    = process.env.NEXT_PUBLIC_SITE_URL!;

// Env vars de Tilopay (cuando lleguen las credenciales):
//   TILOPAY_API_KEY, TILOPAY_ACCOUNT_ID, TILOPAY_KEY_ID
// Docs: https://tilopay.com/documentacion/sdk  |  sac@tilopay.com

const FREQUENCY_PERIODS: Record<string, string> = {
  weekly: "week", monthly: "month", yearly: "year",
};

export async function initTilopayDonation(formData: FormData) {
  const name        = String(formData.get("name") ?? "").trim();
  const email       = String(formData.get("email") ?? "").trim();
  const amount      = Number(formData.get("amount"));
  const customAmt   = Number(formData.get("customAmount"));
  const recurring   = formData.get("recurring") === "true";
  const frequency   = String(formData.get("frequency") ?? "");

  const finalAmount = amount > 0 ? amount : customAmt;
  if (!finalAmount || finalAmount < 1) throw new Error("Monto inválido.");
  if (!email) throw new Error("El correo es requerido.");

  // Identificadores únicos generados antes de redirigir
  const orderNumber        = `RDV-${Date.now()}`;
  const cancellationToken  = crypto.randomUUID();

  // ── 1. Crear registro pending en el CMS ───────────────────────────────────
  // Así tenemos el email y el cancellationToken listos cuando llegue el webhook.
  await fetch(`${CMS_URL}/api/donations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `API-Key ${PAYLOAD_KEY}`,
    },
    body: JSON.stringify({
      name,
      email,
      amount:             finalAmount,
      currency:           "USD",
      type:               recurring ? "recurring" : "one-time",
      frequency:          recurring && frequency ? frequency : undefined,
      status:             "pending",
      orderNumber,
      cancellationToken,
    }),
  });

  // ── 2. Redirigir a Tilopay ────────────────────────────────────────────────
  // Descomentar y ajustar cuando lleguen las credenciales:
  //
  // const baseParams = {
  //   apiuser:     process.env.TILOPAY_ACCOUNT_ID!,
  //   hash:        process.env.TILOPAY_KEY_ID!,
  //   amount:      finalAmount.toFixed(2),
  //   currency:    "USD",
  //   orderNumber,
  //   redirect:    `${SITE_URL}/donaciones/gracias`,
  //   callback:    `${SITE_URL}/api/webhooks/tilopay`,
  //   email,                          // pre-llena el campo de email en Tilopay
  //   name,
  // };
  //
  // const subscriptionParams = recurring && frequency ? {
  //   subscription:  "1",
  //   billPeriod:    FREQUENCY_PERIODS[frequency] ?? "month",
  //   billFrequency: "1",
  // } : {};
  //
  // const res = await fetch("https://app.tilopay.com/api/v1/processTransaction", {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${process.env.TILOPAY_API_KEY}`,
  //     "Content-Type": "application/x-www-form-urlencoded",
  //   },
  //   body: new URLSearchParams({ ...baseParams, ...subscriptionParams }),
  // });
  // const { redirect: redirectUrl } = await res.json();
  // redirect(redirectUrl);

  // Stub temporal mientras llegan las credenciales
  const params = new URLSearchParams({
    monto:     String(finalAmount),
    tipo:      recurring ? "recurrente" : "unica",
    ...(recurring && frequency ? { frecuencia: frequency } : {}),
  });
  redirect(`/donaciones/pendiente?${params}`);
}
