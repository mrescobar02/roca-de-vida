import { createHmac, timingSafeEqual } from "crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
const HUB_SECRET = process.env.PUBSUBHUBBUB_SECRET;

function verifyHubSignature(rawBody: string, sigHeader: string | null): boolean {
  if (!sigHeader || !HUB_SECRET) return false;
  // Header format: "sha1=<hex>"
  const match = sigHeader.match(/^sha1=([0-9a-f]+)$/i);
  if (!match) return false;
  const provided = Buffer.from(match[1], "hex");
  const expected = createHmac("sha1", HUB_SECRET).update(rawBody).digest();
  if (provided.length !== expected.length) return false;
  return timingSafeEqual(provided, expected);
}

// GET — PubSubHubbub challenge verification
export async function GET(req: NextRequest) {
  const challenge = req.nextUrl.searchParams.get("hub.challenge");
  const mode      = req.nextUrl.searchParams.get("hub.mode");
  const topic     = req.nextUrl.searchParams.get("hub.topic");

  // Validate topic matches our channel so arbitrary parties can't register
  const expectedTopic = CHANNEL_ID
    ? `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${CHANNEL_ID}`
    : null;
  if (!expectedTopic || topic !== expectedTopic) {
    return new Response("Unknown topic", { status: 404 });
  }

  if ((mode === "subscribe" || mode === "unsubscribe") && challenge) {
    return new Response(challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  return new Response("Invalid verification request", { status: 400 });
}

// POST — YouTube sends Atom feed entries when a video is uploaded or live stream changes.
export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sigHeader = req.headers.get("x-hub-signature");

  if (!verifyHubSignature(rawBody, sigHeader)) {
    return new Response("Invalid signature", { status: 401 });
  }

  const videoIdMatch = rawBody.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
  if (videoIdMatch) {
    revalidateTag("youtube-sermons");
    revalidateTag("youtube-live");
    revalidatePath("/");
    revalidatePath("/media/sermones");
  }

  return new Response("OK", { status: 200 });
}
