export enum Role {
  SUPERADMIN = "superadmin",
  ADMIN = "admin",
  VISITOR = "visitor",
}
export const roles = [Role.SUPERADMIN, Role.ADMIN, Role.VISITOR] as const;
