import { postgrestClient } from "@/clients/postgrestClient";
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
};
