<script setup>
import Genres from "./Genres.vue";
const props = defineProps({
  activeGenre: String,
  sortBy: String,
});
</script>
<template>
  <aside>
    <Genres :active-genre="activeGenre" :sort-by="sortBy" />
  </aside>
</template>
