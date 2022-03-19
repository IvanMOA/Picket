<script lang="ts" setup>
import { DependencyDTO } from "@picket/shared";
import { ElButton, ElForm, ElFormItem, ElInput } from "element-plus";
import { dependenciesService } from "@/services/dependencies/dependenciesService";
import { useI18n } from "vue-i18n";
import { useEntityForm } from "@/composables/useEntityForm";
const props = defineProps<{
  dependencyDTO: DependencyDTO;
}>();
const emit = defineEmits<{
  (e: "submitted"): void;
}>();
const { t } = useI18n();
const { form, handleSubmit, isSubmitting, errorBag, errorMessage } =
  useEntityForm({
    initialValues: props.dependencyDTO,
    onSubmit: ({ id }) => dependenciesService.delete(id),
    successNotificationTitle: t("deleted.dependency.title"),
    successNotificationMessage: t("deleted.dependency.message"),
    queriesToInvalidate: "/dependencies",
  });
// const handleSubmit = async () => {
//   isDeletingDependency.value = true;
//   try {
//     await
//     await queryClient.invalidateQueries(["/dependencies"]);
//     emit("submitted");
//     ElNotification({
//       title: ,
//       message: t("deleted.dependency.message"),
//       type: "success",
//     });
//   } catch (e) {
//     console.log(e);
//     ElNotification({
//       title: "Error",
//       message: t("could_not_delete_dependency"),
//       type: "error",
//     });
//   }
//   isDeletingDependency.value = false;
// };
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
          disabled
          data-testid="dependency-id-input"
          v-model="form.dependency_id"
        ></ElInput>
      </ElFormItem>
      <ElFormItem :label="t('name')">
        <ElInput
          disabled
          data-testid="name-input"
          v-model="form.name"
        ></ElInput>
      </ElFormItem>
      <ElButton
        :disabled="isSubmitting"
        data-testid="submit-btn"
        type="primary"
        class="w-full"
        @click="handleSubmit"
      >
        {{ t("delete") }}
      </ElButton>
    </ElForm>
  </div>
</template>
