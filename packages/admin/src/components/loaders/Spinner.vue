<script lang="ts" setup>
defineProps<{
  primary?: boolean;
  secondary?: boolean;
}>();
</script>
<template>
  <div class="flex">
    <div class="relative">
      <div
        class="w-8 h-8 rounded-full absolute border-2 border-solid border-gray-200"
      ></div>
      <div
        :class="{ 'border-indigo-500': primary }"
        class="w-8 h-8 rounded-full animate-spin absolute border-2 border-solid border-t-transparent"
      ></div>
    </div>
  </div>
</template>
