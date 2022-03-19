import { Administrator } from "../domain/Administrator";
import { k } from "../../../shared/infrastructure/clients/Knex";
import { AdministratorsRepository } from "../domain/AdministratorsRepository";
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
  async find(id: string): Promise<Administrator | null> {
    const row = await k("administrators").first().where({ id });
    if (!row) return null;
    return new Administrator(
      {
        name: row.name,
        email: row.email,
        role: row.role,
        dependencyId: row.dependencyId,
      },
      row.id
    );
  }
  delete(administrator: Administrator): Promise<void> {
    return Promise.resolve(undefined);
  }
}
