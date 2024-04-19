<script setup>
const props = defineProps(["label", "routeName", "isButton"]);
</script>

<template>
  <li>
    <router-link
      :to="{ name: routeName }"
      active-class="text-yellow-500"
      class="block py-2 px-3 text-center rounded-md text-gray-700 hover:text-yellow-500"
    >
      {{ label }}
    </router-link>
  </li>
</template>
