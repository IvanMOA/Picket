import { ValidationError } from "../errors/ValidationError";
import { ApplicationError } from "@picket/admin/src/errors/ApplicationError";
export abstract class UseCase<Req, Res> {
  public async safeRun(req: Req): Promise<Res | ApplicationError> {
    try {
      return await this.run(req);
    } catch (e) {
      if (e instanceof ValidationError) return e;
      return e;
    }
  }
  protected abstract run(req: Req): Promise<Res>;
}
