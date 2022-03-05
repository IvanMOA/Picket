<script lang="ts" setup>
import InputErrors from "../../components/input-errors/InputErrors.vue";
import { ElButton, ElForm, ElFormItem, ElInput } from "element-plus";
import { computed, reactive, ref } from "vue";
import { flow } from "fp-ts/function";
import { swallowAsync, UnknownError, ValidationError } from "@picket/utilities";
import { authService } from "@/services/auth/authService";
import { useI18n } from "vue-i18n";
const formErrors = reactive<Record<string, string[]>>({});
const areFormErrorsEmpty = computed(() => Object.keys(formErrors).length === 0);
const isLoggingIn = ref(false);
const loginForm = reactive({
  email: "",
  password: ""
});
const safeLogin = flow(
  swallowAsync(ValidationError, (e) => Object.assign(formErrors, e.errorBag)),
  swallowAsync(UnknownError, (e) => alert(e.message))
)(authService.login);
const handleLogin = async () => {
  isLoggingIn.value = true;
  await safeLogin(loginForm.email, loginForm.password);
  isLoggingIn.value = true;
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
        <ElInput v-model="loginForm.password" data-testid="password-input"></ElInput>
      </ElFormItem>
      <ElButton type="primary" @click="handleLogin">
        Login
      </ElButton>
    </ElForm>
  </div>
</template>