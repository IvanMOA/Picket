<script lang="ts" setup>
import AdminLayoutSidebarLink from "@/layouts/AdminLayout/AdminLayourSidebarLink.vue";
import { CaretLeft, Histogram, UserFilled } from "@element-plus/icons-vue";
import { ElButton } from "element-plus";
const props = defineProps<{
  isOpen: boolean;
}>();
</script>

<template>
  <div
    :class="{ 'transform -translate-x-full': !isOpen }"
    class="h-screen absolute z-50 shadow-lg w-[80vw] sm:relative sm:block sm:w-80"
  >
    <div class="bg-white h-full dark:bg-gray-700">
      <div class="flex items-center justify-between pt-6 ml-8 pr-4">
        <p class="font-bold dark:text-white text-xl">Picket</p>
        <ElButton
          :icon="CaretLeft"
          circle
          class="mr-4 sm:hidden"
          size="small"
          @click="$emit('close')"
        >
        </ElButton>
      </div>
      <nav class="mt-6">
        <div>
          <AdminLayoutSidebarLink
            :icon="Histogram"
            :name="$t('statistics_section_title')"
            to="/dashboard"
          />
          <AdminLayoutSidebarLink
            :icon="UserFilled"
            :name="$t('users_section_title')"
            to="/users"
          />
        </div>
      </nav>
    </div>
  </div>
</template>
