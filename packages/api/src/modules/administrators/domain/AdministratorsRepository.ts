import { Administrator } from "../domain/Administrator";
export interface AdministratorsRepository {
  save(administrator: Administrator): Promise<void>;
  find(id: string): Promise<Administrator | null>;
  delete(administrator: Administrator): Promise<void>;
}
