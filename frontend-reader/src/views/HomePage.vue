<script setup>
import { computed, ref, watchEffect } from "vue";
import bookService from "../services/book.service";
import { formatCurrency } from "../utils/utils";
import Slider from "../components/Slider.vue";
import Pagination from "../components/pagination/Pagination.vue";
import Genres from "../components/Genres.vue";

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

const TEMP_BOOkS = computed(() => {
  const arr = [];
  for (let index = 1; index <= 5; index++) {
    arr.push(...books.value);
  }
  return arr;
});
</script>

<template>
  <main class="text-gray-700">
    <!-- Slider -->
    <!-- <Slider v-if="books" :books="books?.slice(0, 8) || []" /> -->
    <Slider v-if="books" :books="books" />

    <!-- Section all books -->
    <section class="mb-10 md:mb-20">
      <h1 class="text-xl text-gray-600 mb-4">@Tất Cả Sách</h1>

      <ul
        class="grid grid-cols-3 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
        v-if="renderedBooks"
      >
        <li
          v-for="book in renderedBooks"
          :key="book._id"
          class="sm:border border-gray-300 rounded-lg sm:p-4"
        >
          <router-link
            :to="{ name: 'book-details', params: { id: book._id } }"
            class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[4fr_6fr] sm:items-stretch gap-4 h-full group outline-none outline-offset-0 focus:outline-yellow-400 rounded-md aspect-[9/16] sm:aspect-auto"
          >
            <img
              class="h-full sm:h-auto sm:aspect-[9/16] rounded-md object-cover group-hover:scale-105 transition-transform duration-300"
              :src="book.image"
              :alt="book.name"
            />

            <div class="hidden sm:w-auto sm:block p-4 rounded-md bg-orange-100">
              <h2 class="text-xl sm:text-lg mb-2 text-gray-800 font-semibold">
                {{ book.name }}
              </h2>
              <p class="mb-2 sm:text-sm">{{ book.author }}</p>
              <p class="mt-auto whitespace-nowrap">
                <span class="text-yellow-500 text-xl sm:text-base">{{
                  book.price > 0 ? formatCurrency(book.price) : "Miễn phí"
                }}</span>
                <span v-if="book.price > 0">/ngày</span>
              </p>
            </div>
          </router-link>
        </li>
      </ul>
      <Pagination
        v-if="books"
        :items="TEMP_BOOkS"
        :itemsPerPage="6"
        @renderNewItems="renderNewBooks"
      />
    </section>

    <section class="mb-10 md:mb-20">
      <h1 class="text-xl text-gray-600 mb-4">@Thể Loại</h1>

      <Genres />
    </section>
  </main>
</template>
