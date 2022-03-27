<script setup>
import RoutesGuard from "@/components/routes-guard/RoutesGuard.vue";
</script>
<template>
  <RoutesGuard>
    <router-view></router-view>
  </RoutesGuard>
</template>
