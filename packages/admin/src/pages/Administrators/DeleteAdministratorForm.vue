<script lang="ts" setup>
import { AdministratorDTO } from "@picket/shared";
import { ElForm, ElFormItem, ElInput, ElButton } from "element-plus";
import { useEntityForm } from "@/composables/useEntityForm";
import { administratorsService } from "@/services/administrators/administratorsService";
import { useI18n } from "vue-i18n";
const props = defineProps<{
  administratorDTO: AdministratorDTO;
}>();
const { t } = useI18n();
const { form, isSubmitting, errorMessage, handleSubmit } = useEntityForm({
  initialValues: props.administratorDTO,
  onSubmit: ({ id }) => administratorsService.delete(id),
  successNotificationTitle: t("deleted.administrator.title"),
  successNotificationMessage: t("deleted.administrator.message"),
  queriesToInvalidate: "/administrators",
});
</script>
<template>
  <div>
    <ElForm class="w-full flex flex-col" label-position="top">
      <ElFormItem label="Correo">
        <ElInput disabled v-model="props.administratorDTO.email"></ElInput>
      </ElFormItem>
      <ElFormItem label="Nombre">
        <ElInput disabled v-model="props.administratorDTO.name"></ElInput>
      </ElFormItem>
      <ElFormItem label="Rol">
        <ElInput disabled :placeholder="t(form.role)">weq</ElInput>
      </ElFormItem>
      <ElButton
        data-testid="submit-btn"
        type="primary"
        class="w-full"
        @click="handleSubmit"
        >{{ t("delete") }}</ElButton
      >
    </ElForm>
  </div>
</template>
