export class ForbiddenActionError extends Error {
  readonly kind = "ForbiddenActionError";
  constructor(msg = "Forbidden action") {
    super(msg);
  }
}
