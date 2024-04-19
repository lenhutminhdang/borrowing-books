<script setup>
const props = defineProps(["onClick", "classes"]);
</script>

<template>
  <button
    @click="onClick"
    :class="classes"
    class="flex justify-center items-center bg-[#333333]"
  >
    <slot />
  </button>
</template>
