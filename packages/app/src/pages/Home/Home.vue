<script lang="ts" setup>
import Topbar from "@/components/topbar/Topbar.vue";
import Footer from "@/components/footer/Footer.vue";
import { ElButton } from "element-plus";
import { useQuery } from "vue-query";
import { postgrestClient } from "@/clients/postgrestClient";
import { EventDTO } from "@picket/shared";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
const { d, t } = useI18n();
const router = useRouter();
const { data } = useQuery("events", async () => {
  const { data } = await postgrestClient.get("/events");
  return data as EventDTO[];
});
const navigateToEventDetails = async (eventId: string) => {
  await router.push({ path: `/events/${eventId}` });
};
</script>
<template>
  <div class="flex flex-col min-h-screen">
    <Topbar />
    <main class="flex-grow grid grid-cols-4 mx-20">
      <div v-for="event of data" class="shadow-md rounded overflow-hidden">
        <div class="border-t-2 border-violet-600 card-header-img"></div>
        <div class="p-4 flex flex-col space-y-2">
          <h1>{{ event.name }}</h1>
          <small>{{ d(new Date(event.starts_at), "long") }}</small>
          <ElButton
            @click="navigateToEventDetails(event.id)"
            class="self-end"
            type="primary"
            size="small"
          >
            {{ t("see_event") }}</ElButton
          >
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>
<style>
.card-header-img {
  background-image: url("https://www.milenio.com/uploads/media/2021/11/27/pumas-cu-cayo-autenticos-tigres.jpg");
  background-size: cover;
}
</style>
