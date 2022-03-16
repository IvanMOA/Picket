import { Administrator } from "../domain/Administrator";
export interface AdministratorsRepository {
  save(administrator: Administrator): Promise<void>;
  delete(administrator: Administrator): Promise<void>;
}
