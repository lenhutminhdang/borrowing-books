<script setup>
import Genres from "../components/Genres.vue";
const props = defineProps({
  activeGenre: String,
});
</script>
<template>
  <aside>
    <Genres :active-genre="activeGenre" />
  </aside>
</template>
