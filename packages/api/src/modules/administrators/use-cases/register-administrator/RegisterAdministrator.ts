import { auth } from "../../../../shared/infrastructure/clients/Firebase";
import { z } from "zod";
import { Role } from "../../../users/domain/Role";
import { Administrator } from "../../domain/Administrator";
import { UseCase } from "../../../../shared/domain/UseCase";
import { AdministratorsRepository } from "../../domain/AdministratorsRepository";
import { validateInput } from "../../../../shared/domain/utils/validateInput";
const registerAdministratorValidator = z.object({
  name: z.string().min(5).max(100),
  email: z.string().min(10).max(100).email(),
  password: z.string().min(6).max(100),
  confirmationPassword: z.string().min(6).max(100),
  role: z.enum([Role.ADMIN, Role.VISITOR, Role.SUPERADMIN, Role.GUARD]),
  dependencyId: z.string(),
});
type Request = Record<
  keyof z.infer<typeof registerAdministratorValidator>,
  unknown
>;
type Response = {
  id: string;
  name: string;
  role: string;
};
export class RegisterAdministrator implements UseCase<Request, Response> {
  constructor(private administratorsRepository: AdministratorsRepository) {}
  public run = async (_req: Request): Promise<Response> => {
    const req = validateInput(registerAdministratorValidator, _req);
    const administrator = new Administrator({
      name: req.name,
      email: req.email,
      role: req.role,
      dependencyId: req.dependencyId,
    });
    await auth.createUser({
      uid: administrator.id,
      displayName: administrator.name,
      email: administrator.email,
      password: req.password,
    });
    await auth.setCustomUserClaims(administrator.id, {
      role: req.role,
      dependencyId: req.dependencyId,
    });
    await this.administratorsRepository.save(administrator);
    return {
      id: administrator.id,
      name: administrator.name,
      role: administrator.role,
    };
  };
}
