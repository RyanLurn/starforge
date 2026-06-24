import type { Stats } from "node:fs";

import { stat } from "node:fs/promises";

import type { Result } from "@/types/result";

import { UnexpectedError } from "@/utils/errors/unexpected";
import { NoEntryError } from "@/lib/fs/errors/no-entry";
import { AccessError } from "@/lib/fs/errors/access";

export async function getStats(
  path: string
): Promise<Result<Stats, UnexpectedError | NoEntryError | AccessError>> {
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
            error: new NoEntryError({ path, cause: exception }),
          };
        }
        case "EACCES": {
          return {
            success: false,
            error: new AccessError({ path, cause: exception }),
          };
        }
      }
    }
    return {
      success: false,
      error: new UnexpectedError({
        action: `get stats for ${path}`,
        cause: error,
      }),
    };
  }
}
