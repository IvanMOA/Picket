<script lang="ts" setup>
import AdminLayout from "@/layouts/AdminLayout/AdminLayout.vue";
import { ElButton, ElDialog, ElTableColumn } from "element-plus";
import EntityTable from "@/components/entity-table/EntityTable.vue";
import { useLoggedInUser } from "@/stores/UserStore";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import CreateZoneForm from "@/pages/Zones/CreateZoneForm.vue";
import UpdateZoneForm from "@/pages/Zones/UpdateZoneForm.vue";
import { ZoneDTO } from "@picket/shared";
import DeleteZoneForm from "@/pages/Zones/DeleteZoneForm.vue";
const isDialogOpen = ref(false);
type PlaceDialogAction = "CREATE" | "UPDATE" | "DELETE" | "SEE_SVG";
const dialogType = ref<PlaceDialogAction>("UPDATE");
const { user } = useLoggedInUser();
const { t, d } = useI18n();
const router = useRouter();
const eventIdFromParams = router.currentRoute.value.params.eventId;
const selectedZoneForModal = ref<ZoneDTO | null>();
const openDialog = (newDialogType: PlaceDialogAction, place?: ZoneDTO) => {
  selectedZoneForModal.value = place;
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
            {{ t("zones_section_title") }}
          </h1>
          <p class="text-sm text-gray-400">
            {{ t("zones_section_description") }}
          </p>
        </div>
        <ElButton
          @click="openDialog('CREATE')"
          data-testid="create-zone-btn"
          type="primary"
          >{{ t("create") }}</ElButton
        >
      </div>
      <EntityTable
        base-route="/zones"
        entity-route="/zones"
        :params="{ event_id: `eq.${eventIdFromParams}` }"
        fts-column-name="name"
      >
        <template v-slot:columns>
          <ElTableColumn :label="t('name')" prop="name" />
          <ElTableColumn :label="t('capacity')" prop="capacity" />
          <ElTableColumn :label="t('sold_tickets')" prop="sold_tickets" />
          <ElTableColumn :label="t('actions')">
            <template #default="scope">
              <ElButton
                size="small"
                type="text"
                @click.prevent="() => openDialog('DELETE', scope.row)"
                data-testid="delete-zone-btn"
              >
                {{ t("delete") }}
              </ElButton>
              <ElButton
                size="small"
                type="text"
                @click.prevent="() => openDialog('UPDATE', scope.row)"
                data-testid="update-zone-btn"
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
              {{ t("create_zone") }}
            </h1>
            <h1 v-if="dialogType === 'UPDATE'">
              {{ t("update_zone") }}
            </h1>
            <h1 v-if="dialogType === 'DELETE'">
              {{ t("delete_zone") }}
            </h1>
          </div>
        </template>
        <CreateZoneForm
          @submitted="closeDialog"
          v-if="dialogType === 'CREATE'"
          :event-id="eventIdFromParams"
        />
        <DeleteZoneForm
          :key="selectedZoneForModal.id"
          @submitted="closeDialog"
          v-if="dialogType === 'DELETE'"
          :zoneDTO="selectedZoneForModal"
        />
        <UpdateZoneForm
          :key="selectedZoneForModal.id"
          @submitted="closeDialog"
          v-if="dialogType === 'UPDATE'"
          :zoneDTO="selectedZoneForModal"
        />
      </ElDialog>
    </div>
  </AdminLayout>
</template>
