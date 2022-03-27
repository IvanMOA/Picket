<script lang="ts" setup>
import AdminLayoutSidebarLink from "@/layouts/AdminLayout/AdminLayourSidebarLink.vue";
import {
  CaretLeft,
  Histogram,
  User,
  School,
  Star,
  Place,
} from "@element-plus/icons-vue";
import { ElButton } from "element-plus";
import { useI18n } from "vue-i18n";
import { useLoggedInUser } from "@/stores/UserStore";
const props = defineProps<{
  isOpen: boolean;
}>();
const { t } = useI18n();
const { user } = useLoggedInUser();
</script>

<template>
  <div
    :class="{ 'transform -translate-x-full': !isOpen }"
    class="h-screen absolute z-50 shadow-lg w-[80vw] sm:relative sm:block sm:w-80"
  >
    <div class="bg-white h-full dark:bg-gray-700">
      <div class="flex items-center px-4 pt-6">
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
            :name="t('statistics_section_title')"
            data-testid="statistics-section-link"
            to="/dashboard"
          />
          <AdminLayoutSidebarLink
            :icon="User"
            :name="t('users_section_title')"
            data-testid="users-section-link"
            to="/users"
          />
          <AdminLayoutSidebarLink
            v-if="user.role === 'superadmin'"
            :icon="School"
            :name="t('dependencies_section_title')"
            data-testid="dependencies-section-link"
            to="/dependencies"
          />
          <AdminLayoutSidebarLink
            v-if="user.role === 'admin'"
            :icon="Star"
            :name="t('events_section_title')"
            data-testid="events-section-link"
            to="/events"
          />
          <AdminLayoutSidebarLink
            v-if="user.role === 'superadmin'"
            :icon="Place"
            :name="t('places_section_title')"
            data-testid="places-section-link"
            to="/places"
          />
        </div>
      </nav>
    </div>
  </div>
</template>
