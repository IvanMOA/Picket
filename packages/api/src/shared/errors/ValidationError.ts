import { ZodError } from "zod";
export class ValidationError<
  InputType extends { __typename?: string }
> extends Error {
  constructor(
    public __typename: InputType["__typename"],
    public errors: Record<string, string[]>
  ) {
    super();
  }
  toPrimitives() {
    return {
      __typename: this.__typename,
      message: "Validation error",
      errors: this.errors,
    };
  }
}
export const validationError = (
  error: ZodError
): { errors: Record<string, string[]>; message: string } => ({
  errors: error.formErrors.fieldErrors,
  message: "Validation error",
});
