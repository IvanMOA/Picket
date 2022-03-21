import { k } from "../../../shared/infrastructure/clients/Knex";
import { DependenciesRepository } from "../domain/DependenciesRepository";
import { Dependency } from "../domain/Dependency";
export class KnexDependenciesRepository implements DependenciesRepository {
  async save(dependency: Dependency): Promise<void> {
    await k("dependencies").insert({
      id: dependency.id,
      name: dependency.name,
      dependency_id: dependency.dependencyId,
    });
  }
}
