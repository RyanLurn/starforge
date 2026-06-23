export type UnexpectedErrorCode = "UNEXPECTED_ERROR";
export type NoEntryErrorCode = "NO_ENTRY_ERROR";

export type AppError<TCode extends string> = {
  code: TCode;
  message: string;
  retryable: boolean;
};
