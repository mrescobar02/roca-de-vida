import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { DonationConfirmation } from "@/emails/DonationConfirmation";
import { SubscriptionConfirmation } from "@/emails/SubscriptionConfirmation";

const CMS_URL     = process.env.NEXT_PUBLIC_CMS_URL!;
const PAYLOAD_KEY = process.env.PAYLOAD_API_KEY!;
const SITE_URL    = process.env.NEXT_PUBLIC_SITE_URL!;

function verifyTilopaySignature(rawBody: string, sigHeader: string | null): boolean {
  const secret = process.env.TILOPAY_WEBHOOK_SECRET;
  if (!sigHeader || !secret) return false;
  try {
    const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
    const a = Buffer.from(sigHeader, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  // Must read as text first to verify HMAC before parsing
  const rawBody = await req.text();
  const sig     = req.headers.get("x-tilopay-signature");

  // Block until TILOPAY_WEBHOOK_SECRET is configured and Tilopay is integrated
  if (!process.env.TILOPAY_WEBHOOK_SECRET) {
    console.error("[tilopay webhook] TILOPAY_WEBHOOK_SECRET not configured — rejecting all requests");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  if (!verifyTilopaySignature(rawBody, sig)) {
    console.error("[tilopay webhook] Invalid signature");
    return NextResponse.json({ error: "invalid_signature" }, { status: 401 });
  }

  try {
    const body = JSON.parse(rawBody);
    const { orderNumber, status, transactionId, subscriptionId } = body;

    if (!orderNumber || typeof orderNumber !== "string" || orderNumber.length > 100) {
      return NextResponse.json({ error: "missing_order_number" }, { status: 400 });
    }

    const searchRes = await fetch(
      `${CMS_URL}/api/donations?where[orderNumber][equals]=${encodeURIComponent(orderNumber)}&limit=1&depth=0`,
      { headers: { Authorization: `API-Key ${PAYLOAD_KEY}` } }
    );
    const searchData = await searchRes.json();
    const donation   = searchData?.docs?.[0];

    if (!donation) {
      console.error("[tilopay webhook] Donation not found for orderNumber (truncated):", orderNumber.slice(0, 12));
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    const newStatus = mapTilopayStatus(status);

    await fetch(`${CMS_URL}/api/donations/${donation.id}`, {
      method:  "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `API-Key ${PAYLOAD_KEY}` },
      body:    JSON.stringify({
        status:                newStatus,
        tilopayTransactionId:  transactionId  ?? undefined,
        tilopaySubscriptionId: subscriptionId ?? undefined,
      }),
    });

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
    console.error("[tilopay webhook] Internal error:", (err as Error).message);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}

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
