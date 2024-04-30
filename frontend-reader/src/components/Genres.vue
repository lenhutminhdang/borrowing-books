<script setup>
import { ref, watchEffect } from "vue";
import genreService from "../services/genre.service";

const props = defineProps({
  activeGenre: String,
});

const genres = ref([]);

watchEffect(async () => {
  const response = await genreService.getAll();

  if (response) {
    genres.value = response;
  }
});
</script>
<template>
  <ul v-if="genres" class="flex flex-wrap text-nowrap gap-4">
    <li v-for="genre in genres" :key="genre._id" class="shrink-0 grow">
      <router-link
        :to="{
          name: 'genres',
          query: {
            genre: genre.alt,
          },
        }"
        class="block w-full h-full p-2 border-2 border-main-500 hover:bg-main-500 text-center rounded-lg duration-200"
        :class="{
          'bg-main-500 font-semibold': activeGenre === genre.alt,
        }"
      >
        {{ genre.name }}
      </router-link>
    </li>
  </ul>
</template>
