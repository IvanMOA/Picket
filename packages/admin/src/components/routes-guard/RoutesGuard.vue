<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watchEffect } from "vue";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/services/firebase/firebase";
import firebase from "firebase/compat";
import { RouteLocationNormalized, useRouter } from "vue-router";
import { AuthType } from "@/router";
import Unsubscribe = firebase.Unsubscribe;
import { useUserStore } from "@/stores/UserStore";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { postgrestClient } from "@/clients/postgrestClient";
const user = ref<User | null>(null);
const loadingUser = ref(true);
const router = useRouter();
const userStore = useUserStore();
let unsubscribeFn: Unsubscribe;
watchEffect((onCleanup) => {
  const isOnlyPublicWhileUserIsLoggedIn = (route: RouteLocationNormalized) =>
    route.meta.authType === AuthType.ONLY_PUBLIC && user.value !== null;
  if (isOnlyPublicWhileUserIsLoggedIn(router.currentRoute.value)) {
    router.push({ name: "Dashboard" });
  }
  const unregisterBeforeEachRouteGuard = router.beforeEach((to, from, next) => {
    if (
      to.meta.authType === AuthType.PRIVATE &&
      user.value === null &&
      !loadingUser
    ) {
      return next({ name: "Login" });
    }
    if (isOnlyPublicWhileUserIsLoggedIn(to)) {
      return next({ name: "Dashboard" });
    }
    return next();
  });
  onCleanup(unregisterBeforeEachRouteGuard);
});
onMounted(async () => {
  unsubscribeFn = onAuthStateChanged(auth, async (_user) => {
    if (_user) {
      userStore.setUser({ ..._user, ...jwtDecode(await _user.getIdToken()) });
      postgrestClient.defaults.headers.common.Authorization = `Bearer ${
        (
          await axios.post(
            "http://localhost:4004/protected/generate-signed-jwt",
            {
              jwt: await _user.getIdToken(),
            }
          )
        ).data.jwt
      }`;
    }
    loadingUser.value = false;
    user.value = _user;
  });
});
onUnmounted(() => {
  unsubscribeFn();
});
</script>

<template>
  <div
    v-if="
      loadingUser &&
      router.currentRoute.value.meta?.authType !== AuthType.PUBLIC
    "
    data-cy="loading-screen"
  >
    Loading screen
  </div>
  <slot v-else />
</template>
