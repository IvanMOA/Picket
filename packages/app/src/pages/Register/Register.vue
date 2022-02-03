<script setup>
import {useRegister} from "@/pages/Register/composables/useRegister";
import {ErrorMessage, Field, Form} from "vee-validate"
import {validatePhoneNumber} from "@/validators/validatePhoneNumber"
import {validateName} from "@/validators/validateName"
import {useRouter} from "vue-router";

const router = useRouter()
const {register, isRegistering, serverFormErrors} = useRegister()
const handleSubmit = (values) => {
	register(values.name, values.phoneNumber)
	router.push({name: 'AskForVerificationCode'})
}
</script>

<template>
	<div>
		<Form @submit="handleSubmit">
			<label for="name">Nombre</label>
			<Field name="name" id="name" :rules="validateName" data-testid="name-input" data-cy="name-input"/>
			<ErrorMessage name="name"/>
			<label for="phoneNumber">Celular</label>
			<Field name="phoneNumber" id="phoneNumber" :rules="validatePhoneNumber" data-testid="phone-number-input"
						 data-cy="phone-number-input"/>
			<ErrorMessage name="phoneNumber"/>
			<span v-if="serverFormErrors.errors?.phoneNumber" role="alert" >
				{{ serverFormErrors.errors.phoneNumber[0] }}
			</span>
			<button role="button" type="submit" @click="handleSubmit" :disabled="isRegistering" data-cy="submit-btn">
				Registrarse
			</button>
		</Form>
	</div>
</template>