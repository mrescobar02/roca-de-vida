'use server'
import config from "@payload-config";
import { handleServerFunctions } from "@payloadcms/next/layouts";
import type { ServerFunctionClientArgs } from "payload";
import { importMap } from "./importMap";

export const serverFunction = async (
  args: ServerFunctionClientArgs
): Promise<unknown> => {
  "use server";
  return handleServerFunctions({ ...args, config, importMap });
};
