<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useEntityForm } from "@/composables/useEntityForm";
import { placesService } from "@/services/places/placesService";
import PlacesForm from "@/pages/Places/PlacesForm.vue";
defineEmits<{
  (e: "submitted"): void;
}>();
const { t } = useI18n();
const { form, handleSubmit, isSubmitting, errorBag, errorMessage } =
  useEntityForm({
    initialValues: {
      name: "",
      address: "",
      latitude: "",
      longitude: "",
      sectionsSvgFiles: [] as File[],
      zonesTemplate: [{ name: "*" }],
    },
    onSubmit: (args) =>
      placesService.create({
        ...args,
        sectionsSvgFile: args.sectionsSvgFiles[0],
      }),
    successNotificationTitle: t("created.place.title"),
    successNotificationMessage: "created.place.message",
    queriesToInvalidate: "/places",
  });
</script>
<template>
  <div>
    <PlacesForm
      :handle-submit="handleSubmit"
      :is-submitting="isSubmitting"
      v-model:name="form.name"
      v-model:address="form.address"
      v-model:latitude="form.latitude"
      v-model:longitude="form.longitude"
      v-model:zonesTemplate="form.zonesTemplate"
      v-model:sectionsSvgFiles="form.sectionsSvgFiles"
    />
  </div>
</template>
