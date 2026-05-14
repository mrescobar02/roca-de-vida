import type { NextConfig } from "next";

// Build CSP dynamically so the CMS origin comes from env (not hardcoded)
function buildCSP(): string {
  const cmsOrigin = (() => {
    try {
      return new URL(process.env.NEXT_PUBLIC_CMS_URL ?? "").origin;
    } catch {
      return "https://roca-de-vida-cms-production.up.railway.app";
    }
  })();

  return [
    "default-src 'self'",
    // Next.js inline scripts + Framer Motion require unsafe-inline
    // TODO: migrate to nonce-based CSP in a follow-up (remove unsafe-eval once Framer Motion confirms no eval usage)
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    `connect-src 'self' ${cmsOrigin} https://www.googleapis.com https://pubsubhubbub.appspot.com`,
    "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
    "frame-ancestors 'none'",
    "media-src 'self' https:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");
}

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Restrict Server Actions to production domains — prevents CSRF via preview URLs
      allowedOrigins: [
        "rocadevidapanama.com",
        "www.rocadevidapanama.com",
      ],
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      // Dev-only placeholder images — not needed in production
      ...(process.env.NODE_ENV === "development"
        ? [
            { protocol: "https" as const, hostname: "images.unsplash.com" },
            { protocol: "https" as const, hostname: "picsum.photos" },
          ]
        : []),
      { protocol: "https", hostname: "i0.wp.com" },
      { protocol: "https", hostname: "roca-de-vida-cms-production.up.railway.app" },
      { protocol: "http",  hostname: "localhost" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy",         value: buildCSP() },
          { key: "X-Frame-Options",                 value: "DENY" },
          { key: "X-Content-Type-Options",          value: "nosniff" },
          { key: "Referrer-Policy",                 value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",              value: "camera=(), microphone=(), geolocation=(self)" },
          // HSTS — 2 years, include subdomains, preload-ready
          { key: "Strict-Transport-Security",       value: "max-age=63072000; includeSubDomains; preload" },
          // Protect against Spectre cross-window attacks
          { key: "Cross-Origin-Opener-Policy",      value: "same-origin" },
          // Prevent cross-origin resource embedding
          { key: "Cross-Origin-Resource-Policy",    value: "same-site" },
        ],
      },
      // Donation management page — must not be indexed (contains bearer token)
      {
        source: "/donaciones/gestionar(.*)",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, nocache" },
        ],
      },
    ];
  },
};

export default nextConfig;
