import { Entity } from "../../../shared/domain/Entity";
type VisitorProps = {
  name: string;
  phoneNumber: string;
};
export class Visitor extends Entity<VisitorProps> {
  // region Class properties getters / setters
  public get name(): string {
    return this.props.name;
  }
  public get phoneNumber(): string {
    return this.props.phoneNumber;
  }
  public setName(name: string) {
    this.props.name = name;
  }
  public setPhoneNumber(phoneNumber: string) {
    this.props.phoneNumber = phoneNumber;
  }
  // endregion
}
