<script lang="ts" setup>
import AdminLayout from "@/layouts/AdminLayout/AdminLayout.vue";
import { ElButton, ElTableColumn, ElDialog } from "element-plus";
import { Menu } from "@element-plus/icons-vue";
import EntityTable from "@/components/entity-table/EntityTable.vue";
import { useLoggedInUser } from "@/stores/UserStore";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { PlaceDTO } from "@picket/shared/dist/dts/dtos/PlaceDTO";
import CreatePlaceForm from "@/pages/Places/CreatePlaceForm.vue";
import UpdatePlaceForm from "@/pages/Places/UpdatePlaceForm.vue";
import DeletePlaceForm from "@/pages/Places/DeletePlaceForm.vue";
import CreateEventForm from "@/pages/Events/CreateEventForm.vue";
import UpdateEventForm from "@/pages/Events/UpdateEventForm.vue";
import DeleteEventForm from "@/pages/Events/DeleteEventForm.vue";
const isDialogOpen = ref(false);
type PlaceDialogAction = "CREATE" | "UPDATE" | "DELETE" | "SEE_SVG";
const dialogType = ref<PlaceDialogAction>("UPDATE");
const { user } = useLoggedInUser();
const { t, d } = useI18n();
const selectedEventForModal = ref<PlaceDTO | null>();
const openDialog = (newDialogType: PlaceDialogAction, place?: PlaceDTO) => {
  selectedEventForModal.value = place;
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
            {{ t("events_section_title") }}
          </h1>
          <p class="text-sm text-gray-400">
            {{ t("events_section_description") }}
          </p>
        </div>
        <ElButton
          @click="openDialog('CREATE')"
          data-testid="create-event-btn"
          type="primary"
          >{{ t("create") }}</ElButton
        >
      </div>
      <EntityTable
        base-route="/events"
        entity-route="/events"
        fts-column-name="name"
      >
        <template v-slot:columns>
          <ElTableColumn :label="t('name')" prop="name" />
          <ElTableColumn :label="t('date_starts_at')">
            <template #default="scope">
              <p>{{ d(new Date(scope.row.starts_at), "long") }}</p>
            </template>
          </ElTableColumn>
          <ElTableColumn :label="t('zones')">
            <template #default="scope">
              <ElButton
                size="small"
                type="text"
                data-testid="see-event-zones-link"
              >
                <router-link :to="`/events/${scope.row.id}/zones`">
                  {{ t("see_zones") }}
                </router-link>
              </ElButton>
            </template>
          </ElTableColumn>
          <ElTableColumn :label="t('actions')">
            <template #default="scope">
              <ElButton
                size="small"
                type="text"
                @click.prevent="() => openDialog('DELETE', scope.row)"
                data-testid="delete-event-btn"
              >
                {{ t("delete") }}
              </ElButton>
              <ElButton
                size="small"
                type="text"
                @click.prevent="() => openDialog('UPDATE', scope.row)"
                data-testid="update-event-btn"
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
              {{ t("create_event") }}
            </h1>
            <h1 v-if="dialogType === 'UPDATE'">
              {{ t("update_event") }}
            </h1>
            <h1 v-if="dialogType === 'DELETE'">
              {{ t("delete_event") }}
            </h1>
          </div>
        </template>
        <CreateEventForm
          @submitted="closeDialog"
          v-if="dialogType === 'CREATE'"
        />
        <DeleteEventForm
          :key="selectedEventForModal.id"
          @submitted="closeDialog"
          v-if="dialogType === 'DELETE'"
          :eventDTO="selectedEventForModal"
        />
        <UpdateEventForm
          :key="selectedEventForModal.id"
          @submitted="closeDialog"
          v-if="dialogType === 'UPDATE'"
          :eventDTO="selectedEventForModal"
        />
      </ElDialog>
    </div>
  </AdminLayout>
</template>
