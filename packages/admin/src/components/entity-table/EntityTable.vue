<script lang="ts" setup>
import { useRouter } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";
import { refDebounced } from "@vueuse/core";
import { useQuery, useQueryClient } from "vue-query";
import { postgrestClient } from "@/clients/postgrestClient";
import {
  ElTable,
  ElInput,
  ElTableColumn,
  ElButton,
  ElPagination,
} from "element-plus";
import { Search } from "@element-plus/icons-vue";
import Spinner from "@/components/loaders/Spinner.vue";
const props = defineProps<{
  entityRoute: string;
  ftsColumnName: string;
  baseRoute: string;
}>();
const router = useRouter();
const queryClient = useQueryClient();
const defaultData = new Array(10).fill({
  email: "-",
  name: "-",
});
const searchTerm = ref(router.currentRoute.value.query.search ?? "");
const searchTermDebounced = refDebounced(searchTerm, 700);
const firstFetchTotalPages = ref(0);
const currentPage = computed(() => {
  const currentPageQueryParam = router.currentRoute.value.query.page;
  return currentPageQueryParam ? Number(currentPageQueryParam) : 1;
});
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
watch(searchTermDebounced, (value) => {
  // totalPages.value = 0;
  router.push({
    path: `${props.baseRoute}`,
    query: {
      page: 1,
      search: value,
    },
  });
});
const { data, isFetching, isError } = useQuery(
  [props.entityRoute, currentPage, searchTermDebounced],
  async () => {
    const params: Record<string, string> = {};
    if (searchTermDebounced.value !== "")
      params.name = `fts.${encodeURIComponent(
        String(searchTermDebounced.value)
      )}:*`;
    const { data: _data, headers } = await postgrestClient.get(
      `${props.entityRoute}?limit=10&offset=${10 * (currentPage.value - 1)}`,
      {
        headers: {
          Prefer: "count=exact",
        },
        params,
      }
    );
    const totalEntities = Number(headers["content-range"].split("/")[1]);
    firstFetchTotalPages.value = totalEntities;
    return {
      entities: _data,
      totalEntities,
    };
  },
  {
    refetchOnWindowFocus: false,
    staleTime: 10 * 60 * 1000,
  }
);
const navigateToNewPage = (newPage: number) => {
  router.push(`${props.baseRoute}?page=${newPage}`);
};
onMounted(() => {
  console.log("ok");
  queryClient.invalidateQueries({ queryKey: [props.entityRoute] });
});
</script>

<template>
  <div class="px-4 mt-4 mb-1 w-1/3 ml-auto">
    <ElInput
      v-model="searchTerm"
      :placeholder="$t('search')"
      class="input-with-select"
    >
      <template #prepend>
        <ElButton :icon="Search" />
      </template>
    </ElInput>
  </div>
  <div class="px-4 py-4 relative w-full">
    <div
      v-if="isFetching"
      class="bg-indigo-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
    >
      <Spinner primary />
    </div>
    <ElTable
      :cell-class-name="isFetching && 'opacity-40'"
      :data="isFetching && !data?.entities ? defaultData : data.entities"
      border
      class="relative"
      style="width: 100%"
    >
      <slot name="columns"></slot>
    </ElTable>
    <div class="mt-2 w-full flex justify-end">
      <ElPagination
        :total="data?.totalEntities ?? firstFetchTotalPages"
        background
        layout="prev, pager, next"
        @current-change="navigateToNewPage"
      />
    </div>
  </div>
</template>
