import { auth } from "../../../../shared/infrastructure/clients/Firebase";
import { z } from "zod";
import { UseCase } from "../../../../shared/domain/UseCase";
import { VisitorsRepository } from "../../domain/VisitorsRepository";
import { Visitor } from "../../domain/Visitor";
import { validateInput } from "../../../../shared/domain/utils/validateInput";
import { Role } from "../../../users/domain/Role";
const registerVisitorValidator = z.object({
  phoneNumber: z.string().length(10),
  name: z.string().min(5).max(100),
});
type Request = Record<keyof z.infer<typeof registerVisitorValidator>, unknown>;
type Response = any;
export class RegisterVisitor implements UseCase<Request, Response> {
  constructor(private visitorsRepository: VisitorsRepository) {}
  public async run(_req: Request): Promise<Response> {
    const req = validateInput(registerVisitorValidator, _req);
    const visitor = new Visitor({
      name: req.name,
      phoneNumber: `+52${req.phoneNumber}`,
    });
    await auth.createUser({
      uid: visitor.id,
      displayName: visitor.name,
      phoneNumber: visitor.phoneNumber,
    });
    await auth.setCustomUserClaims(visitor.id, {
      role: Role.VISITOR,
    });
    await this.visitorsRepository.save(visitor);
    return visitor;
  }
}
