import { k } from "../src/shared/infrastructure/clients/Knex";
export class PlacesSeeder {
  static async run() {
    /**
     * Gaspar Mass
     */
    await k("places").insert({
      name: "Gaspar Mass",
      address:
        "Circuito Interior de Ciudad Universitaria s/n, Ciudad Universitaria, San Nicolás de los Garza, N.L.",
    });
  }
}
