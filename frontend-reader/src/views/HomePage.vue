<script setup>
import { computed, ref, watchEffect } from "vue";
import bookService from "../services/book.service";
import { formatCurrency } from "../utils/utils";
import Slider from "../components/Slider.vue";
import PaginationView from "../components/pagination/PaginationView.vue";

// Pagination related
const books = ref([]);
const renderedBooks = ref([]);

const changeRenderedBooks = (dataFromPaginationView) => {
  renderedBooks.value = dataFromPaginationView;
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
    arr.push(...books.value.map((b) => ({ ...b, _id: b._id + index }))); // make the same id unique
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
    <section>
      <h1 class="text-xl text-gray-600 mb-4">@Tất Cả Sách</h1>
      <PaginationView
        v-if="books"
        :items="TEMP_BOOkS"
        :itemsPerPage="6"
        @renderNewView="changeRenderedBooks"
      >
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
              class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[4fr_6fr] sm:items-stretch gap-4 group outline-none outline-offset-0 focus:outline-yellow-400 rounded-md aspect-[9/16] sm:aspect-auto"
            >
              <img
                class="h-full sm:h-auto sm:aspect-[9/16] rounded-md object-cover group-hover:scale-105 transition-transform duration-300"
                :src="book.image"
                :alt="book.name"
              />

              <div
                class="hidden sm:w-auto sm:block p-4 rounded-md bg-orange-100"
              >
                <h2 class="text-xl mb-2 text-gray-800 font-semibold">
                  {{ book.name }}
                </h2>
                <p class="mb-2">{{ book.author }}</p>
                <p class="mt-auto">
                  <span class="text-yellow-500 text-xl">{{
                    book.price > 0 ? formatCurrency(book.price) : "Miễn phí"
                  }}</span>
                  <span v-if="book.price > 0">/ngày</span>
                </p>
              </div>
            </router-link>
          </li>
        </ul>
      </PaginationView>
    </section>
  </main>
</template>
