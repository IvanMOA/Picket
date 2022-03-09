import { AdministratorsSeeder } from "./AdministratorsSeeder";
export class DatabaseSeeder {
  public static async run() {
    await AdministratorsSeeder.run();
  }
}
