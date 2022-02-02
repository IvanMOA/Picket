<script setup>
import {reactive, ref} from "vue";
import {useRegister} from "@/pages/Register/composables/useRegister";
import {useRouter} from "vue-router";
const router = useRouter()
const loginForm = reactive({
	name: '',
	phoneNumber: ''
})
const { register, isRegistering } = useRegister()
const handleSubmit = async () => {
	register(loginForm.name, loginForm.phoneNumber)
	router.push({ name: 'AskForVerificationCode' })
}
</script>

<template>
	<div>
		<input v-model="loginForm.name" data-cy="name-input" />
		<input v-model="loginForm.phoneNumber" data-cy="phone-number-input" />
		<button @click="handleSubmit" :disabled="isRegistering" data-cy="submit-btn">Registrarse</button>
	</div>
</template>