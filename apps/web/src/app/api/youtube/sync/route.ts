import { timingSafeEqual } from "crypto";
import { revalidatePath, revalidateTag } from "next/cache";
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

// Called by Vercel Cron and optionally by admins.
// Busts the sermon cache so the next page render fetches fresh data from YouTube.
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const secret     = req.nextUrl.searchParams.get("secret");

  const isVercelCron = safeSecretEqual(authHeader?.replace("Bearer ", "") ?? null, process.env.CRON_SECRET);
  const isManual     = safeSecretEqual(secret, process.env.REVALIDATE_SECRET);

  if (!isVercelCron && !isManual) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag("youtube-sermons");
  revalidatePath("/");
  revalidatePath("/media/sermones");

  return NextResponse.json({ success: true, revalidated: new Date().toISOString() });
}
