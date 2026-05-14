import { Section, Text } from "@react-email/components";
import {
  EmailBase, AmountBadge, DetailRow, Divider,
  ScriptureBlock, ActionButton, C,
} from "./EmailBase";

const FREQ_LABELS: Record<string, string> = {
  weekly: "Semanal", monthly: "Mensual", yearly: "Anual",
};
const FREQ_SUBLABELS: Record<string, string> = {
  weekly: "cada semana", monthly: "cada mes", yearly: "cada año",
};

interface SubscriptionConfirmationProps {
  name: string;
  amount: number;
  frequency: string;
  orderNumber: string;
  cancellationUrl: string;
}

export function SubscriptionConfirmation({
  name, amount, frequency, orderNumber, cancellationUrl,
}: SubscriptionConfirmationProps) {
  const firstName  = name.split(" ")[0];
  const freqLabel  = FREQ_LABELS[frequency]    ?? "Mensual";
  const freqSub    = FREQ_SUBLABELS[frequency] ?? "cada mes";

  return (
    <EmailBase
      preview={`Suscripción activa — B/. ${amount.toFixed(2)} ${freqSub}. Gracias, ${firstName}`}
    >

      {/* Título */}
      <Section style={{ textAlign: "center", marginBottom: 8 }}>
        <Text style={{ fontSize: 32, margin: "0 0 8px" }}>❤️</Text>
        <Text style={{ margin: 0, fontSize: 22, fontWeight: 800, color: C.text, lineHeight: 1.2 }}>
          Suscripción activa
        </Text>
        <Text style={{ margin: "8px 0 0", fontSize: 15, color: C.muted, lineHeight: 1.5 }}>
          Hola {firstName}, tu donación recurrente está confirmada.
        </Text>
      </Section>

      <AmountBadge amount={amount} label={`Donación ${freqLabel.toLowerCase()}`} />

      <Divider />

      {/* Detalle */}
      <Text style={{ margin: "0 0 16px", fontSize: 13, color: C.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
        Detalle
      </Text>
      <DetailRow label="Nombre"     value={name} />
      <DetailRow label="Frecuencia" value={`${freqLabel} · ${freqSub}`} />
      <DetailRow label="Referencia" value={orderNumber} />

      <Divider />

      {/* Mensaje */}
      <Text style={{ margin: "0 0 12px", fontSize: 15, color: C.text, lineHeight: 1.6 }}>
        Gracias por comprometerte con la visión de Roca de Vida. Tu generosidad {freqSub} hace posible que continuemos alcanzando a Panamá con el evangelio.
      </Text>

      {/* Cancelación */}
      <Section style={{ backgroundColor: "#F9F6F2", borderRadius: 12, padding: "20px 24px", margin: "20px 0" }}>
        <Text style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 700, color: C.text }}>
          Gestiona tu suscripción
        </Text>
        <Text style={{ margin: "0 0 16px", fontSize: 14, color: C.muted, lineHeight: 1.5 }}>
          Puedes cancelar tu donación recurrente en cualquier momento usando el botón de abajo. Guarda este correo como referencia.
        </Text>
        <ActionButton href={cancellationUrl} label="Gestionar suscripción" />
        <Text style={{ margin: "12px 0 0", fontSize: 12, color: C.muted, textAlign: "center" as const, lineHeight: 1.5 }}>
          O copia este link en tu navegador:{" "}
          <a href={cancellationUrl} style={{ color: C.gold, wordBreak: "break-all" as const }}>
            {cancellationUrl}
          </a>
        </Text>
      </Section>

      <ScriptureBlock
        text="El que siembra escasamente, también segará escasamente; y el que siembra generosamente, generosamente también segará."
        reference="2 Corintios 9:6"
      />

    </EmailBase>
  );
}
