import { registerVisitor } from "../../modules/visitors/resolvers/register-visitor/RegisterVisitor";
import { registerAdministrator } from "../../modules/administrators/resolvers/register-administrator/registerAdministrator";
export const rootValue = {
  registerVisitor,
  registerAdministrator,
};
