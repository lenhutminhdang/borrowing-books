<script setup>
const props = defineProps(["label", "routeName"]);
</script>

<template>
  <li>
    <router-link
      :to="{ name: routeName }"
      class="block py-2 px-6 text-center font-semibold btn-primary text-gray-700 hover:bg-gray-100 hover:text-blue-700"
    >
      {{ label }}
    </router-link>
  </li>
</template>
