<script setup>
import { computed, onBeforeMount, ref, watch, watchEffect } from "vue";
import bookService from "../services/book.service";
import genreService from "../services/genre.service";
import { formatCurrency } from "../utils/utils";

import Pagination from "../components/pagination/Pagination.vue";
import GenresFilter from "../components/GenresFilter.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const genreQuery = ref(); // genre.alt
const genre = ref();

const books = ref([]);
const renderedBooks = ref([]);

onBeforeMount(() => {
  if (!route.query.genre) {
    router.replace({
      name: "genres",
      query: { genre: "tieu-thuyet-trung-quoc" },
    });
  }
});

const renderNewBooks = (dataFromPagination) => {
  renderedBooks.value = dataFromPagination;
};

watch(
  () => route.query.genre,
  async (newGenre, _) => {
    genreQuery.value = newGenre;

    const response = await genreService.getGenreByAlt(genreQuery.value);
    if (response) {
      genre.value = response;
    }
  },
  {
    immediate: true,
  }
);

watchEffect(async () => {
  if (genre.value) {
    console.log(genre.value._id);
    const response = await bookService.findByGenre(genre.value._id);
    if (response) {
      books.value = response;
    }
  }
});
</script>

<template>
  <main class="text-gray-700">
    <!-- Genre Description -->
    <header class="mb-10">
      <h1 class="text-3xl text-gray-600 mb-4 uppercase">
        {{ genre?.name }}
      </h1>
      <p class="text-lg font-light">
        {{ genre?.description }}
      </p>
    </header>

    <!-- Filter and Books -->
    <h2 class="text-xl mb-6">THỂ LOẠI</h2>
    <div class="grid lg:grid-cols-[1fr_3fr] gap-8 mb-10 md:mb-20">
      <GenresFilter :activeGenre="genreQuery" />

      <section class="pr-4 sm:pr-6">
        <ul
          class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
          v-if="renderedBooks.length > 0"
        >
          <li v-for="book in renderedBooks" :key="book._id">
            <router-link
              :to="{ name: 'book-details', params: { id: book._id } }"
              class="group text-center"
            >
              <div class="overflow-hidden rounded-md">
                <img
                  class="w-full rounded-md object-cover aspect-[9/16] group-hover:scale-105 transition-transform duration-300"
                  :src="book.image"
                  :alt="book.name"
                />
              </div>
              <h3 class="text-lg truncate">{{ book.name }}</h3>
              <p class="whitespace-nowrap">
                <span class="text-yellow-500 text-xl sm:text-base">{{
                  book.price > 0 ? formatCurrency(book.price) : "Miễn phí"
                }}</span>
                <span v-if="book.price > 0" class="font-light">/ngày</span>
              </p>
            </router-link>
          </li>
        </ul>
        <p
          v-else
          class="text-lg text-center h-full grid place-items-center min-h-60 md:min-h-fit"
        >
          Không tìm thấy sách...
        </p>

        <Pagination
          v-if="books"
          :items="books"
          :itemsPerPage="4"
          @renderNewItems="renderNewBooks"
        />
      </section>
    </div>
  </main>
</template>
