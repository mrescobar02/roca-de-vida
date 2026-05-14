import type { NextConfig } from "next";

const CSP = [
  "default-src 'self'",
  // Next.js inline scripts + Framer Motion require unsafe-inline/unsafe-eval
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  // CMS API + YouTube data API + PubSubHubbub
  "connect-src 'self' https://roca-de-vida-cms-production.up.railway.app https://www.googleapis.com https://pubsubhubbub.appspot.com",
  // YouTube embeds on sermons page
  "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
  "frame-ancestors 'none'",
  "media-src 'self' https:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Thumbnails de YouTube
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      // Placeholder images para desarrollo
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      // WordPress / Jetpack CDN — imágenes del sitio actual
      { protocol: "https", hostname: "i0.wp.com" },
      // Payload CMS — Railway production
      { protocol: "https", hostname: "roca-de-vida-cms-production.up.railway.app" },
      // Payload CMS — local dev
      { protocol: "http", hostname: "localhost" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy",   value: CSP },
          { key: "X-Frame-Options",           value: "DENY" },
          { key: "X-Content-Type-Options",    value: "nosniff" },
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=(self)" },
        ],
      },
    ];
  },
};

export default nextConfig;
