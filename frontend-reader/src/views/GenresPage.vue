<script setup>
import { onBeforeMount, ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import bookService from "../services/book.service";
import genreService from "../services/genre.service";
import Pagination from "../components/pagination/Pagination.vue";
import GenresFilter from "../components/GenresFilter.vue";
import { formatCurrency } from "../utils/utils";
import BreadCrumbs from "../components/BreadCrumbs.vue";

const CRUMBS = ref([
  {
    name: "Trang Chủ",
    routeName: "home",
  },
  {
    name: "Thể Loại",
    route: "/books?genre=all",
  },
  {
    name: "Tất Cả Sách",
  },
]);

const route = useRoute();
const router = useRouter();

const genreQuery = ref(); // genre.alt
const genre = ref();

const books = ref([]);
const renderedBooks = ref([]);

// Redirect
onBeforeMount(() => {
  if (!route.query.genre) {
    router.replace({
      name: "genres",
      query: { genre: "all" },
    });
  }
});

const renderNewBooks = (dataFromPagination) => {
  renderedBooks.value = dataFromPagination;
};

// Get genre by route query
watch(
  () => route.query.genre,
  async (newGenre, _) => {
    genreQuery.value = newGenre;

    const response = await genreService.getGenreByAlt(genreQuery.value);

    if (response) {
      genre.value = response;

      CRUMBS.value[CRUMBS.value.length - 1] = {
        name: genre.value.name,
      };
    }
  },
  {
    immediate: true,
  }
);

// Get books by genre
watchEffect(async () => {
  if (genre.value && genre.value.alt !== "all") {
    const response = await bookService.findByGenre(genre.value._id);
    if (response) {
      books.value = response;
    }
  } else {
    const response = await bookService.getAll();
    if (response) {
      books.value = response;
    }
  }
});

// Create scroll-based animation
const bookEls = ref();

watchEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animation-book");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: "100px",
    }
  );

  if (bookEls.value) {
    bookEls.value.forEach((book) => observer.observe(book));
  }
});
</script>

<template>
  <main class="text-gray-700">
    <BreadCrumbs :crumbs="CRUMBS" />

    <!-- Genre Description -->
    <header class="mb-10 mt-6">
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
          <li
            v-for="(book, index) in renderedBooks"
            :key="book._id"
            ref="bookEls"
            class="book-item initial-style"
            :style="{ animationDelay: 100 * index + 'ms' }"
          >
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

        <!-- Pagination -->
        <Pagination
          v-if="books"
          :items="books"
          :itemsPerPage="8"
          @renderNewItems="renderNewBooks"
        />
      </section>
    </div>
  </main>
</template>

<style scoped>
.initial-style {
  transform: translateY(100px);
  opacity: 0;
}

.animation-book {
  animation: animation 500ms ease-in-out 1 forwards;
}

@keyframes animation {
  80% {
    transform: translateY(-20px);
    opacity: 0.8;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
