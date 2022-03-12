import { Role } from "../../users/domain/Role";
import { v4 as uuid } from "uuid";
type AdministratorProps = {
  email: string;
  name: string;
  role: Role;
  dependencyId: string;
};
export class Administrator {
  constructor(
    private readonly props: AdministratorProps,
    public readonly id = uuid()
  ) {}
  // region Class properties getters / setters
  public get email(): string {
    return this.props.email;
  }
  public set email(email: string) {
    this.props.email = email;
  }
  public get name(): string {
    return this.props.name;
  }
  public set name(name: string) {
    this.props.name = name;
  }
  public get role(): Role {
    return this.props.role;
  }
  public set role(role: Role) {
    this.props.role = role;
  }
  public get dependencyId(): string {
    return this.props.dependencyId;
  }
  public set dependencyId(dependencyId: string) {
    this.props.dependencyId = dependencyId;
  }
  //endregion
}
