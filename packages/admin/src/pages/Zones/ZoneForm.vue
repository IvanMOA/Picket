<script lang="ts" setup>
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElCheckbox,
} from "element-plus";
import { useI18n } from "vue-i18n";
import { useQuery } from "vue-query";
import { postgrestClient } from "@/clients/postgrestClient";
const props = defineProps<{
  handleSubmit: () => Promise<unknown>;
  isSubmitting: boolean;
  submitBtnText: string;
  disabled?: boolean;
  name: string;
  capacity: number;
  soldTickets: number;
  active: boolean;
}>();
const { t } = useI18n();
</script>
<template>
  <ElForm
    @submit.prevent="handleSubmit"
    class="w-full flex flex-col"
    label-position="top"
  >
    <ElFormItem :label="t('name')">
      <ElInput
        :disabled="disabled"
        data-testid="name-input"
        :modelValue="name"
        @update:modelValue="(newValue) => $emit('update:name', newValue)"
      ></ElInput>
    </ElFormItem>
    <ElFormItem :label="t('capacity')">
      <ElInput
        type="number"
        min="0"
        :disabled="disabled"
        data-testid="capacity-input"
        :modelValue="capacity"
        @update:modelValue="(newValue) => $emit('update:capacity', newValue)"
      ></ElInput>
    </ElFormItem>
    <ElFormItem :label="t('sold_tickets')">
      <ElInput
        disabled
        data-testid="sold-tickets-input"
        :modelValue="soldTickets"
      ></ElInput>
    </ElFormItem>
    <ElCheckbox
      :label="t('active')"
      :disabled="disabled"
      data-testid="active-input"
      type=""
      :modelValue="active"
      @update:modelValue="(newValue) => $emit('update:active', newValue)"
    />
    <ElButton
      :disabled="isSubmitting"
      data-testid="submit-btn"
      type="primary"
      class="w-full mt-4"
      @click="handleSubmit"
    >
      {{ submitBtnText }}
    </ElButton>
  </ElForm>
</template>
