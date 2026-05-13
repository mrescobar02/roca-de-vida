import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Called by Vercel Cron (see vercel.json) and optionally by admins.
// Busts the sermon cache so the next page render fetches fresh data from YouTube.
export async function GET(req: NextRequest) {
  // Allow Vercel cron requests (Authorization header) or manual calls with the secret
  const authHeader = req.headers.get("authorization");
  const secret = req.nextUrl.searchParams.get("secret");

  const isVercelCron = authHeader === `Bearer ${process.env.CRON_SECRET}`;
  const isManual = secret === process.env.REVALIDATE_SECRET;

  if (!isVercelCron && !isManual) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag("youtube-sermons");
  revalidatePath("/");
  revalidatePath("/media/sermones");

  return NextResponse.json({ success: true, revalidated: new Date().toISOString() });
}
