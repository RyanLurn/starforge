import { realpath } from "node:fs/promises";

import type { UnexpectedErrorCode, NoEntryErrorCode } from "@/types/app-error";
import type { Result } from "@/types/result";

export async function resolveRealPath(
  path: string
): Promise<Result<string, UnexpectedErrorCode | NoEntryErrorCode>> {
  try {
    const realPath = await realpath(path);
    return {
      success: true,
      data: realPath,
    };
  } catch (error) {
    if (error instanceof Error && "errno" in error) {
      const exception = error as ErrnoException;
      switch (exception.code) {
        case "ENOENT": {
          return {
            success: false,
            error: {
              code: "NO_ENTRY_ERROR",
              message: `The path: ${path} does not exist.`,
              retryable: false,
            },
          };
        }
      }
    }
    return {
      success: false,
      error: {
        code: "UNEXPECTED_ERROR",
        message: `An unexpected error was caught while resolving ${path} to its real path.`,
        retryable: false,
      },
    };
  }
}
