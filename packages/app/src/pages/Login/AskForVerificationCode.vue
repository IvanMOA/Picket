<script lang="ts" setup>
import {reactive} from "vue";
import {useAskForVerificationCode} from "@/pages/Login/composables/useAskForVerificationCode";
import {useRouter} from "vue-router";
import {confirmationResultSharedState} from "@/pages/Login/confirmationResult";
const router = useRouter()
const loginAskForVerificationCodeForm = reactive({
	phoneNumber: ''
})
const {isAskingForVerificationCode, askForVerificationCode} = useAskForVerificationCode()
const handleSubmit = async () => {
	const confirmationResult = await askForVerificationCode(loginAskForVerificationCodeForm.phoneNumber)
	console.log(confirmationResult)
	if (confirmationResult){
		confirmationResultSharedState.value = confirmationResult
		router.push({ name: 'VerifyCode' })
	}
}
</script>
<template>
	<div>
		<div id="recaptcha_verifier"></div>
		<input v-model="loginAskForVerificationCodeForm.phoneNumber" data-cy="phone-number-input"/>
		<button @click="handleSubmit" :disabled="isAskingForVerificationCode" data-cy="submit-btn">Enviar código</button>
	</div>
</template>