<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watchEffect } from "vue";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/services/firebase/firebase";
import firebase from "firebase/compat";
import { RouteLocationNormalized, useRouter } from "vue-router";
import { AuthType } from "@/router";
import Unsubscribe = firebase.Unsubscribe;
const user = ref<User | null>(null);
const loadingUser = ref(true);
const router = useRouter();
let unsubscribeFn: Unsubscribe;
watchEffect((onCleanup) => {
  const isOnlyPublicWhileUserIsLoggedIn = (route: RouteLocationNormalized) => route.meta.authType === AuthType.ONLY_PUBLIC && user.value !== null;
  if (isOnlyPublicWhileUserIsLoggedIn(router.currentRoute.value)) {
    router.push({ name: "Home" });
  }
  const unregisterBeforeEachRouteGuard = router.beforeEach((to, from, next) => {
    if (to.meta.authType === AuthType.PRIVATE && user.value === null) {
      return next({ name: "AskForVerificationCode" });
    }
    if (isOnlyPublicWhileUserIsLoggedIn(to)) {
      return next({ name: "Home" });
    }
    return next();
  });
  onCleanup(unregisterBeforeEachRouteGuard);
});
onMounted(async () => {
  unsubscribeFn = onAuthStateChanged(auth, (_user) => {
    console.log(_user);
    loadingUser.value = false;
    user.value = _user;
  });
});
onUnmounted(() => {
  unsubscribeFn();
});
</script>

<template>
  <div v-if="loadingUser && router.currentRoute.value.meta?.authType !== AuthType.PUBLIC" data-cy="loading-screen">
    Loading screen
  </div>
  <slot v-else />
</template>