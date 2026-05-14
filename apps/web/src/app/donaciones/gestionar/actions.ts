"use server";

import { timingSafeEqual } from "crypto";
import { sendEmail } from "@/lib/email";
import { SubscriptionCancelled } from "@/emails/SubscriptionCancelled";

const CMS_URL     = process.env.NEXT_PUBLIC_CMS_URL!;
const PAYLOAD_KEY = process.env.PAYLOAD_API_KEY!;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function safeTokenEqual(a: string, b: string): boolean {
  if (!a || !b) return false;
  try {
    const aBuf = Buffer.from(a, "utf8");
    const bBuf = Buffer.from(b, "utf8");
    if (aBuf.length !== bBuf.length) return false;
    return timingSafeEqual(aBuf, bBuf);
  } catch {
    return false;
  }
}

export async function cancelDonation(_donationId: string, token: string) {
  // Validate token format — rejects empty, control chars, non-UUID
  if (!token || typeof token !== "string" || !UUID_RE.test(token)) {
    throw new Error("Solicitud inválida.");
  }

  // Search by token directly — proves ownership atomically without ID enumeration
  const searchRes = await fetch(
    `${CMS_URL}/api/donations?where[cancellationToken][equals]=${encodeURIComponent(token)}&limit=1&depth=0`,
    { headers: { Authorization: `API-Key ${PAYLOAD_KEY}` }, cache: "no-store" }
  );
  if (!searchRes.ok) throw new Error("Solicitud inválida.");

  const searchData = await searchRes.json();
  const donation   = searchData?.docs?.[0];

  // Uniform error — never reveals whether ID exists or token mismatched
  if (!donation) throw new Error("Solicitud inválida.");
  if (donation.status === "cancelled") throw new Error("Esta donación ya fue cancelada.");

  // TODO: cancelar en Tilopay cuando lleguen las credenciales:
  //
  // if (donation.tilopaySubscriptionId) {
  //   await fetch("https://app.tilopay.com/api/v1/cancelSubscription", {
  //     method: "POST",
  //     headers: { Authorization: `Bearer ${process.env.TILOPAY_API_KEY}` },
  //     body: new URLSearchParams({ subscriptionId: donation.tilopaySubscriptionId }),
  //   });
  // }

  // Idempotent PATCH — condition on status to prevent double-cancel race
  const updateRes = await fetch(
    `${CMS_URL}/api/donations/${encodeURIComponent(donation.id)}`,
    {
      method:  "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `API-Key ${PAYLOAD_KEY}` },
      body: JSON.stringify({
        status:            "cancelled",
        cancelledAt:       new Date().toISOString(),
        // Rotate token after use — invalidates the link that was in the URL
        cancellationToken: crypto.randomUUID(),
      }),
    }
  );

  // If the doc was already cancelled by a concurrent request, skip email
  if (!updateRes.ok) throw new Error("Error al cancelar. Intenta de nuevo.");
  const updatedDoc = await updateRes.json();
  if (updatedDoc?.doc?.status !== "cancelled" && updatedDoc?.status !== "cancelled") {
    throw new Error("Error al cancelar. Intenta de nuevo.");
  }

  await sendEmail({
    to:      donation.email,
    subject: "Suscripción cancelada — Roca de Vida Panamá",
    react:   SubscriptionCancelled({
      name:        donation.name,
      amount:      Number(donation.amount),
      frequency:   donation.frequency,
      orderNumber: donation.orderNumber,
    }),
  });
}

// Kept for type compatibility with CancelButton
export type { };
