import { AdministratorsRepository } from "./AdministratorsRepository";
import { Administrator } from "../domain/Administrator";
import { k } from "../../../shared/infrastructure/clients/Knex";
export class KnexAdministratorsRepository implements AdministratorsRepository {
  async save(administrator: Administrator): Promise<void> {
    await k("administrators").insert({
      id: administrator.id,
      name: administrator.name,
      email: administrator.email,
      role: administrator.role,
      dependency_id: administrator.dependencyId,
    });
    // .onConflict()
    // .merge(["name"])
    // .returning("*");
  }
  delete(administrator: Administrator): Promise<void> {
    return Promise.resolve(undefined);
  }
}
