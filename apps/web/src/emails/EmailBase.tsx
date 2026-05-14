import {
  Html, Head, Body, Preview, Container, Section,
  Text, Img, Hr, Row, Column,
} from "@react-email/components";
import type { ReactNode } from "react";

// Paleta — fondo claro para máxima compatibilidad con clientes de email
const C = {
  bg:       "#F5F2EE",
  card:     "#FFFFFF",
  gold:     "#B8882A",
  goldBg:   "#FEF9EE",
  goldBorder:"#D4A843",
  text:     "#1A1410",
  muted:    "#6B5F52",
  border:   "#E5DDD4",
  footer:   "#8C7B6B",
};

interface EmailBaseProps {
  preview: string;
  children: ReactNode;
}

export function EmailBase({ preview, children }: EmailBaseProps) {
  return (
    <Html lang="es" dir="ltr">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ backgroundColor: C.bg, fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: 560, margin: "0 auto", padding: "32px 16px" }}>

          {/* Logo */}
          <Section style={{ textAlign: "center", marginBottom: 24 }}>
            <Text style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: 3, color: C.gold, textTransform: "uppercase" }}>
              Roca de Vida Panamá
            </Text>
          </Section>

          {/* Card */}
          <Section style={{ backgroundColor: C.card, borderRadius: 16, padding: "36px 32px", border: `1px solid ${C.border}` }}>
            {children}
          </Section>

          {/* Footer */}
          <Section style={{ textAlign: "center", marginTop: 28 }}>
            <Text style={{ fontSize: 12, color: C.footer, margin: "0 0 4px" }}>
              Roca de Vida Panamá · Ciudad de Panamá
            </Text>
            <Text style={{ fontSize: 12, color: C.footer, margin: 0 }}>
              ¿Preguntas? Escríbenos a{" "}
              <a href="mailto:donaciones@rocadevidapanama.com" style={{ color: C.gold }}>
                donaciones@rocadevidapanama.com
              </a>
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

// ── Componentes reutilizables ─────────────────────────────────────────────────

export function AmountBadge({ amount, label }: { amount: number; label?: string }) {
  return (
    <Section style={{ backgroundColor: C.goldBg, border: `1px solid ${C.goldBorder}`, borderRadius: 12, padding: "16px 24px", textAlign: "center", margin: "20px 0" }}>
      <Text style={{ margin: 0, fontSize: 13, color: C.gold, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>
        {label ?? "Monto"}
      </Text>
      <Text style={{ margin: "4px 0 0", fontSize: 36, fontWeight: 800, color: C.gold, lineHeight: 1.1 }}>
        B/. {amount.toFixed(2)}
      </Text>
    </Section>
  );
}

export function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Row style={{ marginBottom: 12 }}>
      <Column style={{ width: "40%" }}>
        <Text style={{ margin: 0, fontSize: 12, color: C.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
          {label}
        </Text>
      </Column>
      <Column>
        <Text style={{ margin: 0, fontSize: 14, color: C.text, fontWeight: 500 }}>
          {value}
        </Text>
      </Column>
    </Row>
  );
}

export function Divider() {
  return <Hr style={{ borderColor: C.border, margin: "24px 0" }} />;
}

export function ScriptureBlock({ text, reference }: { text: string; reference: string }) {
  return (
    <Section style={{ borderLeft: `3px solid ${C.goldBorder}`, paddingLeft: 16, margin: "24px 0 0" }}>
      <Text style={{ margin: "0 0 4px", fontSize: 14, color: C.muted, fontStyle: "italic", lineHeight: 1.6 }}>
        "{text}"
      </Text>
      <Text style={{ margin: 0, fontSize: 12, color: C.gold, fontWeight: 600 }}>
        {reference}
      </Text>
    </Section>
  );
}

export function ActionButton({ href, label }: { href: string; label: string }) {
  return (
    <Section style={{ textAlign: "center", margin: "28px 0 8px" }}>
      <a
        href={href}
        style={{
          display: "inline-block",
          backgroundColor: C.gold,
          color: "#FFFFFF",
          fontWeight: 700,
          fontSize: 14,
          letterSpacing: 0.5,
          padding: "13px 32px",
          borderRadius: 100,
          textDecoration: "none",
        }}
      >
        {label}
      </a>
    </Section>
  );
}

export { C };
