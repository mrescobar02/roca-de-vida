"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

const CMS_URL     = process.env.NEXT_PUBLIC_CMS_URL!;
const PAYLOAD_KEY = process.env.PAYLOAD_API_KEY!;

const DonationSchema = z.object({
  name:      z.string().min(2, "Nombre muy corto").max(100).trim(),
  email:     z.string().email("Email inválido").max(255).trim(),
  amount:    z.number().positive("Monto inválido").max(10000, "Monto máximo $10,000").finite(),
  recurring: z.boolean(),
  frequency: z.enum(["weekly", "monthly", "yearly"]).optional(),
});

export async function initTilopayDonation(formData: FormData) {
  const rawAmount  = Number(formData.get("amount"));
  const customAmt  = Number(formData.get("customAmount"));
  const finalRaw   = rawAmount > 0 ? rawAmount : customAmt;
  // Round to 2 decimal places to prevent floating-point abuse
  const finalAmount = Math.round(finalRaw * 100) / 100;

  const recurring = formData.get("recurring") === "true";
  const frequency = String(formData.get("frequency") ?? "");

  const parsed = DonationSchema.safeParse({
    name:      formData.get("name"),
    email:     formData.get("email"),
    amount:    finalAmount,
    recurring,
    frequency: recurring && frequency ? frequency : undefined,
  });
  if (!parsed.success) throw new Error("Datos inválidos. Revisa el formulario.");

  const { name, email, amount, frequency: freq } = parsed.data;

  // Unpredictable order number — avoids timestamp-based enumeration
  const orderNumber       = `RDV-${crypto.randomUUID().replace(/-/g, "").slice(0, 12).toUpperCase()}`;
  const cancellationToken = crypto.randomUUID();

  // ── 1. Crear registro pending en el CMS ───────────────────────────────────
  const cmsRes = await fetch(`${CMS_URL}/api/donations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `API-Key ${PAYLOAD_KEY}`,
    },
    body: JSON.stringify({
      name,
      email,
      amount,
      currency:  "USD",
      type:      recurring ? "recurring" : "one-time",
      frequency: freq,
      status:    "pending",
      orderNumber,
      cancellationToken,
    }),
  });
  if (!cmsRes.ok) {
    console.error("[donations] CMS error:", cmsRes.status);
    throw new Error("Error al procesar la donación. Intenta de nuevo.");
  }

  // ── 2. Redirigir a Tilopay ────────────────────────────────────────────────
  // Descomentar y ajustar cuando lleguen las credenciales:
  //
  // const res = await fetch("https://app.tilopay.com/api/v1/processTransaction", {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${process.env.TILOPAY_API_KEY}`,
  //     "Content-Type": "application/x-www-form-urlencoded",
  //   },
  //   body: new URLSearchParams({
  //     apiuser: process.env.TILOPAY_ACCOUNT_ID!,
  //     hash:    process.env.TILOPAY_KEY_ID!,
  //     amount:  amount.toFixed(2),
  //     currency: "USD",
  //     orderNumber,
  //     redirect: `${process.env.NEXT_PUBLIC_SITE_URL}/donaciones/gracias`,
  //     callback: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/tilopay`,
  //     email,
  //     name,
  //     ...(recurring && freq ? { subscription: "1", billPeriod: FREQ_PERIODS[freq] ?? "month", billFrequency: "1" } : {}),
  //   }),
  // });
  // const { redirect: redirectUrl } = await res.json();
  // redirect(redirectUrl);

  const params = new URLSearchParams({
    monto: String(amount),
    tipo:  recurring ? "recurrente" : "unica",
    ...(recurring && freq ? { frecuencia: freq } : {}),
  });
  redirect(`/donaciones/pendiente?${params}`);
}
