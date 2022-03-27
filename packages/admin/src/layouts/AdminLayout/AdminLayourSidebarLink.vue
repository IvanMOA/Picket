<script lang="ts" setup>
import type { Component } from "vue";
import { useRouter } from "vue-router";
import { computed } from "vue";
const props = defineProps<{
  icon: Component;
  name: string;
  to: string;
}>();
const router = useRouter();
const isInThisRoute = computed(() =>
  router.currentRoute.value.fullPath.includes(props.to)
);
</script>
<template>
  <router-link
    :class="{
      'border-violet-700': isInThisRoute,
      'border-transparent': !isInThisRoute,
    }"
    :to="to"
    class="w-full text-gray-400 flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start hover:text-gray-800 border-l-4"
  >
    <span class="text-left">
      <component :is="props.icon" class="h-4 w-4" style="width: 16px" />
    </span>
    <span class="mx-4 text-sm font-normal"> {{ name }} </span>
  </router-link>
</template>
