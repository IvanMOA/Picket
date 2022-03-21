<script lang="ts" setup>
import { ElButton, ElForm, ElFormItem, ElInput, ElUpload } from "element-plus";
import { useI18n } from "vue-i18n";
import { useEntityForm } from "@/composables/useEntityForm";
import { placesService } from "@/services/places/placesService";
import { ref } from "vue";
import { PlaceDTO } from "@picket/shared/dist/dts/dtos/PlaceDTO";
import PlacesForm from "@/pages/Places/PlacesForm.vue";
const props = defineProps<{
  placeDTO: PlaceDTO;
}>();
defineEmits<{
  (e: "submitted"): void;
}>();
const { t } = useI18n();
const { form, handleSubmit, isSubmitting, errorBag, errorMessage } =
  useEntityForm({
    initialValues: {
      name: props.placeDTO.name,
      address: props.placeDTO.address,
      latitude: props.placeDTO.latitude,
      longitude: props.placeDTO.longitude,
      zonesTemplate: props.placeDTO.zones_template,
    },
    onSubmit: (args) =>
      placesService.update({
        id: props.placeDTO.id,
        ...args,
      }),
    successNotificationTitle: t("updated.place.title"),
    successNotificationMessage: t("updated.place.message"),
    queriesToInvalidate: "/places",
  });
</script>
<template>
  <div>
    {{ form.name }} - {{ props.placeDTO.name }}
    <PlacesForm
      :handle-submit="handleSubmit"
      :is-submitting="isSubmitting"
      :submit-btn-text="t('update')"
      v-model:name="form.name"
      v-model:address="form.address"
      v-model:latitude="form.latitude"
      v-model:longitude="form.longitude"
      v-model:zonesTemplate="form.zonesTemplate"
    />
  </div>
</template>
