<script lang="ts" setup>
import { AdministratorDTO } from "@picket/shared";
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElNotification,
} from "element-plus";
import { reactive, ref } from "vue";
import { dependenciesService } from "@/services/dependencies/dependenciesService";
import { useI18n } from "vue-i18n";
import { useQueryClient } from "vue-query";
import { DependencyDTO } from "@picket/shared";
const props = defineProps<{
  dependencyDTO: DependencyDTO;
}>();
const emit = defineEmits<{
  (e: "submitted"): void;
}>();
const { t } = useI18n();
const queryClient = useQueryClient();
const form = reactive({ ...props.dependencyDTO });
const isUpdatingDependency = ref(false);
const handleSubmit = async () => {
  isUpdatingDependency.value = true;
  try {
    await dependenciesService.update(form);
    await queryClient.invalidateQueries(["/dependencies"]);
    emit("submitted");
    ElNotification({
      title: t("updated.dependency.title"),
      message: t("updated.dependency.message"),
      type: "success",
    });
  } catch (e) {
    console.log(e);
    ElNotification({
      title: "Error",
      message: t("could_not_update_dependency"),
      type: "error",
    });
  }
  isUpdatingDependency.value = false;
};
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
          v-model="form.dependency_id"
        ></ElInput>
      </ElFormItem>
      <ElFormItem :label="t('name')">
        <ElInput data-testid="name-input" v-model="form.name"></ElInput>
      </ElFormItem>
      <ElButton
        :disabled="isUpdatingDependency"
        data-testid="submit-btn"
        type="primary"
        class="w-full"
        @click="handleSubmit"
      >
        {{ t("update") }}
      </ElButton>
    </ElForm>
  </div>
</template>
