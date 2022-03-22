export type EventDTO = {
  id: string;
  dependency_id: string;
  place_id: string;
  name: string;
  description: string;
  tickets_per_person: number;
  starts_at: string;
  available_since: string;
  available_until: string;
};
