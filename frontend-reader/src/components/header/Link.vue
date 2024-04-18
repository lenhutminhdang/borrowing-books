<script setup>
const props = defineProps(["label", "routeName", "isButton"]);
</script>

<template>
  <li>
    <router-link
      :to="{ name: routeName }"
      class="block py-2 px-3 text-center rounded-md text-gray-700 hover:bg-gray-50 hover:text-blue-700 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white"
    >
      {{ label }}
    </router-link>
  </li>
</template>
