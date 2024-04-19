<script setup>
const props = defineProps(["onClick", "classes", "inStock"]);
</script>

<template>
  <button
    @click="onClick"
    :disabled="!inStock"
    :class="classes"
    class="btn-primary disabled:bg-gray-300 disabled:cursor-not-allowed"
  >
    <slot />
  </button>
</template>
