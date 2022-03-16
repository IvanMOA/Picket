import { ZodObject, ZodRawShape } from "zod";
import { ValidationError } from "../errors/ValidationError";
import { z } from "zod";
export const validateInput = <InputType extends ZodRawShape>(
  schema: ZodObject<InputType>,
  args: any
): z.infer<typeof schema> => {
  const validationResult = schema.safeParse(args);
  if (!validationResult.success)
    throw new ValidationError(validationResult.error.formErrors.fieldErrors);
  return validationResult.data;
};
