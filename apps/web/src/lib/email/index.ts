import { Resend } from "resend";
import type { ReactElement } from "react";

// RESEND_API_KEY debe estar en las env vars de Vercel
// Agregar también: RESEND_FROM_EMAIL (ej. "Roca de Vida <donaciones@rocadevidapanama.com>")
// El dominio rocadevidapanama.com debe estar verificado en resend.com/domains

interface SendOptions {
  to: string;
  subject: string;
  react: ReactElement;
}

export async function sendEmail({ to, subject, react }: SendOptions) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY no configurada — email no enviado:", { to, subject });
    return;
  }
  // Instancia lazy para evitar errores en build cuando la env var no está disponible
  const resend = new Resend(apiKey);
  const FROM   = process.env.RESEND_FROM_EMAIL ?? "Roca de Vida Panamá <noreply@rocadevidapanama.com>";
  const { error } = await resend.emails.send({ from: FROM, to, subject, react });
  if (error) console.error("[email] Error enviando email:", error);
}
