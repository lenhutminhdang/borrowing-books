<script setup>
import MainHeader from "./components/header/MainHeader.vue";
</script>

<template>
  <div>
    <MainHeader />
    <div class="px-4 mt-8 lg:mx-32 xl:mx-40 bg-gray-200">
      <router-view />
    </div>
  </div>
</template>

<style scoped></style>
