import { v4 as uuid } from "uuid";
import { auth } from "../../../../shared/infrastructure/clients/Firebase";
import { z } from "zod";
import {
  RegisterAdministratorResult,
  RegisterAdministratorValidationError,
} from "@generated/graphql";
import { Role } from "../../../users/domain/Role";
import { Administrator } from "../../domain/Administrator";
import { AdministratorsRepository } from "../../repository/AdministratorsRepository";
import { validateInput } from "../../../../shared/utils/validateInput";
import { handleMutation } from "../../../../shared/utils/handleMutation";
const registerAdministratorValidator = z.object({
  name: z.string().min(5).max(100),
  email: z.string().min(10).max(100).email(),
  password: z.string().min(6).max(100),
  confirmationPassword: z.string().min(6).max(100),
  role: z.enum([Role.ADMIN, Role.VISITOR]),
});
export const makeRegisterAdministrator = (
  administratorsRepository: AdministratorsRepository
) =>
  handleMutation(async (args: any): Promise<RegisterAdministratorResult> => {
    validateInput<RegisterAdministratorValidationError>(
      registerAdministratorValidator,
      args,
      "RegisterAdministratorValidationError"
    );
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
  });
