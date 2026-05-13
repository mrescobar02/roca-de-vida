import { unstable_cache } from "next/cache";

const API_BASE = "https://www.googleapis.com/youtube/v3";
const CHANNEL_HANDLE = "rocadevidapanama";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface YoutubeSermon {
  videoId: string;
  title: string;
  description: string;
  publishedAt: string;   // YYYY-MM-DD
  thumbnailUrl: string;
  duration: string;      // "48 min"
}

export interface SermonProps {
  title: string;
  slug: string;
  youtubeUrl: string;
  pastor: { name: string };
  date: string;
  duration?: string;
  thumbnail?: { url: string; alt: string };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseDuration(iso: string): string {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return "";
  const h = parseInt(m[1] ?? "0");
  const min = parseInt(m[2] ?? "0");
  const total = h * 60 + min;
  return total > 0 ? `${total} min` : "";
}

function extractPastor(description: string): string {
  const patterns = [
    /[Pp]redicador:\s*([^\n,]+)/,
    /[Pp]astor:\s*([^\n,]+)/,
    /[Pp]s\.\s+([^\n,·—]+)/,
  ];
  for (const re of patterns) {
    const m = description.match(re);
    if (m) return m[0].trim();
  }
  return "Ps. Juan Mario Herrero";
}

function isShort(iso: string): boolean {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return true;
  const total =
    parseInt(m[1] ?? "0") * 3600 +
    parseInt(m[2] ?? "0") * 60 +
    parseInt(m[3] ?? "0");
  return total < 60;
}

// ─── Channel ID resolution ────────────────────────────────────────────────────

async function resolveChannelId(): Promise<string | null> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return null;

  const explicit = process.env.YOUTUBE_CHANNEL_ID;
  if (explicit) return explicit;

  const res = await fetch(
    `${API_BASE}/channels?part=id&forHandle=${CHANNEL_HANDLE}&key=${key}`,
    { next: { revalidate: 86400 } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return (data.items?.[0]?.id as string) ?? null;
}

// ─── Latest sermons ───────────────────────────────────────────────────────────

async function _fetchLatestSermons(count: number): Promise<YoutubeSermon[]> {
  const key = process.env.YOUTUBE_API_KEY!;
  const channelId = await resolveChannelId();
  if (!channelId) return [];

  // Uploads playlist: UC… → UU…
  const uploadsId = "UU" + channelId.slice(2);

  const listRes = await fetch(
    `${API_BASE}/playlistItems?part=contentDetails&playlistId=${uploadsId}&maxResults=${Math.min(count + 5, 50)}&key=${key}`
  );
  if (!listRes.ok) return [];
  const listData = await listRes.json();
  if (!listData.items?.length) return [];

  const videoIds = (listData.items as any[])
    .map((item) => item.contentDetails.videoId as string)
    .join(",");

  const detailRes = await fetch(
    `${API_BASE}/videos?part=snippet,contentDetails&id=${videoIds}&key=${key}`
  );
  if (!detailRes.ok) return [];
  const detailData = await detailRes.json();

  return (detailData.items as any[])
    .filter((v) => !isShort(v.contentDetails.duration))
    .slice(0, count)
    .map((v) => ({
      videoId: v.id as string,
      title: v.snippet.title as string,
      description: v.snippet.description as string,
      publishedAt: (v.snippet.publishedAt as string).split("T")[0],
      thumbnailUrl:
        v.snippet.thumbnails?.maxres?.url ??
        v.snippet.thumbnails?.standard?.url ??
        v.snippet.thumbnails?.high?.url ??
        "",
      duration: parseDuration(v.contentDetails.duration),
    }));
}

const _cachedLatestSermons = unstable_cache(
  _fetchLatestSermons,
  ["youtube-sermons"],
  { revalidate: 3600, tags: ["youtube-sermons"] }
);

export async function getLatestSermons(count = 10): Promise<YoutubeSermon[]> {
  if (!process.env.YOUTUBE_API_KEY) return [];
  return _cachedLatestSermons(count);
}

// ─── Single video ─────────────────────────────────────────────────────────────

async function _fetchVideoById(videoId: string): Promise<YoutubeSermon | null> {
  const key = process.env.YOUTUBE_API_KEY!;
  const res = await fetch(
    `${API_BASE}/videos?part=snippet,contentDetails&id=${videoId}&key=${key}`
  );
  if (!res.ok) return null;
  const data = await res.json();
  const v = data.items?.[0];
  if (!v) return null;
  return {
    videoId: v.id,
    title: v.snippet.title,
    description: v.snippet.description,
    publishedAt: v.snippet.publishedAt.split("T")[0],
    thumbnailUrl:
      v.snippet.thumbnails?.maxres?.url ??
      v.snippet.thumbnails?.standard?.url ??
      v.snippet.thumbnails?.high?.url ??
      "",
    duration: parseDuration(v.contentDetails.duration),
  };
}

const _cachedVideoById = unstable_cache(
  _fetchVideoById,
  ["youtube-video"],
  { revalidate: 3600, tags: ["youtube-sermons"] }
);

export async function getVideoById(videoId: string): Promise<YoutubeSermon | null> {
  if (!process.env.YOUTUBE_API_KEY) return null;
  return _cachedVideoById(videoId);
}

// ─── Live status ──────────────────────────────────────────────────────────────

async function _fetchIsLive(): Promise<{ isLive: boolean; videoId?: string }> {
  const key = process.env.YOUTUBE_API_KEY!;
  const channelId = await resolveChannelId();
  if (!channelId) return { isLive: false };

  // search.list costs 100 units — only called when cache is invalidated by webhook
  const res = await fetch(
    `${API_BASE}/search?part=id&channelId=${channelId}&eventType=live&type=video&key=${key}`
  );
  if (!res.ok) return { isLive: false };
  const data = await res.json();

  if ((data.items as any[])?.length > 0) {
    return { isLive: true, videoId: data.items[0].id.videoId as string };
  }
  return { isLive: false };
}

// revalidate: false → only refreshed when revalidateTag('youtube-live') is called (by webhook)
const _cachedIsLive = unstable_cache(
  _fetchIsLive,
  ["youtube-live"],
  { revalidate: false, tags: ["youtube-live"] }
);

export async function getIsLive(): Promise<{ isLive: boolean; videoId?: string }> {
  if (!process.env.YOUTUBE_API_KEY) return { isLive: false };
  return _cachedIsLive();
}

// ─── Conversion ───────────────────────────────────────────────────────────────

export function toSermonProps(video: YoutubeSermon): SermonProps {
  return {
    title: video.title,
    slug: video.videoId,
    youtubeUrl: `https://www.youtube.com/watch?v=${video.videoId}`,
    pastor: { name: extractPastor(video.description) },
    date: video.publishedAt,
    duration: video.duration || undefined,
    thumbnail: video.thumbnailUrl
      ? { url: video.thumbnailUrl, alt: video.title }
      : undefined,
  };
}

// YouTube video IDs are exactly 11 chars
export const isYoutubeId = (slug: string) => /^[a-zA-Z0-9_-]{11}$/.test(slug);
