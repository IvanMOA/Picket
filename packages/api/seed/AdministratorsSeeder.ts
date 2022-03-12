import { auth } from "../src/shared/infrastructure/clients/Firebase";
import { KnexAdministratorsRepository } from "../src/modules/administrators/repository/KnexAdministratorsRepository";
import { Administrator } from "../src/modules/administrators/domain/Administrator";
import { Role } from "../src/modules/users/domain/Role";
import { k } from "../src/shared/infrastructure/clients/Knex";
const administratorsRepository = new KnexAdministratorsRepository();
export class AdministratorsSeeder {
  static async run() {
    await this.createSuperadmin();
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
    const superadmin = new Administrator({
      name: "Primer superadmin",
      email: "superadmin@picket.com",
      role: Role.SUPERADMIN,
      dependencyId: "99991",
    });
    await administratorsRepository.save(superadmin);
    await auth.createUser({
      displayName: superadmin.name,
      email: superadmin.email,
      password: "superadmin",
    });
  }
}
