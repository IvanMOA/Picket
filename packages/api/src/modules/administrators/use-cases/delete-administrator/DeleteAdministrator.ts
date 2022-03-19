import { auth } from "../../../../shared/infrastructure/clients/Firebase";
import { z } from "zod";
import { Role } from "../../../users/domain/Role";
import { Administrator } from "../../domain/Administrator";
import { UseCase } from "../../../../shared/domain/UseCase";
import { AdministratorsRepository } from "../../domain/AdministratorsRepository";
import { validateInput } from "../../../../shared/domain/utils/validateInput";
import { NotFoundError } from "../../../../shared/domain/errors/NotFoundError";
const deleteAdministratorValidator = z.object({
  id: z.string(),
});
type Request = Record<
  keyof z.infer<typeof deleteAdministratorValidator>,
  unknown
>;
type Response = void;
export class DeleteAdministrator implements UseCase<Request, Response> {
  constructor(private administratorsRepository: AdministratorsRepository) {}
  public async run(_req: Request): Promise<Response> {
    const req = validateInput(deleteAdministratorValidator, _req);
    const administrator = await this.administratorsRepository.find(req.id);
    if (administrator === null) throw new NotFoundError();
    await auth.deleteUser(administrator.id);
    await this.administratorsRepository.delete(administrator);
  }
}
