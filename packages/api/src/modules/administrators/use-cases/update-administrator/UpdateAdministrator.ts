import { auth } from "../../../../shared/infrastructure/clients/Firebase";
import { z } from "zod";
import { Role } from "../../../users/domain/Role";
import { Administrator } from "../../domain/Administrator";
import { UseCase } from "../../../../shared/domain/UseCase";
import { AdministratorsRepository } from "../../domain/AdministratorsRepository";
import { validateInput } from "../../../../shared/domain/utils/validateInput";
import { NotFoundError } from "../../../../shared/domain/errors/NotFoundError";
import { ForbiddenActionError } from "../../../../shared/domain/errors/ForbiddenActionError";
const updateAdministratorValidator = z.object({
  requesterRole: z.string(),
  requesterDependencyId: z.string(),
  id: z.string(),
  email: z.string().email().optional(),
  name: z.string().optional(),
  dependencyId: z.string().optional(),
  role: z.enum([Role.ADMIN, Role.VISITOR, Role.SUPERADMIN, Role.GUARD]),
});
type Request = Record<
  keyof z.infer<typeof updateAdministratorValidator>,
  unknown
>;
type Response = void;
export class UpdateAdministrator implements UseCase<Request, Response> {
  constructor(private administratorsRepository: AdministratorsRepository) {}
  public async run(_req: Request): Promise<Response> {
    const req = validateInput(updateAdministratorValidator, _req);
    if (req.role === Role.SUPERADMIN && req.requesterRole !== Role.SUPERADMIN)
      throw new ForbiddenActionError();
    const administrator = await this.administratorsRepository.find(req.id);
    if (administrator === null) throw new NotFoundError();
    if (req.name) {
      administrator.name = req.name;
    }
    if (req.email) {
      administrator.email = req.email;
      await auth.updateUser(req.id, { email: req.email });
    }
    if (req.role) {
      administrator.role = req.role;
      await auth.setCustomUserClaims(req.id, {
        role: req.role,
        dependencyId: req.dependencyId ?? req.requesterDependencyId,
      });
    }
    await this.administratorsRepository.save(administrator);
  }
}
