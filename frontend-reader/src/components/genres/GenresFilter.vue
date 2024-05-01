<script setup>
import Genres from "./Genres.vue";
const props = defineProps({
  activeGenre: String,
});
</script>
<template>
  <aside>
    <Genres :active-genre="activeGenre" />
  </aside>
</template>
