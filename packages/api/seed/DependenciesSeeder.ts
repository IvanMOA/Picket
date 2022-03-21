import { RegisterAdministrator } from "../src/modules/administrators/use-cases/register-administrator/RegisterAdministrator";
import { KnexAdministratorsRepository } from "../src/modules/administrators/infrastructure/KnexAdministratorsRepository";
import { KnexDependenciesRepository } from "../src/modules/dependencies/infrastructure/KnexDependenciesRepository";
import {
  Dependency,
  DependencyProps,
} from "../src/modules/dependencies/domain/Dependency";
import * as faker from "faker";
const dependenciesRepository = new KnexDependenciesRepository();
export class DependenciesSeeder {
  static async run() {}
  static async create(props: Partial<DependencyProps> = {}) {
    const dependency = new Dependency({
      name: faker.company.companyName(),
      dependencyId: faker.datatype.number(10000).toString(),
      ...props,
    });
    await dependenciesRepository.save(dependency);
    return dependency;
  }
}
