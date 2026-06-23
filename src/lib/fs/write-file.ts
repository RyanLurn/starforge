import { write } from "bun";

import type { UnexpectedErrorCode } from "@/types/app-error";
import type { Result } from "@/types/result";

export async function writeFile(
  path: string,
  input: string
): Promise<Result<null, UnexpectedErrorCode>> {
  try {
    await write(path, input);
    return {
      success: true,
      data: null,
    };
  } catch {
    return {
      success: false,
      error: {
        code: "UNEXPECTED_ERROR",
        message: `An unexpected error was caught while trying to write a file at ${path}.`,
        retryable: false,
      },
    };
  }
}
