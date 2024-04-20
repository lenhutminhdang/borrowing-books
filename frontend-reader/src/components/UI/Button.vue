<script setup>
const props = defineProps(["onClick", "classes", "disabled"]);
</script>

<template>
  <button
    @click="onClick"
    :disabled="disabled"
    :class="classes"
    class="btn-primary disabled:bg-gray-300 disabled:cursor-not-allowed"
  >
    <slot />
  </button>
</template>
