<script lang="ts" setup>
import { AdministratorDTO } from "@picket/shared";
import { ElButton, ElForm, ElFormItem, ElInput } from "element-plus";
import { ref } from "vue";
import { dependenciesService } from "@/services/dependencies/dependenciesService";
import { useI18n } from "vue-i18n";
import { useEntityForm } from "@/composables/useEntityForm";
defineEmits<{
  (e: "submitted"): void;
}>();
const { t } = useI18n();
const { form, handleSubmit, isSubmitting, errorBag, errorMessage } =
  useEntityForm({
    initialValues: {
      dependencyId: "",
      name: "",
    },
    onSubmit: ({ name, dependencyId }) =>
      dependenciesService.create(dependencyId, name),
    successNotificationTitle: t("created.dependency.title"),
    successNotificationMessage: "created.dependency.message",
    queriesToInvalidate: "/dependencies",
  });
</script>
<template>
  <div>
    <ElForm
      @submit.prevent="handleSubmit"
      class="w-full flex flex-col"
      label-position="top"
    >
      <ElFormItem :label="t('dependency_id')">
        <ElInput
          data-testid="dependency-id-input"
          v-model="form.dependencyId"
        ></ElInput>
      </ElFormItem>
      <ElFormItem :label="t('name')">
        <ElInput data-testid="name-input" v-model="form.name"></ElInput>
      </ElFormItem>
      <ElButton
        :disabled="isSubmitting"
        data-testid="submit-btn"
        type="primary"
        class="w-full"
        @click="handleSubmit"
      >
        {{ t("create") }}
      </ElButton>
    </ElForm>
  </div>
</template>
