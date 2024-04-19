<script setup>
const props = defineProps(["label", "onClick", "classes", "inStock"]);
</script>

<template>
  <button
    @click="onClick"
    :disabled="!inStock"
    :class="classes"
    class="text-center font-semibold btn-primary text-gray-700 bg-yellow-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
  >
    {{ label }}
  </button>
</template>
