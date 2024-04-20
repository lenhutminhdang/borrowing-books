<script setup>
import { watchEffect } from "vue";
import MainHeader from "./components/header/MainHeader.vue";
import readerService from "./services/reader.service";
import { useAuthStore } from "./store";

const store = useAuthStore();

watchEffect(async () => {
  const userData = await readerService.getProfile();

  if (!store.isLoggedIn && userData) {
    store.login(userData);
  }
});
</script>

<template>
  <div>
    <MainHeader />
    <div class="px-4 mt-8 mb-16 lg:mx-32 xl:mx-40">
      <router-view />
    </div>
  </div>
</template>

<style scoped></style>
