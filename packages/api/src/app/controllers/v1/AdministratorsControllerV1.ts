import { AdministratorsRepository } from "../../../modules/administrators/domain/AdministratorsRepository";
import { RegisterAdministrator } from "../../../modules/administrators/use-cases/register-administrator/RegisterAdministrator";
import { Request, Response, Router } from "express";
import { BaseController } from "../BaseController";
import { DeleteAdministrator } from "../../../modules/administrators/use-cases/delete-administrator/DeleteAdministrator";
export class AdministratorsControllerV1 extends BaseController {
  public router: Router;
  private registerAdministrator: RegisterAdministrator;
  private deleteAdministrator: DeleteAdministrator;
  constructor(private administratorsRepository: AdministratorsRepository) {
    super();
    this.registerAdministrator = new RegisterAdministrator(
      administratorsRepository
    );
    this.deleteAdministrator = new DeleteAdministrator(
      administratorsRepository
    );
    this.router = Router();
    this.router.post("/v1/administrators", this.create);
    this.router.delete("/v1/administrators/:id", this.delete);
  }
  private create = async (req: Request, res: Response) =>
    this.wrapToHandleErrors(async () => {
      const result = await this.registerAdministrator.run({
        name: req.body.name,
        email: req.body.email,
        dependencyId: req.body.dependency_id,
        password: req.body.password,
        confirmationPassword: req.body.confirmation_password,
        role: req.body.role,
      });
      return res.status(201).json({
        administrator: result,
      });
    }, res);
  private delete = async (req: Request, res: Response) =>
    this.wrapToHandleErrors(async () => {
      await this.deleteAdministrator.run({ id: req.params.id });
      return res.status(200).send();
    }, res);
}
