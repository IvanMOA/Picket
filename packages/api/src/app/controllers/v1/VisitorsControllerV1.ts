import { AdministratorsRepository } from "../../../modules/administrators/domain/AdministratorsRepository";
import { RegisterAdministrator } from "../../../modules/administrators/use-cases/register-administrator/RegisterAdministrator";
import { Request, Response, Router } from "express";
import { BaseController } from "../BaseController";
import { RegisterVisitor } from "../../../modules/visitors/resolvers/register-visitor/RegisterVisitor";
import { VisitorsRepository } from "../../../modules/visitors/domain/VisitorsRepository";
export class VisitorsControllerV1 extends BaseController {
  public router: Router;
  private registerVisitor: RegisterVisitor;
  constructor(private visitorsRepository: VisitorsRepository) {
    super();
    this.registerVisitor = new RegisterVisitor(visitorsRepository);
    this.router = Router();
    this.router.post("/v1/visitors", this.create);
  }
  private create = async (req: Request, res: Response) =>
    this.wrapToHandleErrors(async () => {
      const result = await this.registerVisitor.run({
        name: req.body.name,
        phoneNumber: req.body.phone_number,
      });
      return res.status(201).json({
        visitor: result,
      });
    }, res);
}
