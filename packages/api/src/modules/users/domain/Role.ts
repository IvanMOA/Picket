export enum Role {
  ADMIN = "ADMIN",
  VISITOR = "VISITOR",
}
export const roles = [Role.ADMIN, Role.VISITOR] as const;
