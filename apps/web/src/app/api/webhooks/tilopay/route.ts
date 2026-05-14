import { NextRequest, NextResponse } from "next/server";

const CMS_URL     = process.env.NEXT_PUBLIC_CMS_URL!;
const PAYLOAD_KEY = process.env.PAYLOAD_API_KEY!;
const SITE_URL    = process.env.NEXT_PUBLIC_SITE_URL!;

// TODO: verificar firma HMAC de Tilopay cuando documenten el header exacto.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderNumber, status, transactionId, subscriptionId } = body;

    if (!orderNumber) {
      return NextResponse.json({ error: "missing_order_number" }, { status: 400 });
    }

    // Buscar el registro pending que creamos antes de redirigir a Tilopay
    const searchRes = await fetch(
      `${CMS_URL}/api/donations?where[orderNumber][equals]=${encodeURIComponent(orderNumber)}&limit=1&depth=0`,
      { headers: { Authorization: `API-Key ${PAYLOAD_KEY}` } }
    );
    const searchData = await searchRes.json();
    const donation = searchData?.docs?.[0];

    if (!donation) {
      console.error("[tilopay webhook] Donation not found for orderNumber:", orderNumber);
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    const newStatus = mapTilopayStatus(status);

    // Actualizar registro con los IDs de Tilopay y el estado final
    await fetch(`${CMS_URL}/api/donations/${donation.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `API-Key ${PAYLOAD_KEY}`,
      },
      body: JSON.stringify({
        status:                newStatus,
        tilopayTransactionId:  transactionId  ?? undefined,
        tilopaySubscriptionId: subscriptionId ?? undefined,
      }),
    });

    // Enviar email de confirmación ahora que tenemos el email guardado desde el form
    if (newStatus === "active" || newStatus === "completed") {
      await sendConfirmationEmail({
        email:             donation.email,
        name:              donation.name,
        amount:            donation.amount,
        isRecurring:       donation.type === "recurring",
        frequency:         donation.frequency,
        cancellationToken: donation.cancellationToken,
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
    approved:  "active",
    completed: "completed",
    cancelled: "cancelled",
    failed:    "failed",
    pending:   "pending",
  };
  return map[status?.toLowerCase()] ?? "pending";
}

const FREQ_LABELS: Record<string, string> = {
  weekly: "semanal", monthly: "mensual", yearly: "anual",
};

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
  const cancelUrl  = `${SITE_URL}/donaciones/gestionar?token=${cancellationToken}`;
  const freqLabel  = FREQ_LABELS[frequency ?? ""] ?? "";
  const amountFmt  = `B/. ${Number(amount).toFixed(2)}`;

  // TODO: reemplazar con Resend u otro proveedor de email
  //
  // await resend.emails.send({
  //   from:    "Roca de Vida Panamá <noreply@rocadevidapanama.com>",
  //   to:      email,
  //   subject: isRecurring
  //     ? `Suscripción activa — ${amountFmt} ${freqLabel}`
  //     : `Gracias por tu donación — ${amountFmt}`,
  //   html: `
  //     <p>Hola ${name},</p>
  //     <p>Recibimos tu ${isRecurring ? `donación recurrente de ${amountFmt} ${freqLabel}` : `donación de ${amountFmt}`}. ¡Gracias!</p>
  //     ${isRecurring ? `<p>Para gestionar o cancelar tu suscripción en cualquier momento, usa este link:</p>
  //     <a href="${cancelUrl}">${cancelUrl}</a>` : ""}
  //     <p>— Equipo Roca de Vida Panamá</p>
  //   `,
  // });

  console.info("[tilopay] Email stub →", { to: email, amountFmt, isRecurring, freqLabel, cancelUrl });
}
