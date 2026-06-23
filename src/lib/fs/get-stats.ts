import type { Stats } from "node:fs";

import { stat } from "node:fs/promises";

import type { UnexpectedErrorCode, NoEntryErrorCode } from "@/types/app-error";
import type { Result } from "@/types/result";

export async function getStats(
  path: string
): Promise<Result<Stats, UnexpectedErrorCode | NoEntryErrorCode>> {
  try {
    const stats = await stat(path);
    return {
      success: true,
      data: stats,
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
              message: `The location of ${path} does not exist on the file system.`,
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
        message: `An unexpected error was caught while trying to get stats for ${path}.`,
        retryable: false,
      },
    };
  }
}
