import { auth } from "../src/shared/infrastructure/clients/Firebase";
import { KnexAdministratorsRepository } from "../src/modules/administrators/repository/KnexAdministratorsRepository";
import { Administrator } from "../src/modules/administrators/domain/Administrator";
import { Role } from "../src/modules/users/domain/Role";
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
    const superadmin = new Administrator({
      name: "Primer superadmin",
      email: "superadmin@picket.com",
      role: Role.SUPERADMIN,
    });
    await auth.createUser({
      displayName: superadmin.name,
      email: superadmin.email,
      password: "superadmin",
    });
  }
}
