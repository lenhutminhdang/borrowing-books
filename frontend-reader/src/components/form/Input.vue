<script setup>
const props = defineProps([
  "type",
  "name",
  "placeholder",
  "required",
  "classes",
]);
const model = defineModel();
</script>
<template>
  <input
    :type="type"
    :name="name"
    :required="required"
    :placeholder="placeholder"
    v-model="model"
    :class="classes"
    class="bg-yellow-100 py-3 px-4 text-gray-800 placeholder:text-gray-600 outline-none outline-offset-0 focus:outline-yellow-400 rounded-md"
  />
</template>
