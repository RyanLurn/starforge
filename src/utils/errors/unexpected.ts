import { BaseError } from "@/utils/errors/base";

export class UnexpectedError extends BaseError<"UNEXPECTED_ERROR"> {
  constructor({ action, cause }: { action: string; cause: unknown }) {
    super({
      name: "UnexpectedError",
      message: `An unexpected error was caught while trying to ${action}.`,
      code: "UNEXPECTED_ERROR",
      retryable: false,
      cause,
    });
  }
}
