import { NextRequest, NextResponse } from "next/server";

// GET /api/youtube/subscribe — subscribe or renew the PubSubHubbub subscription.
// Call this once after deploying, and again every ~5 days (subscriptions expire).
// Protected by REVALIDATE_SECRET so only admins can trigger it.
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!channelId || !baseUrl) {
    return NextResponse.json(
      { error: "Missing YOUTUBE_CHANNEL_ID or NEXT_PUBLIC_SITE_URL" },
      { status: 400 }
    );
  }

  const callbackUrl = `${baseUrl}/api/youtube/webhook`;
  const topicUrl = `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${channelId}`;

  const body = new URLSearchParams({
    "hub.mode": "subscribe",
    "hub.topic": topicUrl,
    "hub.callback": callbackUrl,
    "hub.verify": "async",
    "hub.lease_seconds": "432000", // 5 days
  });

  const res = await fetch("https://pubsubhubbub.appspot.com/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (res.status === 202) {
    return NextResponse.json({
      success: true,
      message: "Subscription request accepted. Google will verify the callback URL within a few seconds.",
      callbackUrl,
      topicUrl,
    });
  }

  const text = await res.text();
  return NextResponse.json(
    { error: "Subscription request failed", status: res.status, body: text },
    { status: 500 }
  );
}
