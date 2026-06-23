import type { AppError } from "@/types/app-error";

export type Ok<TData> = {
  success: true;
  data: TData;
};

export type Err<TCode extends string> = {
  success: false;
  error: AppError<TCode>;
};

export type Result<TData, TErrorCode extends string> =
  | Err<TErrorCode>
  | Ok<TData>;
