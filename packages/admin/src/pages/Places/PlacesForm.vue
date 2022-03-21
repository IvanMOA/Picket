<script lang="ts" setup>
import { ElButton, ElForm, ElFormItem, ElInput, ElUpload } from "element-plus";
import { Close } from "@element-plus/icons-vue";
import { useI18n } from "vue-i18n";
import { append, remove } from "ramda";
import { computed } from "vue";
const props = defineProps<{
  handleSubmit: () => Promise<unknown>;
  isSubmitting: boolean;
  submitBtnText: string;
  disabled?: boolean;
  name?: string;
  address?: string;
  latitude?: string;
  longitude?: string;
  sectionsSvgFiles?: File[];
  zonesTemplate?: { name: string }[];
}>();
const emit = defineEmits(["update:zonesTemplate", "update:sectionsSvgFiles"]);
const { t } = useI18n();
const handleFileListChange = (e: any) => {
  emit("update:sectionsSvgFiles", [e.raw]);
};
const clearFileList = () => {
  emit("update:sectionsSvgFiles", []);
};
const removeZone = (index: number) => {
  emit("update:zonesTemplate", remove(index, 1, props.zonesTemplate));
};
const addZone = () => {
  emit("update:zonesTemplate", append({ name: "" }, props.zonesTemplate));
};
const zonesTemplateValue = computed({
  get() {
    return props.zonesTemplate;
  },
  set(value) {
    emit("update:zonesTemplate", value);
  },
});
const updateZoneTemplateValue = (newName: string, index: number) => {
  const newValue = [...(props.zonesTemplate ?? [])];
  newValue[index].name = newName;
  zonesTemplateValue.value = newValue;
};
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
    <ElFormItem :label="t('address')">
      <ElInput
        :disabled="disabled"
        data-testid="address-input"
        :modelValue="address"
        @update:modelValue="(newValue) => $emit('update:address', newValue)"
      ></ElInput>
    </ElFormItem>
    <ElFormItem :label="t('latitude')">
      <ElInput
        :disabled="disabled"
        data-testid="latitude-input"
        :modelValue="latitude"
        @update:modelValue="(newValue) => $emit('update:latitude', newValue)"
      ></ElInput>
    </ElFormItem>
    <ElFormItem :label="t('longitude')">
      <ElInput
        :disabled="disabled"
        data-testid="longitude-input"
        :modelValue="longitude"
        @update:modelValue="(newValue) => $emit('update:longitude', newValue)"
      ></ElInput>
    </ElFormItem>
    <ElFormItem :label="t('zones')">
      <ElInput
        v-for="(zone, i) of zonesTemplate"
        :disabled="disabled"
        data-testid="zone-name-input"
        :modelValue="zone.name"
        :key="zone + i"
        @update:modelValue="(newValue) => updateZoneTemplateValue(newValue, i)"
        class="mb-2"
      >
        <template #append>
          <ElButton @click="removeZone(i)" :icon="Close" />
        </template>
      </ElInput>
      <h1 v-if="zonesTemplate?.length === 0" class="text-gray-400 italic">
        Sin zonas
      </h1>
    </ElFormItem>
    <ElButton
      v-if="!disabled"
      data-testid="submit-btn"
      class="w-full mb-4"
      @click="addZone"
    >
      {{ t("add_zone") }}
    </ElButton>
    <ElUpload
      v-if="sectionsSvgFiles"
      :on-change="handleFileListChange"
      :on-remove="clearFileList"
      :limit="1"
      :auto-upload="false"
      class="flex flex-col"
    >
      <template #trigger>
        <ElButton class="w-full">{{ t("select_file") }}</ElButton>
      </template>
      <div></div>
      <template #tip></template>
    </ElUpload>
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
