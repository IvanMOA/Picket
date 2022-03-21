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
    const superadminsDependency = await k("dependencies").insert(
      {
        dependency_id: "99991",
        name: "Superadmins",
      },
      ["id"]
    );
    const fimeDependency = await k("dependencies").insert(
      {
        dependency_id: "23161",
        name: "Facultad de Ingeniería Mecánica y Eléctrica",
      },
      ["id"]
    );
    await registerAdministrator.run({
      name: "Primer superadmin",
      email: "superadmin@picket.com",
      role: Role.SUPERADMIN,
      dependencyId: superadminsDependency[0].id,
      password: "superadmin",
      confirmationPassword: "superadmin",
    });
    await registerAdministrator.run({
      name: "Axel Morales",
      email: "axel.moraleso@uanl.mx",
      role: Role.ADMIN,
      dependencyId: fimeDependency[0].id,
      password: "123123",
      confirmationPassword: "123123",
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
