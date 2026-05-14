import config from "@payload-config";
import { RootLayout } from "@payloadcms/next/layouts";
import { importMap } from "./importMap";
import type React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return RootLayout({ config, importMap, children });
}
