<script setup>
import { computed, ref, watchEffect } from "vue";
import bookService from "../services/book.service";

const books = ref(null);

watchEffect(async () => {
  const response = await bookService.getAll();

  if (response) {
    books.value = response.map((book) => {
      return {
        ...book,
        description: book.description?.slice(
          0,
          book.description?.length >= 260 ? 260 : book.description.length
        ),
      };
    });
  }
});
</script>

<template>
  <div class="text-gray-700">
    <h1 class="text-3xl text-center text-gray-900 mb-10">Tất Cả Sách</h1>

    <ul
      class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12"
      v-if="books"
    >
      <li v-for="book in [...books, ...books, ...books]" :key="book._id">
        <router-link
          :to="{ name: 'book-details', params: { id: book._id } }"
          class="flex gap-2 group"
        >
          <img
            class="w-40 aspect-[9/16] object-cover group-hover:scale-105 transition-transform duration-300"
            :src="book.image"
            :alt="book.name"
          />
          <div>
            <h2 class="text-xl text-gray-800 font-semibold">
              {{ book.name }}
            </h2>
            <p class="mb-2">{{ book.author }}</p>

            <p class="text-[0.8rem]">{{ book.description }}...</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
