<script setup>
import { onMounted, ref, watchEffect } from "vue";
import readerService from "../services/reader.service";
import { useAuthStore } from "../store";
import { useRouter } from "vue-router";
import Pagination from "../components/pagination/Pagination.vue";

const store = useAuthStore();
const router = useRouter();
const favoriteBooks = ref([]);
const readerId = ref(null);
const renderedFavoriteBooks = ref([]);

const renderNewFavoriteBooks = (dataFromPagination) => {
  renderedFavoriteBooks.value = dataFromPagination;
};

onMounted(() => {
  const timer = setTimeout(() => {
    if (!store.isLoggedIn) {
      router.push({ name: "login" });
    }
    clearTimeout(timer);
  }, 300);
});

const unfavoriteBook = async (bookId) => {
  if (readerId.value && bookId) {
    const response = await readerService.removeFromFavorites({
      id: readerId.value,
      bookId,
    });

    if (favoriteBooks.value) {
      favoriteBooks.value = favoriteBooks.value.filter(
        (book) => book._id !== bookId
      );
    }
  }
};

// Fetch favorite books
watchEffect(async () => {
  const response = await readerService.getFavoriteBooks();

  if (response) {
    favoriteBooks.value = response[0].favoriteBooksDetails;
    readerId.value = response[0]._id;
  }
});
</script>

<template>
  <main class="text-gray-700">
    <h1 class="text-xl text-gray-600 mb-4">@Yêu thích</h1>
    <p
      v-if="favoriteBooks.length === 0"
      class="text-center text-lg h-[30rem] flex justify-center items-center text-gray-600"
    >
      Danh sách trống...
    </p>

    <ul
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-12"
      v-if="renderedFavoriteBooks.length > 0"
    >
      <li
        v-for="book in renderedFavoriteBooks"
        :key="book._id"
        class="relative border border-gray-300 rounded-lg p-4"
      >
        <router-link
          :to="{ name: 'book-details', params: { id: book._id } }"
          class="grid items-stretch gap-4 outline-none outline-offset-0 focus:outline-yellow-400 rounded-md"
        >
          <img
            class="aspect-[9/16] rounded-md object-cover"
            :src="book.image"
            :alt="book.name"
          />
        </router-link>

        <!-- Favorite Button -->
        <button
          @click="() => unfavoriteBook(book._id)"
          class="absolute bottom-6 left-1/2 -translate-x-1/2 size-10 rounded-full flex justify-center items-center bg-orange-100 text-main text-2xl outline-none outline-offset-0 focus:outline-yellow-400"
        >
          &hearts;
        </button>
      </li>
    </ul>
    <Pagination
      v-if="favoriteBooks"
      :items="favoriteBooks"
      :itemsPerPage="12"
      @renderNewItems="renderNewFavoriteBooks"
    />
  </main>
</template>
