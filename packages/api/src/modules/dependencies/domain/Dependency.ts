import { Role } from "../../users/domain/Role";
import { v4 as uuid } from "uuid";
import { Entity } from "../../../shared/domain/Entity";
export type DependencyProps = {
  name: string;
  dependencyId: string;
};
export class Dependency extends Entity<DependencyProps> {
  // region Class properties getters / setters
  public get name(): string {
    return this.props.name;
  }
  public set name(name: string) {
    this.props.name = name;
  }
  public get dependencyId(): string {
    return this.props.dependencyId;
  }
  public set dependencyId(dependencyId: string) {
    this.props.dependencyId = dependencyId;
  }
  //endregion
}
