<script setup>
import {useVerifyCode} from "./composables/useVerifyCode";
const verifyCodeForm = {
	code: ''
}
const { verifyCode, isVerifyingCode } = useVerifyCode()
const handleSubmit = async () => {
	verifyCode(verifyCodeForm.code)
}
</script>

<template>
<div>
	<input v-model="verifyCodeForm.code" data-cy="verification-code-input"/>
	<button @click="handleSubmit" :disabled="isVerifyingCode" data-cy="submit-btn">Verificar código</button>
</div>
</template>