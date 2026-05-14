import { Section, Text } from "@react-email/components";
import { EmailBase, AmountBadge, DetailRow, Divider, ScriptureBlock, C } from "./EmailBase";

interface DonationConfirmationProps {
  name: string;
  amount: number;
  orderNumber: string;
}

export function DonationConfirmation({ name, amount, orderNumber }: DonationConfirmationProps) {
  const firstName = name.split(" ")[0];

  return (
    <EmailBase preview={`Recibimos tu donación de B/. ${amount.toFixed(2)} — gracias, ${firstName}`}>

      {/* Ícono + título */}
      <Section style={{ textAlign: "center", marginBottom: 8 }}>
        <Text style={{ fontSize: 32, margin: "0 0 8px" }}>🙏</Text>
        <Text style={{ margin: 0, fontSize: 22, fontWeight: 800, color: C.text, lineHeight: 1.2 }}>
          ¡Gracias por tu generosidad!
        </Text>
        <Text style={{ margin: "8px 0 0", fontSize: 15, color: C.muted, lineHeight: 1.5 }}>
          Hola {firstName}, recibimos tu donación. Dios te bendiga.
        </Text>
      </Section>

      <AmountBadge amount={amount} label="Tu donación" />

      <Divider />

      {/* Detalle */}
      <Text style={{ margin: "0 0 16px", fontSize: 13, color: C.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
        Detalle
      </Text>
      <DetailRow label="Nombre"     value={name} />
      <DetailRow label="Tipo"       value="Donación única" />
      <DetailRow label="Referencia" value={orderNumber} />

      <Divider />

      {/* Impacto */}
      <Text style={{ margin: "0 0 12px", fontSize: 15, color: C.text, lineHeight: 1.6 }}>
        Tu donación contribuye directamente a nuestros ministerios, grupos celulares y programas que alcanzan a las familias de Panamá.
      </Text>

      <ScriptureBlock
        text="Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre."
        reference="2 Corintios 9:7"
      />

    </EmailBase>
  );
}
