import { k } from "../clients/Knex";
import axios from "axios";
import { firebaseProjectId } from "../clients/Firebase";
import { DatabaseSeeder } from "../../../../seed/DatabaseSeeder";
export class EnvironmentArranger {
  private static tables = [
    "tickets",
    "visitors",
    "administrators",
    "tickets",
    "events",
  ];
  public static async cleanUp() {
    for (const table of this.tables)
      await k.raw(`DELETE
                   FROM ${table}`);
    await axios.delete(
      `http://localhost:9099/emulator/v1/projects/${firebaseProjectId}/accounts`
    );
  }
  public static async arrange() {
    await DatabaseSeeder.run();
  }
  public static async disconnect() {
    await k.destroy();
  }
}
