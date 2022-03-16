export class ValidationError<InputType> extends Error {
  constructor(public errors: Record<string, string[]>) {
    super();
  }
}
