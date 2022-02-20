import { ZodObject } from "zod";
import { ValidationError, validationError } from "../errors/ValidationError";
export const validateInput = <InputType extends { __typename?: string }>(
  schema: ZodObject<any>,
  args: any,
  __typename: InputType["__typename"]
) => {
  const validationResult = schema.safeParse(args?.input);
  if (!validationResult.success)
    throw new ValidationError(
      __typename,
      validationError(validationResult.error).errors
    );
};
