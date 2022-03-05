export class ValidationError extends Error {
  constructor(
    public errorBag: Record<string, string[]>,
    message: string = "validation_error"
  ) {
    super(message);
  }
}
