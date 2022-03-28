<script lang="ts" setup>
import { ref } from "vue";
import { useElementHover } from "@vueuse/core";
const el = ref();
const isHovered = useElementHover(el);
</script>

<template>
  <router-link
    :to="to"
    ref="el"
    class="relative font-medium leading-6 text-gray-600 transition duration-150 ease-out hover:text-gray-900"
  >
    <span class="block">
      <slot></slot>
    </span>
    <div
      class="transition ease ease-out duration-200 duration-300 scale-0 scale-100"
    ></div>
    <span
      class="absolute bottom-0 left-0 inline-block w-full h-0.5 -mb-1 overflow-hidden"
    >
      <Transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="transform opacity-0 scale-75"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="duration-200 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-75"
      >
        <span
          v-if="isHovered"
          class="absolute inset-0 inline-block w-full h-1 h-full transform bg-gray-900"
        ></span>
      </Transition>
    </span>
  </router-link>
</template>
