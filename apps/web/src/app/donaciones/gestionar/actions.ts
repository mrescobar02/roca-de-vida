"use server";

import { sendEmail } from "@/lib/email";
import { SubscriptionCancelled } from "@/emails/SubscriptionCancelled";

const CMS_URL     = process.env.NEXT_PUBLIC_CMS_URL!;
const PAYLOAD_KEY = process.env.PAYLOAD_API_KEY!;

export async function cancelDonation(donationId: string, token: string) {
  // Verificar que el token corresponde a esta donación
  const verifyRes = await fetch(
    `${CMS_URL}/api/donations/${donationId}?depth=0`,
    { headers: { Authorization: `API-Key ${PAYLOAD_KEY}` }, cache: "no-store" }
  );
  if (!verifyRes.ok) throw new Error("No se pudo verificar la donación.");

  const donation = await verifyRes.json();
  if (donation.cancellationToken !== token) throw new Error("Token inválido.");
  if (donation.status === "cancelled")      throw new Error("Ya estaba cancelada.");

  // TODO: cancelar en Tilopay cuando lleguen las credenciales:
  //
  // if (donation.tilopaySubscriptionId) {
  //   await fetch("https://app.tilopay.com/api/v1/cancelSubscription", {
  //     method: "POST",
  //     headers: { Authorization: `Bearer ${process.env.TILOPAY_API_KEY}` },
  //     body: new URLSearchParams({ subscriptionId: donation.tilopaySubscriptionId }),
  //   });
  // }

  // Actualizar estado en CMS
  const updateRes = await fetch(`${CMS_URL}/api/donations/${donationId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: `API-Key ${PAYLOAD_KEY}` },
    body: JSON.stringify({ status: "cancelled", cancelledAt: new Date().toISOString() }),
  });
  if (!updateRes.ok) throw new Error("Error al cancelar. Intenta de nuevo.");

  // Enviar email de confirmación de cancelación
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
