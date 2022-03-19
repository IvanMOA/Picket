import { VisitorsRepository } from "../domain/VisitorsRepository";
import { Visitor } from "../domain/Visitor";
import { k } from "../../../shared/infrastructure/clients/Knex";
export class KnexVisitorsRepository implements VisitorsRepository {
  async save(visitor: Visitor): Promise<void> {
    await k("visitors").insert({
      id: visitor.id,
      name: visitor.name,
      phone_number: visitor.phoneNumber,
    });
  }
}
