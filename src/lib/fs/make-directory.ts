import type { MakeDirectoryOptions } from "node:fs";

import { mkdir } from "node:fs/promises";

import type { UnexpectedErrorCode } from "@/types/app-error";
import type { Result } from "@/types/result";

export async function makeDirectory(
  path: string,
  options: MakeDirectoryOptions
): Promise<Result<undefined | string, UnexpectedErrorCode>> {
  try {
    const mkdirResult = await mkdir(path, options);
    return {
      success: true,
      data: mkdirResult,
    };
  } catch {
    return {
      success: false,
      error: {
        code: "UNEXPECTED_ERROR",
        message: `An unexpected error was caught while trying to make a directory at ${path}.`,
        retryable: false,
      },
    };
  }
}
