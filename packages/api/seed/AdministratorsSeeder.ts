import { Role } from "../src/modules/users/domain/Role";
import { k } from "../src/shared/infrastructure/clients/Knex";
import * as faker from "faker";
import { range } from "ramda";
import { RegisterAdministrator } from "../src/modules/administrators/use-cases/register-administrator/RegisterAdministrator";
import { KnexAdministratorsRepository } from "../src/modules/administrators/infrastructure/KnexAdministratorsRepository";
const administratorsRepository = new KnexAdministratorsRepository();
const registerAdministrator = new RegisterAdministrator(
  administratorsRepository
);
export class AdministratorsSeeder {
  static async run() {
    await this.createSuperadmin();
  }
  private static async createSuperadmin() {
    /**
     * @warning
     * Utilizar solo para propósitos de desarrollo
     */
    const dependency = await k("dependencies").insert(
      {
        dependency_id: "99991",
        name: "Superadmins",
      },
      ["id"]
    );
    await registerAdministrator.run({
      name: "Primer superadmin",
      email: "superadmin@picket.com",
      role: Role.SUPERADMIN,
      dependencyId: dependency[0].id,
      password: "superadmin",
      confirmationPassword: "superadmin",
    });
  }
  public static create = registerAdministrator.run;
  private static async createRandomAdministrators() {
    await Promise.all(
      range(0, 120).map(async () => {
        const password = faker.internet.password();
        const res = await registerAdministrator.run({
          name: faker.name.firstName() + faker.name.lastName(),
          email: faker.internet.email(),
          role: Role.SUPERADMIN,
          dependencyId: "99991",
          password,
          confirmationPassword: password,
        });
        console.log(res);
      })
    );
  }
}
