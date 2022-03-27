<script lang="ts" setup>
import AdminLayout from "@/layouts/AdminLayout/AdminLayout.vue";
import { useI18n } from "vue-i18n";
import { Ticket } from "@element-plus/icons-vue";
import { useQuery } from "vue-query";
import { postgrestClient } from "@/clients/postgrestClient";
const { t } = useI18n();
// const { } = useQuery('dashboard_statistics', async () => {
//   try {
//     await postgrestClient.
//   }catch (e) {
//     alert(e)
//   }
// })
</script>
<template>
  <AdminLayout>
    <h1 class="text-4xl font-semibold text-gray-800 dark:text-white">
      {{ t("dashboard_welcome", { name: "Axel" }) }}
    </h1>
    <h2 class="text-md text-gray-400">
      {{ t("dashboard_description") }}
    </h2>
    <div
      class="flex my-6 items-center w-full space-y-4 md:space-x-4 md:space-y-0 flex-col md:flex-row"
    >
      <div class="flex items-center w-full md:w-1/2 space-x-4">
        <div class="w-1/2">
          <div
            class="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-700 relative"
          >
            <p class="text-2xl text-black dark:text-white font-bold">$93.76</p>
            <p class="text-gray-400 text-sm">{{ t("sold_tickets") }}</p>
            <span
              class="rounded-full absolute flex justify-center items-center p-4 bg-violet-700 top-2 right-4"
            >
              <Ticket class="h-4 w-4 text-violet-100 absolute" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
