<script lang="ts" setup>
import { reactive } from "vue";
import { useAskForVerificationCode } from "@/pages/Login/composables/useAskForVerificationCode";
import { useRouter } from "vue-router";
import { confirmationResultSharedState } from "@/pages/Login/confirmationResult";
import { ElForm, ElFormItem, ElInput, ElButton } from "element-plus";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const router = useRouter();
const loginAskForVerificationCodeForm = reactive({
  phoneNumber: "",
});
const { isAskingForVerificationCode, askForVerificationCode } =
  useAskForVerificationCode();
const handleSubmit = async () => {
  const confirmationResult = await askForVerificationCode(
    loginAskForVerificationCodeForm.phoneNumber
  );
  if (confirmationResult) {
    confirmationResultSharedState.value = confirmationResult;
    await router.push({ name: "VerifyCode" });
  }
};
</script>
<template>
  <ElForm class="w-full flex flex-col" label-position="top">
    <ElFormItem :label="t('phone_number')">
      <ElInput
        size="large"
        data-testid="phone-number-input"
        v-model="loginAskForVerificationCodeForm.phoneNumber"
      />
    </ElFormItem>
    <ElButton
      :disabled="isAskingForVerificationCode"
      @click="handleSubmit"
      type="primary"
      class="w-full"
      data-testid="submit-btn"
    >
      {{ t("send_verification_code") }}
    </ElButton>
  </ElForm>
</template>
