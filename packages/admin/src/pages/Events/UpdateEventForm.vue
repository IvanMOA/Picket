<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useEntityForm } from "@/composables/useEntityForm";
import EventForm from "@/pages/Events/EventForm.vue";
import { eventsService } from "@/services/events/eventsService";
import { useLoggedInUser } from "@/stores/UserStore";
import { dateToDatetimeLocalString, EventDTO } from "@picket/shared";
const props = defineProps<{
  eventDTO: EventDTO;
}>();
defineEmits<{
  (e: "submitted"): void;
}>();
const { t } = useI18n();
const { form, handleSubmit, isSubmitting, errorBag, errorMessage } =
  useEntityForm({
    initialValues: {
      placeId: props.eventDTO.place_id,
      name: props.eventDTO.name,
      description: props.eventDTO.description,
      ticketsPerPerson: props.eventDTO.tickets_per_person,
      startsAt: dateToDatetimeLocalString(new Date(props.eventDTO.starts_at)),
      availableSince: dateToDatetimeLocalString(
        new Date(props.eventDTO.available_since)
      ),
      availableUntil: dateToDatetimeLocalString(
        new Date(props.eventDTO.available_until)
      ),
    },
    onSubmit: (args) => eventsService.update(args),
    successNotificationTitle: t("updated.event.title"),
    successNotificationMessage: t("updated.event.message"),
    queriesToInvalidate: "/events",
  });
</script>
<template>
  <div>
    <EventForm
      :handle-submit="handleSubmit"
      :is-submitting="isSubmitting"
      :submit-btn-text="t('update')"
      v-model:name="form.name"
      v-model:description="form.description"
      v-model:ticketsPerPerson="form.ticketsPerPerson"
      v-model:placeId="form.placeId"
      v-model:startsAt="form.startsAt"
      v-model:availableSince="form.availableSince"
      v-model:availableUntil="form.availableUntil"
    />
  </div>
</template>
