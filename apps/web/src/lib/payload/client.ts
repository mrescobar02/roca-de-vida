const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3001";
const API_KEY = process.env.PAYLOAD_API_KEY;

interface FetchOptions {
  tags?: string[];
  revalidate?: number;
}

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

export async function getMinistries(options?: FetchOptions) {
  return fetchFromCMS<{ docs: unknown[] }>(
    "ministries",
    { where: JSON.stringify({ status: { equals: "published" } }), limit: 20, sort: "order" },
    { tags: ["ministries"], revalidate: 300, ...options }
  );
}

export async function getMinistryBySlug(slug: string, options?: FetchOptions) {
  return fetchFromCMS<{ docs: unknown[] }>(
    "ministries",
    { where: JSON.stringify({ and: [{ slug: { equals: slug } }, { status: { equals: "published" } }] }), limit: 1 },
    { tags: [`ministry-${slug}`], revalidate: 300, ...options }
  );
}

export async function getSermons(params?: { limit?: number; page?: number; series?: string }, options?: FetchOptions) {
  return fetchFromCMS<{ docs: unknown[]; totalDocs: number; totalPages: number }>(
    "sermons",
    {
      where: JSON.stringify({ status: { equals: "published" } }),
      sort: "-date",
      limit: params?.limit ?? 12,
      page: params?.page ?? 1,
    },
    { tags: ["sermons"], revalidate: 120, ...options }
  );
}

export async function getSermonBySlug(slug: string, options?: FetchOptions) {
  return fetchFromCMS<{ docs: unknown[] }>(
    "sermons",
    { where: JSON.stringify({ and: [{ slug: { equals: slug } }, { status: { equals: "published" } }] }), limit: 1 },
    { tags: [`sermon-${slug}`], revalidate: 120, ...options }
  );
}

export async function getUpcomingEvents(limit = 6, options?: FetchOptions) {
  return fetchFromCMS<{ docs: unknown[] }>(
    "events",
    {
      where: JSON.stringify({ and: [{ status: { equals: "published" } }, { date: { greater_than_equal: new Date().toISOString() } }] }),
      sort: "date",
      limit,
    },
    { tags: ["events"], revalidate: 60, ...options }
  );
}

export async function getCellGroups(options?: FetchOptions) {
  return fetchFromCMS<{ docs: unknown[] }>(
    "cell-groups",
    { where: JSON.stringify({ status: { equals: "published" } }), limit: 50, sort: "neighborhood" },
    { tags: ["cell-groups"], revalidate: 300, ...options }
  );
}

export async function getFeaturedTestimonials(options?: FetchOptions) {
  return fetchFromCMS<{ docs: unknown[] }>(
    "testimonials",
    { where: JSON.stringify({ and: [{ isFeatured: { equals: true } }, { status: { equals: "published" } }] }), limit: 8 },
    { tags: ["testimonials"], revalidate: 300, ...options }
  );
}

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
