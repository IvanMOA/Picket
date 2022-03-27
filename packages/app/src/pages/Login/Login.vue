<script setup>
import { useI18n } from "vue-i18n";
import { ArrowRight } from "@element-plus/icons-vue";
const { t } = useI18n();
</script>
<template>
  <section class="w-full min-h-screen bg-white flex">
    <div class="mx-auto max-w-7xl">
      <div class="flex h-full flex-col lg:flex-row">
        <div
          class="relative w-full bg-cover lg:w-6/12 xl:w-7/12 bg-gradient-to-r from-white via-white to-gray-100"
        >
          <div
            class="relative flex flex-col items-center justify-center w-full h-full px-10 my-20 lg:px-16 lg:my-0"
          >
            <div
              class="flex flex-col items-start space-y-8 tracking-tight lg:max-w-3xl"
            >
              <div class="relative">
                <p class="mb-2 font-medium text-gray-700 uppercase">
                  {{ t("register_uptitle") }}
                </p>
                <h2 class="text-5xl font-bold text-gray-900 xl:text-6xl">
                  {{ t("register_title") }}
                </h2>
              </div>
              <p class="text-2xl text-gray-700">
                {{ t("register_subtitle") }}
              </p>
              <ArrowRight class="w-10 h-10 text-violet-500" />
            </div>
          </div>
        </div>

        <div class="w-full bg-white lg:w-6/12 xl:w-5/12">
          <div
            class="flex flex-col items-start justify-center w-full h-full p-10 lg:p-16 xl:p-24"
          >
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
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
