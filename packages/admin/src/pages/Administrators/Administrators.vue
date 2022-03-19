<script lang="ts" setup>
import AdminLayout from "@/layouts/AdminLayout/AdminLayout.vue";
import { ElButton, ElTableColumn, ElDialog } from "element-plus";
import EntityTable from "@/components/entity-table/EntityTable.vue";
import { useLoggedInUser } from "@/stores/UserStore";
import { ref } from "vue";
import { AdministratorDTO } from "@picket/shared";
import DeleteAdministratorForm from "@/pages/Administrators/DeleteAdministratorForm.vue";
const isDialogOpen = ref(false);
type AdministratorDialogAction = "UPDATE" | "DELETE";
const dialogType = ref<AdministratorDialogAction>("UPDATE");
const { user } = useLoggedInUser();
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const selectedAdministratorForModal = ref<AdministratorDTO | null>();
const deleteAdministrator = async (a) => {
  await sleep(1000);
  console.log(a);
};
const openDialog = (
  newDialogType: AdministratorDialogAction,
  administrator: AdministratorDTO
) => {
  selectedAdministratorForModal.value = administrator;
  isDialogOpen.value = true;
  dialogType.value = newDialogType;
};
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
                @click.prevent="() => openDialog('DELETE', scope.row)"
              >
                Remove
              </ElButton>
            </template>
          </ElTableColumn>
        </template>
      </EntityTable>
      <ElDialog v-model="isDialogOpen" width="30%">
        <template #title>
          <div class="">
            {{
              dialogType === "UPDATE"
                ? "Actualizar información"
                : "Eliminar administrador"
            }}
          </div>
        </template>
        <DeleteAdministratorForm
          v-if="selectedAdministratorForModal"
          :administratorDTO="selectedAdministratorForModal"
        />
        <template #footer>
          <ElButton type="primary">Eliminar</ElButton>
        </template>
      </ElDialog>
    </div>
  </AdminLayout>
</template>
