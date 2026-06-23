import type { UnexpectedErrorCode } from "@/types/app-error";
import type { Result } from "@/types/result";

export async function writeFile(
  path: string,
  content: string
): Promise<Result<null, UnexpectedErrorCode>> {
  try {
    await Bun.write(path, content);
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
