<script lang="ts" setup>
import { ElButton, ElForm, ElFormItem, ElInput } from "element-plus";
import { reactive, ref } from "vue";
import { swallowAsync, ValidationError } from "@picket/utilities";
import { flow } from "fp-ts/function";
const formErrors = reactive<Record<string, string[]> | null>(null)
const isLoggingIn = ref(false);
const loginForm = reactive({
  email: "",
  password: ""
});
const login = async () => {
  isLoggingIn.value = true;

  isLoggingIn.false = true;
};
const handleLogin = flow(
  swallowAsync(ValidationError, (e) => formErrors = e.)
);
</script>
<template>
  <div class="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">
    <h1 class="font-bold text-2xl">Bienvenido de vuelta!</h1>
    <ElForm class="flex flex-col bg-white rounded shadow-lg p-8 mt-12" label-position="top">
      <ElFormItem label="Correo">
        <ElInput v-model="loginForm.email" data-testid="email-input"></ElInput>
      </ElFormItem>
      <ElFormItem label="Contraseña">
        <ElInput v-model="loginForm.password" data-testid="password-input"></ElInput>
      </ElFormItem>
      <ElButton type="primary">
        Login
      </ElButton>
    </ElForm>
  </div>
</template>