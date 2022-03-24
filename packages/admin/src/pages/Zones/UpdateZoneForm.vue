<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useEntityForm } from "@/composables/useEntityForm";
import { useLoggedInUser } from "@/stores/UserStore";
import { zonesService } from "@/services/zones/zonesService";
import ZoneForm from "@/pages/Zones/ZoneForm.vue";
import { ZoneDTO } from "@picket/shared";
const props = defineProps<{ eventId: string; zoneDTO: ZoneDTO }>();
defineEmits<{
  (e: "submitted"): void;
}>();
const { user } = useLoggedInUser();
const { t } = useI18n();
const { form, handleSubmit, isSubmitting, errorBag, errorMessage } =
  useEntityForm({
    initialValues: {
      ...props.zoneDTO,
    },
    onSubmit: (args) => zonesService.update(args),
    successNotificationTitle: t("created.event.title"),
    successNotificationMessage: "created.event.message",
    queriesToInvalidate: "/zones",
  });
</script>
<template>
  <div>
    <ZoneForm
      :handle-submit="handleSubmit"
      :is-submitting="isSubmitting"
      :submit-btn-text="t('create')"
      v-model:name="form.name"
      v-model:capacity="form.capacity"
      v-model:soldTickets="form.sold_tickets"
      v-model:active="form.active"
    />
  </div>
</template>
