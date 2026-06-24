import { BaseError } from "@/utils/errors/base";

export class AccessError extends BaseError<"ACCESS_ERROR", ErrnoException> {
  path: string;

  constructor({ path, cause }: { path: string; cause: ErrnoException }) {
    super({
      name: "AccessError",
      message: `Access to ${path} was denied.`,
      code: "ACCESS_ERROR",
      retryable: false,
      cause,
    });
    this.path = path;
  }
}
