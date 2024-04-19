<script setup>
const props = defineProps(["routeName"]);
</script>

<template>
  <router-link
    :to="{ name: routeName }"
    class="inline-block py-2 px-6 btn-primary"
  >
    <slot />
  </router-link>
</template>
