<script lang="ts" setup>
import Topbar from "@/components/topbar/Topbar.vue";
import Footer from "@/components/footer/Footer.vue";
import { useQuery } from "vue-query";
import { postgrestClient } from "@/clients/postgrestClient";
import { computed } from "vue";
import { groupBy } from "ramda";
import { useI18n } from "vue-i18n";
import Ticket from "@/pages/Tickets/Ticket.vue";
const { t, d } = useI18n();
const { data: tickets } = useQuery("tickets", async () => {
  const { data } = await postgrestClient.get("/tickets", {
    params: {
      select: "*,zones(name,events(name,id))",
    },
  });
  return data;
});
const ticketsGroupedByEvent = computed(() =>
  groupBy((ticket: any) => ticket.zones.events.id, tickets.value ?? [])
);
</script>
<template>
  <div class="flex flex-col min-h-screen">
    <Topbar />
    <main class="flex-grow mx-96 px-12 flex flex-col space-y-4">
      <div
        class="shadow-md p-4 overflow-hidden rounded border-l-4 border-violet-500"
        v-for="ticketsForEvent of ticketsGroupedByEvent"
      >
        <h1 class="border-b text-violet-800 text-lg mb-4 border-gray-100">
          {{ ticketsForEvent[0].zones.events.name }}
        </h1>
        <div class="flex space-x-4">
          <Ticket
            v-for="(ticket, ticketIndex) of ticketsForEvent"
            :ticket="ticket"
            :ticketIndex="ticketIndex"
          />
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>
