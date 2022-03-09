export class UnknownError extends Error {
  readonly kind = "ApplicationError";
  constructor(message = "Application error") {
    super(message);
  }
}
