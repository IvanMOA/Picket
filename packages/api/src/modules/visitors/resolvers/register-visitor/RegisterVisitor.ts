import { v4 as uuid } from "uuid";
import { auth } from "../../../../shared/infrastructure/clients/Firebase";
import { k } from "../../../../shared/infrastructure/clients/Knex";
import { z } from "zod";
import { RegisterVisitorResult } from "@generated/graphql";
import { validationError } from "../../../../shared/errors/ValidationError";
const registerVisitorValidator = z.object({
  phoneNumber: z.string().length(10),
  name: z.string().min(5).max(100),
});
export const registerVisitor = async (
  args: any
): Promise<RegisterVisitorResult> => {
  const validationResult = registerVisitorValidator.safeParse(args?.input);
  if (!validationResult.success)
    return {
      __typename: "RegisterVisitorValidationError",
      ...validationError(validationResult.error),
    };
  const visitor = {
    id: uuid(),
    name: args.input.name,
    phoneNumber: `+52${args.input.phoneNumber}`,
  };
  await auth.createUser({
    displayName: visitor.name,
    phoneNumber: visitor.phoneNumber,
  });
  await k("visitors").insert({
    id: visitor.id,
    name: visitor.name,
    phone_number: visitor.phoneNumber,
  });
  return {
    __typename: "Visitor",
    ...visitor,
  };
};
