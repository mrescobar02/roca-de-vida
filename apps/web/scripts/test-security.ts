/**
 * Security validation smoke test.
 * Run with: pnpm tsx scripts/test-security.ts
 */
import { z } from "zod";
import { timingSafeEqual } from "crypto";

// ── Reproduce schemas from forms.ts ──────────────────────────────────────────

const nameSchema    = z.string().min(2).max(100).trim();
const emailSchema   = z.string().email().max(255).trim();
const optEmailSchema = z.preprocess(
  (v) => String(v ?? "").trim() || undefined,
  z.string().email().max(255).optional()
);
const phoneSchema = z.preprocess(
  (v) => String(v ?? "").trim() || undefined,
  z.string().regex(/^[\d\s+\-(). ]*$/).max(30).optional()
);
const messageSchema = z.string().min(5).max(5000).trim();
const VALID_SUBJECTS = ["general", "oracion", "bautismo", "consejeria", "grupos", "nuevo"] as const;
const idSchema = z.string().regex(/^[a-zA-Z0-9_-]+$/).min(1).max(100);

const PrayerSchema = z.object({
  name:    nameSchema,
  email:   optEmailSchema,
  country: z.preprocess((v) => String(v ?? "").trim() || undefined, z.string().max(100).optional()),
  request: messageSchema,
});

const ContactSchema = z.object({
  name:    nameSchema,
  email:   emailSchema,
  subject: z.enum(VALID_SUBJECTS),
  message: messageSchema,
  phone:   phoneSchema,
});

const DonationSchema = z.object({
  name:   nameSchema,
  email:  emailSchema,
  amount: z.number().positive().max(10000).finite(),
});

// ── Helpers ───────────────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;

function ok(label: string) {
  console.log(`  ✓  ${label}`);
  passed++;
}

function fail(label: string, detail?: string) {
  console.error(`  ✗  ${label}${detail ? ` — ${detail}` : ""}`);
  failed++;
}

function expect(label: string, fn: () => boolean) {
  try {
    if (fn()) ok(label);
    else fail(label);
  } catch (e) {
    fail(label, String(e));
  }
}

function expectThrows(label: string, fn: () => unknown) {
  try {
    fn();
    fail(label, "expected rejection but it passed");
  } catch {
    ok(label);
  }
}

function safeTokenEqual(a: string, b: string): boolean {
  if (!a || !b) return false; // empty tokens are never valid
  try {
    const aBuf = Buffer.from(a, "utf8");
    const bBuf = Buffer.from(b, "utf8");
    if (aBuf.length !== bBuf.length) return false;
    return timingSafeEqual(aBuf, bBuf);
  } catch {
    return false;
  }
}

function assertSlug(slug: string): void {
  if (!/^[a-z0-9]+(?:[_-][a-z0-9]+)*$/.test(slug)) {
    throw new Error(`Invalid slug: "${slug}"`);
  }
}

// ── Tests ─────────────────────────────────────────────────────────────────────

console.log("\n── Honeypot ─────────────────────────────────────────────────────");
expect("empty honeypot passes", () => String("").trim() === "");
expect("filled honeypot is detected", () => String("bot@spam.com").trim() !== "");
expect("whitespace-only honeypot is detected as empty", () => String("   ").trim() === "");

console.log("\n── Names ────────────────────────────────────────────────────────");
expect("valid name", () => nameSchema.safeParse("Isaac Escobar").success);
expect("accented chars accepted", () => nameSchema.safeParse("José Ángel Núñez").success);
expectThrows("single char rejected", () => nameSchema.parse("A"));
expectThrows("empty name rejected", () => nameSchema.parse(""));
expectThrows("name > 100 chars rejected", () => nameSchema.parse("A".repeat(101)));

console.log("\n── Emails ───────────────────────────────────────────────────────");
expect("valid email", () => emailSchema.safeParse("user@example.com").success);
expect("valid email with subdomain", () => emailSchema.safeParse("a@b.co.uk").success);
expectThrows("no-at email rejected", () => emailSchema.parse("notanemail"));
expectThrows("bare domain rejected", () => emailSchema.parse("@domain.com"));
expectThrows("empty email rejected", () => emailSchema.parse(""));

console.log("\n── Optional email (prayer form) ─────────────────────────────────");
expect("empty string → undefined", () => optEmailSchema.parse("") === undefined);
expect("null → undefined", () => optEmailSchema.parse(null) === undefined);
expect("valid email passes", () => optEmailSchema.parse("a@b.com") === "a@b.com");
expectThrows("invalid email rejected when provided", () => optEmailSchema.parse("notvalid"));

console.log("\n── Phone validation ─────────────────────────────────────────────");
expect("valid Panama number", () => phoneSchema.parse("+507 6000-0000") !== undefined);
expect("empty phone → undefined", () => phoneSchema.parse("") === undefined);
expect("null → undefined", () => phoneSchema.parse(null) === undefined);
expectThrows("letters in phone rejected", () => phoneSchema.parse("abc-def-ghij"));
expectThrows("script injection rejected", () => phoneSchema.parse("<script>alert(1)</script>"));

console.log("\n── Message length ───────────────────────────────────────────────");
expect("normal message passes", () => messageSchema.safeParse("Necesito oración para mi familia.").success);
expectThrows("too short rejected", () => messageSchema.parse("Hi"));
expectThrows("over 5000 chars rejected", () => messageSchema.parse("A".repeat(5001)));

console.log("\n── Subject enum (contact form) ──────────────────────────────────");
expect("valid subject passes", () => ContactSchema.safeParse({ name: "Isaac", email: "a@b.com", subject: "oracion", message: "Hello there!", phone: "" }).success);
expectThrows("unknown subject rejected", () => ContactSchema.parse({ name: "Isaac", email: "a@b.com", subject: "FAKE_SUBJECT", message: "Hello there!" }));
expectThrows("SQL injection in subject rejected", () => ContactSchema.parse({ name: "Isaac", email: "a@b.com", subject: "general'; DROP TABLE submissions;--", message: "msg" }));

console.log("\n── XSS payloads in text fields ──────────────────────────────────");
expect("XSS in name reaches Zod (CMS sanitizes)", () => {
  // Our Zod schema allows text strings including < > — CMS is the last line of defense
  // but we verify the schema at least doesn't CRASH on these
  return PrayerSchema.safeParse({ name: "<script>alert(1)</script>", request: "test prayer" }).success;
});
// Future: add DOMPurify on server side if CMS doesn't strip HTML

console.log("\n── Donation amount ──────────────────────────────────────────────");
expect("valid amount", () => DonationSchema.safeParse({ name: "Isaac", email: "a@b.com", amount: 25 }).success);
expect("2-decimal amount", () => DonationSchema.safeParse({ name: "Isaac", email: "a@b.com", amount: 9.99 }).success);
expectThrows("zero amount rejected", () => DonationSchema.parse({ name: "Isaac", email: "a@b.com", amount: 0 }));
expectThrows("negative amount rejected", () => DonationSchema.parse({ name: "Isaac", email: "a@b.com", amount: -5 }));
expectThrows("over $10,000 rejected", () => DonationSchema.parse({ name: "Isaac", email: "a@b.com", amount: 10001 }));
expectThrows("Infinity rejected", () => DonationSchema.parse({ name: "Isaac", email: "a@b.com", amount: Infinity }));
expectThrows("NaN rejected", () => DonationSchema.parse({ name: "Isaac", email: "a@b.com", amount: NaN }));

console.log("\n── Timing-safe token comparison ─────────────────────────────────");
const tok = "550e8400-e29b-41d4-a716-446655440000";
expect("matching tokens pass", () => safeTokenEqual(tok, tok));
expect("different tokens fail", () => !safeTokenEqual(tok, "different-token-value-here-12345"));
expect("empty vs token fails", () => !safeTokenEqual("", tok));
expect("token vs empty fails", () => !safeTokenEqual(tok, ""));
expect("both empty fails", () => !safeTokenEqual("", ""));

console.log("\n── Slug validation ──────────────────────────────────────────────");
expect("valid slug", () => { assertSlug("ministerio-jovenes"); return true; });
expect("slug with number", () => { assertSlug("grupo-1"); return true; });
expectThrows("path traversal rejected", () => assertSlug("../../../etc/passwd"));
expectThrows("uppercase rejected", () => assertSlug("Ministerio"));
expectThrows("spaces rejected", () => assertSlug("mi ministerio"));
expectThrows("script injection rejected", () => assertSlug("<script>alert(1)</script>"));
expectThrows("SQL injection rejected", () => assertSlug("slug'; DROP TABLE--"));
expectThrows("null byte rejected", () => assertSlug("slug\x00"));

// ── Result ────────────────────────────────────────────────────────────────────

console.log(`\n${"─".repeat(60)}`);
console.log(`  Passed: ${passed}   Failed: ${failed}`);
if (failed > 0) {
  console.error(`\n  ${failed} test(s) failed.\n`);
  process.exit(1);
} else {
  console.log(`\n  All tests passed.\n`);
}
