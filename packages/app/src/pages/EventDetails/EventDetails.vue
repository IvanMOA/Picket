<script lang="ts" setup>
import Topbar from "@/components/topbar/Topbar.vue";
import Footer from "@/components/footer/Footer.vue";
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElNotification,
  ElSelect,
  ElOption,
} from "element-plus";
import { useQuery } from "vue-query";
import { useRouter } from "vue-router";
import { postgrestClient } from "@/clients/postgrestClient";
import { useLoggedInUser } from "@/stores/UserStore";
import { EventDTO } from "@picket/shared";
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { range } from "ramda";
const router = useRouter();
const { user } = useLoggedInUser();
const { d, t } = useI18n();
const { data: event } = useQuery(
  ["event", router.currentRoute.value.params.eventId],
  async () => {
    const { data } = await postgrestClient.get("/events", {
      params: {
        id: `eq.${router.currentRoute.value.params.eventId}`,
      },
    });
    return data[0] as EventDTO;
  }
);
const {
  data: zones,
  isFetching: isFetchingZones,
  isError: zonesFetchErrored,
} = useQuery(["/zones"], async () => {
  const { data } = await postgrestClient.get(`/zones`);
  return data;
});
const form = reactive({
  quantity: 1,
  selectedZone: "",
});
const isBookingTickets = ref(false);
const handleSubmit = async () => {
  isBookingTickets.value = true;
  try {
    await postgrestClient.post(
      "/tickets",
      range(0, Number(form.quantity)).map(() => ({
        visitor_id: user.uid,
        zone_id: form.selectedZone,
        used: false,
      }))
    );
    ElNotification({
      type: "success",
      title: t("created.tickets.title"),
      message: t("created.tickets.message"),
    });
    await router.push({ name: "Tickets" });
  } catch (e) {
    console.log(e);
    ElNotification({
      type: "error",
      title: t("error.booking_tickets.title"),
      message: t("error.booking_tickets.message"),
    });
  } finally {
    isBookingTickets.value = false;
  }
};
</script>
<template>
  <div class="flex flex-col min-h-screen">
    <Topbar />
    <main class="flex-grow px-12 grid grid-cols-2">
      <div>
        <img
          class="ml-auto"
          :src="`http://localhost:4004/storage/${event.sections_svg_filename}`"
        />
      </div>
      <div class="w-2/3">
        <h1 class="text-2xl">{{ event.name }}</h1>
        <p class="text-lg text-gray-500">{{ event.description }}</p>
        <ElForm
          @submit="handleSubmit"
          class="w-full flex flex-col"
          label-position="top"
        >
          <ElFormItem :label="t('quantity')">
            <ElInput
              min="1"
              type="number"
              :max="event.tickets_per_person"
              data-testid="quantity-input"
              v-model="form.quantity"
            />
          </ElFormItem>
          <ElFormItem :label="t('select_zone')" class="w-full">
            <ElSelect
              class="w-full"
              :placeholder="t('select_zone')"
              :disabled="isFetchingZones"
              v-model="form.selectedZone"
              data-testid="zones-select"
            >
              <ElOption
                v-for="zone in zones ?? []"
                :key="zone.id"
                :label="zone.name"
                :value="zone.id"
              />
            </ElSelect>
          </ElFormItem>
          <ElButton
            :disabled="isBookingTickets"
            data-testid="submit-btn"
            role="ElButton"
            type="primary"
            @click="handleSubmit"
          >
            {{ t("book_tickets") }}
          </ElButton>
        </ElForm>
      </div>
    </main>
    <Footer />
  </div>
</template>
