import { AdministratorsSeeder } from "./AdministratorsSeeder";
import { PlacesSeeder } from "./PlacesSeeder";
export class DatabaseSeeder {
  public static async run() {
    await AdministratorsSeeder.run();
    await PlacesSeeder.run();
  }
}
