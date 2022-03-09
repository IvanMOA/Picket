<script lang="ts" setup>
import InputErrors from "../../components/input-errors/InputErrors.vue";
import { ElButton, ElForm, ElFormItem, ElInput, ElNotification } from "element-plus";
import { computed, reactive, ref } from "vue";
import { handleError } from "@/errors/handleError";
import { authService } from "@/services/auth/authService";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { ValidationError } from "@/errors/ValidationError";
const formErrors = reactive<Record<string, string[]>>({});
const areFormErrorsEmpty = computed(() => Object.keys(formErrors).length === 0);
const isLoggingIn = ref(false);
const loginForm = reactive({
  email: "",
  password: ""
});
const { t } = useI18n();
const router = useRouter();
const handleLogin = async () => {
  isLoggingIn.value = true;
  try {
    await authService.login(loginForm.email, loginForm.password);
    await router.push({ name: "Dashboard" });
  } catch (_error) {
    console.log(_error);
    const error = handleError(_error);
    if (error instanceof ValidationError) Object.assign(formErrors, error.errorBag);
    else ElNotification({
      title: "Error",
      message: t(error.message),
      type: "error"
    });
  } finally {
    isLoggingIn.value = false;
  }
};
</script>
<template>
  <div class="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">
    <h1 class="font-bold text-2xl">Bienvenido de vuelta!</h1>
    <ElForm class="w-11/12 md:w-1/2 lg:w-1/3 xl:w-1/4 flex flex-col bg-white rounded shadow-lg p-8 mt-12"
            label-position="top">
      <ElFormItem label="Correo">
        <ElInput v-model="loginForm.email" data-testid="email-input"></ElInput>
        <InputErrors :errors="formErrors.email" />
      </ElFormItem>
      <ElFormItem label="Contraseña">
        <ElInput v-model="loginForm.password" data-testid="password-input" type="password"></ElInput>
      </ElFormItem>
      <ElButton :disabled="isLoggingIn" data-testid="submit-btn" type="primary" @click="handleLogin">
        Login
      </ElButton>
    </ElForm>
  </div>
</template>