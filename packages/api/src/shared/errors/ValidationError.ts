import { ZodError } from "zod";
export const validationError = (
  error: ZodError
): { errors: Record<string, string[]>; message: string } => ({
  errors: error.formErrors.fieldErrors,
  message: "Validation error",
});
