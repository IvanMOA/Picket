<script setup>
import { useVerifyCode } from "./composables/useVerifyCode";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { ElForm, ElFormItem, ElInput, ElButton } from "element-plus";
import { reactive } from "vue";
const verifyCodeForm = reactive({
  code: "",
});
const { t } = useI18n();
const router = useRouter();
const { verifyCode, isVerifyingCode } = useVerifyCode();
const handleSubmit = async () => {
  await verifyCode(verifyCodeForm.code);
  await router.push({ name: "Home" });
};
</script>

<template>
  <ElForm class="w-full flex flex-col" label-position="top">
    <ElFormItem :label="t('verification_code')">
      <ElInput
        size="large"
        data-testid="verification-code-input"
        v-model="verifyCodeForm.code"
      />
    </ElFormItem>
    <ElButton
      :disabled="isVerifyingCode"
      @click="handleSubmit"
      type="primary"
      class="w-full"
      data-testid="submit-btn"
    >
      {{ t("verify_code") }}
    </ElButton>
  </ElForm>
</template>
