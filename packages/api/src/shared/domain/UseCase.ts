export interface UseCase<Req, Res> {
  run(req: Req): Promise<Res>;
}
