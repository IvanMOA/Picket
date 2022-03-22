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
      zones_template: JSON.stringify([
        { name: "Sección 1" },
        { name: "Sección 2" },
        { name: "Sección 3" },
        { name: "Sección 4" },
        { name: "Sección 5" },
        { name: "Sección 6" },
        { name: "Sección 7" },
        { name: "Sección 8" },
        { name: "Sección 9" },
        { name: "Sección 10" },
        { name: "Sección 11" },
        { name: "Sección 12" },
        { name: "Sección 13" },
        { name: "Sección 14" },
        { name: "Sección 15" },
        { name: "Sección 16" },
        { name: "Sección 17" },
        { name: "Sección 18" },
        { name: "Sección 19" },
        { name: "Sección 20" },
        { name: "Sección 21" },
        { name: "Sección 22" },
      ]),
      latitude: "25.727778",
      longitude: "-100.313333",
      sections_svg_filename: "gaspar_mass_svg.svg",
    });
  }
}
