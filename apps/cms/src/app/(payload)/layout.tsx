import config from "@payload-config";
import { RootLayout } from "@payloadcms/next/layouts";
import type React from "react";
import { importMap } from "./importMap";
import { serverFunction } from "./serverFunction";

export default function Layout({ children }: { children: React.ReactNode }) {
  return RootLayout({ config, importMap, serverFunction, children });
}
