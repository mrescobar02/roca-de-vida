import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { DonationConfirmation } from "@/emails/DonationConfirmation";
import { SubscriptionConfirmation } from "@/emails/SubscriptionConfirmation";

const CMS_URL     = process.env.NEXT_PUBLIC_CMS_URL!;
const PAYLOAD_KEY = process.env.PAYLOAD_API_KEY!;
const SITE_URL    = process.env.NEXT_PUBLIC_SITE_URL!;

// TODO: verificar firma HMAC de Tilopay (confirmar header con su soporte)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderNumber, status, transactionId, subscriptionId } = body;

    if (!orderNumber) {
      return NextResponse.json({ error: "missing_order_number" }, { status: 400 });
    }

    // Buscar el registro pending creado antes de redirigir a Tilopay
    const searchRes = await fetch(
      `${CMS_URL}/api/donations?where[orderNumber][equals]=${encodeURIComponent(orderNumber)}&limit=1&depth=0`,
      { headers: { Authorization: `API-Key ${PAYLOAD_KEY}` } }
    );
    const searchData  = await searchRes.json();
    const donation    = searchData?.docs?.[0];

    if (!donation) {
      console.error("[tilopay webhook] Donation not found:", orderNumber);
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    const newStatus = mapTilopayStatus(status);

    // Actualizar registro con IDs de Tilopay y estado final
    await fetch(`${CMS_URL}/api/donations/${donation.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `API-Key ${PAYLOAD_KEY}` },
      body: JSON.stringify({
        status:                newStatus,
        tilopayTransactionId:  transactionId  ?? undefined,
        tilopaySubscriptionId: subscriptionId ?? undefined,
      }),
    });

    // Enviar email de confirmación usando el email ya almacenado desde el form
    if (newStatus === "active" || newStatus === "completed") {
      const isRecurring = donation.type === "recurring";
      const subject     = isRecurring
        ? `Suscripción activa — B/. ${Number(donation.amount).toFixed(2)} ${FREQ_LABELS[donation.frequency] ?? ""}`
        : `Gracias por tu donación — B/. ${Number(donation.amount).toFixed(2)}`;

      await sendEmail({
        to:      donation.email,
        subject,
        react: isRecurring
          ? SubscriptionConfirmation({
              name:            donation.name,
              amount:          Number(donation.amount),
              frequency:       donation.frequency,
              orderNumber:     donation.orderNumber,
              cancellationUrl: `${SITE_URL}/donaciones/gestionar?token=${donation.cancellationToken}`,
            })
          : DonationConfirmation({
              name:        donation.name,
              amount:      Number(donation.amount),
              orderNumber: donation.orderNumber,
            }),
      });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[tilopay webhook]", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function mapTilopayStatus(status: string): string {
  const map: Record<string, string> = {
    approved: "active", completed: "completed",
    cancelled: "cancelled", failed: "failed", pending: "pending",
  };
  return map[status?.toLowerCase()] ?? "pending";
}

const FREQ_LABELS: Record<string, string> = {
  weekly: "semanal", monthly: "mensual", yearly: "anual",
};
