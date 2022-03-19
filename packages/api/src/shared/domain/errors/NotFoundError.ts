export class NotFoundError extends Error {
  readonly kind = "NotFoundError";
  constructor(msg = "Not found error") {
    super(msg);
  }
}
