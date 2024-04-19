<script setup>
const props = defineProps(["type", "name", "placeholder", "classes", "value"]);
</script>
<template>
  <input
    :type="type"
    :name="name"
    :value="value"
    :placeholder="placeholder"
    :class="classes"
    class="bg-yellow-100 py-3 px-4 text-gray-800 placeholder:text-gray-600 outline-none focus:outline-yellow-400 rounded-md"
  />
</template>
