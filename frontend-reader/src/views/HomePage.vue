<script setup>
import { computed, ref, watchEffect } from "vue";
import bookService from "../services/book.service";
import Slider from "../components/home/Slider.vue";
import Pagination from "../components/pagination/Pagination.vue";
import Genres from "../components/genres/Genres.vue";
import BookItems from "../components/BookItems.vue";

const books = ref([]);
const renderedBooks = ref([]);

const renderNewBooks = (dataFromPagination) => {
  renderedBooks.value = dataFromPagination;
};

watchEffect(async () => {
  const response = await bookService.getAll();

  if (response) {
    books.value = response;
  }
});
</script>

<template>
  <main class="text-gray-700">
    <!-- Slider -->
    <Slider v-if="books" :books="books" />

    <!-- Section all books -->
    <section class="mb-10 md:mb-20">
      <h1 class="text-xl text-gray-600 mb-4">@Tất Cả Sách</h1>

      <BookItems :books="renderedBooks" />
      <Pagination
        v-if="books"
        :items="books"
        :itemsPerPage="12"
        @renderNewItems="renderNewBooks"
      />
    </section>

    <section class="mb-10 md:mb-20">
      <h2 class="text-xl text-gray-600 mb-4">@Thể Loại</h2>

      <Genres />
    </section>
  </main>
</template>
