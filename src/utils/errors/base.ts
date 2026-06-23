export class BaseError<TCode extends string, TCause = unknown> extends Error {
  code: TCode;
  retryable: boolean;
  declare cause: TCause;

  constructor({
    name,
    message,
    code,
    retryable,
    cause,
  }: {
    name: string;
    message: string;
    code: TCode;
    retryable: boolean;
    cause: TCause;
  }) {
    super(message, { cause });
    this.name = name;
    this.code = code;
    this.retryable = retryable;
  }
}
