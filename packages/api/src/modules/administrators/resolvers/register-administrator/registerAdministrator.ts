import { v4 as uuid } from "uuid";
import { auth } from "../../../../shared/infrastructure/clients/Firebase";
import { z } from "zod";
import { RegisterAdministratorResult } from "@generated/graphql";
import { validationError } from "../../../../shared/errors/ValidationError";
import { Role } from "../../../users/domain/Role";
import { logger } from "../../../../app/logger/logger";
import { Administrator } from "../../domain/Administrator";
import { AdministratorsRepository } from "../../repository/AdministratorsRepository";
const registerAdministratorValidator = z.object({
  name: z.string().min(5).max(100),
  email: z.string().min(10).max(100).email(),
  password: z.string().min(6).max(100),
  confirmationPassword: z.string().min(6).max(100),
  role: z.enum([Role.ADMIN, Role.VISITOR]),
});
export const makeRegisterAdministrator =
  (administratorsRepository: AdministratorsRepository) =>
  async (args: any): Promise<RegisterAdministratorResult> => {
    try {
      const validationResult = registerAdministratorValidator.safeParse(
        args?.input
      );
      if (!validationResult.success)
        return {
          __typename: "RegisterAdministratorValidationError",
          ...validationError(validationResult.error),
        };
      const administrator = new Administrator({
        id: uuid(),
        name: args.input.name,
        email: args.input.email,
        role: args.input.role,
      });
      await auth.createUser({
        displayName: administrator.name,
        email: administrator.email,
        password: args.input.password,
      });
      await administratorsRepository.save(administrator);
      return {
        __typename: "Administrator",
        id: administrator.id,
        name: administrator.name,
        role: administrator.role,
      };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  };
