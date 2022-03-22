<script lang="ts" setup>
import AdminLayout from "@/layouts/AdminLayout/AdminLayout.vue";
import { ElButton, ElTableColumn, ElDialog } from "element-plus";
import EntityTable from "@/components/entity-table/EntityTable.vue";
import { useLoggedInUser } from "@/stores/UserStore";
import { ref } from "vue";
import { AdministratorDTO } from "@picket/shared";
import DeleteAdministratorForm from "@/pages/Administrators/DeleteAdministratorForm.vue";
import { useI18n } from "vue-i18n";
import CreateAdministratorForm from "@/pages/Administrators/CreateAdministratorForm.vue";
import UpdateAdministratorForm from "@/pages/Administrators/UpdateAdministratorForm.vue";
const isDialogOpen = ref(false);
type AdministratorDialogAction = "CREATE" | "UPDATE" | "DELETE";
const dialogType = ref<AdministratorDialogAction>("UPDATE");
const { user } = useLoggedInUser();
const { t } = useI18n();
const selectedAdministratorForModal = ref<AdministratorDTO | null>();
const openDialog = (
  newDialogType: AdministratorDialogAction,
  administrator?: AdministratorDTO
) => {
  selectedAdministratorForModal.value = administrator;
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
            {{ t("users_section_title") }}
          </h1>
          <p class="text-sm text-gray-400">
            {{
              t(
                user.role === "superadmin"
                  ? "users_section_superadmin_description"
                  : "users_section_admin_description"
              )
            }}
          </p>
        </div>
        <ElButton
          @click="openDialog('CREATE')"
          data-testid="create-administrator-btn"
          type="primary"
          >{{ t("create") }}</ElButton
        >
      </div>
      <EntityTable
        base-route="/users"
        entity-route="/administrators"
        :params="{
          select: '*,dependencies(name)',
        }"
        fts-column-name="name"
      >
        <template v-slot:columns>
          <ElTableColumn :label="t('name')" prop="name" />
          <ElTableColumn :label="t('email')" prop="email" />
          <ElTableColumn
            v-if="user.role === 'superadmin'"
            :label="t('dependency')"
          >
            <template #default="scope">
              <p class="break-normal">{{ scope.row?.dependencies?.name }}</p>
            </template>
          </ElTableColumn>
          <ElTableColumn :label="t('actions')">
            <template #default="scope">
              <ElButton
                size="small"
                type="text"
                @click.prevent="() => openDialog('DELETE', scope.row)"
                data-testid="delete-administrator-btn"
              >
                {{ t("delete") }}
              </ElButton>
              <ElButton
                size="small"
                type="text"
                @click.prevent="() => openDialog('UPDATE', scope.row)"
                data-testid="update-administrator-btn"
              >
                {{ t("update") }}
              </ElButton>
            </template>
          </ElTableColumn>
        </template>
      </EntityTable>
      <ElDialog v-model="isDialogOpen" width="30%">
        <template #title>
          <div class="">
            <h1 v-if="dialogType === 'CREATE'">
              {{ t("create_administrator") }}
            </h1>
            <h1 v-if="dialogType === 'UPDATE'">
              {{ t("update_administrator") }}
            </h1>
            <h1 v-if="dialogType === 'DELETE'">
              {{ t("delete_administrator") }}
            </h1>
          </div>
        </template>
        <CreateAdministratorForm
          @submitted="closeDialog"
          v-if="dialogType === 'CREATE'"
        />
        <DeleteAdministratorForm
          @submitted="closeDialog"
          v-if="dialogType === 'DELETE'"
          :administratorDTO="selectedAdministratorForModal"
        />
        <UpdateAdministratorForm
          @submitted="closeDialog"
          v-if="dialogType === 'UPDATE'"
          :administratorDTO="selectedAdministratorForModal"
        />
      </ElDialog>
    </div>
  </AdminLayout>
</template>
