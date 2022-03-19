import { Visitor } from "./Visitor";
export interface VisitorsRepository {
  save(visitor: Visitor): Promise<void>;
}
