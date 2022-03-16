export abstract class UseCase<Req, Res> {
  protected abstract run(req: Req): Promise<Res>;
}
