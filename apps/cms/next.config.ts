import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // CMS no necesita optimización de imágenes de Next.js
  // Cloudinary se encarga de eso cuando esté configurado
};

export default withPayload(nextConfig);
