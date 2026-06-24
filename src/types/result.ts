import type { BaseError } from "@/utils/errors/base";

export type Ok<D> = {
  success: true;
  data: D;
};

export type Err<E extends BaseError<string>> = {
  success: false;
  error: E;
};

export type Result<D, E extends BaseError<string>> = Err<E> | Ok<D>;
