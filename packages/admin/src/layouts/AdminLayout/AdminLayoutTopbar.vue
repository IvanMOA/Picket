<script lang="ts" setup>
import {
  ElAvatar,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElNotification,
} from "element-plus";
import { useLoggedInUser } from "@/stores/UserStore";
import { signOut } from "firebase/auth";
import { useI18n } from "vue-i18n";
import { auth } from "@/services/firebase/firebase";
const { user } = useLoggedInUser();
const { t } = useI18n();
const logout = async () => {
  await signOut(auth);
  ElNotification({
    title: t("goodbye"),
    message: t("logout_message"),
    type: "info",
  });
};
</script>
<template>
  <div class="relative z-20 flex flex-col justify-end h-full px-3 md:w-full">
    <div class="relative p-1 flex items-center w-full space-x-4 justify-end">
      <span class="w-1 h-8 rounded-lg bg-gray-200"> </span>
      <el-avatar> {{ user.email.slice(0, 2).toUpperCase() }}</el-avatar>
      <el-dropdown data-testid="profile-btn" trigger="click">
        <button class="flex items-center text-gray-500 dark:text-white text-md">
          {{ user.email.split("@")[0].toUpperCase() }}
          <svg
            class="ml-2 text-gray-400"
            fill="currentColor"
            height="20"
            viewBox="0 0 1792 1792"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z"
            ></path>
          </svg>
        </button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item data-testid="logout-btn" @click="logout">{{
              t("logout")
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
