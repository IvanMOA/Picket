<script setup>
import { useI18n } from "vue-i18n";
import { ArrowRight } from "@element-plus/icons-vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
const { t } = useI18n();
</script>
<template>
  <AuthLayout>
    <h4 class="w-full text-3xl font-bold">{{ t("signin") }}</h4>
    <p class="text-lg text-gray-500">
      {{ t("if_dont_have_an_account_then") }}
      <router-link to="/register" class="text-violet-600 underline">{{
        t("create_one")
      }}</router-link>
    </p>
    <div id="recaptcha_verifier"></div>
    <div class="relative w-full mt-10 space-y-4">
      <div class="relative pb-20">
        <router-view />
      </div>
    </div>
  </AuthLayout>
</template>
