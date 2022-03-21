import { Dependency } from "./Dependency";
export interface DependenciesRepository {
  save(dependency: Dependency): Promise<void>;
}
