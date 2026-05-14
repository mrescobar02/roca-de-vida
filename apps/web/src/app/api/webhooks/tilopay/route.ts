import { NextRequest, NextResponse } from "next/server";

const CMS_URL    = process.env.NEXT_PUBLIC_CMS_URL!;
const PAYLOAD_KEY = process.env.PAYLOAD_API_KEY!;
const SITE_URL   = process.env.NEXT_PUBLIC_SITE_URL!;

// TODO: verificar firma HMAC de Tilopay cuando documenten el header exacto
// Confirmar con soporte Tilopay qué header usan para la firma del webhook.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Tilopay envía distintos eventos — mapeamos los relevantes
    const {
      orderNumber,       // ej. "RDV-1717612345678"
      status,            // ej. "approved", "cancelled", "failed"
      amount,
      transactionId,
      subscriptionId,    // presente si es recurrente
      // campos adicionales que Tilopay incluya en el payload
    } = body;

    const isRecurring = Boolean(subscriptionId);
    const donationStatus = mapTilopayStatus(status);

    // Generar token único de cancelación
    const cancellationToken = crypto.randomUUID();

    // Buscar si ya existe una donación con este orderNumber (re-entrega del webhook)
    const existingRes = await fetch(
      `${CMS_URL}/api/donations?where[tilopayTransactionId][equals]=${transactionId}&limit=1`,
      { headers: { Authorization: `API-Key ${PAYLOAD_KEY}` } }
    );
    const existing = await existingRes.json();
    if (existing?.docs?.length > 0) {
      return NextResponse.json({ received: true, duplicate: true });
    }

    // Crear registro en Payload CMS
    const createRes = await fetch(`${CMS_URL}/api/donations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `API-Key ${PAYLOAD_KEY}`,
      },
      body: JSON.stringify({
        // Tilopay debería enviarnos el email del pagador — ajustar el campo según su payload
        email:                  body.email ?? body.payerEmail ?? "desconocido@tilopay.com",
        name:                   body.name  ?? body.payerName  ?? "",
        amount:                 Number(amount),
        currency:               "USD",
        type:                   isRecurring ? "recurring" : "one-time",
        frequency:              isRecurring ? mapFrequency(body.billPeriod) : undefined,
        status:                 donationStatus,
        tilopayTransactionId:   transactionId,
        tilopaySubscriptionId:  subscriptionId ?? undefined,
        cancellationToken,
      }),
    });

    if (!createRes.ok) {
      console.error("[tilopay webhook] Error creating donation:", await createRes.text());
      return NextResponse.json({ error: "cms_error" }, { status: 500 });
    }

    // Enviar email de confirmación al donor
    if (donationStatus === "active" || donationStatus === "completed") {
      await sendConfirmationEmail({
        email:         body.email ?? body.payerEmail,
        name:          body.name  ?? body.payerName,
        amount:        Number(amount),
        isRecurring,
        frequency:     body.billPeriod,
        cancellationToken,
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
  // Ajustar según los valores reales que devuelve Tilopay
  const map: Record<string, string> = {
    approved:   "active",
    completed:  "completed",
    cancelled:  "cancelled",
    failed:     "failed",
    pending:    "pending",
  };
  return map[status?.toLowerCase()] ?? "pending";
}

function mapFrequency(billPeriod?: string): string | undefined {
  const map: Record<string, string> = {
    week:  "weekly",
    month: "monthly",
    year:  "yearly",
  };
  return billPeriod ? (map[billPeriod] ?? "monthly") : undefined;
}

async function sendConfirmationEmail({
  email, name, amount, isRecurring, frequency, cancellationToken,
}: {
  email: string;
  name: string;
  amount: number;
  isRecurring: boolean;
  frequency?: string;
  cancellationToken: string;
}) {
  const freqLabels: Record<string, string> = {
    weekly: "semanal", monthly: "mensual", yearly: "anual",
  };
  const cancelUrl = `${SITE_URL}/donaciones/gestionar?token=${cancellationToken}`;

  // TODO: reemplazar con Resend, Nodemailer u otro proveedor
  // Ejemplo con Resend:
  //
  // await resend.emails.send({
  //   from: "Roca de Vida Panamá <noreply@rocadevidapanama.com>",
  //   to: email,
  //   subject: isRecurring
  //     ? `Suscripción activa — B/. ${amount.toFixed(2)} ${freqLabels[frequency ?? "monthly"]}`
  //     : `Gracias por tu donación — B/. ${amount.toFixed(2)}`,
  //   html: buildEmailHtml({ name, amount, isRecurring, frequency, cancelUrl }),
  // });

  console.info("[tilopay] Confirmation email stub →", {
    to: email, amount, isRecurring, frequency, cancelUrl,
  });
}
