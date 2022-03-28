import { AdministratorsSeeder } from "./AdministratorsSeeder";
import { PlacesSeeder } from "./PlacesSeeder";
import { EventsSeeder } from "./EventsSeeder";
export class DatabaseSeeder {
  public static async run() {
    await AdministratorsSeeder.run();
    await PlacesSeeder.run();
    await EventsSeeder.run();
  }
}
