<script setup>
import { useRegister } from "@/pages/Register/composables/useRegister";
import { ElForm, ElFormItem, ElInput, ElButton } from "element-plus";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { reactive } from "vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
const router = useRouter();
const { t } = useI18n();
const form = reactive({
  name: "",
  phoneNumber: "",
});
const { register, isRegistering, serverFormErrors } = useRegister();
const handleSubmit = (values) => {
  register(values.name, values.phoneNumber);
  router.push({ name: "AskForVerificationCode" });
};
</script>

<template>
  <AuthLayout>
    <h4 class="w-full text-3xl font-bold">{{ t("register") }}</h4>
    <p class="text-lg text-gray-500">
      {{ t("if_already_have_an_account_then") }}
      <router-link
        to="/login/ask-for-verification-code"
        class="text-violet-600 underline lowercase"
        >{{ t("signin") }}</router-link
      >
    </p>
    <div id="recaptcha_verifier"></div>
    <div class="relative w-full mt-10 space-y-4">
      <div class="relative pb-20">
        <ElForm
          @submit="handleSubmit"
          class="w-full flex flex-col"
          label-position="top"
        >
          <ElFormItem :label="t('name')">
            <ElInput
              size="large"
              data-testid="name-input"
              v-model="form.name"
            />
          </ElFormItem>
          <ElFormItem :label="t('phone_number')">
            <ElInput
              size="large"
              data-testid="phone-number-input"
              v-model="form.phoneNumber"
            />
          </ElFormItem>
          <ElButton
            :disabled="isRegistering"
            data-testid="submit-btn"
            role="ElButton"
            type="primary"
            @click="handleSubmit"
          >
            Registrarse
          </ElButton>
        </ElForm>
      </div>
    </div>
  </AuthLayout>
</template>
