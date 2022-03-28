<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const props = defineProps<{ ticket: any; ticketIndex: number }>();
import { useQRCode } from "@vueuse/integrations/useQRCode";
import { ref } from "vue";
const { t } = useI18n();
const text = ref(props.ticket.id);
const qrcode = useQRCode(text);
</script>

<template>
  <div class="shadow-inner p-4 flex flex-col items-center justify-between">
    <div>
      <h1 class="text-gray-800">Ticket #{{ ticketIndex + 1 }}</h1>
      <p class="text-gray-600">{{ t("zone") }}: {{ ticket.zones.name }}</p>
    </div>
    <img :src="qrcode" />
  </div>
</template>
