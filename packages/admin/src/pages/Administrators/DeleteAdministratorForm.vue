<script lang="ts" setup>
import { AdministratorDTO } from "@picket/shared";
import { ElForm, ElFormItem, ElInput } from "element-plus";
const props = defineProps<{
  administratorDTO: AdministratorDTO;
}>();
</script>

<template>
  <div>
    <ElForm class="w-full flex flex-col" disabled label-position="top">
      <ElFormItem label="Correo">
        <ElInput v-model="props.administratorDTO.email"></ElInput>
      </ElFormItem>
      <ElFormItem label="Nombre">
        <ElInput v-model="props.administratorDTO.name"></ElInput>
      </ElFormItem>
      <ElFormItem label="Rol">
        <ElInput v-model="props.administratorDTO.role"></ElInput>
      </ElFormItem>
      <ElButton type="primary" @click="handleLogin"> Login</ElButton>
    </ElForm>
  </div>
</template>
