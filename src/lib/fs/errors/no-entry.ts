import { BaseError } from "@/utils/errors/base";

export class NoEntryError extends BaseError<"NO_ENTRY_ERROR", ErrnoException> {
  path: string;

  constructor({ path, cause }: { path: string; cause: ErrnoException }) {
    super({
      name: "NoEntryError",
      message: `No file or directory exists at ${path}.`,
      code: "NO_ENTRY_ERROR",
      retryable: false,
      cause,
    });
    this.path = path;
  }
}
