import { v4 as uuid } from "uuid";
import { auth } from "../../../../shared/infrastructure/clients/Firebase";
import { k } from "../../../../shared/infrastructure/clients/Knex";
import { z } from "zod";
import { RegisterAdministratorResult } from "@generated/graphql";
import { validationError } from "../../../../shared/errors/ValidationError";
import { Roles } from "../../../users/domain/Roles";
import { logger } from "../../../../app/logger/logger";
const registerAdministratorValidator = z.object({
  name: z.string().min(5).max(100),
  email: z.string().min(10).max(100).email(),
  password: z.string().min(6).max(100),
  confirmationPassword: z.string().min(6).max(100),
  role: z.enum([Roles.ADMIN, Roles.VISITOR]),
});
export const registerAdministrator = async (
  args: any
): Promise<RegisterAdministratorResult> => {
  try {
    const validationResult = registerAdministratorValidator.safeParse(
      args?.input
    );
    if (!validationResult.success)
      return {
        __typename: "RegisterAdministratorValidationError",
        ...validationError(validationResult.error),
      };
    const administrator = {
      id: uuid(),
      name: args.input.name,
      email: args.input.email,
      role: args.input.role,
    };
    await auth.createUser({
      displayName: administrator.name,
      email: administrator.email,
      password: args.input.password,
    });
    await k("administrators").insert({
      id: administrator.id,
      name: administrator.name,
      email: administrator.email,
      role: administrator.role,
    });
    return {
      __typename: "Administrator",
      ...administrator,
    };
  } catch (e) {
    logger.error(e);
    throw e;
  }
};
