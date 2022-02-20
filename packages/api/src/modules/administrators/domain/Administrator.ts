import { Role } from "../../users/domain/Role";
type AdministratorProps = {
  id: string;
  email: string;
  name: string;
  role: Role;
};
export class Administrator {
  constructor(private readonly props: AdministratorProps) {}
  // region Class properties getters / setters
  public get id(): string {
    return this.props.id;
  }
  public set id(id: string) {
    this.props.id = id;
  }
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
  //endregion
}
