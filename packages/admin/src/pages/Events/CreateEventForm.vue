<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useEntityForm } from "@/composables/useEntityForm";
import EventForm from "@/pages/Events/EventForm.vue";
import { eventsService } from "@/services/events/eventsService";
import { useLoggedInUser } from "@/stores/UserStore";
import { dateToDatetimeLocalString } from "@picket/shared";
defineEmits<{
  (e: "submitted"): void;
}>();
const { user } = useLoggedInUser();
const { t } = useI18n();
const { form, handleSubmit, isSubmitting, errorBag, errorMessage } =
  useEntityForm({
    initialValues: {
      placeId: "",
      name: "",
      description: "",
      ticketsPerPerson: 1,
      startsAt: dateToDatetimeLocalString(new Date()),
      availableSince: dateToDatetimeLocalString(new Date()),
      availableUntil: dateToDatetimeLocalString(new Date()),
    },
    onSubmit: (args) =>
      eventsService.create({ ...args, dependencyId: user.dependencyId }),
    successNotificationTitle: t("created.event.title"),
    successNotificationMessage: t("created.event.message"),
    queriesToInvalidate: "/events",
  });
</script>
<template>
  <div>
    <EventForm
      :handle-submit="handleSubmit"
      :is-submitting="isSubmitting"
      :submit-btn-text="t('create')"
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
