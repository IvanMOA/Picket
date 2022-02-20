import { registerVisitor } from "../../modules/visitors/resolvers/register-visitor/RegisterVisitor";
import { makeRegisterAdministrator } from "../../modules/administrators/resolvers/register-administrator/registerAdministrator";
import { KnexAdministratorsRepository } from "../../modules/administrators/repository/KnexAdministratorsRepository";
const knexAdministratorsRepository = new KnexAdministratorsRepository();
export const rootValue = {
  registerVisitor,
  registerAdministrator: makeRegisterAdministrator(
    knexAdministratorsRepository
  ),
};
