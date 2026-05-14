import { timingSafeEqual } from "crypto";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

function safeSecretEqual(provided: string | null, expected: string | undefined): boolean {
  if (!provided || !expected) return false;
  try {
    const a = Buffer.from(provided, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const secret = request.headers.get("x-revalidate-secret");

  if (!safeSecretEqual(secret, process.env.REVALIDATE_SECRET)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const path = body?.path as string | undefined;

  if (!path || typeof path !== "string") {
    return NextResponse.json({ error: "Missing path" }, { status: 400 });
  }

  if (!path.startsWith("/")) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  // Allowlist prevents cache stampede if secret is compromised
  const STATIC = new Set(["/", "/contacto", "/donaciones", "/nosotros", "/ministerios", "/grupos", "/eventos", "/media/sermones", "/media/podcast"]);
  const DYNAMIC = /^\/(eventos|ministerios|grupos|sermones)\/[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!STATIC.has(path) && !DYNAMIC.test(path)) {
    return NextResponse.json({ error: "Path not in allowlist" }, { status: 400 });
  }

  revalidatePath(path);

  return NextResponse.json({ revalidated: true, path });
}
