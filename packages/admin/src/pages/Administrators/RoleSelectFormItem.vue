<script lang="ts" setup>
import { ElFormItem, ElSelect, ElOption } from "element-plus";
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { useLoggedInUser, useUserStore } from "@/stores/UserStore";
import { compose, isNil, not } from "ramda";
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
const { t } = useI18n();
const { user } = useLoggedInUser();
const roles = computed(() =>
  [
    user.role === "superadmin" && {
      role: "superadmin",
      displayName: t("superadmin"),
    },
    { role: "admin", displayName: t("admin") },
    { role: "guard", displayName: t("Guardia") },
  ].filter(compose(not, isNil))
);
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <ElFormItem :label="t('role')" class="w-full">
    <ElSelect
      class="w-full"
      :placeholder="t('select_role')"
      v-model="value"
      data-testid="role-select"
    >
      <ElOption
        v-for="role in roles"
        :key="role.role"
        :label="role.displayName"
        :value="role.role"
      />
    </ElSelect>
  </ElFormItem>
</template>
