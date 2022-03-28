import { k } from "../src/shared/infrastructure/clients/Knex";
import { addHours } from "date-fns";
export class EventsSeeder {
  static async run() {
    /**
     * Evento que comienza en 1 hora y se pueden comprar boletos
     */
    const events = await k("events")
      .insert({
        dependency_id: (await k("dependencies").first()).id,
        name: "Auténticos vs Liebres",
        description:
          "Primera jornada, ven y disfruta del primer partido de la jornada!",
        tickets_per_person: 2,
        sections_svg_filename: "gaspar_mass_map.png",
        starts_at: addHours(new Date(), 1),
        available_since: addHours(new Date(), -1),
        available_until: addHours(new Date(), 1),
      })
      .returning("*");
    await k("zones").insert({
      event_id: events[0].id,
      name: "Sección 1",
      active: true,
      capacity: 20,
      sold_tickets: 0,
    });
  }
}
