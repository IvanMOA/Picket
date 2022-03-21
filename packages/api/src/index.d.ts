declare module "express-serve-static-core" {
  export interface Request {
    administratorJwtClaims: { role: string; dependencyId: string };
  }
}
export {};
