<script setup>
import { useRegister } from "@/pages/Register/composables/useRegister";
import { ErrorMessage, Field, Form } from "vee-validate";
import { validatePhoneNumber } from "@/validators/validatePhoneNumber";
import { validateName } from "@/validators/validateName";
import { useRouter } from "vue-router";

const router = useRouter();
const { register, isRegistering, serverFormErrors } = useRegister();
const handleSubmit = (values) => {
  register(values.name, values.phoneNumber);
  router.push({ name: "AskForVerificationCode" });
};
</script>

<template>
  <div>
    <router-link to="/">Home</router-link>
    <Form @submit="handleSubmit">
      <label for="name">Nombre</label>
      <Field id="name" :rules="validateName" data-cy="name-input" data-testid="name-input" name="name" />
      <ErrorMessage name="name" />
      <label for="phoneNumber">Celular</label>
      <Field id="phoneNumber" :rules="validatePhoneNumber" data-cy="phone-number-input" data-testid="phone-number-input"
             name="phoneNumber" />
      <ErrorMessage name="phoneNumber" />
      <span v-if="serverFormErrors.errors?.phoneNumber" role="alert">
				{{ serverFormErrors.errors.phoneNumber[0] }}
			</span>
      <button :disabled="isRegistering" data-cy="submit-btn" role="button" type="submit" @click="handleSubmit">
        Registrarse
      </button>
    </Form>
  </div>
</template>