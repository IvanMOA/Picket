<script lang="ts" setup>
import AdminLayoutSidebar from "@/layouts/AdminLayout/AdminLayoutSidebar.vue";
import AdminLayoutTopbar from "@/layouts/AdminLayout/AdminLayoutTopbar.vue";
import { ref } from "vue";
const isSidebarOpen = ref(true);
</script>
<!-- Link de la plantilla: https://www.tailwind-kit.com/templates/datadashboard -->
<template>
  <main class="bg-gray-100 dark:bg-gray-800 h-screen overflow-hidden relative">
    <div class="flex items-start justify-between">
      <AdminLayoutSidebar :isOpen="isSidebarOpen" @close="isSidebarOpen = false" />
      <div class="flex flex-col w-full md:space-y-4">
        <header class="w-full h-16 z-40 flex items-center justify-between">
          <div class="block lg:hidden ml-6">
            <button class="flex p-2 items-center rounded-full bg-white shadow text-gray-500 text-md"
                    @click="isSidebarOpen = true">
              <svg class="text-gray-400" fill="currentColor" height="20" viewBox="0 0 1792 1792" width="20"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z">
                </path>
              </svg>
            </button>
          </div>
          <AdminLayoutTopbar />
        </header>
        <div class="overflow-auto h-screen pb-24 px-4 md:px-6">
          <slot></slot>
        </div>
      </div>
    </div>
  </main>

</template>