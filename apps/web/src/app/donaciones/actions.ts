"use server";

import { redirect } from "next/navigation";

// TODO: conectar con credenciales reales de Tilopay
// Env vars necesarias:
//   TILOPAY_API_KEY       — API key del merchant
//   TILOPAY_ACCOUNT_ID    — ID de cuenta
//   TILOPAY_KEY_ID        — Key ID para firma de transacciones
//
// Para recurrencia, solicitar a Tilopay acceso al módulo de suscripciones.
// Docs: https://tilopay.com/documentacion/sdk
// Soporte: sac@tilopay.com

const FREQUENCY_PERIODS: Record<string, string> = {
  weekly:  "week",
  monthly: "month",
  yearly:  "year",
};

export async function initTilopayDonation(formData: FormData) {
  const amount      = Number(formData.get("amount"));
  const customAmt   = Number(formData.get("customAmount"));
  const recurring   = formData.get("recurring") === "true";
  const frequency   = formData.get("frequency") as string;

  const finalAmount = amount > 0 ? amount : customAmt;
  if (!finalAmount || finalAmount < 1) throw new Error("Monto inválido");

  // ── Stub — descomentar y ajustar cuando lleguen las credenciales ──────────
  //
  // const baseParams = {
  //   apiuser:     process.env.TILOPAY_ACCOUNT_ID!,
  //   hash:        process.env.TILOPAY_KEY_ID!,
  //   amount:      finalAmount.toFixed(2),
  //   currency:    "USD",
  //   orderNumber: `RDV-${Date.now()}`,
  //   redirect:    `${process.env.NEXT_PUBLIC_SITE_URL}/donaciones/gracias`,
  //   callback:    `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/tilopay`,
  // };
  //
  // const subscriptionParams = recurring && frequency ? {
  //   // Parámetros de suscripción — confirmar nombres exactos con soporte Tilopay
  //   subscription:    "1",
  //   billPeriod:      FREQUENCY_PERIODS[frequency] ?? "month",
  //   billFrequency:   "1",
  // } : {};
  //
  // const res = await fetch("https://app.tilopay.com/api/v1/processTransaction", {
  //   method: "POST",
  //   headers: {
  //     "Authorization": `Bearer ${process.env.TILOPAY_API_KEY}`,
  //     "Content-Type": "application/x-www-form-urlencoded",
  //   },
  //   body: new URLSearchParams({ ...baseParams, ...subscriptionParams }),
  // });
  //
  // const { redirect: redirectUrl } = await res.json();
  // redirect(redirectUrl);
  // ─────────────────────────────────────────────────────────────────────────

  const params = new URLSearchParams({
    monto: String(finalAmount),
    ...(recurring && frequency ? { tipo: "recurrente", frecuencia: frequency } : { tipo: "unica" }),
  });

  redirect(`/donaciones/pendiente?${params}`);
}
