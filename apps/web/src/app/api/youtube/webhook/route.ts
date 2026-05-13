import { revalidatePath, revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

// GET — PubSubHubbub challenge verification
export async function GET(req: NextRequest) {
  const challenge = req.nextUrl.searchParams.get("hub.challenge");
  const mode = req.nextUrl.searchParams.get("hub.mode");

  if ((mode === "subscribe" || mode === "unsubscribe") && challenge) {
    return new Response(challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  return new Response("Invalid verification request", { status: 400 });
}

// POST — YouTube sends an Atom feed entry when a new video is uploaded or a
//        live stream starts/ends. We invalidate both caches and revalidate pages.
export async function POST(req: NextRequest) {
  const body = await req.text();

  // YouTube Atom entries contain <yt:videoId> and <yt:channelId>
  const videoIdMatch = body.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);

  if (videoIdMatch) {
    // Bust data caches
    revalidateTag("youtube-sermons");
    revalidateTag("youtube-live");

    // Bust full-route caches for pages that show sermons or live badge
    revalidatePath("/");
    revalidatePath("/media/sermones");
  }

  // Always return 200 — YouTube retries on failure
  return new Response("OK", { status: 200 });
}
