export enum Role {
  SUPERADMIN = "superadmin",
  ADMIN = "admin",
  VISITOR = "visitor",
  GUARD = "guard",
}
export const roles = [
  Role.SUPERADMIN,
  Role.ADMIN,
  Role.VISITOR,
  Role.GUARD,
] as const;
