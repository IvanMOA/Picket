<script lang="ts" setup>
import TopbarLink from "@/components/topbar/TopbarLink.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <section class="relative w-full px-8 text-gray-700 bg-white body-font">
    <div
      class="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl"
    >
      <img class="h-10 mb-4" src="/images/Logo.png" />
      <nav
        class="top-0 left-0 z-0 flex items-center justify-center w-full h-full py-5 -ml-0 space-x-5 text-base md:-ml-5 md:py-0 md:absolute"
      >
        <TopbarLink to="/">
          {{ t("home") }}
        </TopbarLink>
        <TopbarLink to="/tickets">
          {{ t("my_tickets") }}
        </TopbarLink>
      </nav>
      <div
        class="relative z-10 inline-flex items-center space-x-3 md:ml-5 lg:justify-end"
      ></div>
    </div>
  </section>
</template>
