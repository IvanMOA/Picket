<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const props = defineProps<{
  errors?: string[]
}>();
const { t } = useI18n();
</script>

<template>
  <small v-if="props.errors" class="text-red-600">
    {{ props.errors.map(error => t(`errors.${error}`)).join(". ") }}
  </small>
</template>