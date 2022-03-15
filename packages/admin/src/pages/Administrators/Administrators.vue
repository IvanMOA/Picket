<script lang="ts" setup>
import AdminLayout from "@/layouts/AdminLayout/AdminLayout.vue";
import { ElButton, ElTableColumn } from "element-plus";
import EntityTable from "@/components/entity-table/EntityTable.vue";
import { useLoggedInUser } from "@/stores/UserStore";
const { user } = useLoggedInUser();
</script>
<template>
  <AdminLayout>
    <div class="shadow-md bg-white w-full h-full rounded-md">
      <div class="px-6 py-3 border-b-2 border-gray-100">
        <h1 class="mb-1 font-bold text-gray-500">
          {{ $t("users_section_title") }}
        </h1>
        <p class="text-sm text-gray-400">
          {{
            $t(
              user.role === "SUPERADMIN"
                ? "users_section_superadmin_description"
                : "users_section_admin_description"
            )
          }}
        </p>
      </div>
      <EntityTable
        base-route="/users"
        entity-route="/administrators"
        fts-column-name="name"
      >
        <template v-slot:columns>
          <ElTableColumn :label="$t('name')" prop="name" />
          <ElTableColumn :label="$t('email')" prop="email" />
          <ElTableColumn :label="$t('actions')">
            <template #default="scope">
              <ElButton
                size="small"
                type="text"
                @click.prevent="deleteRow(scope.$index)"
              >
                Remove
              </ElButton>
            </template>
          </ElTableColumn>
        </template>
      </EntityTable>
    </div>
  </AdminLayout>
</template>
<style>
.scale-out-enter-active {
  transition: all 0.2s cubic-bezier(0.18, 0.87, 0.51, 1.04);
  transform: scale(1);
}

.scale-out-leave-active {
  transition: all 0.4s cubic-bezier(0.18, 0.87, 0.51, 1.04);
  transform: scale(1);
}

.scale-out-enter-from,
.scale-out-leave-to {
  transform: scale(0.7);
}
</style>
