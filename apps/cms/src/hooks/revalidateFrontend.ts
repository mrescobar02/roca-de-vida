import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from "payload";

const FRONTEND_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || "";

const COLLECTION_PATHS: Record<string, string[]> = {
  sermons: ["/media/sermones", "/"],
  events: ["/eventos", "/"],
  ministries: ["/ministerios", "/"],
  "cell-groups": ["/grupos"],
  testimonials: ["/"],
  galleries: ["/galeria"],
  pages: ["/nosotros"],
  staff: ["/nosotros/equipo"],
};

export const revalidateCollection: CollectionAfterChangeHook = async ({ doc, collection }) => {
  const paths = COLLECTION_PATHS[collection.slug];
  if (!paths) return doc;

  const slugPath = doc.slug ? `/${collection.slug}/${doc.slug}` : null;
  const allPaths = slugPath ? [...paths, slugPath] : paths;

  for (const path of allPaths) {
    try {
      await fetch(`${FRONTEND_URL}/api/revalidate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-revalidate-secret": REVALIDATE_SECRET,
        },
        body: JSON.stringify({ path }),
      });
    } catch (err) {
      // Non-blocking — log but don't fail the CMS operation
      console.warn(`[revalidate] Failed to revalidate ${path}:`, err);
    }
  }

  return doc;
};

export const revalidateGlobal: GlobalAfterChangeHook = async ({ doc, global }) => {
  const globalPaths: Record<string, string[]> = {
    "site-settings": ["/"],
    navigation: ["/"],
    "donation-settings": ["/donaciones"],
    "live-stream-settings": ["/media/en-vivo"],
  };

  const paths = globalPaths[global.slug];
  if (!paths) return doc;

  for (const path of paths) {
    try {
      await fetch(`${FRONTEND_URL}/api/revalidate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-revalidate-secret": REVALIDATE_SECRET,
        },
        body: JSON.stringify({ path }),
      });
    } catch (err) {
      console.warn(`[revalidate] Failed to revalidate global ${path}:`, err);
    }
  }

  return doc;
};
