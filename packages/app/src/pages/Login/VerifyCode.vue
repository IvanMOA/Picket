<script setup>
import { useVerifyCode } from "./composables/useVerifyCode";
import { useRouter } from "vue-router";

const verifyCodeForm = {
  code: ""
};
const router = useRouter();
const { verifyCode, isVerifyingCode } = useVerifyCode();
const handleSubmit = async () => {
  await verifyCode(verifyCodeForm.code);
  await router.push({ name: "Home" });
};
</script>

<template>
  <div>
    <input v-model="verifyCodeForm.code" data-cy="verification-code-input" />
    <button :disabled="isVerifyingCode" data-cy="submit-btn" @click="handleSubmit">Verificar código</button>
  </div>
</template>