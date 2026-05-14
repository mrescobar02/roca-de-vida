"use server";

import { timingSafeEqual } from "crypto";
import { sendEmail } from "@/lib/email";
import { SubscriptionCancelled } from "@/emails/SubscriptionCancelled";

const CMS_URL     = process.env.NEXT_PUBLIC_CMS_URL!;
const PAYLOAD_KEY = process.env.PAYLOAD_API_KEY!;

function safeTokenEqual(a: string, b: string): boolean {
  try {
    const aBuf = Buffer.from(a, "utf8");
    const bBuf = Buffer.from(b, "utf8");
    if (aBuf.length !== bBuf.length) return false;
    return timingSafeEqual(aBuf, bBuf);
  } catch {
    return false;
  }
}

export async function cancelDonation(donationId: string, token: string) {
  // Basic input sanity
  if (
    !donationId || !token ||
    typeof donationId !== "string" || typeof token !== "string" ||
    donationId.length > 200 || token.length > 200
  ) {
    throw new Error("Parámetros inválidos.");
  }

  const verifyRes = await fetch(
    `${CMS_URL}/api/donations/${encodeURIComponent(donationId)}?depth=0`,
    { headers: { Authorization: `API-Key ${PAYLOAD_KEY}` }, cache: "no-store" }
  );
  if (!verifyRes.ok) throw new Error("No se pudo verificar la donación.");

  const donation = await verifyRes.json();

  // Timing-safe comparison prevents brute-force token enumeration
  if (!safeTokenEqual(String(donation.cancellationToken ?? ""), token)) {
    throw new Error("Token inválido.");
  }
  if (donation.status === "cancelled") throw new Error("Ya estaba cancelada.");

  // TODO: cancelar en Tilopay cuando lleguen las credenciales:
  //
  // if (donation.tilopaySubscriptionId) {
  //   await fetch("https://app.tilopay.com/api/v1/cancelSubscription", {
  //     method: "POST",
  //     headers: { Authorization: `Bearer ${process.env.TILOPAY_API_KEY}` },
  //     body: new URLSearchParams({ subscriptionId: donation.tilopaySubscriptionId }),
  //   });
  // }

  const updateRes = await fetch(`${CMS_URL}/api/donations/${encodeURIComponent(donationId)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: `API-Key ${PAYLOAD_KEY}` },
    body: JSON.stringify({ status: "cancelled", cancelledAt: new Date().toISOString() }),
  });
  if (!updateRes.ok) throw new Error("Error al cancelar. Intenta de nuevo.");

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
