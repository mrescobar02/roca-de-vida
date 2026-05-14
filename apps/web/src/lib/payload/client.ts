const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3001";
const API_KEY = process.env.PAYLOAD_API_KEY;

interface FetchOptions {
  tags?: string[];
  revalidate?: number;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CmsMedia {
  id: string;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  filename?: string;
}

export interface CmsStaff {
  id: string;
  name: string;
  title: string;
  bio?: unknown;
  photo?: CmsMedia;
  isPastoralTeam?: boolean;
  role?: string;
  email?: string;
  order?: number;
}

export interface CmsMinistry {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  category?: string;
  description?: unknown;
  mission?: string;
  vision?: string;
  keyVerse?: { reference: string; text: string };
  schedule?: string;
  heroImage?: CmsMedia;
  leaders?: CmsStaff[];
  status: string;
  order?: number;
}

export interface CmsEvent {
  id: string;
  slug: string;
  title: string;
  description?: unknown;
  date: string;
  endDate?: string;
  time?: string;
  location?: string;
  address?: string;
  banner?: CmsMedia;
  ministry?: { id: string; name: string; slug: string };
  status: string;
  isFeatured?: boolean;
  registrationUrl?: string;
}

export interface CmsCellGroup {
  id: string;
  slug: string;
  name: string;
  neighborhood: string;
  district: string;
  schedule: string;
  capacity: number;
  leader?: CmsStaff;
  description?: unknown;
  address?: string;
  coordinates?: { lat: number; lng: number };
  isFull?: boolean;
  status: string;
}

export interface CmsGallery {
  id: string;
  slug: string;
  title: string;
  date: string;
  coverImage?: CmsMedia;
  photos?: CmsMedia[];
  photoCount?: number;
  ministry?: { id: string; name: string; slug: string };
  status: string;
}

export interface CmsTestimonial {
  id: string;
  name: string;
  content: unknown;
  ministry?: { id: string; name: string; slug: string };
  photo?: CmsMedia;
  isFeatured?: boolean;
  status: string;
}

export interface CmsSermon {
  id: string;
  slug: string;
  title: string;
  youtubeUrl: string;
  date: string;
  pastor?: CmsStaff;
  series?: string;
  scripture?: string;
  duration?: string;
  description?: unknown;
  thumbnail?: CmsMedia;
  status: string;
}

export interface PayloadList<T> {
  docs: T[];
  totalDocs: number;
  totalPages: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function richTextToPlain(richText: unknown): string {
  if (!richText || typeof richText !== "object") return "";
  const rt = richText as {
    root?: {
      children?: Array<{
        children?: Array<{ text?: string }>;
      }>;
    };
  };
  return (
    rt.root?.children
      ?.map((node) => node.children?.map((c) => c.text ?? "").join("") ?? "")
      .join("\n") ?? ""
  );
}

// ─── Fetcher ──────────────────────────────────────────────────────────────────

async function fetchFromCMS<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean>,
  options: FetchOptions = {}
): Promise<T> {
  const url = new URL(`${CMS_URL}/api/${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (API_KEY) {
    headers["Authorization"] = `API-Key ${API_KEY}`;
  }

  const response = await fetch(url.toString(), {
    headers,
    next: {
      tags: options.tags,
      revalidate: options.revalidate ?? 60,
    },
  });

  if (!response.ok) {
    throw new Error(
      `CMS fetch failed: ${endpoint} — ${response.status} ${response.statusText}`
    );
  }

  return response.json() as Promise<T>;
}

// ─── Collections ──────────────────────────────────────────────────────────────

export async function getMinistries(options?: FetchOptions) {
  return fetchFromCMS<PayloadList<CmsMinistry>>(
    "ministries",
    {
      where: JSON.stringify({ status: { equals: "published" } }),
      depth: 2,
      limit: 20,
      sort: "order",
    },
    { tags: ["ministries"], revalidate: 300, ...options }
  );
}

export async function getMinistryBySlug(slug: string, options?: FetchOptions) {
  return fetchFromCMS<PayloadList<CmsMinistry>>(
    "ministries",
    {
      where: JSON.stringify({
        and: [{ slug: { equals: slug } }, { status: { equals: "published" } }],
      }),
      depth: 2,
      limit: 1,
    },
    { tags: [`ministry-${slug}`], revalidate: 300, ...options }
  );
}

export async function getStaff(
  filters?: { isPastoralTeam?: boolean; role?: string },
  options?: FetchOptions
) {
  const conditions: object[] = [];
  if (filters?.isPastoralTeam !== undefined) {
    conditions.push({ isPastoralTeam: { equals: filters.isPastoralTeam } });
  }
  if (filters?.role) {
    conditions.push({ role: { equals: filters.role } });
  }
  const where =
    conditions.length > 0
      ? JSON.stringify({ and: conditions })
      : JSON.stringify({});

  return fetchFromCMS<PayloadList<CmsStaff>>(
    "staff",
    { where, depth: 2, limit: 50, sort: "order" },
    { tags: ["staff"], revalidate: 300, ...options }
  );
}

export async function getSermons(
  params?: { limit?: number; page?: number },
  options?: FetchOptions
) {
  return fetchFromCMS<PayloadList<CmsSermon>>(
    "sermons",
    {
      where: JSON.stringify({ status: { equals: "published" } }),
      depth: 2,
      sort: "-date",
      limit: params?.limit ?? 12,
      page: params?.page ?? 1,
    },
    { tags: ["sermons"], revalidate: 120, ...options }
  );
}

export async function getSermonBySlug(slug: string, options?: FetchOptions) {
  return fetchFromCMS<PayloadList<CmsSermon>>(
    "sermons",
    {
      where: JSON.stringify({
        and: [{ slug: { equals: slug } }, { status: { equals: "published" } }],
      }),
      depth: 2,
      limit: 1,
    },
    { tags: [`sermon-${slug}`], revalidate: 120, ...options }
  );
}

export async function getUpcomingEvents(limit = 6, options?: FetchOptions) {
  return fetchFromCMS<PayloadList<CmsEvent>>(
    "events",
    {
      where: JSON.stringify({
        and: [
          { status: { equals: "published" } },
          { date: { greater_than_equal: new Date().toISOString() } },
        ],
      }),
      depth: 2,
      sort: "date",
      limit,
    },
    { tags: ["events"], revalidate: 60, ...options }
  );
}

export async function getPastEvents(limit = 12, options?: FetchOptions) {
  return fetchFromCMS<PayloadList<CmsEvent>>(
    "events",
    {
      where: JSON.stringify({
        and: [
          { status: { equals: "published" } },
          { date: { less_than: new Date().toISOString() } },
        ],
      }),
      depth: 2,
      sort: "-date",
      limit,
    },
    { tags: ["events-past"], revalidate: 60, ...options }
  );
}

export async function getEventBySlug(slug: string, options?: FetchOptions) {
  return fetchFromCMS<PayloadList<CmsEvent>>(
    "events",
    {
      where: JSON.stringify({
        and: [{ slug: { equals: slug } }, { status: { equals: "published" } }],
      }),
      depth: 2,
      limit: 1,
    },
    { tags: [`event-${slug}`], revalidate: 60, ...options }
  );
}

export async function getCellGroups(options?: FetchOptions) {
  return fetchFromCMS<PayloadList<CmsCellGroup>>(
    "cell-groups",
    {
      where: JSON.stringify({ status: { equals: "published" } }),
      depth: 2,
      limit: 50,
      sort: "neighborhood",
    },
    { tags: ["cell-groups"], revalidate: 300, ...options }
  );
}

export async function getCellGroupBySlug(slug: string, options?: FetchOptions) {
  return fetchFromCMS<PayloadList<CmsCellGroup>>(
    "cell-groups",
    {
      where: JSON.stringify({
        and: [{ slug: { equals: slug } }, { status: { equals: "published" } }],
      }),
      depth: 2,
      limit: 1,
    },
    { tags: [`cell-group-${slug}`], revalidate: 300, ...options }
  );
}

export async function getFeaturedTestimonials(options?: FetchOptions) {
  return fetchFromCMS<PayloadList<CmsTestimonial>>(
    "testimonials",
    {
      where: JSON.stringify({
        and: [
          { isFeatured: { equals: true } },
          { status: { equals: "published" } },
        ],
      }),
      depth: 2,
      limit: 8,
    },
    { tags: ["testimonials"], revalidate: 300, ...options }
  );
}

export async function getGalleries(options?: FetchOptions) {
  return fetchFromCMS<PayloadList<CmsGallery>>(
    "galleries",
    {
      where: JSON.stringify({ status: { equals: "published" } }),
      depth: 2,
      sort: "-date",
      limit: 20,
    },
    { tags: ["galleries"], revalidate: 300, ...options }
  );
}

export async function getGalleryBySlug(slug: string, options?: FetchOptions) {
  return fetchFromCMS<PayloadList<CmsGallery>>(
    "galleries",
    {
      where: JSON.stringify({
        and: [{ slug: { equals: slug } }, { status: { equals: "published" } }],
      }),
      depth: 2,
      limit: 1,
    },
    { tags: [`gallery-${slug}`], revalidate: 300, ...options }
  );
}

// ─── Globals ──────────────────────────────────────────────────────────────────

export async function getSiteSettings(options?: FetchOptions) {
  return fetchFromCMS<unknown>(
    "globals/site-settings",
    {},
    { tags: ["site-settings"], revalidate: 300, ...options }
  );
}

export async function getLiveStreamSettings(options?: FetchOptions) {
  return fetchFromCMS<unknown>(
    "globals/live-stream-settings",
    {},
    { tags: ["live-stream"], revalidate: 30, ...options }
  );
}

export async function getDonationSettings(options?: FetchOptions) {
  return fetchFromCMS<unknown>(
    "globals/donation-settings",
    {},
    { tags: ["donation-settings"], revalidate: 300, ...options }
  );
}
