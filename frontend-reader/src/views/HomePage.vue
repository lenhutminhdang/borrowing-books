<script setup>
import { ref, watchEffect } from "vue";
import bookService from "../services/book.service";
import { formatCurrency } from "../utils/utils";
import Slider from "../components/Slider.vue";

const books = ref(null);

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
    <Slider v-if="books" :books="books.slice(0, 8) || []" />

    <!-- Section all books -->
    <section>
      <h1 class="text-xl text-gray-600 mb-4">@Tất Cả Sách</h1>
      <ul
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12"
        v-if="books"
      >
        <li
          v-for="book in books"
          :key="book._id"
          class="border border-gray-300 rounded-lg p-4"
        >
          <router-link
            :to="{ name: 'book-details', params: { id: book._id } }"
            class="grid grid-cols-2 xl:grid-cols-[4fr_6fr] items-stretch gap-4 group outline-none outline-offset-0 focus:outline-yellow-400 rounded-md"
          >
            <img
              class="aspect-[9/16] rounded-md object-cover group-hover:scale-105 transition-transform duration-300"
              :src="book.image"
              :alt="book.name"
            />
            <div class="p-4 rounded-md bg-orange-100">
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
    </section>
  </main>
</template>
