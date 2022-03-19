<script lang="ts" setup>
import { AdministratorDTO } from "@picket/shared";
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
} from "element-plus";
import { useI18n } from "vue-i18n";
import { useEntityForm } from "@/composables/useEntityForm";
import { administratorsService } from "@/services/administrators/administratorsService";
import { useQuery } from "vue-query";
import { postgrestClient } from "@/clients/postgrestClient";
defineEmits<{
  (e: "submitted"): void;
}>();
const { t } = useI18n();
const {
  data: dependencies,
  isFetching: isFetchingDependencies,
  isError: dependenciesFetchErrored,
} = useQuery(["/dependencies"], async () => {
  const { data } = await postgrestClient.get(`/dependencies`);
  return data;
});
const { form, handleSubmit, isSubmitting, errorBag, errorMessage } =
  useEntityForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmationPassword: "",
      role: "",
      dependencyId: "",
    },
    onSubmit: (args) => administratorsService.create(args),
    successNotificationTitle: t("created.administrator.title"),
    successNotificationMessage: "created.administrator.message",
    queriesToInvalidate: "/administrators",
  });
</script>
<template>
  <div>
    <ElForm
      @submit.prevent="handleSubmit"
      class="w-full flex flex-col"
      label-position="top"
    >
      <ElFormItem :label="t('name')">
        <ElInput data-testid="name-input" v-model="form.name"></ElInput>
      </ElFormItem>
      <ElFormItem :label="t('email')">
        <ElInput data-testid="email-input" v-model="form.email"></ElInput>
      </ElFormItem>
      <ElFormItem :label="t('password')">
        <ElInput data-testid="password-input" v-model="form.password"></ElInput>
      </ElFormItem>
      <ElFormItem :label="t('confirmation_password')">
        <ElInput
          data-testid="confirmation-password-input"
          v-model="form.confirmationPassword"
        ></ElInput>
      </ElFormItem>
      <ElFormItem :label="t('role')" class="w-full">
        <ElSelect
          class="w-full"
          :placeholder="t('select_role')"
          :disabled="isFetchingDependencies"
          v-model="form.role"
          data-testid="role-select"
        >
          <ElOption
            v-for="role in [
              { role: 'superadmin', displayName: t('superadmin') },
              { role: 'admin', displayName: t('admin') },
            ]"
            :key="role.role"
            :label="role.displayName"
            :value="role.role"
          />
        </ElSelect>
      </ElFormItem>
      <ElFormItem :label="t('select_dependency')" class="w-full">
        <ElSelect
          class="w-full"
          :placeholder="t('select_dependency')"
          :disabled="isFetchingDependencies"
          v-model="form.dependencyId"
          data-testid="dependency-select"
        >
          <ElOption
            v-for="dependency in dependencies ?? []"
            :key="dependency.id"
            :label="dependency.name"
            :value="dependency.id"
          />
        </ElSelect>
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
