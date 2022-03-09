export class ValidationError extends Error {
  readonly kind = "ValidationError";
  constructor(
    public errorBag: Record<string, string[]>,
    message = "Validation error"
  ) {
    super(message);
  }
  public hasError(name: string): boolean {
    return !!this.errorBag[name];
  }
  public getErrors(name: string): string[] {
    return this.errorBag[name];
  }
}
