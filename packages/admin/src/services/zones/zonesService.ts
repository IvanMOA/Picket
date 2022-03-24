import { postgrestClient } from "@/clients/postgrestClient";
import { ZoneDTO } from "@picket/shared";
export const zonesService = {
  create: async (args: {
    name: string;
    capacity: number;
    soldTickets: number;
    active: boolean;
    eventId: string;
  }) => {
    await postgrestClient.post("/zones", {
      name: args.name,
      capacity: args.capacity,
      sold_tickets: args.soldTickets,
      active: args.active,
      event_id: args.eventId,
    });
  },
  update: async (zoneDTO: ZoneDTO) => {
    await postgrestClient.patch(
      "/zones",
      {
        name: zoneDTO.name,
        capacity: zoneDTO.capacity,
        sold_tickets: zoneDTO.sold_tickets,
        active: zoneDTO.active,
        event_id: zoneDTO.event_id,
      },
      {
        params: {
          id: `eq.${zoneDTO.id}`,
        },
      }
    );
  },
};
