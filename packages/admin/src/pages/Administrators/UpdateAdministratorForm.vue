<script lang="ts" setup>
import { AdministratorDTO } from "@picket/shared";
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElSelect,
  ElOption,
} from "element-plus";
import { useEntityForm } from "@/composables/useEntityForm";
import { administratorsService } from "@/services/administrators/administratorsService";
import { useI18n } from "vue-i18n";
import { useQuery } from "vue-query";
import { postgrestClient } from "@/clients/postgrestClient";
import RoleSelectFormItem from "@/pages/Administrators/RoleSelectFormItem.vue";
const props = defineProps<{
  administratorDTO: AdministratorDTO;
}>();
const { t } = useI18n();
const { form, isSubmitting, errorMessage, handleSubmit } = useEntityForm({
  initialValues: props.administratorDTO,
  onSubmit: administratorsService.update,
  successNotificationTitle: t("deleted.administrator.title"),
  successNotificationMessage: t("deleted.administrator.message"),
  queriesToInvalidate: "/administrators",
});
</script>
<template>
  <div>
    <ElForm class="w-full flex flex-col" label-position="top">
      <ElFormItem label="Correo">
        <ElInput v-model="form.email" data-testid="email-input"></ElInput>
      </ElFormItem>
      <ElFormItem label="Nombre">
        <ElInput v-model="form.name" data-testid="name-input"></ElInput>
      </ElFormItem>
      <RoleSelectFormItem v-model="form.role" />
      <ElButton
        data-testid="submit-btn"
        type="primary"
        class="w-full"
        @click="handleSubmit"
        >{{ t("update") }}</ElButton
      >
    </ElForm>
  </div>
</template>
