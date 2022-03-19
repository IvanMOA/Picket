<script lang="ts" setup>
import AdminLayout from "@/layouts/AdminLayout/AdminLayout.vue";
import { ElButton, ElTableColumn, ElDialog } from "element-plus";
import EntityTable from "@/components/entity-table/EntityTable.vue";
import { useLoggedInUser } from "@/stores/UserStore";
import { ref } from "vue";
import { DependencyDTO } from "@picket/shared";
import CreateDependencyForm from "@/pages/Dependencies/CreateDependencyForm.vue";
import DeleteDependencyForm from "@/pages/Dependencies/DeleteDependencyForm.vue";
import UpdateDependencyForm from "@/pages/Dependencies/UpdateDependencyForm.vue";
import { useI18n } from "vue-i18n";
const isDialogOpen = ref(false);
type DependencyDialogAction = "CREATE" | "UPDATE" | "DELETE";
const dialogType = ref<DependencyDialogAction>("UPDATE");
const { user } = useLoggedInUser();
const { t } = useI18n();
const selectedDependencyForModal = ref<DependencyDTO | null>();
const openDialog = (
  newDialogType: DependencyDialogAction,
  dependencyDTO?: DependencyDTO
) => {
  selectedDependencyForModal.value = dependencyDTO ?? null;
  isDialogOpen.value = true;
  dialogType.value = newDialogType;
};
const closeDialog = () => {
  isDialogOpen.value = false;
};
</script>
<template>
  <AdminLayout>
    <div class="shadow-md bg-white w-full h-full rounded-md">
      <div
        class="px-6 py-3 border-b-2 border-gray-100 flex flex-row justify-between items-center"
      >
        <div>
          <h1 class="mb-1 font-bold text-gray-500">
            {{ t("dependencies_section_title") }}
          </h1>
          <p class="text-sm text-gray-400">
            {{ t("dependencies_section_description") }}
          </p>
        </div>
        <ElButton
          @click="openDialog('CREATE')"
          data-testid="create-dependency-btn"
          type="primary"
          >{{ t("create") }}</ElButton
        >
      </div>
      <EntityTable
        base-route="/dependencies"
        entity-route="/dependencies"
        fts-column-name="name"
      >
        <template v-slot:columns>
          <ElTableColumn :label="t('name')" prop="name" />
          <ElTableColumn :label="t('actions')">
            <template #default="scope">
              <ElButton
                data-testid="delete-dependency-btn"
                size="small"
                type="text"
                @click.prevent="() => openDialog('DELETE', scope.row)"
              >
                {{ t("delete") }}
              </ElButton>
              <ElButton
                data-testid="edit-dependency-btn"
                size="small"
                type="text"
                @click.prevent="() => openDialog('UPDATE', scope.row)"
              >
                {{ t("update") }}
              </ElButton>
            </template>
          </ElTableColumn>
        </template>
      </EntityTable>
      <ElDialog v-model="isDialogOpen" width="30%">
        <template #title>
          <h1 v-if="dialogType === 'CREATE'">
            {{ t("create_dependency") }}
          </h1>
          <h1 v-if="dialogType === 'UPDATE'">
            {{ t("update_dependency") }}
          </h1>
          <h1 v-if="dialogType === 'DELETE'">
            {{ t("delete_dependency") }}
          </h1>
        </template>
        <CreateDependencyForm
          v-if="dialogType === 'CREATE'"
          @submitted="closeDialog"
        />
        <DeleteDependencyForm
          v-if="dialogType === 'DELETE'"
          :dependency-DTO="selectedDependencyForModal"
          @submitted="closeDialog"
        />
        <UpdateDependencyForm
          v-if="dialogType === 'UPDATE'"
          :dependency-DTO="selectedDependencyForModal"
          @submitted="closeDialog"
        />
      </ElDialog>
    </div>
  </AdminLayout>
</template>
