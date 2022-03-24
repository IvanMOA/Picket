import { postgrestClient } from "@/clients/postgrestClient";
import { PlaceDTO } from "@picket/shared";
export const eventsService = {
  create: async (args: {
    placeId: string;
    dependencyId: string;
    name: string;
    description: string;
    ticketsPerPerson: number;
    startsAt: string;
    availableSince: string;
    availableUntil: string;
  }) => {
    const { data: placesDTOs } = await postgrestClient.get(
      `/places?id=eq.${args.placeId}`
    );
    const placeDTO = placesDTOs[0] as PlaceDTO;
    const { data: affectedEventsDTOs } = await postgrestClient.post(
      "/events",
      {
        name: args.name,
        description: args.description,
        tickets_per_person: args.ticketsPerPerson,
        starts_at: args.startsAt,
        available_since: args.availableSince,
        available_until: args.availableUntil,
        place_id: args.placeId,
        dependency_id: args.dependencyId,
      },
      {
        headers: {
          Prefer: "return=representation",
        },
      }
    );
    const createdEventDTO = affectedEventsDTOs[0];
    await postgrestClient.post(
      "/zones",
      placeDTO.zones_template.map((zone_template) => ({
        place_id: placeDTO.id,
        event_id: createdEventDTO.id,
        name: zone_template.name,
        active: true,
        capacity: 0,
        sold_tickets: 0,
      }))
    );
  },
  update: async (args: {
    placeId: string;
    name: string;
    description: string;
    ticketsPerPerson: number;
    startsAt: string;
    availableSince: string;
    availableUntil: string;
  }) => {
    await postgrestClient.patch("/events", {
      name: args.name,
      description: args.description,
      tickets_per_person: args.ticketsPerPerson,
      starts_at: args.startsAt,
      available_since: args.availableSince,
      available_until: args.availableUntil,
      place_id: args.placeId,
    });
  },
  delete: async (id: string) => {
    await postgrestClient.delete(`/events?id=eq.${id}`);
  },
};
