export enum Role {
  SUPERADMIN = "SUPERADMIN",
  ADMIN = "ADMIN",
  VISITOR = "VISITOR",
}
export const roles = [Role.SUPERADMIN, Role.ADMIN, Role.VISITOR] as const;
