import { AdministratorsRepository } from "../../../modules/administrators/domain/AdministratorsRepository";
import { RegisterAdministrator } from "../../../modules/administrators/use-cases/register-administrator/RegisterAdministrator";
import { Request, Response, Router } from "express";
import { BaseController } from "../BaseController";
export class AdministratorsControllerV1 extends BaseController {
  public router: Router;
  private registerAdministrator: RegisterAdministrator;
  constructor(private administratorsRepository: AdministratorsRepository) {
    super();
    this.registerAdministrator = new RegisterAdministrator(
      administratorsRepository
    );
    this.router = Router();
    this.router.post("/v1/administrators", this.create);
  }
  private create = async (req: Request, res: Response) => {
    const result = await this.registerAdministrator.safeRun({
      name: req.body.name,
      email: req.body.email,
      dependencyId: req.body.dependency_id,
      password: req.body.password,
      confirmationPassword: req.body.confirmation_password,
      role: req.body.role,
    });
    if (result instanceof Error) this.handleError(result, res);
    else
      return res.status(201).json({
        administrator: result,
      });
  };
}
