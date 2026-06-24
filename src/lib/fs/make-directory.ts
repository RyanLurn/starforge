import type { MakeDirectoryOptions } from "node:fs";

import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";

import type { Result } from "@/types/result";

import { UnexpectedError } from "@/utils/errors/unexpected";
import { NoEntryError } from "@/lib/fs/errors/no-entry";
import { AccessError } from "@/lib/fs/errors/access";

export async function makeDirectory(
  path: string,
  options: MakeDirectoryOptions
): Promise<
  Result<undefined | string, UnexpectedError | NoEntryError | AccessError>
> {
  try {
    const mkdirResult = await mkdir(path, options);
    return {
      success: true,
      data: mkdirResult,
    };
  } catch (error) {
    if (error instanceof Error && "errno" in error) {
      const exception = error as ErrnoException;
      const parentPath = dirname(path);
      switch (exception.code) {
        case "ENOENT": {
          return {
            success: false,
            error: new NoEntryError({ path: parentPath, cause: exception }),
          };
        }
        case "EACCES": {
          return {
            success: false,
            error: new AccessError({ path: parentPath, cause: exception }),
          };
        }
      }
    }
    return {
      success: false,
      error: new UnexpectedError({
        action: `make a directory at ${path}.`,
        cause: error,
      }),
    };
  }
}
