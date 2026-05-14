import { Section, Text } from "@react-email/components";
import { EmailBase, DetailRow, Divider, ScriptureBlock, C } from "./EmailBase";

const FREQ_LABELS: Record<string, string> = {
  weekly: "semanal", monthly: "mensual", yearly: "anual",
};

interface SubscriptionCancelledProps {
  name: string;
  amount: number;
  frequency: string;
  orderNumber: string;
}

export function SubscriptionCancelled({ name, amount, frequency, orderNumber }: SubscriptionCancelledProps) {
  const firstName = name.split(" ")[0];
  const freqLabel = FREQ_LABELS[frequency] ?? "mensual";

  return (
    <EmailBase preview={`Suscripción cancelada — ya no habrá cargos futuros`}>

      {/* Título */}
      <Section style={{ textAlign: "center", marginBottom: 8 }}>
        <Text style={{ fontSize: 32, margin: "0 0 8px" }}>✅</Text>
        <Text style={{ margin: 0, fontSize: 22, fontWeight: 800, color: C.text, lineHeight: 1.2 }}>
          Suscripción cancelada
        </Text>
        <Text style={{ margin: "8px 0 0", fontSize: 15, color: C.muted, lineHeight: 1.5 }}>
          Hola {firstName}, confirmamos que tu donación recurrente fue cancelada.
        </Text>
      </Section>

      <Divider />

      {/* Detalle */}
      <Text style={{ margin: "0 0 16px", fontSize: 13, color: C.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
        Suscripción cancelada
      </Text>
      <DetailRow label="Nombre"     value={name} />
      <DetailRow label="Monto"      value={`B/. ${amount.toFixed(2)} ${freqLabel}`} />
      <DetailRow label="Referencia" value={orderNumber} />
      <DetailRow label="Estado"     value="Cancelada — sin cargos futuros" />

      <Divider />

      {/* Mensaje */}
      <Text style={{ margin: "0 0 12px", fontSize: 15, color: C.text, lineHeight: 1.6 }}>
        No se realizarán más cargos a tu tarjeta. Los pagos ya procesados no son reembolsables.
      </Text>
      <Text style={{ margin: 0, fontSize: 15, color: C.text, lineHeight: 1.6 }}>
        Gracias por haber apoyado a Roca de Vida. Si en algún momento deseas volver a donar, estaremos aquí para recibirte.
      </Text>

      <ScriptureBlock
        text="Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre."
        reference="2 Corintios 9:7"
      />

    </EmailBase>
  );
}
