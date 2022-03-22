<script lang="ts" setup>
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
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
  description: string;
  ticketsPerPerson: string;
  placeId: string;
  startsAt: Date;
  availableSince: Date;
  availableUntil: Date;
}>();
const { t } = useI18n();
const {
  data: places,
  isFetching: isFetchingPlaces,
  isError: placesFetchErrored,
} = useQuery(["/places"], async () => {
  const { data } = await postgrestClient.get(`/places`);
  return data;
});
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
    <ElFormItem :label="t('description')">
      <ElInput
        :disabled="disabled"
        data-testid="description-input"
        :modelValue="description"
        @update:modelValue="(newValue) => $emit('update:description', newValue)"
      ></ElInput>
    </ElFormItem>
    <ElFormItem :label="t('tickets_per_person')">
      <ElInput
        :disabled="disabled"
        data-testid="tickets-per-person-input"
        :modelValue="ticketsPerPerson"
        @update:modelValue="
          (newValue) => $emit('update:ticketsPerPerson', newValue)
        "
      ></ElInput>
    </ElFormItem>
    <ElFormItem :label="t('select_place')" class="w-full">
      <ElSelect
        class="w-full"
        :placeholder="t('select_place')"
        :disabled="isFetchingPlaces || disabled"
        :modelValue="placeId"
        @update:modelValue="(newValue) => $emit('update:placeId', newValue)"
        data-testid="place-select"
      >
        <ElOption
          v-for="place in places ?? []"
          :key="place.id"
          :label="place.name"
          :value="place.id"
        />
      </ElSelect>
    </ElFormItem>
    <ElFormItem :label="t('event_starts_at')">
      <ElInput
        :disabled="disabled"
        data-testid="starts-at-input"
        type="datetime-local"
        :modelValue="startsAt"
        @update:modelValue="(newValue) => $emit('update:startsAt', newValue)"
      ></ElInput>
    </ElFormItem>
    <ElFormItem :label="t('event_available_since')">
      <ElInput
        :disabled="disabled"
        data-testid="available-since-input"
        type="datetime-local"
        :modelValue="availableSince"
        @update:modelValue="
          (newValue) => $emit('update:availableSince', newValue)
        "
      ></ElInput>
    </ElFormItem>
    <ElFormItem :label="t('event_available_until')">
      <ElInput
        :disabled="disabled"
        data-testid="starts-at-input"
        type="datetime-local"
        :modelValue="availableUntil"
        @update:modelValue="
          (newValue) => $emit('update:availableUntil', newValue)
        "
      ></ElInput>
    </ElFormItem>
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
