<script setup>
import MainHeader from "./components/header/MainHeader.vue";
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
