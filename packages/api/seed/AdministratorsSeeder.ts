import { KnexAdministratorsRepository } from "../src/modules/administrators/repository/KnexAdministratorsRepository";
import { Role } from "../src/modules/users/domain/Role";
import { k } from "../src/shared/infrastructure/clients/Knex";
import * as faker from "faker";
import { range } from "ramda";
import { makeRegisterAdministrator } from "../src/modules/administrators/resolvers/register-administrator/registerAdministrator";
const administratorsRepository = new KnexAdministratorsRepository();
const registerAdministrator = makeRegisterAdministrator(
  administratorsRepository
);
export class AdministratorsSeeder {
  static async run() {
    await this.createSuperadmin();
    await this.createRandomAdministrators();
  }
  private static async createSuperadmin() {
    /**
     * @warning
     * Utilizar solo para propósitos de desarrollo
     */
    await k("dependencies").insert({
      id: "99991",
      name: "Superadmins",
    });
    await registerAdministrator({
      input: {
        name: "Primer superadmin",
        email: "superadmin@picket.com",
        role: Role.SUPERADMIN,
        dependencyId: "99991",
        password: "superadmin",
        confirmationPassword: "superadmin",
      },
    });
  }
  private static async createRandomAdministrators() {
    await Promise.all(
      range(0, 120).map(async () => {
        const password = faker.internet.password();
        console.log("ok");
        const res = await registerAdministrator({
          input: {
            name: faker.name.firstName() + faker.name.lastName(),
            email: faker.internet.email(),
            role: Role.SUPERADMIN,
            dependencyId: "99991",
            password,
            confirmationPassword: password,
          },
        });
        console.log(res);
      })
    );
  }
}
