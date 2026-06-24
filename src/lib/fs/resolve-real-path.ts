import { realpath } from "node:fs/promises";

import type { Result } from "@/types/result";

import { UnexpectedError } from "@/utils/errors/unexpected";
import { NoEntryError } from "@/lib/fs/errors/no-entry";
import { AccessError } from "@/lib/fs/errors/access";

export async function resolveRealPath(
  path: string
): Promise<Result<string, UnexpectedError | NoEntryError | AccessError>> {
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
        action: `resolve real path for ${path}`,
        cause: error,
      }),
    };
  }
}
