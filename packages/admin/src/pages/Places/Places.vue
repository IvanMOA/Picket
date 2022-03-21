<script lang="ts" setup>
import AdminLayout from "@/layouts/AdminLayout/AdminLayout.vue";
import { ElButton, ElTableColumn, ElDialog } from "element-plus";
import EntityTable from "@/components/entity-table/EntityTable.vue";
import { useLoggedInUser } from "@/stores/UserStore";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { PlaceDTO } from "@picket/shared/dist/dts/dtos/PlaceDTO";
import CreatePlaceForm from "@/pages/Places/CreatePlaceForm.vue";
import UpdatePlaceForm from "@/pages/Places/UpdatePlaceForm.vue";
import DeletePlaceForm from "@/pages/Places/DeletePlaceForm.vue";
const isDialogOpen = ref(false);
type PlaceDialogAction = "CREATE" | "UPDATE" | "DELETE" | "SEE_SVG";
const dialogType = ref<PlaceDialogAction>("UPDATE");
const { user } = useLoggedInUser();
const { t } = useI18n();
const selectedPlaceForModal = ref<PlaceDTO | null>();
const openDialog = (newDialogType: PlaceDialogAction, place?: PlaceDTO) => {
  selectedPlaceForModal.value = place;
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
            {{ t("places_section_title") }}
          </h1>
          <p class="text-sm text-gray-400">
            {{ t("places_section_description") }}
          </p>
        </div>
        <ElButton
          @click="openDialog('CREATE')"
          data-testid="create-place-btn"
          type="primary"
          >{{ t("create") }}</ElButton
        >
      </div>
      <EntityTable
        base-route="/places"
        entity-route="/places"
        fts-column-name="name"
      >
        <template v-slot:columns>
          <ElTableColumn :label="t('name')" prop="name" />
          <ElTableColumn :label="t('address')" prop="address" />
          <ElTableColumn :label="t('actions')">
            <template #default="scope">
              <ElButton
                size="small"
                type="text"
                @click.prevent="() => openDialog('DELETE', scope.row)"
                data-testid="delete-place-btn"
              >
                {{ t("delete") }}
              </ElButton>
              <ElButton
                size="small"
                type="text"
                @click.prevent="() => openDialog('UPDATE', scope.row)"
                data-testid="update-place-btn"
              >
                {{ t("update") }}
              </ElButton>
              <ElButton
                size="small"
                type="text"
                @click.prevent="() => openDialog('SEE_SVG', scope.row)"
                data-testid="see-place-svg-btn"
              >
                {{ t("see_svg") }}
              </ElButton>
            </template>
          </ElTableColumn>
        </template>
      </EntityTable>
      <ElDialog
        v-model="isDialogOpen"
        v-if="dialogType !== 'SEE_SVG'"
        width="30%"
      >
        <template #title>
          <div class="">
            <h1 v-if="dialogType === 'CREATE'">
              {{ t("create_place") }}
            </h1>
            <h1 v-if="dialogType === 'UPDATE'">
              {{ t("update_place") }}
            </h1>
            <h1 v-if="dialogType === 'DELETE'">
              {{ t("delete_place") }}
            </h1>
          </div>
        </template>
        <CreatePlaceForm
          @submitted="closeDialog"
          v-if="dialogType === 'CREATE'"
        />
        <DeletePlaceForm
          :key="selectedPlaceForModal.id"
          @submitted="closeDialog"
          v-if="dialogType === 'DELETE'"
          :placeDTO="selectedPlaceForModal"
        />
        <UpdatePlaceForm
          :key="selectedPlaceForModal.id"
          @submitted="closeDialog"
          v-if="dialogType === 'UPDATE'"
          :placeDTO="selectedPlaceForModal"
        />
      </ElDialog>
      <ElDialog
        v-model="isDialogOpen"
        v-if="dialogType === 'SEE_SVG'"
        width="30%"
        :title="t('selected_svg')"
      >
        <div v-if="dialogType === 'SEE_SVG'">
          <img
            :src="`http://localhost:4004/storage/${selectedPlaceForModal.sections_svg_filename}`"
          />
        </div>
      </ElDialog>
    </div>
  </AdminLayout>
</template>
